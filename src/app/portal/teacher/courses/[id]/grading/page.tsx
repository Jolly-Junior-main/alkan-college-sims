import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GradeSheetTable } from "./grade-sheet-table";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";

export default async function CourseGradingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const { id: courseId } = await params;

  // Verify course assignment
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      department: true,
      assignments: {
        where: { teacherId: session.userId },
      },
    },
  });

  if (!course) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-xs border">
        <h2 className="text-lg font-bold text-slate-800">Course Not Found</h2>
      </div>
    );
  }

  // Fetch all students registered and approved for this course
  const registeredItems = await prisma.registrationItem.findMany({
    where: {
      courseId,
      registration: {
        status: "APPROVED",
      },
    },
    include: {
      registration: {
        include: {
          student: {
            include: {
              user: { include: { profile: true } },
            },
          },
        },
      },
    },
  });

  // Fetch current grade records for these students
  const grades = await prisma.grade.findMany({
    where: { courseId },
  });

  const gradeMap = new Map(grades.map((g) => [g.studentId, g]));

  const studentsList = registeredItems.map((item) => {
    const st = item.registration.student;
    const g = gradeMap.get(st.id);
    const fullName = st.user.profile
      ? `${st.user.profile.firstName} ${st.user.profile.lastName}`
      : st.user.email;

    return {
      studentProfileId: st.id,
      studentIdNumber: st.studentIdNumber,
      fullName,
      gradeId: g?.id,
      initialAssessment: g?.assessmentMarks || 0,
      initialExam: g?.examMarks || 0,
      currentStatus: g?.status || "NOT_STARTED",
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/portal/teacher"
            className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Faculty Overview
          </Link>
          <h1 className="text-xl font-bold text-[#0B2545]">
            Grade Sheet Engine: {course.code}
          </h1>
          <p className="text-xs text-slate-500">
            {course.title} • {course.creditHours} Credit Hours • Department of {course.department.name}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-lg border shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Double-blind Grade Security: Students cannot see unpublished drafts</span>
        </div>
      </div>

      <GradeSheetTable
        courseId={course.id}
        courseCode={course.code}
        courseTitle={course.title}
        students={studentsList}
      />
    </div>
  );
}
