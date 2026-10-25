import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RegistrationClearance } from "./registrations-clearance";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function RegistrarRegistrationsPage() {
  const session = await getSession();
  if (!session) return null;

  const batches = await prisma.courseRegistration.findMany({
    include: {
      student: {
        include: {
          program: true,
          user: { include: { profile: true } },
        },
      },
      items: {
        include: {
          course: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const mapped = batches.map((b) => {
    const s = b.student;
    const name = s.user.profile
      ? `${s.user.profile.firstName} ${s.user.profile.lastName}`
      : s.user.email;
    const totalCredits = b.items.reduce((sum, item) => sum + item.course.creditHours, 0);

    return {
      id: b.id,
      studentIdNumber: s.studentIdNumber,
      studentName: name,
      programName: s.program.name,
      academicYear: b.academicYear,
      semester: b.semester,
      totalCredits,
      status: b.status as "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED",
      submittedAt: b.createdAt.toISOString(),
      courses: b.items.map((i) => ({
        code: i.course.code,
        title: i.course.title,
        creditHours: i.course.creditHours,
      })),
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
        <h1 className="text-xl font-bold text-[#0B2545]">Student Course Registration Clearance</h1>
        <p className="text-xs text-slate-500">
          Verify credit boundary compliance (12 - 22 cr. hrs) and clear student course registration batches for the term.
        </p>
      </div>

      <RegistrationClearance batches={mapped} />
    </div>
  );
}
