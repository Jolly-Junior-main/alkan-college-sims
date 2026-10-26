import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GradeChangeQueue } from "./grade-change-queue";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function RegistrarGradeChangesPage() {
  const session = await getSession();

  const requests = await prisma.gradeChangeRequest.findMany({
    include: {
      requestedBy: { include: { profile: true } },
      grade: {
        include: {
          course: true,
          student: {
            include: {
              user: { include: { profile: true } },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const mapped = requests.map((r) => {
    const t = r.requestedBy.profile;
    const teacherName = t ? `Dr. ${t.firstName} ${t.lastName}` : r.requestedBy.email;

    const s = r.grade.student;
    const studentName = s.user.profile
      ? `${s.user.profile.firstName} ${s.user.profile.lastName}`
      : s.user.email;

    return {
      id: r.id,
      previousMarks: r.previousTotalMarks,
      proposedMarks: r.proposedTotalMarks,
      reason: r.reason,
      status: r.status as "PENDING" | "APPROVED" | "REJECTED",
      createdAt: r.createdAt.toISOString(),
      auditNote: r.auditNote,
      teacherName,
      teacherEmail: r.requestedBy.email,
      studentIdNumber: s.studentIdNumber,
      studentName,
      courseCode: r.grade.course.code,
      courseTitle: r.grade.course.title,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/registrar"
          className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Registrar Operations
        </Link>
        <h1 className="text-xl font-bold text-[#0B2545]">Grade Change Audit & Review Queue</h1>
        <p className="text-xs text-slate-500">
          Independent verification desk for post-submission grade corrections with immutable audit recording.
        </p>
      </div>

      <GradeChangeQueue requests={mapped} />
    </div>
  );
}
