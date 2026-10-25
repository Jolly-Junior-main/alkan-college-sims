import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CurriculumManager } from "./curriculum-manager";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminCurriculumPage() {
  const session = await getSession();
  if (!session) return null;

  const [departments, programs, courses, teachers] = await Promise.all([
    prisma.department.findMany({ orderBy: { name: "asc" } }),
    prisma.program.findMany({ orderBy: { name: "asc" } }),
    prisma.course.findMany({
      include: {
        department: true,
        assignments: {
          include: {
            teacher: { include: { profile: true } },
          },
        },
      },
      orderBy: { code: "asc" },
    }),
    prisma.user.findMany({
      where: { role: "TEACHER" },
      include: { profile: true },
      orderBy: { email: "asc" },
    }),
  ]);

  const mappedCourses = courses.map((c) => ({
    id: c.id,
    code: c.code,
    title: c.title,
    creditHours: c.creditHours,
    lectureHours: c.lectureHours,
    labHours: c.labHours,
    departmentId: c.departmentId,
    departmentName: c.department.name,
    assignments: c.assignments.map((a) => ({
      teacherName: a.teacher.profile
        ? `Dr. ${a.teacher.profile.firstName} ${a.teacher.profile.lastName}`
        : a.teacher.email,
      section: a.section,
    })),
  }));

  const mappedTeachers = teachers.map((t) => ({
    id: t.id,
    name: t.profile ? `Dr. ${t.profile.firstName} ${t.profile.lastName}` : t.email,
    email: t.email,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/admin"
          className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
        </Link>
        <h1 className="text-xl font-bold text-[#0B2545]">Curriculum & Academic Structure Management</h1>
        <p className="text-xs text-slate-500">
          Maintain institutional departments, degree programs, course rosters, and semester faculty allocations.
        </p>
      </div>

      <CurriculumManager
        departments={departments}
        programs={programs}
        courses={mappedCourses}
        teachers={mappedTeachers}
      />
    </div>
  );
}
