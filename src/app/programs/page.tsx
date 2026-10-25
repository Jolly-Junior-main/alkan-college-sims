import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, Stethoscope, HeartPulse, Microscope, Activity, ArrowRight, ShieldCheck } from "lucide-react";

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

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Ministry of Education Accredited
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545]">
            Academic Programs & Curriculum Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Discover our Bachelor of Science (BSc) degree programs in Nursing, Public Health, Pharmacy, and Medical Laboratory Sciences.
          </p>
        </div>

        <div className="space-y-10">
          {departments.map((dept) => (
            <div
              key={dept.id}
              id={dept.code.toLowerCase()}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2.5 py-0.5 rounded border">
                    {dept.code}
                  </span>
                  <h2 className="text-xl font-bold text-[#0B2545] mt-1">{dept.name}</h2>
                  <div className="text-xs text-slate-500">{dept.faculty}</div>
                </div>

                <Link
                  href="/admissions"
                  className="px-4 py-2 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <span>Apply for this Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Programs under this dept */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dept.programs.map((prog) => (
                  <div key={prog.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm text-[#0B2545]">{prog.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        {prog.degreeType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Standard 4-year degree pathway requiring {prog.totalCreditsRequired} total credit hours. Includes comprehensive clinical internship and practicum rotations.
                    </p>
                  </div>
                ))}
              </div>

              {/* Courses under this dept */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Sample Core Curriculum Courses:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {dept.courses.map((c) => (
                    <div key={c.id} className="p-2.5 rounded-lg border bg-white text-xs flex justify-between items-center">
                      <div>
                        <span className="font-mono font-bold text-[#0B2545] mr-1.5">{c.code}</span>
                        <span className="text-slate-800 font-medium">{c.title}</span>
                      </div>
                      <span className="font-bold text-slate-500 shrink-0 ml-2">{c.creditHours} cr</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
