import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, FileCheck, Building2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact & Campus Directory | ALKAN College",
  description: "Official contact directory, phone numbers, emails, and postal addresses for ALKAN College campuses in Addis Ababa, Bahir Dar, and Dessie. Official document verification guidance.",
};

const campuses = [
  {
    name: "Head Office & Addis Ababa Campus",
    location: "In front of Ras Desta Memorial Hospital, Arada Sub-City",
    pobox: "P.O. Box 59102, Addis Ababa, Ethiopia",
    president: "+251-111-555-701 / Mobile: +251-911-204-142",
    academicVp: "+251-111-555-702 / Mobile: +251-911-209-073",
    registrar: "+251-111-574-535",
    finance: "+251-111-553-542 / Mobile: +251-911-209-597",
    fax: "+251-111-552-482",
    emails: ["alkanaa@ethionet.et", "alkan@ethionet.et", "alkanfin@ethionet.et"],
    isHeadOffice: true,
  },
  {
    name: "Bahir Dar Campus",
    location: "Felege Hiwot Hospital Road, Bahir Dar City",
    pobox: "P.O. Box 1471, Bahir Dar, Ethiopia",
    academicVp: "+251-582-266-382 / Mobile: +251-918-340-049",
    registrar: "+251-582-266-383",
    fax: "+251-582-266-381",
    emails: ["alkanbdar@ethionet.et"],
    isHeadOffice: false,
  },
  {
    name: "Dessie Campus",
    location: "Main Highway Corridor, Dessie City, Wollo",
    pobox: "P.O. Box 1492, Dessie, Ethiopia",
    academicVp: "+251-331-124-316 / Mobile: +251-911-207-883",
    registrar: "+251-331-124-317",
    fax: "+251-331-124-315",
    emails: ["alkandese@ethionet.et"],
    isHeadOffice: false,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#062667] via-[#0B2545] to-[#134074] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBE704] text-xs font-semibold border border-white/20">
            <Building2 className="w-4 h-4 text-[#FBE704]" /> Nationwide Campus Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact Admissions & Campus Offices
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Connect directly with the President&apos;s Office, Campus Academic Vice Presidents, Registrar, and Finance Departments across our Addis Ababa, Bahir Dar, and Dessie hubs.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Official Document Verification Banner */}
        <div className="bg-emerald-50 border-2 border-[#1b7a3e]/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1b7a3e] text-white flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6 text-[#FBE704]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b7a3e] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" /> Official Notice: Academic Credential Verification
              </div>
              <h2 className="text-lg font-bold text-[#062667]">
                Official Student Document & Transcript Verification Policy
              </h2>
              <p className="text-xs text-slate-700 mt-1 max-w-3xl leading-relaxed">
                Please be informed that all authentic document verification requests from embassies, foreign credential evaluators (WES), Ethiopian federal ministries, and employers are processed strictly through official institutional emails: <strong className="font-mono text-[#062667]">alkanaa@ethionet.et</strong>, <strong className="font-mono text-[#062667]">alkanbdar@ethionet.et</strong>, or <strong className="font-mono text-[#062667]">alkandese@ethionet.et</strong>.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <a
              href="mailto:alkanaa@ethionet.et?subject=Official%20Document%20Verification%20Request"
              className="px-5 py-2.5 rounded-lg bg-[#062667] text-white text-xs font-bold hover:bg-[#134074] transition-colors inline-flex items-center gap-2 shadow"
            >
              <Mail className="w-4 h-4 text-[#FBE704]" /> Submit Verification Email
            </a>
          </div>
        </div>

        {/* Campuses Directory Cards */}
        <div>
          <div className="border-b border-slate-200 pb-3 mb-8">
            <h2 className="text-2xl font-bold text-[#062667]">Campus Directory & Helplines</h2>
            <p className="text-xs text-slate-600 mt-1">
              Reach the designated office for admissions, grade clearance, student transcripts, or administration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {campuses.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6 hover:border-[#062667] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      {c.isHeadOffice && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#1b7a3e] mb-1 inline-block">
                          Headquarters
                        </span>
                      )}
                      <h3 className="font-bold text-lg text-[#062667]">{c.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D92228] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-semibold">Campus Address:</strong>
                        <span>{c.location}</span>
                        <div className="text-slate-500 text-[11px] mt-0.5">{c.pobox}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#1b7a3e] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-semibold">Registrar Office:</strong>
                        <span className="font-mono font-medium text-slate-800">{c.registrar}</span>
                      </div>
                    </div>

                    {c.president && (
                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-[#062667] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">President Office:</strong>
                          <span className="font-mono font-medium text-slate-800">{c.president}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#062667] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-semibold">Academic VP:</strong>
                        <span className="font-mono font-medium text-slate-800">{c.academicVp}</span>
                      </div>
                    </div>

                    {c.finance && (
                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Finance Head:</strong>
                          <span className="font-mono font-medium text-slate-800">{c.finance}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-[#062667] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block font-semibold">Campus Email(s):</strong>
                        {c.emails.map((e, eIdx) => (
                          <div key={eIdx} className="font-mono text-[11px] text-[#062667]">
                            <a href={`mailto:${e}`} className="hover:underline">{e}</a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 pt-1">
                      <span className="font-semibold">Fax:</span>
                      <span className="font-mono">{c.fax}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Hours: Mon - Fri: 8:30 - 17:30</span>
                  <a
                    href={`tel:${c.registrar.split('/')[0].trim()}`}
                    className="font-bold text-[#062667] hover:text-[#1b7a3e]"
                  >
                    Call Registrar →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Send an Academic Inquiry Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-[#062667]">Send an Academic Inquiry</h2>
            <p className="text-xs text-slate-600">
              Submit your question regarding degree or TVET admissions, SIMS login assistance, or clinical attachments.
            </p>
          </div>

          <form className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Bekele"
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062667]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. almaz@gmail.com"
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062667]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Campus</label>
                <select className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062667]">
                  <option>Addis Ababa Campus (Head Office)</option>
                  <option>Bahir Dar Campus</option>
                  <option>Dessie Campus</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                <select className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062667]">
                  <option>Undergraduate Admissions (BSc / BA)</option>
                  <option>TVET Level IV Diploma Admission</option>
                  <option>Remedial Program Entry Criteria</option>
                  <option>SIMS Student Portal Login Support</option>
                  <option>Official Document / Transcript Verification</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message Details</label>
              <textarea
                rows={4}
                required
                placeholder="Write your inquiry here..."
                className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062667]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#062667] hover:bg-[#134074] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#FBE704]" />
              <span>Submit Academic Inquiry</span>
            </button>
          </form>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
