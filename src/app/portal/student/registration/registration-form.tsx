"use client";

import { useState, useTransition } from "react";
import { submitStudentRegistration } from "@/actions/registration-actions";
import { CheckCircle2, Clock, AlertCircle, ShieldAlert, ArrowRight } from "lucide-react";

interface CourseOption {
  id: string;
  code: string;
  title: string;
  creditHours: number;
  lectureHours: number;
  labHours: number;
  departmentName: string;
}

interface RegistrationFormProps {
  studentProfileId: string;
  availableCourses: CourseOption[];
  initialSelectedCourseIds: string[];
  currentStatus: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "NONE";
  academicYear: string;
  semester: number;
}

export function RegistrationForm({
  studentProfileId,
  availableCourses,
  initialSelectedCourseIds,
  currentStatus,
  academicYear,
  semester,
}: RegistrationFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedCourseIds);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [status, setStatus] = useState(currentStatus);

  const totalCredits = availableCourses
    .filter((c) => selectedIds.includes(c.id))
    .reduce((sum, c) => sum + c.creditHours, 0);

  const isValidLoad = totalCredits >= 12 && totalCredits <= 22;
  const isLocked = status === "APPROVED" || status === "SUBMITTED";

  function toggleCourse(id: string) {
    if (isLocked) return;
    setMessage(null);
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((cid) => cid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  function handleSelectAll() {
    if (isLocked) return;
    setSelectedIds(availableCourses.map((c) => c.id));
  }

  function handleClearAll() {
    if (isLocked) return;
    setSelectedIds([]);
  }

  function handleSubmit() {
    setMessage(null);
    if (totalCredits < 12) {
      setMessage({
        type: "error",
        text: `Credit boundary violation: Minimum 12 credit hours required. Current total: ${totalCredits} credits.`,
      });
      return;
    }
    if (totalCredits > 22) {
      setMessage({
        type: "error",
        text: `Credit boundary violation: Maximum 22 credit hours permitted per semester. Current total: ${totalCredits} credits.`,
      });
      return;
    }

    startTransition(async () => {
      const res = await submitStudentRegistration(studentProfileId, selectedIds);
      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to submit course registration." });
      } else {
        setStatus("SUBMITTED");
        setMessage({
          type: "success",
          text: "Registration batch submitted successfully to Registrar Office. Status: Pending Clearance.",
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Registration Lifecycle State
          </div>
          <div className="flex items-center gap-2 mt-1">
            {status === "APPROVED" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clearance Approved (Enrollment Finalized)
              </span>
            )}
            {status === "SUBMITTED" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                <Clock className="w-3.5 h-3.5" /> Pending Registrar Clearance
              </span>
            )}
            {status === "DRAFT" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                <Clock className="w-3.5 h-3.5" /> Draft (Unsubmitted)
              </span>
            )}
            {status === "REJECTED" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-800 border border-red-300">
                <AlertCircle className="w-3.5 h-3.5" /> Flagged for Academic Revision
              </span>
            )}
            {status === "NONE" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-300">
                Not Yet Initiated
              </span>
            )}
          </div>
        </div>

        {/* Credit Meter */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Selected Credit Hours:</div>
            <div className={`text-xl font-extrabold ${isValidLoad ? "text-emerald-700" : "text-amber-600"}`}>
              {totalCredits} <span className="text-xs font-normal text-slate-400">/ 12 - 22 cr. hrs</span>
            </div>
          </div>
          <div className={`px-2.5 py-1.5 rounded text-xs font-bold border ${isValidLoad ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
            {isValidLoad ? "Valid Load" : totalCredits < 12 ? "Under minimum" : "Over limit"}
          </div>
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
            <ShieldAlert className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Courses Selection Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-[#0B2545]">
              Pre-Matched Curriculum Roster (Academic Year {academicYear}, Semester {semester})
            </h3>
            <p className="text-[11px] text-slate-500">
              Select your required core and elective modules according to college credit boundaries (Min 12, Max 22).
            </p>
          </div>

          {!isLocked && (
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-2.5 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-2.5 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Select</th>
                <th className="py-3 px-4">Course Code</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4 text-center">Credit Hours</th>
                <th className="py-3 px-4 text-center">Lecture / Lab</th>
                <th className="py-3 px-4">Academic Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {availableCourses.map((c) => {
                const isSelected = selectedIds.includes(c.id);

                return (
                  <tr
                    key={c.id}
                    onClick={() => toggleCourse(c.id)}
                    className={`transition-colors ${
                      isLocked ? "cursor-default" : "cursor-pointer"
                    } ${
                      isSelected
                        ? "bg-teal-50/50 hover:bg-teal-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        disabled={isLocked}
                        checked={isSelected}
                        onChange={() => toggleCourse(c.id)}
                        className="rounded border-slate-300 text-[#007A78] focus:ring-[#007A78] w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">{c.code}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{c.title}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-800">{c.creditHours}</td>
                    <td className="py-3 px-4 text-center text-slate-500">
                      {c.lectureHours} hrs / {c.labHours} hrs
                    </td>
                    <td className="py-3 px-4 text-slate-600">{c.departmentName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-slate-600">
            Selected Courses: <span className="font-bold text-slate-900">{selectedIds.length}</span> | 
            Total Credits: <span className="font-bold text-[#0B2545]">{totalCredits}</span>
          </div>

          <div className="flex items-center gap-3">
            {isLocked ? (
              <div className="text-xs text-slate-500 italic flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>
                  {status === "APPROVED"
                    ? "Course registration is cleared and locked for this academic term."
                    : "Registration batch is submitted and queued in Registrar Clearance inbox."}
                </span>
              </div>
            ) : (
              <button
                type="button"
                disabled={isPending || !isValidLoad}
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isPending ? (
                  <span>Submitting to Registrar...</span>
                ) : (
                  <>
                    <span>Submit Registration Batch</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
