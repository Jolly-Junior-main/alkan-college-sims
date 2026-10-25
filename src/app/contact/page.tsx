import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#007A78] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545]">
            Contact Admissions & Campus Registrar
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Have questions about health science program requirements, application deadlines, or SIMS portal credentials? Reach out to our campus desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-[#0B2545]">Campus Information Desk</h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#007A78] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Main Health Campus</strong>
                  <span>Ras Desta Damtew Street, Kirkos Sub-City, Addis Ababa, Ethiopia</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#007A78] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Admissions Helplines</strong>
                  <span>+251 11 551 2345 / +251 11 551 2346</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#007A78] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Registrar Email</strong>
                  <span>admissions@healthcollege.edu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#007A78] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Office Hours</strong>
                  <span>Monday – Friday: 8:30 AM – 5:30 PM (EAT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-[#0B2545]">Send an Academic Inquiry</h2>
            <form className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Bekele"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. almaz@gmail.com"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                <select className="w-full p-2.5 border rounded-lg">
                  <option>Undergraduate Admissions Prerequisite Question</option>
                  <option>Course Registration Clearance Help</option>
                  <option>Transcript Verification Inquiry</option>
                  <option>SIMS Portal Account Access</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry..."
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <button
                type="button"
                className="w-full py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white font-bold text-xs shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Registrar</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
