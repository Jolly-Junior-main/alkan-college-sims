import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { StatusChecker } from "./status-checker";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdmissionsStatusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <Link
            href="/admissions"
            className="text-xs font-semibold text-[#062667] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Admissions
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#1b7a3e] text-xs font-bold border border-emerald-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Real-Time Decision Registry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062667]">
            Online Application Tracker
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Check the real-time review status of your admission application to ALKAN Health Science, Business & Technology College.
          </p>
        </div>

        <StatusChecker />
      </main>

      <PublicFooter />
    </div>
  );
}
