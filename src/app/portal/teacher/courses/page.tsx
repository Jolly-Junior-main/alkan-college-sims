import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, FileSpreadsheet, ArrowLeft } from "lucide-react";

export default async function TeacherCoursesDirectoryPage() {
  const session = await getSession();
  const teacherId = session?.userId;

  const assignments = await prisma.courseAssignment.findMany({
    where: teacherId ? { teacherId } : {},
    include: {
      course: {
        include: {
          department: true,
          registeredItems: {
            include: { registration: true },
          },
          grades: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link
            href="/portal/teacher"
            className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#0B2545]">My Assigned Course Sections</h1>
          <p className="text-xs text-slate-500">
            Official academic teaching allocations for Academic Year 2026/2027 Semester I
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((a) => {
          const c = a.course;
          const enrolled = c.registeredItems.filter((i) => i.registration.status === "APPROVED").length;

          return (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded border">
                    {c.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{c.title}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{c.department.name}</div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-700">
                  {a.section}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Credit Hours</div>
                  <div className="font-bold text-slate-800">{c.creditHours} hrs</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Lec / Lab</div>
                  <div className="font-bold text-slate-800">{c.lectureHours} / {c.labHours}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Enrolled</div>
                  <div className="font-bold text-[#007A78]">{enrolled} Students</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  href={`/portal/teacher/courses/${c.id}/grading`}
                  className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Open Grade Sheet Engine</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
