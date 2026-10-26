import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RegistrationForm } from "./registration-form";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default async function StudentRegistrationPage() {
  const session = await getSession();
  const userId = session?.userId;

  const student = userId
    ? await prisma.studentProfile.findFirst({
        where: { userId },
        include: {
          program: { include: { department: true } },
        },
      })
    : await prisma.studentProfile.findFirst({
        include: {
          program: { include: { department: true } },
        },
      });

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-xs border">
        <h2 className="text-lg font-bold text-slate-800">Student Profile Not Linked</h2>
      </div>
    );
  }

  // Fetch available curriculum courses for the program department + common health courses
  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { departmentId: student.program.departmentId },
        { semester: student.currentSemester },
      ],
    },
    include: { department: true },
    orderBy: { code: "asc" },
  });

  // Fetch current registration if existing
  const currentReg = await prisma.courseRegistration.findFirst({
    where: {
      studentId: student.id,
      academicYear: student.academicYear,
      semester: student.currentSemester,
    },
    include: { items: true },
  });

  const initialSelectedIds = currentReg ? currentReg.items.map((i) => i.courseId) : [];
  const currentStatus = (currentReg ? currentReg.status : "NONE") as "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "NONE";

  const mappedCourses = courses.map((c) => ({
    id: c.id,
    code: c.code,
    title: c.title,
    creditHours: c.creditHours,
    lectureHours: c.lectureHours,
    labHours: c.labHours,
    departmentName: c.department.name,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/portal/student"
            className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#0B2545]">Semester Course Registration</h1>
          <p className="text-xs text-slate-500">
            {student.program.name} • Academic Year {student.academicYear}, Semester {student.currentSemester}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-lg border shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Curriculum Credit Rule: 12 to 22 Credit Hours</span>
        </div>
      </div>

      <RegistrationForm
        studentProfileId={student.id}
        availableCourses={mappedCourses}
        initialSelectedCourseIds={initialSelectedIds}
        currentStatus={currentStatus}
        academicYear={student.academicYear}
        semester={student.currentSemester}
      />
    </div>
  );
}
