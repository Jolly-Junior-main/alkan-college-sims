"use client";

import { useState, useTransition } from "react";
import {
  clearStudentRegistration,
  clearAllPendingRegistrations,
} from "@/actions/registration-actions";
import {
  CheckCircle2,
  XCircle,
  FileCheck,
  CheckCheck,
  Clock,
  BookOpen,
  AlertCircle,
} from "lucide-react";

interface RegistrationBatch {
  id: string;
  studentIdNumber: string;
  studentName: string;
  programName: string;
  academicYear: string;
  semester: number;
  totalCredits: number;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";
  submittedAt: string;
  courses: {
    code: string;
    title: string;
    creditHours: number;
  }[];
}

interface RegistrationClearanceProps {
  batches: RegistrationBatch[];
}

export function RegistrationClearance({ batches }: RegistrationClearanceProps) {
  const [filter, setFilter] = useState<string>("SUBMITTED");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const filtered = batches.filter((b) => {
    if (filter === "ALL") return true;
    return b.status === filter;
  });

  const pendingCount = batches.filter((b) => b.status === "SUBMITTED").length;

  function handleDecision(regId: string, decision: "APPROVED" | "REJECTED") {
    setMessage(null);
    startTransition(async () => {
      const res = await clearStudentRegistration(regId, decision);
      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to clear registration." });
      } else {
        setMessage({
          type: "success",
          text: `Registration marked as ${decision}. Student cleared for academic term.`,
        });
      }
    });
  }

  function handleApproveAll() {
    setMessage(null);
    startTransition(async () => {
      const res = await clearAllPendingRegistrations();
      if (!res.success) {
        setMessage({ type: "error", text: "Failed to batch approve registrations." });
      } else {
        setMessage({
          type: "success",
          text: `Batch cleared successfully! ${res.count} course registrations approved.`,
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {["SUBMITTED", "APPROVED", "REJECTED", "ALL"].map((st) => (
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
              {st === "SUBMITTED" ? `Pending Clearance (${pendingCount})` : st}
            </button>
          ))}
        </div>

        {pendingCount > 0 && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleApproveAll}
            className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            <span>1-Click Approve All ({pendingCount} Batches)</span>
          </button>
        )}
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

      {/* Batches List */}
      <div className="space-y-4">
        {filtered.map((batch) => {
          const isPendingItem = batch.status === "SUBMITTED";

          return (
            <div
              key={batch.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded border">
                      {batch.studentIdNumber}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{batch.studentName}</h3>
                    <span className="text-xs text-slate-500">• {batch.programName}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Academic Year {batch.academicYear}, Semester {batch.semester} • Submitted: {new Date(batch.submittedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Credits</div>
                    <div className="font-extrabold text-sm text-teal-800">{batch.totalCredits} Credit Hours</div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold border ${
                      batch.status === "APPROVED"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : batch.status === "SUBMITTED"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {batch.status === "SUBMITTED" ? "Pending Clearance" : batch.status}
                  </span>
                </div>
              </div>

              {/* Course Chips */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">
                  Enrolled Course Curriculum:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {batch.courses.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#0B2545] mr-1.5">{c.code}</span>
                        <span className="text-slate-800 font-medium">{c.title}</span>
                      </div>
                      <span className="font-bold text-slate-600 shrink-0 ml-2">{c.creditHours} cr</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clearance Controls */}
              {isPendingItem && (
                <div className="flex justify-end items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDecision(batch.id, "REJECTED")}
                    className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold cursor-pointer disabled:opacity-50"
                  >
                    Flag for Academic Revision
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDecision(batch.id, "APPROVED")}
                    className="px-4 py-1.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Clearance</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <FileCheck className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-slate-700">No Registrations in this View</h3>
            <p className="text-xs text-slate-500 mt-1">All student registration queues are up to date.</p>
          </div>
        )}
      </div>
    </div>
  );
}
