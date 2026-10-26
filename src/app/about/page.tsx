import React from "react";
import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Building2, Award, Users, BookOpen, HeartPulse, ShieldCheck, Target, CheckCircle2, MapPin, Phone, Mail, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | ALKAN Health Science, Business & Technology College",
  description: "Learn about ALKAN College, founded in 2002 as a living memorial to Hakim Workineh Eshete (Dr. Charles Martin), pioneer of modern Ethiopian medicine. Campuses in Addis Ababa, Bahir Dar, and Dessie.",
};

const campuses = [
  {
    name: "Addis Ababa Campus (Head Office)",
    address: "In front of Ras Desta Memorial Hospital, Arada Sub-City",
    pobox: "P.O. Box 59102, Addis Ababa, Ethiopia",
    presidentPhone: "+251-111-555-701",
    registrarPhone: "+251-111-574-535",
    fax: "+251-111-565-455",
    email: "alkanaa@ethionet.et / alkan@ethionet.et",
    description: "Our historic headquarters and primary clinical sciences campus, operating adjacent to top referral and teaching hospitals with fully equipped skill labs.",
  },
  {
    name: "Bahir Dar Campus",
    address: "Felege Hiwot Hospital Road, Bahir Dar, Amhara Region",
    pobox: "P.O. Box 1471, Bahir Dar, Ethiopia",
    presidentPhone: "+251-582-266-382",
    registrarPhone: "+251-582-266-383",
    fax: "+251-582-266-382",
    email: "alkanbdar@ethionet.et",
    description: "Lakeside regional campus delivering accredited programs in Nursing, Pharmacy, Laboratory Sciences, Business, and IT with dedicated digital libraries.",
  },
  {
    name: "Dessie Campus",
    address: "Main Highway Corridor, Dessie, Wollo, Amhara Region",
    pobox: "P.O. Box 1024, Dessie, Ethiopia",
    presidentPhone: "+251-331-124-316",
    registrarPhone: "+251-331-124-317",
    fax: "+251-331-124-316",
    email: "alkandese@ethionet.et",
    description: "Regional center of excellence providing healthcare, TVET, and management education serving northern and eastern Ethiopian communities.",
  },
];

