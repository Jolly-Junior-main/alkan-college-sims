"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Lock,
  Phone,
  Mail,
  Home,
  BookOpen,
  Info,
  Layers,
  Bell,
  MapPin,
} from "lucide-react";

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About & History", icon: Info },
    { href: "/programs", label: "Programs", icon: BookOpen },
    { href: "/services", label: "Services", icon: Layers },
    { href: "/announcements", label: "News & Notices", icon: Bell },
    { href: "/contact", label: "Campuses", icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#062667] text-white shadow-md border-b border-[#0f3675]">
      {/* Top institutional ticker */}
      <div className="bg-[#041945] text-xs py-1.5 px-4 text-slate-300 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200 text-[11px] sm:text-xs">
            2026/27 Academic Year Registration & Remedial Programs Open • Addis Ababa, Bahir Dar & Dessie Campuses
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#FBE704]" /> +251-111-555-701</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#FBE704]" /> alkan@ethionet.et</span>
          <span>•</span>
          <span className="text-[#FBE704] font-semibold">HERQA & TVET Accredited</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Institution Branding */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white p-1 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-slate-200">
              <Image
                src="/logo.png"
                alt="Alkan Health Science Business and Technology College Logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-black tracking-tight text-white flex items-center gap-2 leading-tight">
                ALKAN HEALTH SCIENCE, BUSINESS &amp; TECH COLLEGE
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#FBE704] font-medium tracking-wide flex items-center gap-1.5">
                <span>Memorial of Hakim Workineh Eshete</span>
                <span className="text-slate-400">•</span>
                <span className="text-teal-300">Est. 2002</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 uppercase">SIMS Portal</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible on lg and above) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs xl:text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-white/15 text-[#FBE704] font-bold shadow-xs border border-white/20"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admissions/status"
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 font-semibold ${
                pathname.startsWith("/admissions/status")
                  ? "bg-white/15 text-[#FBE704] font-bold"
                  : "text-[#FBE704] hover:text-yellow-300 hover:bg-white/10"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Status</span>
            </Link>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/portal/login"
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-teal-400/50 text-teal-200 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-teal-300" />
              <span>SIMS Login</span>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-lg bg-[#FBE704] text-[#062667] hover:bg-yellow-400 shadow-md transition-all hover:scale-105"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#062667]" />
            </Link>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/portal/login"
              className="sm:hidden px-2.5 py-1.5 text-[11px] font-semibold rounded-md border border-teal-400/50 text-teal-200 hover:bg-white/10"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FBE704] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#FBE704]" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#041945] border-t border-[#0f3675] shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#1b7a3e] text-white font-bold shadow-xs"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#FBE704]" : "text-slate-400"}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/admissions/status"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  pathname.startsWith("/admissions/status")
                    ? "bg-[#1b7a3e] text-white font-bold"
                    : "text-[#FBE704] hover:bg-white/10"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#FBE704]" />
                <span>Track Admission Status</span>
              </Link>
            </nav>

            {/* Quick Action Buttons in Mobile Menu */}
            <div className="pt-3 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/admissions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg bg-[#FBE704] hover:bg-yellow-400 text-[#062667] font-extrabold text-xs shadow text-center flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#062667]" />
                <span>Apply for Admission (2026/27)</span>
              </Link>
              <Link
                href="/portal/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 text-center flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-teal-300" />
                <span>Access SIMS Portal</span>
              </Link>
            </div>

            {/* Campuses Direct Helpline in Mobile Menu */}
            <div className="pt-2 text-[11px] text-slate-300 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div>
                Addis Ababa: <span className="font-mono text-[#FBE704]">+251-111-574-535</span>
              </div>
              <div>
                Bahir Dar: <span className="font-mono text-[#FBE704]">+251-582-266-383</span>
              </div>
              <div>
                Dessie: <span className="font-mono text-[#FBE704]">+251-331-124-317</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
