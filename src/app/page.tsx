import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";
import Image from "next/image";
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
  Briefcase,
  Cpu,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const programs = await prisma.program.findMany({
    include: { department: true },
    orderBy: { name: "asc" },
  });

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const faculties = [
    {
      name: "Community Health Faculty",
      desc: "Comprehensive Clinical Nursing, Public Health Officer (Health Officer), and Midwifery curricula.",
      icon: HeartPulse,
      color: "text-[#1b7a3e]",
      bg: "bg-emerald-50",
      programs: ["BSc Nursing", "BSc Public Health", "TVET Midwifery", "Comprehensive Nursing Level IV"],
    },
    {
      name: "Medical Science Faculty",
      desc: "Clinical Pharmacy and Medical Laboratory Sciences with modern analytical & diagnostics laboratories.",
      icon: Microscope,
      color: "text-blue-600",
      bg: "bg-blue-50",
      programs: ["BSc Pharmacy", "BSc Medical Laboratory", "Pharmacy Technician Level IV", "Medical Lab Level IV"],
    },
    {
      name: "Business & Social Science",
      desc: "Equipping professionals in Accounting & Finance, Business Management, and Marketing Management.",
      icon: Briefcase,
      color: "text-amber-600",
      bg: "bg-amber-50",
      programs: ["BA Accounting & Finance", "BA Management", "BA Marketing", "Accounting Level IV"],
    },
    {
      name: "Technology Faculty",
      desc: "Applied computing, information systems, database administration, and surveying technology.",
      icon: Cpu,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      programs: ["BSc Information Technology", "Database Administration", "Surveying Technology Level IV"],
    },
  ];

  const campuses = [
    {
      city: "Addis Ababa Campus (Head Office)",
      location: "In front of Ras Desta Memorial Hospital, Arada Sub-City",
      pobox: "P.O. Box 59102",
      phone: "+251-111-574-535",
      email: "alkanaa@ethionet.et",
      badge: "Main Health Sciences Hub",
    },
    {
      city: "Bahir Dar Campus",
      location: "Felege Hiwot Hospital Road, Bahir Dar",
      pobox: "P.O. Box 1471",
      phone: "+251-582-266-383",
      email: "alkanbdar@ethionet.et",
      badge: "Regional Center of Excellence",
    },
    {
      city: "Dessie Campus",
      location: "Main Highway Corridor, Dessie, Wollo",
      pobox: "P.O. Box 1492",
      phone: "+251-331-124-317",
      email: "alkandese@ethionet.et",
      badge: "Comprehensive Degree & TVET",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#062667] via-[#0B2545] to-[#134074] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background radial glows matching logo colors */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FBE704]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#1b7a3e]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#062667]/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#FBE704] text-xs font-semibold border border-white/20">
                <Sparkles className="w-4 h-4 text-[#FBE704]" />
                <span>Memorial of Hakim Workineh Eshete • Est. December 2002</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Pioneering Excellence in <span className="text-[#FBE704]">Health</span>, <span className="text-[#1b7a3e] bg-white/10 px-1.5 rounded">Business</span> & <span className="text-sky-300">Technology</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-light">
                For over 22 years, <strong>ALKAN Health Science, Business & Technology College</strong> has educated more than 14,000 healthcare professionals, financial experts, and IT leaders. Experience competency-based clinical training, accredited degree curricula, and seamless digital academic management with our integrated SIMS portal.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/admissions"
                  className="px-6 py-3.5 rounded-xl bg-[#FBE704] hover:bg-yellow-400 text-[#062667] text-sm font-extrabold shadow-lg hover:shadow-yellow-500/30 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Apply for Admission (2026/27)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/portal/login"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4 text-[#FBE704]" />
                  <span>SIMS Portal Login</span>
                </Link>

                <Link
                  href="/admissions/status"
                  className="px-4 py-3 rounded-xl text-slate-200 hover:text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Check Admission Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Accreditations Row */}
              <div className="pt-6 border-t border-slate-600/60 flex flex-wrap items-center gap-6 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FBE704]" />
                  <span>HERQA / ETA Fully Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#1b7a3e]" />
                  <span>3 Campuses: Addis Ababa, Bahir Dar, Dessie</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FBE704]" />
                  <span>14,000+ Alumni Across Ethiopia</span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Institutional Highlights & Gateway */}
            <div className="lg:col-span-5">
              <div className="bg-[#062667]/90 rounded-2xl p-7 border border-white/20 backdrop-blur-md shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-bold text-base text-white">ALKAN Academic Gateway</h3>
                    <p className="text-xs text-[#FBE704]">Single Sign-On SIMS Academic Portal</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Alkan Logo"
                      width={44}
                      height={44}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#FBE704]" />
                      <div>
                        <div className="font-bold text-white">Student Academic Portal</div>
                        <div className="text-slate-300 text-[11px]">Semester Registration, Clearances & Transcripts</div>
                      </div>
                    </div>
                    <Link href="/portal/login" className="text-[#FBE704] font-bold hover:underline">
                      Enter →
                    </Link>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-sky-400" />
                      <div>
                        <div className="font-bold text-white">Faculty Grading Engine</div>
                        <div className="text-slate-300 text-[11px]">Continuous Assessment (50%) & Final Exam (50%)</div>
                      </div>
                    </div>
                    <Link href="/portal/login" className="text-[#FBE704] font-bold hover:underline">
                      Enter →
                    </Link>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#1b7a3e]" />
                      <div>
                        <div className="font-bold text-white">Office of the Registrar</div>
                        <div className="text-slate-300 text-[11px]">Admissions, Grade Clearance & Official Publishing</div>
                      </div>
                    </div>
                    <Link href="/portal/login" className="text-[#FBE704] font-bold hover:underline">
                      Enter →
                    </Link>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-300 text-center border-t border-white/10">
                  Credential verification requests: <span className="font-mono text-[#FBE704]">alkanaa@ethionet.et</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Counter Bar */}
      <section className="bg-white border-y border-slate-200 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-[#062667]">14,000+</div>
              <div className="text-xs font-semibold text-slate-600 uppercase mt-1">Graduated Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1b7a3e]">22+ Years</div>
              <div className="text-xs font-semibold text-slate-600 uppercase mt-1">Continuous Service (Est. 2002)</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#062667]">3 Campuses</div>
              <div className="text-xs font-semibold text-slate-600 uppercase mt-1">Addis Ababa, Bahir Dar, Dessie</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#1b7a3e]">100%</div>
              <div className="text-xs font-semibold text-slate-600 uppercase mt-1">HERQA / ETA Accreditation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Faculties Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1b7a3e] bg-[#1b7a3e]/10 px-3.5 py-1 rounded-full border border-[#1b7a3e]/20">
            Four Core Faculties
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062667]">
            Academic Units & Program Faculties
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Delivering competency-based curriculum across Bachelor of Science (BSc), Bachelor of Arts (BA), and Level IV TVET diploma streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculties.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between hover:border-[#062667]/40"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} ${f.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#062667]">{f.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{f.desc}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Offerings:</div>
                    {f.programs.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1b7a3e] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    href="/programs"
                    className="text-xs font-bold text-[#062667] hover:text-[#1b7a3e] flex items-center justify-between"
                  >
                    <span>View Curriculum Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campuses Network Showcase */}
      <section className="bg-slate-100 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#062667] bg-[#062667]/10 px-3 py-1 rounded-full">
                Regional Presence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062667] mt-2">
                Our Three Campuses Across Ethiopia
              </h2>
            </div>
            <Link
              href="/about"
              className="text-xs font-bold text-[#062667] hover:text-[#1b7a3e] flex items-center gap-1"
            >
              <span>Learn More About Our Campuses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campuses.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#1b7a3e] border border-emerald-200">
                      {c.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#062667]">{c.city}</h3>
                    <div className="flex items-start gap-2 mt-2 text-xs text-slate-600">
                      <MapPin className="w-4 h-4 text-[#D92228] shrink-0 mt-0.5" />
                      <span>{c.location}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#1b7a3e]" />
                      <span>Registrar: <strong>{c.phone}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500">Email:</span>
                      <span className="font-mono text-[11px] text-[#062667]">{c.email}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Postal Code: {c.pobox}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    href={`/contact?campus=${encodeURIComponent(c.city)}`}
                    className="text-xs font-bold text-[#062667] hover:text-[#1b7a3e] flex items-center gap-1"
                  >
                    <span>Contact Campus Office</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Announcements & Notices */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b7a3e] bg-[#1b7a3e]/10 px-3 py-1 rounded-full">
              Official Bulletin
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#062667] mt-2">
              Announcements & Campus News
            </h2>
          </div>
          <Link
            href="/announcements"
            className="text-xs font-semibold text-[#062667] hover:underline flex items-center gap-1"
          >
            <span>View All Campus Bulletins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                  {ann.isPinned && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#1b7a3e] font-bold text-[10px] border border-emerald-200">
                      OFFICIAL
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-[#062667] leading-snug">{ann.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {ann.content}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/announcements"
                  className="text-xs font-bold text-[#1b7a3e] hover:underline flex items-center gap-1"
                >
                  <span>Read Notice</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#062667] via-[#0B2545] to-[#134074] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBE704] text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-[#FBE704]" /> 2026/2027 Academic Year Admissions
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Begin Your Career at ALKAN College
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            Apply online today in 4 easy steps. Regular, extension, and weekend admission streams are available across Addis Ababa, Bahir Dar, and Dessie campuses.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-[#FBE704] hover:bg-yellow-400 text-[#062667] text-xs font-extrabold shadow-md transition-all"
            >
              Start Online Admission Application →
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              Campus Student Services
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
