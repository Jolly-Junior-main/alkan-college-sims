import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";
import { Award, ShieldCheck, Building2, Stethoscope, Users, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007A78] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Institutional Profile
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545]">
            About Alkan Health Sciences College
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Founded with a vision of transformative clinical healthcare education, community health empowerment, and rigorous biomedical scholarship.
          </p>
        </div>

        {/* Narrative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#0B2545]">Our Institutional Mission</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              To cultivate competent, compassionate, and ethical healthcare professionals equipped with state-of-the-art diagnostic competencies, evidence-based nursing care, and epidemiological research methodologies to serve communities across Ethiopia and East Africa.
            </p>
            <div className="pt-2 text-xs text-teal-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Accredited by HERQA and the Federal Ministry of Health</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#0B2545]">Clinical Hospital Affiliations</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our scholars undertake rigorous bedside clinical rotations, emergency department attachments, and community health outreaches in partnership with leading tertiary institutions, including Tikur Anbessa Specialized Hospital, Saint Paul’s Hospital Millennium Medical College, and Zewditu Memorial Hospital.
            </p>
            <div className="pt-2 text-xs text-teal-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>100% Supervised Clinical Preceptor Placement</span>
            </div>
          </div>
        </div>

        {/* Academic Governance & SIMS */}
        <div className="bg-[#0B2545] rounded-2xl p-8 sm:p-10 text-white shadow-lg space-y-4">
          <h2 className="text-xl font-bold">Academic Governance & AAU SIMS Architecture</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Alkan College deploys an institutional Student Information Management System (SIMS) patterned directly after the academic structure of university portals (such as Addis Ababa University). 
            Our platform guarantees complete role-based segregation, double-blind grading workflows, strict 12 to 22 credit semester bounds, and automated student provisioning upon registrar matriculation clearance.
          </p>
          <div className="pt-2">
            <Link
              href="/portal/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow"
            >
              <span>Access Institutional SIMS Portal</span>
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
