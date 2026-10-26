import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { AdmissionWizard } from "./admission-wizard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShieldCheck, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  const programs = await prisma.program.findMany({
    include: { department: true },
    orderBy: { name: "asc" },
  });

  const mapped = programs.map((p) => ({
    id: p.id,
    name: p.name,
    degreeType: p.degreeType,
    departmentName: p.department.name,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#1b7a3e] text-xs font-bold border border-emerald-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Academic Year 2026/2027 Intake
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062667]">
              Online Admission Application Portal
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Apply to ALKAN Health Science, Business & Technology College across Addis Ababa, Bahir Dar, and Dessie campuses. Instant reference number generated upon submission.
            </p>
          </div>

          <Link
            href="/admissions/status"
            className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span>Check Existing Status</span>
          </Link>
        </div>

        <AdmissionWizard programs={mapped} />
      </main>

      <PublicFooter />
    </div>
  );
}
