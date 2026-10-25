export interface GradeResult {
  totalMarks: number;
  letterGrade: string;
  gradePoint: number;
  isPass: boolean;
  error?: string;
}

export function computeGrade(assessmentMarks: number, examMarks: number): GradeResult {
  if (isNaN(assessmentMarks) || assessmentMarks < 0 || assessmentMarks > 50) {
    return {
      totalMarks: 0,
      letterGrade: "F",
      gradePoint: 0.0,
      isPass: false,
      error: "Continuous Assessment marks must be between 0 and 50.",
    };
  }

  if (isNaN(examMarks) || examMarks < 0 || examMarks > 50) {
    return {
      totalMarks: 0,
      letterGrade: "F",
      gradePoint: 0.0,
      isPass: false,
      error: "Final Exam marks must be between 0 and 50.",
    };
  }

  const total = Math.round((assessmentMarks + examMarks) * 100) / 100;

  if (total >= 85) {
    return { totalMarks: total, letterGrade: "A", gradePoint: 4.0, isPass: true };
  } else if (total >= 80) {
    return { totalMarks: total, letterGrade: "A-", gradePoint: 3.75, isPass: true };
  } else if (total >= 75) {
    return { totalMarks: total, letterGrade: "B+", gradePoint: 3.5, isPass: true };
  } else if (total >= 70) {
    return { totalMarks: total, letterGrade: "B", gradePoint: 3.0, isPass: true };
  } else if (total >= 65) {
    return { totalMarks: total, letterGrade: "B-", gradePoint: 2.75, isPass: true };
  } else if (total >= 60) {
    return { totalMarks: total, letterGrade: "C+", gradePoint: 2.5, isPass: true };
  } else if (total >= 50) {
    return { totalMarks: total, letterGrade: "C", gradePoint: 2.0, isPass: true };
  } else if (total >= 40) {
    return { totalMarks: total, letterGrade: "D", gradePoint: 1.0, isPass: false };
  } else {
    return { totalMarks: total, letterGrade: "F", gradePoint: 0.0, isPass: false };
  }
}

export function computeGPA(grades: { creditHours: number; gradePoint: number }[]): {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
} {
  if (!grades || grades.length === 0) {
    return { gpa: 0, totalCredits: 0, totalPoints: 0 };
  }

  let totalCredits = 0;
  let totalPoints = 0;

  for (const g of grades) {
    totalCredits += g.creditHours;
    totalPoints += g.creditHours * g.gradePoint;
  }

  const gpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
  return { gpa, totalCredits, totalPoints };
}
