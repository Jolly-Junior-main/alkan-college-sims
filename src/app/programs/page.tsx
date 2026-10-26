import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  BookOpen,
  Stethoscope,
  HeartPulse,
  Microscope,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Cpu,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Academic Programs & TVET | ALKAN College",
  description: "Accredited Undergraduate Degree and Level IV TVET programs across Community Health, Medical Science, Business, and Technology at ALKAN College campuses.",
};

const facultiesData = [
  {
    name: "Community Health Faculty",
    desc: "Train to provide preventive, curative, and rehabilitative primary and tertiary care under seasoned clinical preceptors.",
    degrees: [
      { name: "BSc in Nursing", duration: "4 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"], credits: "148 Credits" },
      { name: "BSc in Public Health (Health Officer)", duration: "4 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"], credits: "146 Credits" },
    ],
    tvet: [
      { name: "Comprehensive Nursing (Level IV)", duration: "3 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"] },
      { name: "Midwifery (Level IV)", duration: "3 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"] },
    ],
  },
  {
    name: "Medical Science Faculty",
    desc: "Diagnostic sciences, clinical pharmacotherapy, therapeutics, and laboratory pathology with certified analytical labs.",
    degrees: [
      { name: "BSc in Pharmacy (Clinical)", duration: "5 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"], credits: "164 Credits" },
      { name: "BSc in Medical Laboratory Science", duration: "4 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"], credits: "144 Credits" },
    ],
    tvet: [
      { name: "Pharmacy Technician (Level IV)", duration: "3 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"] },
      { name: "Medical Laboratory Technician (Level IV)", duration: "3 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"] },
    ],
  },
  {
    name: "Business & Social Science Faculty",
    desc: "Applied organizational management, accounting standards, financial auditing, and strategic marketing.",
    degrees: [
      { name: "BA in Accounting and Finance", duration: "3-4 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"], credits: "135 Credits" },
      { name: "BA in Management", duration: "3-4 Years", campuses: ["Bahir Dar", "Dessie"], credits: "132 Credits" },
      { name: "BA in Marketing Management", duration: "3-4 Years", campuses: ["Bahir Dar", "Dessie"], credits: "132 Credits" },
    ],
    tvet: [
      { name: "Accounting & Budget Service (Level IV)", duration: "3 Years", campuses: ["Addis Ababa", "Bahir Dar", "Dessie"] },
      { name: "Marketing Management (Level IV)", duration: "3 Years", campuses: ["Bahir Dar", "Dessie"] },
    ],
  },
  {
    name: "Technology Faculty",
    desc: "Applied software solutions, enterprise database administration, IT infrastructure, and modern surveying systems.",
    degrees: [
      { name: "BSc in Information Technology", duration: "4 Years", campuses: ["Bahir Dar", "Dessie"], credits: "140 Credits" },
    ],
    tvet: [
      { name: "Database Administration (Level IV)", duration: "3 Years", campuses: ["Bahir Dar", "Dessie", "Addis Ababa"] },
      { name: "Surveying Technology (Level IV)", duration: "3 Years", campuses: ["Addis Ababa", "Bahir Dar"] },
    ],
  },
];

export default async function ProgramsPage() {
  const departments = await prisma.department.findMany({
    include: {
      programs: true,
      courses: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#062667] via-[#0B2545] to-[#134074] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBE704] text-xs font-semibold border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[#FBE704]" /> HERQA & Regional TVET Accredited Curricula
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Academic Programs & Faculties
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Explore our accredited Undergraduate Degree (BSc, BA) and Technical & Vocational Education (TVET Level IV) programs offered across Addis Ababa, Bahir Dar, and Dessie campuses.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/admissions"
              className="px-6 py-2.5 rounded-lg bg-[#FBE704] text-[#062667] font-bold text-xs shadow-md hover:bg-yellow-400 transition-colors"
            >
              Apply Online Now
            </Link>
            <Link
              href="/about"
              className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              Campus Overview
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        {/* Four Academic Units Breakdown */}
        <section className="space-y-10">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-[#062667]">Faculties & Institutional Offerings</h2>
            <p className="text-xs text-slate-600 mt-1">
              Select between Degree or TVET diploma streams based on your educational qualifications and career aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {facultiesData.map((f, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-[#062667]">{f.name}</h3>
                    <span className="w-3 h-3 rounded-full bg-[#1b7a3e]"></span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{f.desc}</p>

                  {/* Degree Programs */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#062667] uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-[#1b7a3e]" />
                      <span>Undergraduate Degree Programs (BSc / BA)</span>
                    </div>
                    <div className="space-y-2">
                      {f.degrees.map((d, dIdx) => (
                        <div key={dIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                          <div>
                            <strong className="text-slate-900 block font-semibold">{d.name}</strong>
                            <span className="text-[11px] text-slate-500">Available at: {d.campuses.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{d.duration}</span>
                            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">{d.credits}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TVET Programs */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#062667] uppercase tracking-wider">
                      <FileCheck className="w-4 h-4 text-amber-600" />
                      <span>Technical & Vocational Education (TVET Level IV)</span>
                    </div>
                    <div className="space-y-2">
                      {f.tvet.map((t, tIdx) => (
                        <div key={tIdx} className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                          <div>
                            <strong className="text-slate-900 block font-semibold">{t.name}</strong>
                            <span className="text-[11px] text-slate-500">Campuses: {t.campuses.join(", ")}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[11px] self-start sm:self-auto">
                            {t.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Regular, Extension & Weekend Schedules</span>
                  <Link
                    href="/admissions"
                    className="text-xs font-bold text-[#062667] hover:text-[#1b7a3e] flex items-center gap-1"
                  >
                    <span>Apply for Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SIMS Registered Curriculum Modules (Database Connected) */}
        {departments.length > 0 && (
          <section className="space-y-8 pt-8 border-t border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b7a3e]">
                Curriculum Repository
              </span>
              <h2 className="text-2xl font-bold text-[#062667] mt-1">
                Active Courses in Student Information Management System (SIMS)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Courses structured with rigorous Continuous Assessment (50%) and Final Exam (50%) evaluation standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  id={dept.code.toLowerCase()}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#062667] bg-slate-100 px-2 py-0.5 rounded border">
                        {dept.code}
                      </span>
                      <h3 className="font-bold text-base text-[#062667] mt-1">{dept.name}</h3>
                      <div className="text-xs text-slate-500">{dept.faculty}</div>
                    </div>
                    <span className="text-xs text-[#1b7a3e] font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {dept.courses.length} Active Courses
                    </span>
                  </div>

                  <div className="space-y-2">
                    {dept.courses.map((c) => (
                      <div
                        key={c.id}
                        className="p-2.5 rounded-lg border bg-slate-50/60 text-xs flex justify-between items-center"
                      >
                        <div>
                          <span className="font-mono font-bold text-[#062667] mr-2">{c.code}</span>
                          <span className="text-slate-800 font-medium">{c.title}</span>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Year {c.yearLevel}, Semester {c.semester} • {c.lectureHours} hrs lecture, {c.labHours} hrs lab
                          </div>
                        </div>
                        <span className="font-bold text-slate-700 shrink-0 ml-3 bg-white px-2 py-0.5 rounded border">
                          {c.creditHours} cr
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
