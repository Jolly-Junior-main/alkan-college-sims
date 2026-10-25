"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { logAuditTrail } from "@/lib/audit";
import { computeGrade } from "@/lib/grade-calculator";
import { revalidatePath } from "next/cache";

export interface StudentGradeEntry {
  studentId: string;
  assessmentMarks: number;
  examMarks: number;
}

export async function saveGrades(
  courseId: string,
  entries: StudentGradeEntry[],
  mode: "DRAFT" | "SUBMIT"
) {
  const session = await requireRole(["TEACHER", "REGISTRAR", "ADMIN"]);

  // Server-side input validation
  for (const entry of entries) {
    if (entry.assessmentMarks < 0 || entry.assessmentMarks > 50) {
      return {
        success: false,
        error: `Validation error: Continuous Assessment marks for student must be between 0 and 50. Received: ${entry.assessmentMarks}`,
      };
    }
    if (entry.examMarks < 0 || entry.examMarks > 50) {
      return {
        success: false,
        error: `Validation error: Final Exam marks for student must be between 0 and 50. Received: ${entry.examMarks}`,
      };
    }
  }

  const newStatus = mode === "SUBMIT" ? "SUBMITTED" : "DRAFT";

  for (const entry of entries) {
    const calc = computeGrade(entry.assessmentMarks, entry.examMarks);
    if (calc.error) {
      return { success: false, error: calc.error };
    }

    await prisma.grade.upsert({
      where: {
        studentId_courseId: {
          studentId: entry.studentId,
          courseId,
        },
      },
      update: {
        assessmentMarks: entry.assessmentMarks,
        examMarks: entry.examMarks,
        totalMarks: calc.totalMarks,
        letterGrade: calc.letterGrade,
        gradePoint: calc.gradePoint,
        status: newStatus,
        submittedById: session.userId,
      },
      create: {
        studentId: entry.studentId,
        courseId,
        assessmentMarks: entry.assessmentMarks,
        examMarks: entry.examMarks,
        totalMarks: calc.totalMarks,
        letterGrade: calc.letterGrade,
        gradePoint: calc.gradePoint,
        status: newStatus,
        submittedById: session.userId,
      },
    });
  }

  await logAuditTrail({
    userId: session.userId,
    action: mode === "SUBMIT" ? "GRADE_SUBMIT_TO_REGISTRAR" : "GRADE_SAVE_DRAFT",
    resource: "CourseGrades",
    resourceId: courseId,
    diffPayload: { courseId, count: entries.length, mode, status: newStatus },
  });

  revalidatePath(`/portal/teacher/courses/${courseId}/grading`);
  revalidatePath("/portal/teacher");
  return { success: true, count: entries.length, status: newStatus };
}

export async function submitGradeChangeRequest(
  gradeId: string,
  proposedTotalMarks: number,
  reason: string
) {
  const session = await requireRole(["TEACHER", "REGISTRAR", "ADMIN"]);

  if (proposedTotalMarks < 0 || proposedTotalMarks > 100) {
    return { success: false, error: "Proposed total score must be between 0 and 100." };
  }

  if (!reason || reason.trim().length < 10) {
    return { success: false, error: "Please provide a detailed justification for the grade change request." };
  }

  const grade = await prisma.grade.findUnique({
    where: { id: gradeId },
    include: { course: true, student: true },
  });

  if (!grade) {
    return { success: false, error: "Target grade record not found." };
  }

  const changeRequest = await prisma.gradeChangeRequest.create({
    data: {
      gradeId,
      previousTotalMarks: grade.totalMarks,
      proposedTotalMarks,
      reason: reason.trim(),
      requestedById: session.userId,
      status: "PENDING",
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: "GRADE_CHANGE_REQUEST_SUBMIT",
    resource: "GradeChangeRequest",
    resourceId: changeRequest.id,
    diffPayload: {
      gradeId,
      previousTotalMarks: grade.totalMarks,
      proposedTotalMarks,
      reason,
    },
  });

  revalidatePath("/portal/teacher");
  return { success: true, requestId: changeRequest.id };
}

export async function processGradeChangeDecision(
  requestId: string,
  decision: "APPROVED" | "REJECTED",
  auditNote?: string
) {
  const session = await requireRole(["REGISTRAR", "ADMIN"]);

  const request = await prisma.gradeChangeRequest.findUnique({
    where: { id: requestId },
    include: { grade: true },
  });

  if (!request) {
    return { success: false, error: "Grade change request not found." };
  }

  if (decision === "APPROVED") {
    // Recalculate letter grade and grade points for proposed total
    const proposed = request.proposedTotalMarks;
    // Distribute proportionally or keep continuous assessment constant
    const currentAssessment = Math.min(request.grade.assessmentMarks, 50);
    const newExamMarks = Math.max(0, Math.min(50, proposed - currentAssessment));
    const calc = computeGrade(currentAssessment, newExamMarks);

    await prisma.grade.update({
      where: { id: request.gradeId },
      data: {
        assessmentMarks: currentAssessment,
        examMarks: newExamMarks,
        totalMarks: proposed,
        letterGrade: calc.letterGrade,
        gradePoint: calc.gradePoint,
        approvedById: session.userId,
      },
    });
  }

  const updatedReq = await prisma.gradeChangeRequest.update({
    where: { id: requestId },
    data: {
      status: decision,
      approvedById: session.userId,
      auditNote: auditNote || `Decision recorded as ${decision} by Registrar Office.`,
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: `GRADE_CHANGE_${decision}`,
    resource: "GradeChangeRequest",
    resourceId: requestId,
    diffPayload: {
      decision,
      auditNote,
      previousTotalMarks: request.previousTotalMarks,
      proposedTotalMarks: request.proposedTotalMarks,
    },
  });

  revalidatePath("/portal/registrar/grade-changes");
  return { success: true, status: decision };
}

export async function approveAndPublishCourseGrades(courseId: string) {
  const session = await requireRole(["REGISTRAR", "ADMIN"]);

  const grades = await prisma.grade.findMany({
    where: {
      courseId,
      status: { in: ["SUBMITTED", "APPROVED"] },
    },
  });

  if (grades.length === 0) {
    return {
      success: false,
      error: "No submitted grade records found awaiting approval for this course.",
    };
  }

  await prisma.grade.updateMany({
    where: {
      courseId,
      status: { in: ["SUBMITTED", "APPROVED"] },
    },
    data: {
      status: "PUBLISHED",
      approvedById: session.userId,
      publishedAt: new Date(),
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: "GRADE_PUBLISH_COURSE",
    resource: "Course",
    resourceId: courseId,
    diffPayload: { courseId, publishedCount: grades.length },
  });

  revalidatePath("/portal/registrar/grades");
  revalidatePath("/portal/student/grades");
  return { success: true, count: grades.length };
}
