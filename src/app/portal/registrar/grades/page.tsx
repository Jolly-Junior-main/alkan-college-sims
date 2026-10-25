import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GradeGovernanceView } from "./grade-governance-view";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function RegistrarGradesPage() {
  const session = await getSession();
  if (!session) return null;

  // Fetch all courses that have assignments
  const courses = await prisma.course.findMany({
    include: {
      department: true,
      assignments: {
        include: {
          teacher: { include: { profile: true } },
        },
      },
      grades: {
        include: {
          student: {
            include: {
              user: { include: { profile: true } },
            },
          },
        },
      },
    },
    orderBy: { code: "asc" },
  });

  const sheets = courses.map((c) => {
    const teacher = c.assignments[0]?.teacher?.profile;
    const teacherName = teacher ? `Dr. ${teacher.firstName} ${teacher.lastName}` : "Assigned Faculty";

    const allGrades = c.grades;
    const submittedGrades = allGrades.filter((g) => g.status === "SUBMITTED");
    const publishedGrades = allGrades.filter((g) => g.status === "PUBLISHED");
    const draftGrades = allGrades.filter((g) => g.status === "DRAFT");

    // Stats
    const scores = allGrades.map((g) => g.totalMarks);
    const meanScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    const variance =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + Math.pow(score - meanScore, 2), 0) / scores.length
        : 0;
    const stdDev = Math.sqrt(variance);

    const letterDistribution: Record<string, number> = {
      A: 0,
      "A-": 0,
      "B+": 0,
      B: 0,
      "B-": 0,
      "C+": 0,
      C: 0,
      D: 0,
      F: 0,
    };

    allGrades.forEach((g) => {
      if (letterDistribution[g.letterGrade] !== undefined) {
        letterDistribution[g.letterGrade]++;
      } else {
        letterDistribution[g.letterGrade] = 1;
      }
    });

    const students = allGrades.map((g) => {
      const name = g.student.user.profile
        ? `${g.student.user.profile.firstName} ${g.student.user.profile.lastName}`
        : g.student.user.email;

      return {
        studentId: g.student.studentIdNumber,
        studentName: name,
        assessment: g.assessmentMarks,
        exam: g.examMarks,
        total: g.totalMarks,
        letter: g.letterGrade,
        point: g.gradePoint,
        status: g.status,
      };
    });

    return {
      courseId: c.id,
      courseCode: c.code,
      courseTitle: c.title,
      departmentName: c.department.name,
      teacherName,
      submittedGradesCount: submittedGrades.length,
      publishedGradesCount: publishedGrades.length,
      draftGradesCount: draftGrades.length,
      allGradesCount: allGrades.length,
      meanScore,
      stdDev,
      letterDistribution,
      students,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/registrar"
          className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Registrar Operations
        </Link>
        <h1 className="text-xl font-bold text-[#0B2545]">Institutional Grade Governance & Publishing</h1>
        <p className="text-xs text-slate-500">
          Review class grade distributions, verify Continuous Assessment and Exam mark ratios, and authorize publication to student transcripts.
        </p>
      </div>

      <GradeGovernanceView courseSheets={sheets} />
    </div>
  );
}
