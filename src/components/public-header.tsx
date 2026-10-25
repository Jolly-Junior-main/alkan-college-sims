import Link from "next/link";
import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0B2545] text-white shadow-md border-b border-[#134074]">
      {/* Top institutional ticker */}
      <div className="bg-[#081B33] text-xs py-1.5 px-4 text-slate-300 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Academic Year 2026/2027 Admission Cycle Open • AAU Affiliated Health Curriculum</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <span>Inquiry: +251 11 551 2345</span>
          <span>admissions@healthcollege.edu</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Institution Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#007A78] to-[#134074] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                ALKAN HEALTH COLLEGE
              </div>
              <div className="text-xs text-teal-300 font-medium tracking-wider uppercase">
                Academic Management & SIMS Portal
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <Link href="/" className="text-slate-200 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-slate-200 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/programs" className="text-slate-200 hover:text-white transition-colors">
              Programs
            </Link>
            <Link href="/admissions" className="text-slate-200 hover:text-white transition-colors">
              Admissions
            </Link>
            <Link href="/admissions/status" className="text-teal-300 hover:text-teal-200 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Check Status
            </Link>
            <Link href="/announcements" className="text-slate-200 hover:text-white transition-colors">
              Announcements
            </Link>
            <Link href="/contact" className="text-slate-200 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/portal/login"
              className="px-4 py-2 text-sm font-semibold rounded-md border border-teal-400/40 text-teal-200 hover:bg-white/10 hover:text-white transition-all"
            >
              Portal Login
            </Link>
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md bg-[#007A78] hover:bg-[#00605E] text-white shadow transition-all hover:translate-x-0.5"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
