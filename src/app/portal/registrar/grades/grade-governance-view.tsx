"use client";

import { useState, useTransition } from "react";
import { approveAndPublishCourseGrades } from "@/actions/grading-actions";
import {
  FileSpreadsheet,
  CheckCircle2,
  BarChart3,
  Check,
  Clock,
  AlertCircle,
  Eye,
  Lock,
} from "lucide-react";

interface CourseGradeSheet {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  departmentName: string;
  teacherName: string;
  submittedGradesCount: number;
  publishedGradesCount: number;
  draftGradesCount: number;
  allGradesCount: number;
  meanScore: number;
  stdDev: number;
  letterDistribution: Record<string, number>;
  students: {
    studentId: string;
    studentName: string;
    assessment: number;
    exam: number;
    total: number;
    letter: string;
    point: number;
    status: string;
  }[];
}

interface GradeGovernanceViewProps {
  courseSheets: CourseGradeSheet[];
}

export function GradeGovernanceView({ courseSheets }: GradeGovernanceViewProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courseSheets[0]?.courseId || ""
  );
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const activeSheet = courseSheets.find((c) => c.courseId === selectedCourseId) || courseSheets[0];

  function handleApprovePublish() {
    if (!activeSheet) return;
    setMessage(null);

    startTransition(async () => {
      const res = await approveAndPublishCourseGrades(activeSheet.courseId);
      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to publish grades." });
      } else {
        setMessage({
          type: "success",
          text: `Grades for ${activeSheet.courseCode} published successfully! Students can now view their official results and GPA.`,
        });
      }
    });
  }

  if (courseSheets.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
        <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-2" />
        <h3 className="font-bold text-sm text-slate-700">No Grade Sheets In Governance Queue</h3>
        <p className="text-xs text-slate-500 mt-1">
          Instructors have not yet submitted active course grade sheets.
        </p>
      </div>
    );
  }

  const hasSubmissionsToPublish = activeSheet?.submittedGradesCount > 0;
  const isAlreadyPublished = activeSheet?.publishedGradesCount > 0 && !hasSubmissionsToPublish;

  return (
    <div className="space-y-6">
      {/* Course Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {courseSheets.map((c) => {
          const isSelected = c.courseId === selectedCourseId;
          const hasPending = c.submittedGradesCount > 0;

          return (
            <button
              key={c.courseId}
              type="button"
              onClick={() => {
                setSelectedCourseId(c.courseId);
                setMessage(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border cursor-pointer ${
                isSelected
                  ? "bg-[#0B2545] text-white border-[#0B2545] shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{c.courseCode}</span>
              {hasPending && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>
          );
        })}
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

      {activeSheet && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded border">
                  {activeSheet.courseCode}
                </span>
                <h2 className="text-base font-bold text-slate-900">{activeSheet.courseTitle}</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Instructor: <strong className="text-slate-800">{activeSheet.teacherName}</strong> • {activeSheet.departmentName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {hasSubmissionsToPublish ? (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleApprovePublish}
                  className="px-5 py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isPending ? "Publishing Grades..." : `Approve & Publish (${activeSheet.submittedGradesCount} Records)`}
                  </span>
                </button>
              ) : isAlreadyPublished ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
                  <Check className="w-4 h-4" />
                  <span>Grades Fully Published to Student Portal</span>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  Awaiting instructor submission
                </div>
              )}
            </div>
          </div>

          {/* Institutional Distribution Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Class Mean Score</div>
              <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
                {activeSheet.meanScore.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
              <div className="text-[11px] text-teal-700 mt-0.5 font-medium">Standard Assessment Mean</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Standard Deviation (σ)</div>
              <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
                {activeSheet.stdDev.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Gaussian distribution spread</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Submitted Records</div>
              <div className="text-2xl font-extrabold text-amber-600 mt-1">
                {activeSheet.submittedGradesCount} <span className="text-xs font-normal text-slate-400">of {activeSheet.allGradesCount}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Ready for publication</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Published Records</div>
              <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                {activeSheet.publishedGradesCount} <span className="text-xs font-normal text-slate-400">Records</span>
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">Live on student transcripts</div>
            </div>
          </div>

          {/* Letter Grade Breakdown Pills */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-[#0B2545] mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <span>Letter Grade Distribution Breakdown</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(activeSheet.letterDistribution).map(([letter, count]) => (
                <div key={letter} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <span className="font-bold text-[#0B2545]">{letter}:</span>
                  <span className="font-semibold text-slate-700">{count} students</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Grade Sheet Matrix */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Roster Grade Verification Table
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B2545] text-white">
                  <tr>
                    <th className="py-2.5 px-4">Student ID</th>
                    <th className="py-2.5 px-4">Student Name</th>
                    <th className="py-2.5 px-4 text-center">Continuous Assessment (50)</th>
                    <th className="py-2.5 px-4 text-center">Final Exam (50)</th>
                    <th className="py-2.5 px-4 text-center">Total (100)</th>
                    <th className="py-2.5 px-4 text-center">Letter Grade</th>
                    <th className="py-2.5 px-4 text-center">Grade Point</th>
                    <th className="py-2.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeSheet.students.map((st) => (
                    <tr key={st.studentId} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">{st.studentId}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{st.studentName}</td>
                      <td className="py-3 px-4 text-center text-slate-700">{st.assessment.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center text-slate-700">{st.exam.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center font-bold text-slate-900">{st.total.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded font-black text-xs bg-slate-100 text-slate-800 border">
                          {st.letter}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                        {st.point.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                            st.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : st.status === "SUBMITTED"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : "bg-slate-100 text-slate-600 border-slate-300"
                          }`}
                        >
                          {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
