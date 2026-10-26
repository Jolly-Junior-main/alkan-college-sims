import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  GraduationCap,
  ClipboardList,
  Award,
  BookOpen,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bell,
  Download,
} from "lucide-react";
import { computeGPA } from "@/lib/grade-calculator";

export default async function StudentDashboardPage() {
  const session = await getSession();
  const userId = session?.userId;

  const student = userId
    ? await prisma.studentProfile.findFirst({
        where: { userId },
        include: {
          program: { include: { department: true } },
          user: { include: { profile: true } },
        },
      })
    : await prisma.studentProfile.findFirst({
        include: {
          program: { include: { department: true } },
          user: { include: { profile: true } },
        },
      });

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-xs border">
        <h2 className="text-lg font-bold text-slate-800">No Student Profile Linked</h2>
        <p className="text-xs text-slate-500 mt-2">
          Your account is authenticated as STUDENT, but no academic matriculation profile was found. Please contact the Registrar.
        </p>
      </div>
    );
  }

  // Fetch Published grades for GPA calculation
  const publishedGrades = await prisma.grade.findMany({
    where: {
      studentId: student.id,
      status: "PUBLISHED",
    },
    include: {
      course: true,
    },
  });

  const gradeItems = publishedGrades.map((g) => ({
    creditHours: g.course.creditHours,
    gradePoint: g.gradePoint,
  }));

  const { gpa: cgpa, totalCredits: completedCredits } = computeGPA(gradeItems);

  // Fetch current semester registration
  const currentRegistration = await prisma.courseRegistration.findFirst({
    where: {
      studentId: student.id,
      academicYear: student.academicYear,
      semester: student.currentSemester,
    },
    include: {
      items: {
        include: {
          course: {
            include: {
              assignments: {
                include: {
                  teacher: { include: { profile: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  const registeredCredits =
    currentRegistration?.items.reduce((sum, item) => sum + item.course.creditHours, 0) || 0;

  // Fetch announcements
  const announcements = await prisma.announcement.findMany({
    where: {
      OR: [
        { targetRoles: { contains: "STUDENT" } },
        { targetRoles: { contains: "ALL" } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const statusBadges: Record<string, { label: string; bg: string; text: string; icon: React.ElementType }> = {
    DRAFT: { label: "Draft (Unsubmitted)", bg: "bg-slate-100 border-slate-300", text: "text-slate-700", icon: Clock },
    SUBMITTED: { label: "Pending Registrar Clearance", bg: "bg-amber-50 border-amber-300", text: "text-amber-800", icon: Clock },
    APPROVED: { label: "Registration Cleared & Approved", bg: "bg-emerald-50 border-emerald-300", text: "text-emerald-800", icon: CheckCircle2 },
    REJECTED: { label: "Flagged for Academic Revision", bg: "bg-red-50 border-red-300", text: "text-red-800", icon: AlertCircle },
  };

  const regStatus = currentRegistration
    ? statusBadges[currentRegistration.status] || statusBadges.DRAFT
    : null;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] rounded-xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
            Student Academic Workspace
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Welcome back, {student.user.profile?.firstName} {student.user.profile?.lastName}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {student.program.name} • Matriculation ID: <span className="font-mono text-teal-300 font-semibold">{student.studentIdNumber}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/student/registration"
            className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-semibold shadow transition-all flex items-center gap-2"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Semester Registration</span>
          </Link>
          <Link
            href="/portal/student/grades"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>View Transcript</span>
          </Link>
        </div>
      </div>

      {/* Academic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CGPA */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Cumulative GPA (CGPA)
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {cgpa.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 4.00</span>
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">
              Based on {completedCredits} published credits
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-teal-50 text-[#007A78] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Registered Credits */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Semester Credits
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {registeredCredits} <span className="text-xs font-normal text-slate-400">Credit Hours</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Semester {student.currentSemester} Load ({currentRegistration?.items.length || 0} Courses)
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#134074] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Curriculum Progress */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Curriculum Completion
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {Math.min(100, Math.round((completedCredits / student.program.totalCreditsRequired) * 100))}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {completedCredits} of {student.program.totalCreditsRequired} credits finished
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Registration Clearance Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Registration Clearance
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {regStatus ? regStatus.label : "Not Registered"}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {currentRegistration ? `Academic Year ${student.academicYear}` : "Action required"}
            </div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ClipboardList className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Registered Schedule Preview & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Semester Schedule Preview */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0B2545]">Current Semester Course Roster</h2>
              <p className="text-xs text-slate-500">
                Official approved and registered courses for Academic Year {student.academicYear}, Semester {student.currentSemester}
              </p>
            </div>
            <Link
              href="/portal/student/registration"
              className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1"
            >
              <span>Manage Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {currentRegistration && currentRegistration.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Course Code</th>
                    <th className="py-2.5 px-3">Course Title</th>
                    <th className="py-2.5 px-3 text-center">Cr. Hrs</th>
                    <th className="py-2.5 px-3 text-center">Lec/Lab</th>
                    <th className="py-2.5 px-3">Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentRegistration.items.map((item) => {
                    const c = item.course;
                    const teacher = c.assignments[0]?.teacher?.profile;
                    const teacherName = teacher ? `Dr. ${teacher.firstName} ${teacher.lastName}` : "Faculty Assigned";

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3 font-mono font-bold text-[#0B2545]">{c.code}</td>
                        <td className="py-3 px-3 font-medium text-slate-900">{c.title}</td>
                        <td className="py-3 px-3 text-center font-bold text-slate-700">{c.creditHours}</td>
                        <td className="py-3 px-3 text-center text-slate-500">{c.lectureHours} / {c.labHours}</td>
                        <td className="py-3 px-3 text-slate-700">{teacherName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <ClipboardList className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No active course registrations found</p>
              <p className="text-[11px] text-slate-500 mt-1 mb-3">
                You have not registered for Academic Year {student.academicYear} Semester {student.currentSemester}.
              </p>
              <Link
                href="/portal/student/registration"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#007A78] text-white text-xs font-semibold"
              >
                Start Semester Registration →
              </Link>
            </div>
          )}
        </div>

        {/* Official College Bulletin */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="w-4 h-4 text-[#007A78]" />
            <h3 className="font-bold text-sm text-[#0B2545]">Official Notices & Bulletin</h3>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                  {ann.isPinned && (
                    <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                      OFFICIAL
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-xs text-slate-800 leading-snug">{ann.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/announcements"
              className="text-xs text-[#007A78] font-semibold hover:underline block text-center"
            >
              View All Campus Announcements →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
