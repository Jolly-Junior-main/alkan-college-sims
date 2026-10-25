import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Stethoscope,
  Activity,
  HeartPulse,
  Microscope,
  CheckCircle2,
  Calendar,
  Building2,
  Lock,
} from "lucide-react";

export default async function HomePage() {
  const programs = await prisma.program.findMany({
    include: { department: true },
    orderBy: { name: "asc" },
  });

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#081B33] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background radial glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <ShieldCheck className="w-4 h-4 text-teal-300" />
                <span>AAU-Affiliated Clinical Health Education & SIMS Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Empowering the Next Generation of <span className="text-teal-300">Healthcare Leaders</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Alkan Health Sciences College provides world-class clinical instruction, modern laboratory diagnostics training, and community health leadership. Our integrated Student Information Management System (SIMS) guarantees institutional governance, grade transparency, and real-time student lifecycle tracking.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/admissions"
                  className="px-6 py-3 rounded-xl bg-[#007A78] hover:bg-[#00605E] text-white text-sm font-bold shadow-lg hover:shadow-teal-900/30 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/portal/login"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4 text-teal-300" />
                  <span>SIMS Portal Login</span>
                </Link>

                <Link
                  href="/admissions/status"
                  className="px-4 py-3 rounded-xl text-teal-200 hover:text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Track Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Accreditations Row */}
              <div className="pt-6 border-t border-slate-700/60 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>HERQA Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-400" />
                  <span>Tikur Anbessa Hospital Partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Ministry of Health Certified</span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Institutional Highlights */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/80 rounded-2xl p-7 border border-teal-500/30 backdrop-blur-md shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-bold text-base text-white">Alkan SIMS Gateway</h3>
                    <p className="text-xs text-teal-300">Unified Role-Based Portal Access</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#007A78] text-white flex items-center justify-center font-bold">
                    AH
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0B2545]/80 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-teal-400" />
                      <div>
                        <div className="font-bold text-white">Student Academic Portal</div>
                        <div className="text-slate-400 text-[11px]">Registration, Grades & Transcripts</div>
                      </div>
                    </div>
                    <Link href="/portal/login" className="text-teal-300 font-semibold hover:underline">
                      Enter →
                    </Link>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B2545]/80 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="font-bold text-white">Faculty Grading Engine</div>
                        <div className="text-slate-400 text-[11px]">Continuous Assessment & Exam Inputs</div>
                      </div>
                    </div>
                    <Link href="/portal/login" className="text-teal-300 font-semibold hover:underline">
                      Enter →
                    </Link>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B2545]/80 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="font-bold text-white">Office of the Registrar</div>
                        <div className="text-slate-400 text-[11px]">Admissions, Clearances & Publishing</div>
                      </div>
                    </div>
                    <Link href="/portal/login" className="text-teal-300 font-semibold hover:underline">
                      Enter →
                    </Link>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 text-center">
                  Demo login accounts available on portal page for instant testing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Bar */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-[#0B2545]">2,400+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Graduated Health Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#007A78]">100%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Hospital Internship Placement</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#0B2545]">4 Core</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Specialized Academic Divisions</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#007A78]">98.4%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase mt-1">National Licensure Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Directory Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007A78] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Academic Degrees & Curricula
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545]">
            Health Sciences Degree Programs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Four-year degree tracks aligned with international healthcare competency guidelines, clinical patient care, and laboratory diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p) => {
            const icons: Record<string, React.ElementType> = {
              "BSc in Nursing": Stethoscope,
              "BSc in Public Health": HeartPulse,
              "BSc in Pharmacy": Activity,
              "BSc in Medical Laboratory Science": Microscope,
            };
            const Icon = icons[p.name] || Stethoscope;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#007A78] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {p.degreeType} • 4 Years
                    </span>
                    <h3 className="font-bold text-base text-[#0B2545] mt-1.5">{p.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">{p.department.name}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comprehensive theoretical study and clinical rotations at Tikur Anbessa Hospital. Requires {p.totalCreditsRequired} credit hours for graduation.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/programs#${p.department.code.toLowerCase()}`}
                    className="text-xs font-bold text-[#007A78] hover:underline flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* College Announcements & Notices */}
      <section className="bg-slate-100/70 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#007A78]">
                Institutional Bulletin
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] mt-1">
                Announcements & Academic Notices
              </h2>
            </div>
            <Link
              href="/announcements"
              className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1"
            >
              <span>View All Campus Bulletins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                  {ann.isPinned && (
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold text-[10px] border border-teal-200">
                      OFFICIAL
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-[#0B2545] leading-snug">{ann.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#0B2545] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Begin Your Healthcare Education?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Apply online today through our 4-step wizard. Applications for Academic Year 2026/2027 are currently being reviewed by the Registrar Office.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow-md transition-all"
            >
              Start Admission Application →
            </Link>
            <Link
              href="/portal/login"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              Access SIMS Portal
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
