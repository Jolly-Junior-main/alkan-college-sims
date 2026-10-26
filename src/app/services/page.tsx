import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";
import {
  FileCheck2,
  BookOpen,
  HeartHandshake,
  UtensilsCrossed,
  ShieldCheck,
  Award,
  ArrowRight,
  Stethoscope,
  Microscope,
  Phone,
  Mail,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const services = [
    {
      id: "registrar",
      title: "Office of the Registrar",
      subtitle: "Admissions, Matriculation & Student Academic Records",
      icon: FileCheck2,
      color: "border-blue-200 bg-blue-50/50 text-[#062667]",
      description:
        "The Office of the Registrar administers all student lifecycle processes from initial application review, document authentication, semester course registration clearance, to official transcript and degree conferral. The office coordinates with regional and national education bureaus for continuous student verification.",
      features: [
        "Online Application Inspection & Instant ID Provisioning",
        "Official Academic Transcript Issuance & Certified Verification",
        "Curriculum Course Registration & Credit Clearance",
        "Graduation Verification & Diploma Endorsement",
      ],
      contacts: [
        { label: "Addis Ababa Registrar", phone: "+251-111-574-535", email: "alkanaa@ethionet.et" },
        { label: "Bahir Dar Registrar", phone: "+251-582-266-383", email: "alkanbdar@ethionet.et" },
        { label: "Dessie Registrar", phone: "+251-331-124-317", email: "alkandese@ethionet.et" },
      ],
    },
    {
      id: "library",
      title: "Campus Library & E-Resources",
      subtitle: "Biomedical Literature, Digital Repositories & Study Halls",
      icon: BookOpen,
      color: "border-teal-200 bg-teal-50/50 text-teal-800",
      description:
        "Modern academic libraries established across Addis Ababa, Bahir Dar, and Dessie campuses stocking authoritative medical textbooks, pharmacy compendia, public health journals, and computer labs providing access to international electronic databases (HINARI, PubMed, and national academic repositories).",
      features: [
        "Comprehensive Clinical Medicine, Nursing, Pharmacy & IT book stacks",
        "High-Speed Internet Computer Labs for E-Learning",
        "Quiet Individual & Collaborative Study Spaces",
        "Research Assistance & Reference Desk Services",
      ],
      contacts: [
        { label: "Central Library Desk", phone: "+251-111-555-701", email: "alkan@ethionet.et" },
      ],
    },
    {
      id: "guidance-and-counseling",
      title: "Guidance & Counseling Unit",
      subtitle: "Student Mentorship, Academic Counseling & Wellbeing",
      icon: HeartHandshake,
      color: "border-amber-200 bg-amber-50/50 text-amber-900",
      description:
        "Dedicated student support specialists providing confidential psycho-social counseling, academic mentorship, transition advising for new collegiate scholars, and professional career guidance to assist students in realizing their full potential.",
      features: [
        "Confidential One-on-One Psychological Counseling",
        "Academic Intervention & Study Skills Mentoring",
        "Career Path Consultation for Health & Business Graduates",
        "Student Wellness & Stress Management Seminars",
      ],
      contacts: [
        { label: "Student Affairs & Guidance", phone: "+251-111-555-702", email: "alkan@ethionet.et" },
      ],
    },
    {
      id: "cafeteria",
      title: "Campus Cafeteria & Dining",
      subtitle: "Hygienic, Nutritious & Subsidized Campus Nutrition",
      icon: UtensilsCrossed,
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-900",
      description:
        "Clean, modern dining halls offering balanced, affordable breakfasts, traditional lunches, and refreshment services for students, instructors, and administrative staff during intensive daytime lecture and laboratory schedules.",
      features: [
        "Daily Fresh Healthy Meals & Traditional Ethiopian Cuisine",
        "Strict Sanitation & Food Safety Standards Monitored Daily",
        "Comfortable Indoor & Shaded Outdoor Seating",
        "Subsidized Student Meal Pricing",
      ],
      contacts: [
        { label: "Campus Services Coordinator", phone: "+251-111-553-542", email: "alkanfin@ethionet.et" },
      ],
    },
    {
      id: "community",
      title: "Community Outreach & Clinical Engagements",
      subtitle: "Free Health Screenings, Field Outreaches & Maternal Care",
      icon: Stethoscope,
      color: "border-rose-200 bg-rose-50/50 text-rose-900",
      description:
        "Through our Community Health Faculty, Alkan students and academic clinicians conduct ongoing free medical outreaches, blood pressure and diabetes screenings, immunization campaigns, and sanitation training in under-resourced rural and urban localities across Ethiopia.",
      features: [
        "Annual Free Community Health Days & Diagnostic Camps",
        "Maternal & Child Health Educational Campaigns",
        "Public Health Water & Sanitation Awareness Programs",
        "Clinical Partnerships with Tertiary Referral Hospitals",
      ],
      contacts: [
        { label: "Community Service Directorate", phone: "+251-111-555-701", email: "alkan@ethionet.et" },
      ],
    },
    {
      id: "quality",
      title: "Research & Quality Assurance Unit",
      subtitle: "Curriculum Standards, Faculty Research & Continuous Auditing",
      icon: Microscope,
      color: "border-indigo-200 bg-indigo-50/50 text-indigo-900",
      description:
        "Ensures complete alignment with the Higher Education Relevance and Quality Agency (HERQA) and Regional TVET directives. The unit oversees continuous academic staff appraisal, curriculum improvements, institutional research proposals, and student feedback mechanisms.",
      features: [
        "Regular Pedagogical & Clinical Preceptor Evaluations",
        "HERQA Institutional Quality Self-Evaluation Audits",
        "Academic Call for Research Papers & Faculty Grants",
        "Institutional Repository & Student Publication Support",
      ],
      contacts: [
        { label: "Quality Assurance Office", phone: "+251-111-555-702", email: "alkan@ethionet.et" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#062667] via-[#0f3675] to-[#041945] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#0f3675]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Institutional Student & Academic Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Campus Services & Academic Facilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Supporting academic excellence, clinical diagnostics readiness, student well-being, and community outreach across our Addis Ababa, Bahir Dar, and Dessie campuses.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${svc.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      ALKAN Service
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#062667]">{svc.title}</h3>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{svc.subtitle}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Key Offerings:</div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {svc.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Campus Contact:</div>
                  {svc.contacts.map((c, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex flex-wrap justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-semibold text-slate-800">{c.label}:</span>
                      <div className="flex items-center gap-2 text-slate-600">
                        <span>{c.phone}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-teal-700 font-medium">{c.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card for Admissions / Portal */}
        <div className="bg-[#062667] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              2026/27 Academic Year Admissions
            </span>
            <h2 className="text-2xl font-black">Ready to Join Alkan College?</h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Apply online in four simple steps or visit any of our campus registrar offices in Addis Ababa, Bahir Dar, or Dessie.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-[#FBE704] text-[#062667] font-black text-sm hover:bg-[#E5D200] transition-transform hover:scale-105 shadow-md flex items-center gap-2"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4 text-[#062667]" />
            </Link>
            <Link
              href="/admissions/status"
              className="px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Track Application
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
