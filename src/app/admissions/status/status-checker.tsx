"use client";

import { useState, useTransition } from "react";
import { lookupApplicationStatus } from "@/actions/admissions-actions";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function StatusChecker() {
  const [refNo, setRefNo] = useState("HC-2026-1001");
  const [email, setEmail] = useState("dawit.haile@gmail.com");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    startTransition(async () => {
      const res = await lookupApplicationStatus(refNo, email);
      if (!res.success) {
        setError(res.error || "Failed to locate application.");
      } else {
        setResult(res.application);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4"
      >
        <div className="text-sm font-bold text-[#0B2545]">
          Query Application Records
        </div>
        <p className="text-xs text-slate-500">
          Enter your Application Reference Number (e.g. <code>HC-2026-1001</code>) and the email address used during submission.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Application Reference Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. HC-2026-1001"
              value={refNo}
              onChange={(e) => setRefNo(e.target.value)}
              className="w-full p-2.5 border rounded-lg font-mono font-bold uppercase text-slate-900 focus:ring-2 focus:ring-[#007A78]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Applicant Registered Email
            </label>
            <input
              type="email"
              required
              placeholder="e.g. dawit.haile@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border rounded-lg text-slate-900 focus:ring-2 focus:ring-[#007A78]"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-[11px] text-slate-400">
            Demo quick test: <span className="font-mono text-teal-700 font-bold">HC-2026-1001 / dawit.haile@gmail.com</span>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isPending ? "Checking Records..." : "Check Status"}</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2.5 py-1 rounded border">
                {result.referenceNo}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">{result.applicantName}</h2>
              <p className="text-xs text-slate-500">
                Applied for: <strong className="text-slate-800">{result.programName}</strong> ({result.departmentName})
              </p>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  result.status === "APPROVED"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : result.status === "SUBMITTED"
                    ? "bg-blue-50 text-blue-800 border-blue-300"
                    : result.status === "UNDER_REVIEW"
                    ? "bg-amber-50 text-amber-800 border-amber-300"
                    : "bg-red-50 text-red-800 border-red-300"
                }`}
              >
                {result.status === "APPROVED" && <CheckCircle2 className="w-4 h-4" />}
                {result.status === "SUBMITTED" && <Clock className="w-4 h-4" />}
                {result.status === "UNDER_REVIEW" && <Clock className="w-4 h-4" />}
                {result.status === "REJECTED" && <AlertCircle className="w-4 h-4" />}
                <span>{result.status.replace("_", " ")}</span>
              </span>
              <div className="text-[11px] text-slate-400 mt-1">
                Submitted on {new Date(result.submittedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Status Explanation */}
          <div className="p-4 rounded-xl bg-slate-50 border text-xs text-slate-700 leading-relaxed">
            {result.status === "APPROVED" && (
              <div className="space-y-2">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Congratulations! Your admission has been cleared by the Registrar.</span>
                </div>
                <p>
                  Your formal student record has been provisioned. Please check your email or proceed to the Student Portal Login to access your matriculation profile and register for Semester I courses.
                </p>
                <div className="pt-2">
                  <Link
                    href="/portal/login"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#007A78] text-white font-bold"
                  >
                    <span>Proceed to Student Portal Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {result.status === "SUBMITTED" && (
              <div>
                <strong className="text-blue-900">Application Awaiting Registrar Evaluation:</strong>
                <p className="mt-1">
                  Your admission files and national examination transcripts have been received and are currently queued for verification by the Health Sciences Admissions Committee.
                </p>
              </div>
            )}

            {result.status === "UNDER_REVIEW" && (
              <div>
                <strong className="text-amber-900">Application Under Committee Review:</strong>
                <p className="mt-1">
                  The faculty admissions board is currently verifying your prerequisite course grades.
                  {result.reviewNotes && (
                    <span className="block mt-1 font-semibold text-amber-800">
                      Committee Remark: &quot;{result.reviewNotes}&quot;
                    </span>
                  )}
                </p>
              </div>
            )}

            {result.status === "REJECTED" && (
              <div>
                <strong className="text-red-900">Admission Decision: Not Admitted</strong>
                <p className="mt-1">
                  We regret to inform you that your application did not meet the required threshold for this admission intake.
                  {result.reviewNotes && (
                    <span className="block mt-1 text-red-700">
                      Reason: {result.reviewNotes}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