const coreValues = [
  { title: "Commitment to Academic Excellence", desc: "Rigorous competency-based curricula aligned with national healthcare standards and digital innovation." },
  { title: "Compassion & Professional Ethics", desc: "Instilling deep human empathy, clinical integrity, and patient-centered service in all graduates." },
  { title: "Academic Freedom & Inclusivity", desc: "Welcoming scholars of all backgrounds in an environment of open scientific inquiry and intellectual rigor." },
  { title: "Community Service & Impact", desc: "Mobilizing free health screenings, community outreach, and regional development initiatives." },
  { title: "Truth, Transparency & Integrity", desc: "Uncompromising honesty in clinical training, student grading, research ethics, and institutional operations." },
  { title: "Innovation & Adaptability", desc: "Integrating modern health informatics, modern laboratories, and adaptive learning technologies." },
  { title: "Social Accountability", desc: "Responding proactively to the nation's pressing health workforce and socio-economic needs." },
  { title: "Collaborative Partnerships", desc: "Active clinical affiliations with major hospitals, regional health bureaus, and international partners." },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#062667] via-[#0B2545] to-[#134074] text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FBE704] text-xs font-semibold tracking-wide uppercase mb-6">
              <Award className="w-4 h-4 text-[#FBE704]" /> Established December 2002 • 22+ Years of Excellence
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
              ALKAN Health Science, Business & Technology College
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
              Founded as a living memorial to <strong className="text-white font-semibold">Hakim Workineh Eshete (Dr. Charles Martin)</strong>, the father of modern Ethiopian medicine. Dedicated to producing ethically grounded, highly skilled healthcare and business professionals.
            </p>
          </div>
        </section>

        {/* Historical Memorial Section */}
        <section className="py-16 px-4 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b7a3e]/10 text-[#1b7a3e] text-xs font-bold uppercase tracking-wider">
                <HeartPulse className="w-4 h-4" /> Living Memorial & History
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#062667]">
                In Memory of Hakim Workineh Eshete (Dr. Charles Martin)
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ALKAN Health Science, Business & Technology College was founded in <strong>December 2002</strong> by ALKAN Plc. The institution was purposefully established as a perpetual living monument to <strong>Hakim Workineh Eshete</strong> (1865–1952), Ethiopia&apos;s very first modern physician and distinguished diplomat. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                Rescued from the battle of Maqdala in 1868, educated in medicine in India and Scotland, and returning to Ethiopia to serve Emperor Menelik II and Emperor Haile Selassie I, Hakim Workineh dedicated his life to healing, science, and the sovereignty of Ethiopia. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                Carrying forward this sacred legacy, ALKAN has expanded from a dedicated nursing school into a multi-faculty, accredited higher education institution with three regional campuses, graduating over <strong>14,000 healthcare professionals, technologists, and business leaders</strong> who serve in federal referral hospitals, regional clinics, and international organizations.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#062667]">
                  <CheckCircle2 className="w-5 h-5 text-[#1b7a3e]" /> HERQA / ETA Fully Accredited
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#062667]">
                  <CheckCircle2 className="w-5 h-5 text-[#1b7a3e]" /> 14,000+ Alumni Across Ethiopia
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#062667]">
                  <CheckCircle2 className="w-5 h-5 text-[#1b7a3e]" /> 3 Comprehensive Campuses
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#062667] to-[#134074] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBE704]/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Target className="w-8 h-8 text-[#FBE704]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Vision 2030</h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  &ldquo;ALKAN envisions becoming one of the most reputable, quality-driven, and preferred private higher education institutions in Ethiopia and Eastern Africa by 2030, recognized for exemplary clinical graduates, high-impact community research, and digital academic excellence.&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-sm font-bold text-[#FBE704] uppercase tracking-wider mb-2">Our 3-Pillar Mission</h4>
                  <ul className="text-xs text-slate-200 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBE704] font-bold">1.</span>
                      <span><strong>Quality Education:</strong> Provide competency-based education and practical clinical training using modern simulation laboratories and expert faculty.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBE704] font-bold">2.</span>
                      <span><strong>Applied Research:</strong> Conduct problem-solving scientific studies addressing national health priorities and socio-economic challenges.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FBE704] font-bold">3.</span>
                      <span><strong>Community Partnership:</strong> Deliver free preventative health services, emergency outreach, and capacity building to underserved populations.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#062667]/10 text-[#062667] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#062667]" /> Guiding Principles
              </div>
              <h2 className="text-3xl font-extrabold text-[#062667]">Our Core Institutional Values</h2>
              <p className="text-slate-600 mt-2">
                Every curriculum, clinical rotation, and institutional policy is governed by our eight foundational ethical pillars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((v, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-[#062667]/10 text-[#062667] flex items-center justify-center font-bold text-sm mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="font-bold text-[#062667] text-base mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campuses Directory */}
        <section className="py-16 px-4 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b7a3e]/10 text-[#1b7a3e] text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" /> Three Regional Hubs
              </div>
              <h2 className="text-3xl font-extrabold text-[#062667]">Our Campus Network</h2>
              <p className="text-slate-600 mt-2">
                Strategically located campuses offering accredited learning environments, specialized health laboratories, and student services.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {campuses.map((c, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#062667] transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-[#1b7a3e]"></span>
                      <h3 className="text-xl font-bold text-[#062667]">{c.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed">{c.description}</p>
                    
                    <div className="space-y-3 text-xs text-slate-700 border-t border-slate-200 pt-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#D92228] shrink-0 mt-0.5" />
                        <span>{c.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{c.pobox}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#1b7a3e] shrink-0" />
                        <span>Registrar: <strong>{c.registrarPhone}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#062667] shrink-0" />
                        <span>Admin: <strong>{c.presidentPhone}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#062667] shrink-0" />
                        <span className="break-all">{c.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200">
                    <Link
                      href={`/contact?campus=${encodeURIComponent(c.name)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#062667] hover:text-[#1b7a3e]"
                    >
                      View Campus Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#062667] to-[#134074] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Join the ALKAN Family?</h3>
              <p className="text-slate-200 text-sm">
                Explore our accredited Degree and TVET programs or apply online through our digital admissions portal.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admissions"
                className="px-6 py-3 bg-[#FBE704] text-[#062667] font-bold text-sm rounded-lg shadow-md hover:bg-yellow-400 transition-colors"
              >
                Apply Online Now
              </Link>
              <Link
                href="/programs"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/20 transition-colors"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
