import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock } from "lucide-react";

export default async function TeacherRequestsPage() {
  const session = await getSession();
  if (!session) return null;

  const requests = await prisma.gradeChangeRequest.findMany({
    where: { requestedById: session.userId },
    include: {
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
          <h1 className="text-xl font-bold text-[#0B2545]">Grade Correction Requests Status</h1>
          <p className="text-xs text-slate-500">
            Track formal post-submission grade change requests undergoing Registrar review.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4 text-center">Previous Marks</th>
                <th className="py-3 px-4 text-center">Proposed Marks</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Registrar Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.length > 0 ? (
                requests.map((r) => {
                  const s = r.grade.student;
                  const studentName = s.user.profile
                    ? `${s.user.profile.firstName} ${s.user.profile.lastName}`
                    : s.user.email;

                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">
                        {r.grade.course.code}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {studentName} ({s.studentIdNumber})
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-slate-700">
                        {r.previousTotalMarks.toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-teal-700">
                        {r.proposedTotalMarks.toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs">{r.reason}</td>
                      <td className="py-3 px-4 text-center">
                        {r.status === "APPROVED" && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            Approved
                          </span>
                        )}
                        {r.status === "PENDING" && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                            Pending Review
                          </span>
                        )}
                        {r.status === "REJECTED" && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-800 border border-red-300">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 italic">{r.auditNote || "—"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    No grade correction requests initiated.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
