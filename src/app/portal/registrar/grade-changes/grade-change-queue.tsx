"use client";

import { useState, useTransition } from "react";
import { processGradeChangeDecision } from "@/actions/grading-actions";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  FileText,
  RotateCcw,
} from "lucide-react";

interface RequestItem {
  id: string;
  previousMarks: number;
  proposedMarks: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  auditNote?: string | null;
  teacherName: string;
  teacherEmail: string;
  studentIdNumber: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
}

interface GradeChangeQueueProps {
  requests: RequestItem[];
}

export function GradeChangeQueue({ requests }: GradeChangeQueueProps) {
  const [filter, setFilter] = useState<string>("PENDING");
  const [selectedReq, setSelectedReq] = useState<RequestItem | null>(null);
  const [auditNote, setAuditNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filtered = requests.filter((r) => {
    if (filter === "ALL") return true;
    return r.status === filter;
  });

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;

  function handleDecision(requestId: string, decision: "APPROVED" | "REJECTED") {
    setMessage(null);
    startTransition(async () => {
      const res = await processGradeChangeDecision(requestId, decision, auditNote);
      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to process decision." });
      } else {
        setMessage({
          type: "success",
          text: `Grade change request marked as ${decision}. Immutable audit trail updated.`,
        });
        setSelectedReq(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div className="flex items-center gap-2">
          {["PENDING", "APPROVED", "REJECTED", "ALL"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === st
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "PENDING" ? `Pending Review (${pendingCount})` : st}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 border ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Requesting Faculty</th>
                <th className="py-3 px-4 text-center">Previous</th>
                <th className="py-3 px-4 text-center">Proposed</th>
                <th className="py-3 px-4">Justification Reason</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545]">{req.courseCode}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{req.studentName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{req.studentIdNumber}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{req.teacherName}</div>
                    <div className="text-[11px] text-slate-500">{req.teacherEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                    {req.previousMarks.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#007A78] text-sm">
                    {req.proposedMarks.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={req.reason}>
                    {req.reason}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                        req.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : req.status === "PENDING"
                          ? "bg-amber-50 text-amber-800 border-amber-300"
                          : "bg-red-50 text-red-800 border-red-300"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {req.status === "PENDING" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReq(req);
                          setAuditNote("");
                        }}
                        className="px-3 py-1.5 rounded-md bg-[#007A78] hover:bg-[#00605E] text-white font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No requests found in this queue.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b pb-3">
              <RotateCcw className="w-5 h-5 text-[#007A78]" />
              <span>Review Grade Correction Petition</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border text-xs space-y-1.5">
              <div>
                Course: <strong className="text-[#0B2545]">{selectedReq.courseCode} - {selectedReq.courseTitle}</strong>
              </div>
              <div>
                Student: <strong>{selectedReq.studentName}</strong> ({selectedReq.studentIdNumber})
              </div>
              <div>
                Requesting Faculty: <strong>{selectedReq.teacherName}</strong>
              </div>
              <div className="pt-2 border-t flex justify-between items-center text-sm">
                <span>
                  Current Marks: <strong className="text-slate-700">{selectedReq.previousMarks.toFixed(1)}</strong>
                </span>
                <span>→</span>
                <span>
                  Proposed Marks: <strong className="text-[#007A78] font-mono">{selectedReq.proposedMarks.toFixed(1)}</strong>
                </span>
              </div>
            </div>

            <div className="text-xs">
              <div className="font-bold text-slate-700 mb-1">Faculty Justification:</div>
              <div className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg text-slate-800 leading-relaxed italic">
                &quot;{selectedReq.reason}&quot;
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="block font-semibold text-slate-700">
                Registrar Audit Note / Remark:
              </label>
              <textarea
                rows={2}
                value={auditNote}
                onChange={(e) => setAuditNote(e.target.value)}
                placeholder="Enter formal justification for recording into immutable audit trail..."
                className="w-full p-2 border rounded-lg text-slate-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setSelectedReq(null)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDecision(selectedReq.id, "REJECTED")}
                className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 disabled:opacity-50"
              >
                Deny Request
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDecision(selectedReq.id, "APPROVED")}
                className="px-4 py-1.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white font-bold text-xs shadow disabled:opacity-50"
              >
                Approve & Update Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
