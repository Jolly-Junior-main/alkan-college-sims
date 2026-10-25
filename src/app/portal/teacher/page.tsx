import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  BookOpen,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default async function TeacherDashboardPage() {
  const session = await getSession();
  if (!session) return null;

  // Fetch teaching assignments for this instructor
  const assignments = await prisma.courseAssignment.findMany({
    where: { teacherId: session.userId },
    include: {
      course: {
        include: {
          department: true,
          registeredItems: {
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
          },
          grades: true,
        },
      },
    },
  });

  // Calculate stats
  const totalCourses = assignments.length;
  let totalEnrolled = 0;
  let totalSubmittedGrades = 0;
  let totalPublishedGrades = 0;

  assignments.forEach((a) => {
    // Approved registrations enrolled in this course
    const enrolledStudents = a.course.registeredItems.filter(
      (ri) => ri.registration.status === "APPROVED"
    );
    totalEnrolled += enrolledStudents.length;

    a.course.grades.forEach((g) => {
      if (g.status === "SUBMITTED") totalSubmittedGrades++;
      if (g.status === "PUBLISHED") totalPublishedGrades++;
    });
  });

  // Fetch instructor's pending change requests
  const pendingRequests = await prisma.gradeChangeRequest.findMany({
    where: { requestedById: session.userId },
    include: { grade: { include: { course: true, student: { include: { user: { include: { profile: true } } } } } } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] rounded-xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
            Faculty Teaching & Grading Portal
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Welcome, {session.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Academic Faculty • Academic Year 2026/2027 Semester I Section Allocations
          </p>
        </div>

        <Link
          href="/portal/teacher/requests"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-amber-300" />
          <span>Correction Requests ({pendingRequests.length})</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Assigned Course Sections
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {totalCourses} <span className="text-xs font-normal text-slate-400">Sections</span>
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">
              Active semester teaching load
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#134074] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Enrolled Students
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {totalEnrolled} <span className="text-xs font-normal text-slate-400">Students</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Across all assigned lectures & labs
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-teal-50 text-[#007A78] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Published Grades
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {totalPublishedGrades} <span className="text-xs font-normal text-slate-400">Records</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">
              Verified by Registrar Office
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Assigned Courses Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-[#0B2545]">Active Semester Course Allocations</h2>
            <p className="text-xs text-slate-500">
              Access the live Grade Sheet Engine to record Continuous Assessment (50) and Final Exam (50) marks.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Course Code</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4 text-center">Section</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Enrolled Students</th>
                <th className="py-3 px-4 text-center">Grading Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignments.map((a) => {
                const c = a.course;
                // Enrolled students whose registrations are approved
                const enrolled = c.registeredItems.filter(
                  (ri) => ri.registration.status === "APPROVED"
                ).length;

                // Status of grades in this course
                const hasPublished = c.grades.some((g) => g.status === "PUBLISHED");
                const hasSubmitted = c.grades.some((g) => g.status === "SUBMITTED");
                const hasDraft = c.grades.some((g) => g.status === "DRAFT");

                let statusBadge = (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    Not Started
                  </span>
                );

                if (hasPublished) {
                  statusBadge = (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                      Published
                    </span>
                  );
                } else if (hasSubmitted) {
                  statusBadge = (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                      Submitted to Registrar
                    </span>
                  );
                } else if (hasDraft) {
                  statusBadge = (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                      Draft In Progress
                    </span>
                  );
                }

                return (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545]">{c.code}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">{c.title}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-600">{a.section}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">{c.creditHours}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#007A78]">{enrolled}</td>
                    <td className="py-3.5 px-4 text-center">{statusBadge}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/portal/teacher/courses/${c.id}/grading`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#007A78] hover:bg-[#00605E] text-white font-semibold text-xs transition-all shadow-2xs"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Open Grade Sheet</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
