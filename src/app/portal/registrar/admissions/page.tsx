import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdmissionsTable } from "./admissions-table";
import Link from "next/link";
import { ArrowLeft, UserCheck } from "lucide-react";

export default async function RegistrarAdmissionsPage() {
  const session = await getSession();
  if (!session) return null;

  const applications = await prisma.application.findMany({
    include: {
      program: {
        include: {
          department: true,
        },
      },
    },
    orderBy: { submittedAt: "desc" },
  });

  const mapped = applications.map((app) => ({
    id: app.id,
    referenceNo: app.referenceNo,
    personalInfo: JSON.parse(app.personalInfo),
    academicHistory: JSON.parse(app.academicHistory),
    programName: app.program.name,
    departmentName: app.program.department.name,
    documents: JSON.parse(app.documents || "[]"),
    status: app.status as "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED",
    submittedAt: app.submittedAt.toISOString(),
    reviewNotes: app.reviewNotes,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/registrar"
          className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Registrar Operations
        </Link>
        <h1 className="text-xl font-bold text-[#0B2545]">Online Admissions Processing Inbox</h1>
        <p className="text-xs text-slate-500">
          Inspect prospective student credentials, verify entrance exam thresholds, and provision matriculation accounts.
        </p>
      </div>

      <AdmissionsTable applications={mapped} />
    </div>
  );
}
