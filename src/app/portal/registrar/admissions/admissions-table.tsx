"use client";

import { useState, useTransition } from "react";
import { processApplicationDecision } from "@/actions/admissions-actions";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  FileText,
  UserCheck,
  Shield,
  KeyRound,
  ExternalLink,
} from "lucide-react";

interface ApplicationItem {
  id: string;
  referenceNo: string;
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    city: string;
  };
  academicHistory: {
    highSchool: string;
    completionYear: string;
    gpa: string;
    nationalExamScore: string;
  };
  programName: string;
  departmentName: string;
  documents: string[];
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  submittedAt: string;
  reviewNotes?: string | null;
}

interface AdmissionsTableProps {
  applications: ApplicationItem[];
}

export function AdmissionsTable({ applications }: AdmissionsTableProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [provisionResult, setProvisionResult] = useState<{
    email: string;
    studentIdNumber: string;
    temporaryPassword: string;
  } | null>(null);

  const filtered = applications.filter((app) => {
    if (filter === "ALL") return true;
    return app.status === filter;
  });

  function handleDecision(decision: "UNDER_REVIEW" | "APPROVED" | "REJECTED") {
    if (!selectedApp) return;

    startTransition(async () => {
      const res = await processApplicationDecision(selectedApp.id, decision, notes);
      if (res.success) {
        if (res.provisionedCredentials) {
          setProvisionResult(res.provisionedCredentials);
        }
        // Update local object status
        setSelectedApp({ ...selectedApp, status: decision, reviewNotes: notes });
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          {["ALL", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED"].map((st) => (
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
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-900">{filtered.length}</strong> applications
        </div>
      </div>

      {/* Provisioned Student Credentials Notice */}
      {provisionResult && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-5 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Matriculation Approved & Student Account Provisioned!</span>
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            The candidate has been officially admitted. A formal student record was created, an AAU-compliant student ID assigned, and portal credentials provisioned.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-white rounded-lg border border-emerald-200 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Assigned Student ID:</span>
              <div className="font-mono font-bold text-[#0B2545] text-sm">{provisionResult.studentIdNumber}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Portal Login Email:</span>
              <div className="font-bold text-slate-800">{provisionResult.email}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Temporary Password:</span>
              <div className="font-mono font-bold text-emerald-700 bg-slate-100 px-2 py-0.5 rounded inline-block">
                {provisionResult.temporaryPassword}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Applied Program</th>
                <th className="py-3 px-4 text-center">HS GPA</th>
                <th className="py-3 px-4 text-center">National Exam</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => {
                const name = `${app.personalInfo.firstName} ${app.personalInfo.lastName}`;

                const badge = {
                  SUBMITTED: "bg-blue-50 text-blue-800 border-blue-300",
                  UNDER_REVIEW: "bg-amber-50 text-amber-800 border-amber-300",
                  APPROVED: "bg-emerald-50 text-emerald-800 border-emerald-300",
                  REJECTED: "bg-red-50 text-red-800 border-red-300",
                }[app.status];

                return (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545]">
                      {app.referenceNo}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{name}</div>
                      <div className="text-[11px] text-slate-500">{app.personalInfo.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{app.programName}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {app.academicHistory.gpa}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-teal-700">
                      {app.academicHistory.nationalExamScore}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${badge}`}>
                        {app.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedApp(app);
                          setNotes(app.reviewNotes || "");
                          setProvisionResult(null);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[#0B2545] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect & Decide</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Inspector Drawer/Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {selectedApp.referenceNo}
                </span>
                <h3 className="text-lg font-bold text-[#0B2545] mt-1">
                  {selectedApp.personalInfo.firstName} {selectedApp.personalInfo.middleName} {selectedApp.personalInfo.lastName}
                </h3>
                <p className="text-xs text-slate-500">
                  Target Program: <strong className="text-slate-800">{selectedApp.programName}</strong> ({selectedApp.departmentName})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Applicant Details Matrix */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border">
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">Personal Information</div>
                <div className="space-y-1">
                  <div>Email: <strong className="text-slate-800">{selectedApp.personalInfo.email}</strong></div>
                  <div>Phone: <strong className="text-slate-800">{selectedApp.personalInfo.phone}</strong></div>
                  <div>Gender: <strong className="text-slate-800">{selectedApp.personalInfo.gender}</strong></div>
                  <div>City: <strong className="text-slate-800">{selectedApp.personalInfo.city}</strong></div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border">
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">Academic Credentials</div>
                <div className="space-y-1">
                  <div>High School: <strong className="text-slate-800">{selectedApp.academicHistory.highSchool}</strong></div>
                  <div>Completion Year: <strong className="text-slate-800">{selectedApp.academicHistory.completionYear}</strong></div>
                  <div>Grade 12 GPA: <strong className="text-emerald-700">{selectedApp.academicHistory.gpa} / 4.00</strong></div>
                  <div>National Exam: <strong className="text-teal-700 font-bold">{selectedApp.academicHistory.nationalExamScore}</strong></div>
                </div>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">Submitted Supporting Documents</div>
              <div className="flex flex-wrap gap-2">
                {selectedApp.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={doc}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-[#007A78]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Document #{i + 1}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Registrar Review Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registrar Committee Review Notes & Assessment
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter evaluation notes (e.g. Meets laboratory and biology prerequisite benchmarks)..."
                className="w-full text-xs p-2.5 border rounded-lg text-slate-900 focus:ring-2 focus:ring-[#007A78]"
              />
            </div>

            {/* Decision Controls */}
            <div className="pt-4 border-t flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-slate-500">
                Current Status: <strong className="text-slate-900">{selectedApp.status}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDecision("REJECTED")}
                  className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 cursor-pointer disabled:opacity-50"
                >
                  Reject Application
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDecision("UNDER_REVIEW")}
                  className="px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 cursor-pointer disabled:opacity-50"
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDecision("APPROVED")}
                  className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white font-bold text-xs shadow transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Approve & Provision Student</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
