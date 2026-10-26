import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-[#041945] text-white border-t border-[#0f3675]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white p-1 shadow flex items-center justify-center shrink-0 border border-slate-200">
                <Image
                  src="/logo.png"
                  alt="Alkan Logo"
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-base text-white block leading-tight">
                  ALKAN HEALTH SCIENCE, BUSINESS &amp; TECH COLLEGE
                </span>
                <span className="text-[11px] text-amber-300 font-medium">Memorial of Hakim Workineh Eshete • Est. 2002</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Founded in December 2002 by ALKAN Plc as a memorial of Hakim Workineh Eshete, the first Ethiopian physician. Offering fully accredited degree and TVET programs across 3 modern campuses with over 14,000 alumni.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>HERQA &amp; Regional TVET Agency Accredited</span>
            </div>
          </div>

          {/* Academic Faculties */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-amber-300 mb-4 border-b border-slate-700/80 pb-2">
              Academic Faculties
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/programs#community-health" className="hover:text-amber-200 transition-colors">Community Health Faculty (Nursing, Public Health, Midwifery)</Link></li>
              <li><Link href="/programs#medical-science" className="hover:text-amber-200 transition-colors">Medical Science Faculty (Pharmacy, Med Lab)</Link></li>
              <li><Link href="/programs#business-social" className="hover:text-amber-200 transition-colors">Business &amp; Social Science (Accounting, Management)</Link></li>
              <li><Link href="/programs#technology" className="hover:text-amber-200 transition-colors">Technology Faculty (IT, Surveying, Database)</Link></li>
              <li><Link href="/programs" className="hover:text-amber-200 transition-colors">Undergraduate Degree &amp; TVET Level IV</Link></li>
            </ul>
          </div>

          {/* Institutional Services */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-amber-300 mb-4 border-b border-slate-700/80 pb-2">
              Services &amp; Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/services#registrar" className="hover:text-amber-200 transition-colors">Office of the Registrar</Link></li>
              <li><Link href="/services#library" className="hover:text-amber-200 transition-colors">Campus Libraries &amp; Electronic Journals</Link></li>
              <li><Link href="/services#counseling" className="hover:text-amber-200 transition-colors">Guidance &amp; Psychological Counseling</Link></li>
              <li><Link href="/services#cafeteria" className="hover:text-amber-200 transition-colors">Campus Cafeteria Services</Link></li>
              <li><Link href="/services#community" className="hover:text-amber-200 transition-colors">Community Outreach &amp; Rural Healthcare</Link></li>
              <li><Link href="/admissions/status" className="hover:text-amber-200 transition-colors font-semibold text-teal-300">Check Admission Status</Link></li>
            </ul>
          </div>

          {/* 3 Campuses Directory */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-amber-300 mb-4 border-b border-slate-700/80 pb-2">
              Campuses &amp; Contacts
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="font-bold text-white block">Addis Ababa Campus (Head Office):</span>
                <span className="text-[11px] text-slate-400 block">In front of Ras Desta Memorial Hospital</span>
                <span className="text-[11px] text-slate-300 block">Tel: +251-111-555-701 / +251-111-574-535</span>
                <span className="text-[11px] text-teal-300 block">alkanaa@ethionet.et • P.O. Box 59102</span>
              </div>
              <div>
                <span className="font-bold text-white block">Bahir Dar Campus:</span>
                <span className="text-[11px] text-slate-300 block">Tel: +251-582-266-383 • alkanbdar@ethionet.et</span>
                <span className="text-[11px] text-teal-300 block">P.O. Box 1471, Bahir Dar</span>
              </div>
              <div>
                <span className="font-bold text-white block">Dessie Campus:</span>
                <span className="text-[11px] text-slate-300 block">Tel: +251-331-124-317 • alkandese@ethionet.et</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 ALKAN Health Science Business and Technology College (ALKAN Plc). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:underline">History &amp; Mission</Link>
            <Link href="/contact" className="hover:underline">Campuses</Link>
            <Link href="/portal/login" className="hover:underline text-amber-300 font-semibold">Staff &amp; Student Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
