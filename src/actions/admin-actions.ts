"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { logAuditTrail } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createDepartment(name: string, code: string, faculty: string) {
  const session = await requireRole(["ADMIN"]);

  const dept = await prisma.department.create({
    data: {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      faculty: faculty.trim() || "Faculty of Health Sciences",
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: "DEPARTMENT_CREATE",
    resource: "Department",
    resourceId: dept.id,
    diffPayload: { name, code },
  });

  revalidatePath("/portal/admin/curriculum");
  return { success: true, department: dept };
}

export async function createProgram(name: string, departmentId: string, degreeType: string, totalCredits: number) {
  const session = await requireRole(["ADMIN"]);

  const prog = await prisma.program.create({
    data: {
      name: name.trim(),
      departmentId,
      degreeType,
      totalCreditsRequired: totalCredits || 130,
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: "PROGRAM_CREATE",
    resource: "Program",
    resourceId: prog.id,
    diffPayload: { name, departmentId, degreeType },
  });

  revalidatePath("/portal/admin/curriculum");
  return { success: true, program: prog };
}

export async function createCourse(data: {
  code: string;
  title: string;
  creditHours: number;
  lectureHours: number;
  labHours: number;
  departmentId: string;
  semester: number;
  yearLevel: number;
}) {
  const session = await requireRole(["ADMIN"]);

  const course = await prisma.course.create({
    data: {
      code: data.code.trim().toUpperCase(),
      title: data.title.trim(),
      creditHours: data.creditHours,
      lectureHours: data.lectureHours,
      labHours: data.labHours,
      departmentId: data.departmentId,
      semester: data.semester,
      yearLevel: data.yearLevel,
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: "COURSE_CREATE",
    resource: "Course",
    resourceId: course.id,
    diffPayload: { code: data.code, title: data.title },
  });

  revalidatePath("/portal/admin/curriculum");
  return { success: true, course };
}

export async function assignCourseTeacher(courseId: string, teacherId: string, section: string) {
  const session = await requireRole(["ADMIN"]);

  const assignment = await prisma.courseAssignment.create({
    data: {
      courseId,
      teacherId,
      academicYear: "2026/2027",
      semester: 1,
      section: section || "Section A",
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: "COURSE_ASSIGN_TEACHER",
    resource: "CourseAssignment",
    resourceId: assignment.id,
    diffPayload: { courseId, teacherId, section },
  });

  revalidatePath("/portal/admin/curriculum");
  return { success: true, assignment };
}

export async function createUser(data: {
  email: string;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN";
  phone?: string;
  gender?: string;
  programId?: string; // for students
}) {
  const session = await requireRole(["ADMIN"]);

  const existing = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase().trim() },
  });

  if (existing) {
    return { success: false, error: "A user with this email address already exists." };
  }

  const defaultPassword = "password123";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase().trim(),
      passwordHash,
      role: data.role,
      status: "ACTIVE",
      profile: {
        create: {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          phone: data.phone || null,
          gender: data.gender || "MALE",
        },
      },
    },
  });

  if (data.role === "STUDENT" && data.programId) {
    const studentCount = await prisma.studentProfile.count();
    const studentIdNumber = `HC/UG/2026/${String(studentCount + 1).padStart(3, "0")}`;
    await prisma.studentProfile.create({
      data: {
        userId: user.id,
        studentIdNumber,
        programId: data.programId,
        academicYear: "2026/2027",
        currentSemester: 1,
      },
    });
  }

  await logAuditTrail({
    userId: session.userId,
    action: "USER_CREATE",
    resource: "User",
    resourceId: user.id,
    diffPayload: { email: data.email, role: data.role },
  });

  revalidatePath("/portal/admin/users");
  return { success: true, user };
}

export async function toggleUserStatus(userId: string, newStatus: "ACTIVE" | "SUSPENDED") {
  const session = await requireRole(["ADMIN"]);

  const user = await prisma.user.update({
    where: { id: userId },
    data: { status: newStatus },
  });

  await logAuditTrail({
    userId: session.userId,
    action: `USER_STATUS_${newStatus}`,
    resource: "User",
    resourceId: userId,
    diffPayload: { newStatus },
  });

  revalidatePath("/portal/admin/users");
  return { success: true, user };
}
