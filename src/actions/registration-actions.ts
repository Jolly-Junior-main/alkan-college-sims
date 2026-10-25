"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { logAuditTrail } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function submitStudentRegistration(studentProfileId: string, courseIds: string[]) {
  const session = await requireRole(["STUDENT", "REGISTRAR", "ADMIN"]);

  if (courseIds.length === 0) {
    return { success: false, error: "Please select at least one course for registration." };
  }

  // Fetch chosen courses to calculate total credits
  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds } },
  });

  const totalCredits = courses.reduce((sum, c) => sum + c.creditHours, 0);

  // Validation constraint: Min 12, Max 22 credits
  if (totalCredits < 12) {
    return {
      success: false,
      error: `Credit boundary violation: Minimum 12 credit hours required. Selected: ${totalCredits} credits.`,
    };
  }

  if (totalCredits > 22) {
    return {
      success: false,
      error: `Credit boundary violation: Maximum 22 credit hours permitted. Selected: ${totalCredits} credits.`,
    };
  }

  // Check if existing registration exists for current semester
  let reg = await prisma.courseRegistration.findFirst({
    where: {
      studentId: studentProfileId,
      academicYear: "2026/2027",
      semester: 1,
    },
    include: { items: true },
  });

  if (reg && reg.status === "APPROVED") {
    return {
      success: false,
      error: "Your registration has already been approved by the Registrar. Modifications are locked.",
    };
  }

  if (!reg) {
    reg = await prisma.courseRegistration.create({
      data: {
        studentId: studentProfileId,
        academicYear: "2026/2027",
        semester: 1,
        status: "SUBMITTED",
        items: {
          create: courseIds.map((cid) => ({ courseId: cid })),
        },
      },
      include: { items: true },
    });
  } else {
    // Delete old items and re-create with new set
    await prisma.registrationItem.deleteMany({
      where: { registrationId: reg.id },
    });

    reg = await prisma.courseRegistration.update({
      where: { id: reg.id },
      data: {
        status: "SUBMITTED",
        items: {
          create: courseIds.map((cid) => ({ courseId: cid })),
        },
      },
      include: { items: true },
    });
  }

  await logAuditTrail({
    userId: session.userId,
    action: "REGISTRATION_SUBMIT",
    resource: "CourseRegistration",
    resourceId: reg.id,
    diffPayload: { totalCredits, courseIds },
  });

  revalidatePath("/portal/student/registration");
  return { success: true, totalCredits, status: "SUBMITTED" };
}

export async function clearStudentRegistration(
  registrationId: string,
  decision: "APPROVED" | "REJECTED"
) {
  const session = await requireRole(["REGISTRAR", "ADMIN"]);

  const reg = await prisma.courseRegistration.findUnique({
    where: { id: registrationId },
    include: {
      student: {
        include: {
          user: { include: { profile: true } },
        },
      },
      items: { include: { course: true } },
    },
  });

  if (!reg) {
    return { success: false, error: "Registration batch not found." };
  }

  const updated = await prisma.courseRegistration.update({
    where: { id: registrationId },
    data: {
      status: decision,
      approvedById: session.userId,
      approvedAt: decision === "APPROVED" ? new Date() : null,
    },
  });

  // When approved, automatically initialize Grade entries in DRAFT mode for teachers to grade
  if (decision === "APPROVED") {
    for (const item of reg.items) {
      const existingGrade = await prisma.grade.findUnique({
        where: {
          studentId_courseId: {
            studentId: reg.studentId,
            courseId: item.courseId,
          },
        },
      });

      if (!existingGrade) {
        await prisma.grade.create({
          data: {
            studentId: reg.studentId,
            courseId: item.courseId,
            assessmentMarks: 0,
            examMarks: 0,
            totalMarks: 0,
            letterGrade: "F",
            gradePoint: 0.0,
            status: "DRAFT",
          },
        });
      }
    }
  }

  await logAuditTrail({
    userId: session.userId,
    action: `REGISTRATION_${decision}`,
    resource: "CourseRegistration",
    resourceId: registrationId,
    diffPayload: {
      studentIdNumber: reg.student.studentIdNumber,
      decision,
    },
  });

  revalidatePath("/portal/registrar/registrations");
  return { success: true, status: decision };
}

export async function clearAllPendingRegistrations() {
  const session = await requireRole(["REGISTRAR", "ADMIN"]);

  const pending = await prisma.courseRegistration.findMany({
    where: { status: "SUBMITTED" },
    include: { items: true },
  });

  for (const reg of pending) {
    await prisma.courseRegistration.update({
      where: { id: reg.id },
      data: {
        status: "APPROVED",
        approvedById: session.userId,
        approvedAt: new Date(),
      },
    });

    for (const item of reg.items) {
      const existingGrade = await prisma.grade.findUnique({
        where: {
          studentId_courseId: {
            studentId: reg.studentId,
            courseId: item.courseId,
          },
        },
      });

      if (!existingGrade) {
        await prisma.grade.create({
          data: {
            studentId: reg.studentId,
            courseId: item.courseId,
            assessmentMarks: 0,
            examMarks: 0,
            totalMarks: 0,
            letterGrade: "F",
            gradePoint: 0.0,
            status: "DRAFT",
          },
        });
      }
    }
  }

  await logAuditTrail({
    userId: session.userId,
    action: "REGISTRATION_BATCH_APPROVE_ALL",
    resource: "CourseRegistration",
    resourceId: "BATCH",
    diffPayload: { approvedCount: pending.length },
  });

  revalidatePath("/portal/registrar/registrations");
  return { success: true, count: pending.length };
}
