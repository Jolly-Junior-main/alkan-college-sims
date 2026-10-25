"use client";

import { useState, useTransition } from "react";
import { saveGrades, submitGradeChangeRequest } from "@/actions/grading-actions";
import { computeGrade } from "@/lib/grade-calculator";
import {
  Save,
  Send,
  AlertCircle,
  CheckCircle2,
  Lock,
  RotateCcw,
  ShieldCheck,
  FileText,
} from "lucide-react";

interface StudentRow {
  studentProfileId: string;
  studentIdNumber: string;
  fullName: string;
  gradeId?: string;
  initialAssessment: number;
  initialExam: number;
  currentStatus: string;
}

interface GradeSheetTableProps {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  students: StudentRow[];
}

export function GradeSheetTable({
  courseId,
  courseCode,
  courseTitle,
  students,
}: GradeSheetTableProps) {
  const [grades, setGrades] = useState<Record<string, { assessment: number; exam: number }>>(
    () => {
      const init: Record<string, { assessment: number; exam: number }> = {};
      students.forEach((s) => {
        init[s.studentProfileId] = {
          assessment: s.initialAssessment || 0,
          exam: s.initialExam || 0,
        };
      });
      return init;
    }
  );

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State for Grade Change Request
  const [modalStudent, setModalStudent] = useState<StudentRow | null>(null);
  const [proposedScore, setProposedScore] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [modalPending, startModalTransition] = useTransition();

  // Determine overall course grading lock status
  const isCourseSubmittedOrPublished = students.some(
    (s) => s.currentStatus === "SUBMITTED" || s.currentStatus === "PUBLISHED"
  );

  function handleAssessmentChange(studentId: string, val: string) {
    const num = Math.max(0, Math.min(50, parseFloat(val) || 0));
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        assessment: num,
      },
    }));
  }

  function handleExamChange(studentId: string, val: string) {
    const num = Math.max(0, Math.min(50, parseFloat(val) || 0));
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        exam: num,
      },
    }));
  }

  function handleSave(mode: "DRAFT" | "SUBMIT") {
    setMessage(null);

    const entries = students.map((s) => ({
      studentId: s.studentProfileId,
      assessmentMarks: grades[s.studentProfileId]?.assessment || 0,
      examMarks: grades[s.studentProfileId]?.exam || 0,
    }));

    startTransition(async () => {
      const res = await saveGrades(courseId, entries, mode);
      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to update grades." });
      } else {
        setMessage({
          type: "success",
          text:
            mode === "SUBMIT"
              ? "Grade sheet submitted to Registrar Office successfully. Grade inputs are now locked."
              : "Grade sheet draft saved successfully. You may continue editing before final submission.",
        });
      }
    });
  }

  function handleOpenChangeModal(s: StudentRow) {
    const current = grades[s.studentProfileId];
    const total = (current?.assessment || 0) + (current?.exam || 0);
    setModalStudent(s);
    setProposedScore(total);
    setReason("");
  }

  function handleModalSubmit() {
    if (!modalStudent || !modalStudent.gradeId) {
      setMessage({ type: "error", text: "No existing grade record found to submit change request." });
      return;
    }

    startModalTransition(async () => {
      const res = await submitGradeChangeRequest(modalStudent.gradeId!, proposedScore, reason);
      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to submit request." });
      } else {
        setMessage({
          type: "success",
          text: `Grade correction request submitted for ${modalStudent.fullName}. Status: Pending Registrar Review.`,
        });
        setModalStudent(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Status */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded border">
              {courseCode}
            </span>
            <span className="text-sm font-bold text-slate-800">{courseTitle}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Two-component assessment model: Continuous Assessment (Max 50) + Final Exam (Max 50)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isCourseSubmittedOrPublished ? (
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-300">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Inputs Locked (Submitted / Published)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleSave("DRAFT")}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleSave("SUBMIT")}
                className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Registrar</span>
              </button>
            </div>
          )}
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

      {/* Grade Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4 text-center w-36">
                  Continuous Assessment
                  <div className="text-[10px] text-teal-300 font-normal">Max: 50.0</div>
                </th>
                <th className="py-3 px-4 text-center w-36">
                  Final Exam
                  <div className="text-[10px] text-teal-300 font-normal">Max: 50.0</div>
                </th>
                <th className="py-3 px-4 text-center w-28">
                  Total
                  <div className="text-[10px] text-teal-300 font-normal">100.0</div>
                </th>
                <th className="py-3 px-4 text-center w-24">Letter</th>
                <th className="py-3 px-4 text-center w-24">Points</th>
                <th className="py-3 px-4 text-center w-24">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s, idx) => {
                const current = grades[s.studentProfileId] || { assessment: 0, exam: 0 };
                const calc = computeGrade(current.assessment, current.exam);
                const isStudentLocked = isCourseSubmittedOrPublished;

                return (
                  <tr key={s.studentProfileId} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">{s.studentIdNumber}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{s.fullName}</td>

                    {/* Continuous Assessment Input */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.5"
                        disabled={isStudentLocked}
                        value={current.assessment}
                        onChange={(e) => handleAssessmentChange(s.studentProfileId, e.target.value)}
                        className="w-24 text-center py-1.5 px-2 border rounded font-mono font-bold text-slate-900 focus:ring-2 focus:ring-[#007A78] disabled:bg-slate-100 disabled:text-slate-500"
                      />
                    </td>

                    {/* Final Exam Input */}
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.5"
                        disabled={isStudentLocked}
                        value={current.exam}
                        onChange={(e) => handleExamChange(s.studentProfileId, e.target.value)}
                        className="w-24 text-center py-1.5 px-2 border rounded font-mono font-bold text-slate-900 focus:ring-2 focus:ring-[#007A78] disabled:bg-slate-100 disabled:text-slate-500"
                      />
                    </td>

                    {/* Calculated Total */}
                    <td className="py-3 px-4 text-center font-bold text-slate-900 font-mono text-sm">
                      {calc.totalMarks.toFixed(1)}
                    </td>

                    {/* Letter Grade */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded font-black text-xs ${
                          calc.isPass
                            ? "bg-teal-50 text-teal-800 border border-teal-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {calc.letterGrade}
                      </span>
                    </td>

                    {/* Grade Point */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                      {calc.gradePoint.toFixed(2)}
                    </td>

                    {/* Pass/Fail Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[11px] font-bold ${
                          calc.isPass ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {calc.isPass ? "PASS" : "FAIL"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      {isCourseSubmittedOrPublished && (
                        <button
                          type="button"
                          onClick={() => handleOpenChangeModal(s)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#007A78] hover:underline"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Request Correction</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Change Request Modal Dialog */}
      {modalStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b pb-3">
              <RotateCcw className="w-5 h-5 text-[#007A78]" />
              <span>Official Grade Correction Request</span>
            </div>

            <div className="text-xs text-slate-600">
              <p>
                Student: <strong className="text-slate-900">{modalStudent.fullName}</strong> ({modalStudent.studentIdNumber})
              </p>
              <p className="mt-1">
                Course: <strong>{courseCode} - {courseTitle}</strong>
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Proposed Total Marks (0 - 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={proposedScore}
                  onChange={(e) => setProposedScore(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border rounded-lg font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Justification & Academic Rationale
                </label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why this grade is being revised (e.g. laboratory report recount, exam remarking rubric correction)..."
                  className="w-full p-2 border rounded-lg text-slate-900 focus:ring-2 focus:ring-[#007A78]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setModalStudent(null)}
                className="px-4 py-2 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={modalPending || !reason || reason.trim().length < 5}
                onClick={handleModalSubmit}
                className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow disabled:opacity-50"
              >
                {modalPending ? "Submitting Request..." : "Submit to Registrar Queue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
