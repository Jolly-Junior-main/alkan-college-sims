import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeGPA } from "@/lib/grade-calculator";
import { PrintTranscriptButton } from "./print-transcript-button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, GraduationCap, ShieldCheck, Award } from "lucide-react";

export default async function StudentGradesPage() {
  const session = await getSession();
  const userId = session?.userId;

  const student = userId
    ? await prisma.studentProfile.findFirst({
        where: { userId },
        include: {
          program: { include: { department: true } },
          user: { include: { profile: true } },
        },
      })
    : await prisma.studentProfile.findFirst({
        include: {
          program: { include: { department: true } },
          user: { include: { profile: true } },
        },
      });

  if (!student) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-xs border">
        <h2 className="text-lg font-bold text-slate-800">Student Record Not Found</h2>
      </div>
    );
  }

  // CRITICAL RULE: Only display records where status === "PUBLISHED"
  const publishedGrades = await prisma.grade.findMany({
    where: {
      studentId: student.id,
      status: "PUBLISHED",
    },
    include: {
      course: {
        include: {
          assignments: {
            include: {
              teacher: { include: { profile: true } },
            },
          },
        },
      },
    },
    orderBy: {
      course: { code: "asc" },
    },
  });

  const gradeItems = publishedGrades.map((g) => ({
    creditHours: g.course.creditHours,
    gradePoint: g.gradePoint,
  }));

  const { gpa, totalCredits, totalPoints } = computeGPA(gradeItems);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header controls (hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/portal/student"
            className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-[#0B2545]">Academic Record & Grade Transcript</h1>
          <p className="text-xs text-slate-500">
            Official semester-by-semester assessment report verified by the Office of the Registrar.
          </p>
        </div>

        <PrintTranscriptButton />
      </div>

      {/* Transcript Document Sheet (Formatted for screen and high-resolution print) */}
      <div className="transcript-sheet bg-white rounded-2xl border border-slate-300 shadow-md p-8 sm:p-12 text-slate-900 relative">
        {/* Institutional University Seal & Header */}
        <div className="text-center border-b-2 border-[#0B2545] pb-6 mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-2">
            <Image
              src="/logo.png"
              alt="Alkan College Official Seal"
              width={72}
              height={72}
              className="w-18 h-18 object-contain drop-shadow"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-[#0B2545] uppercase">
            Alkan Health Sciences College
          </h2>
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mt-0.5">
            Office of the Registrar • Student Information System
          </div>
          <div className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-wider text-slate-800 border">
            Official Student Grade Report (Academic Transcript)
          </div>
        </div>

        {/* Student Biographical & Matriculation Metadata Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs mb-8">
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Student Full Name:</div>
            <div className="font-bold text-slate-900 mt-0.5">
              {student.user.profile?.firstName} {student.user.profile?.middleName || ""} {student.user.profile?.lastName}
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Student ID Number:</div>
            <div className="font-mono font-bold text-[#0B2545] mt-0.5">{student.studentIdNumber}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Academic Program:</div>
            <div className="font-semibold text-slate-900 mt-0.5">{student.program.name}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Department / Faculty:</div>
            <div className="font-semibold text-slate-900 mt-0.5">{student.program.department.name}</div>
          </div>

          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Degree Type:</div>
            <div className="font-semibold text-slate-900 mt-0.5">{student.program.degreeType} Degree</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Admission Year:</div>
            <div className="font-semibold text-slate-900 mt-0.5">{student.academicYear}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Current Semester:</div>
            <div className="font-semibold text-slate-900 mt-0.5">Semester {student.currentSemester}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] font-semibold uppercase">Report Date:</div>
            <div className="font-semibold text-slate-900 mt-0.5">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="mb-8">
          <div className="text-xs font-bold text-[#0B2545] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Academic Performance: Semester I Coursework</span>
            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
              Only Published Registrar Records
            </span>
          </div>

          {publishedGrades.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-300">
                <thead className="bg-[#0B2545] text-white">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-slate-700">Course Code</th>
                    <th className="py-2.5 px-3 border-r border-slate-700">Course Title</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-700">Credit Hrs (Cr)</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-700">Continuous Assessment (50)</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-700">Final Exam (50)</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-700">Total (100)</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-700">Letter Grade</th>
                    <th className="py-2.5 px-3 text-center">Grade Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {publishedGrades.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545] border-r border-slate-200">{g.course.code}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900 border-r border-slate-200">{g.course.title}</td>
                      <td className="py-2.5 px-3 text-center font-semibold text-slate-800 border-r border-slate-200">{g.course.creditHours}</td>
                      <td className="py-2.5 px-3 text-center text-slate-700 border-r border-slate-200">{g.assessmentMarks.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-center text-slate-700 border-r border-slate-200">{g.examMarks.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900 border-r border-slate-200">{g.totalMarks.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-800 bg-emerald-50/50 border-r border-slate-200">{g.letterGrade}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-[#0B2545]">{g.gradePoint.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-lg">
              <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No Published Grades Available</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Grades for this semester are currently undergoing continuous assessment or awaiting final approval and publication by the Registrar.
              </p>
            </div>
          )}
        </div>

        {/* Academic Standing & GPA Summary Block */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
          <div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Total Earned Credit Hours</div>
            <div className="text-xl font-bold text-[#0B2545] mt-1">{totalCredits} Hours</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Cumulative Quality Points</div>
            <div className="text-xl font-bold text-[#0B2545] mt-1">{totalPoints.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Semester / Cumulative GPA</div>
            <div className="text-2xl font-black text-[#007A78] mt-1">{gpa.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 4.00</span></div>
          </div>
        </div>

        {/* Official Authentication & Registrar Signoff Block */}
        <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-600">
          <div>
            <div className="font-semibold text-slate-800">Academic Standing Policy:</div>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
              A minimum Semester GPA and CGPA of 2.00 is required for regular academic status in undergraduate health sciences.
              This transcript reflects official recorded marks published through the Alkan College SIMS database.
            </p>
          </div>
          <div className="text-right flex flex-col justify-end">
            <div className="w-48 border-b border-slate-400 ml-auto mb-1"></div>
            <div className="font-bold text-slate-900">Office of the College Registrar</div>
            <div className="text-[10px] text-slate-500">Official Institutional Signature & Seal</div>
          </div>
        </div>
      </div>
    </div>
  );
}
