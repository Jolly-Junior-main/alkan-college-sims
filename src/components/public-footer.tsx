import Link from "next/link";
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-[#0B2545] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#007A78] flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg text-white">ALKAN HEALTH COLLEGE</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Excellence in Clinical Health Education, Biomedical Sciences, and Community Healthcare Leadership. 
              Accredited higher education programs modeled after international academic frameworks.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-300">
              <ShieldCheck className="w-4 h-4" /> Higher Education Relevance & Quality Agency (HERQA) Accredited
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-teal-300 mb-4">
              Academic Divisions
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/programs#nursing" className="hover:text-white transition-colors">Department of Nursing</Link></li>
              <li><Link href="/programs#pharmacy" className="hover:text-white transition-colors">Department of Pharmacy</Link></li>
              <li><Link href="/programs#public-health" className="hover:text-white transition-colors">Department of Public Health</Link></li>
              <li><Link href="/programs#mls" className="hover:text-white transition-colors">Medical Laboratory Sciences</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Clinical Internships</Link></li>
            </ul>
          </div>

          {/* Admissions & SIMS */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-teal-300 mb-4">
              SIMS & Admissions
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/admissions" className="hover:text-white transition-colors">Online Application Wizard</Link></li>
              <li><Link href="/admissions/status" className="hover:text-white transition-colors">Check Application Status</Link></li>
              <li><Link href="/portal/login" className="hover:text-white transition-colors">Student & Staff Portal</Link></li>
              <li><Link href="/announcements" className="hover:text-white transition-colors">Academic Calendar & Notices</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Institutional Accreditation</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-teal-300 mb-4">
              Campus Registrar
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>Main Health Campus, Ras Desta Damtew St, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+251 11 551 2345 / +251 11 551 2346</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>admissions@healthcollege.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Alkan Health Sciences College. Student Information Management System (SIMS). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Academic Regulations</Link>
            <Link href="/portal/login" className="hover:underline text-teal-300">Staff & Student Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
