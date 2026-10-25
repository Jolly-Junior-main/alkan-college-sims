"use client";

import { useState, useTransition } from "react";
import {
  createDepartment,
  createProgram,
  createCourse,
  assignCourseTeacher,
} from "@/actions/admin-actions";
import {
  Layers,
  Plus,
  BookOpen,
  UserCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Dept {
  id: string;
  name: string;
  code: string;
  faculty: string;
}

interface Prog {
  id: string;
  name: string;
  departmentId: string;
  degreeType: string;
  totalCreditsRequired: number;
}

interface CourseItem {
  id: string;
  code: string;
  title: string;
  creditHours: number;
  lectureHours: number;
  labHours: number;
  departmentId: string;
  departmentName: string;
  assignments: {
    teacherName: string;
    section: string;
  }[];
}

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface CurriculumManagerProps {
  departments: Dept[];
  programs: Prog[];
  courses: CourseItem[];
  teachers: Teacher[];
}

export function CurriculumManager({
  departments,
  programs,
  courses,
  teachers,
}: CurriculumManagerProps) {
  const [activeTab, setActiveTab] = useState<"courses" | "programs" | "departments">("courses");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Course Form State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [cCode, setCCode] = useState("");
  const [cTitle, setCTitle] = useState("");
  const [cCredit, setCCredit] = useState(3);
  const [cLec, setCLec] = useState(2);
  const [cLab, setCLab] = useState(3);
  const [cDeptId, setCDeptId] = useState(departments[0]?.id || "");

  // Assign Teacher Modal State
  const [assignCourseId, setAssignCourseId] = useState<string | null>(null);
  const [assignTeacherId, setAssignTeacherId] = useState<string>(teachers[0]?.id || "");
  const [assignSection, setAssignSection] = useState("Section A");

  function handleCreateCourse(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const res = await createCourse({
        code: cCode,
        title: cTitle,
        creditHours: cCredit,
        lectureHours: cLec,
        labHours: cLab,
        departmentId: cDeptId,
        semester: 1,
        yearLevel: 2,
      });

      if (!res.success) {
        setMessage({ type: "error", text: "Failed to create course." });
      } else {
        setMessage({ type: "success", text: `Course ${cCode} created successfully.` });
        setShowAddCourse(false);
        setCCode("");
        setCTitle("");
      }
    });
  }

  function handleAssignTeacher() {
    if (!assignCourseId) return;
    setMessage(null);

    startTransition(async () => {
      const res = await assignCourseTeacher(assignCourseId, assignTeacherId, assignSection);
      if (!res.success) {
        setMessage({ type: "error", text: "Failed to assign instructor." });
      } else {
        setMessage({ type: "success", text: "Faculty allocated to course section successfully." });
        setAssignCourseId(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          {(["courses", "programs", "departments"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "courses" && (
          <button
            type="button"
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="px-3 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
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

      {/* Add Course Form Collapse */}
      {showAddCourse && (
        <form onSubmit={handleCreateCourse} className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#0B2545]">Register New Curriculum Course</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
              <input
                type="text"
                required
                placeholder="e.g. NURS301"
                value={cCode}
                onChange={(e) => setCCode(e.target.value)}
                className="w-full p-2 border rounded-lg uppercase font-mono font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Pediatric Nursing Care & Therapeutics"
                value={cTitle}
                onChange={(e) => setCTitle(e.target.value)}
                className="w-full p-2 border rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Credit Hours</label>
              <input
                type="number"
                min="1"
                max="6"
                value={cCredit}
                onChange={(e) => setCCredit(parseInt(e.target.value) || 3)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Lecture Hours</label>
              <input
                type="number"
                min="0"
                max="6"
                value={cLec}
                onChange={(e) => setCLec(parseInt(e.target.value) || 2)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={cDeptId}
                onChange={(e) => setCDeptId(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddCourse(false)}
              className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-1.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow"
            >
              Save Course
            </button>
          </div>
        </form>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0B2545] text-white">
                <tr>
                  <th className="py-3 px-4">Course Code</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4 text-center">Credit Hours</th>
                  <th className="py-3 px-4 text-center">Lec / Lab</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Allocated Instructors</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545]">{c.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{c.title}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">{c.creditHours}</td>
                    <td className="py-3.5 px-4 text-center text-slate-500">{c.lectureHours} / {c.labHours}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.departmentName}</td>
                    <td className="py-3.5 px-4">
                      {c.assignments.length > 0 ? (
                        c.assignments.map((a, i) => (
                          <span
                            key={i}
                            className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 mr-1"
                          >
                            {a.teacherName} ({a.section})
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setAssignCourseId(c.id);
                          setAssignTeacherId(teachers[0]?.id || "");
                        }}
                        className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-[#007A78] font-bold text-[11px] transition-colors"
                      >
                        Assign Faculty
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Programs Tab */}
      {activeTab === "programs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((p) => {
            const dept = departments.find((d) => d.id === p.departmentId);
            return (
              <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-[#0B2545]">{p.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {p.degreeType}
                  </span>
                </div>
                <div className="text-xs text-slate-600">{dept?.name || "Health Faculty"}</div>
                <div className="pt-2 border-t text-xs text-slate-500 font-medium">
                  Graduation Requirement: <strong className="text-slate-800">{p.totalCreditsRequired} Total Credits</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Departments Tab */}
      {activeTab === "departments" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((d) => (
            <div key={d.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-[#0B2545]">{d.name}</h3>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 border text-slate-700">
                  {d.code}
                </span>
              </div>
              <div className="text-xs text-slate-500">{d.faculty}</div>
            </div>
          ))}
        </div>
      )}

      {/* Assign Teacher Modal */}
      {assignCourseId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-sm text-[#0B2545]">Allocate Course Instructor</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Academic Staff</label>
                <select
                  value={assignTeacherId}
                  onChange={(e) => setAssignTeacherId(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Section</label>
                <input
                  type="text"
                  value={assignSection}
                  onChange={(e) => setAssignSection(e.target.value)}
                  placeholder="e.g. Section A"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setAssignCourseId(null)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleAssignTeacher}
                className="px-4 py-1.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
