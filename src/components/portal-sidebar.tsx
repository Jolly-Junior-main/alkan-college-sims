"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  BookOpen,
  FileCheck,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  Settings,
  Shield,
  Layers,
  FileText,
  UserCheck,
} from "lucide-react";

interface SidebarProps {
  role: "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN";
}

export function PortalSidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const studentLinks = [
    { href: "/portal/student", label: "Academic Overview", icon: LayoutDashboard },
    { href: "/portal/student/registration", label: "Semester Registration", icon: ClipboardList },
    { href: "/portal/student/grades", label: "My Grades & Transcript", icon: GraduationCap },
  ];

  const teacherLinks = [
    { href: "/portal/teacher", label: "Faculty Dashboard", icon: LayoutDashboard },
    { href: "/portal/teacher/courses", label: "Assigned Courses", icon: BookOpen },
    { href: "/portal/teacher/requests", label: "Correction Requests", icon: AlertCircle },
  ];

  const registrarLinks = [
    { href: "/portal/registrar", label: "Registrar Overview", icon: LayoutDashboard },
    { href: "/portal/registrar/admissions", label: "Admissions Processing", icon: UserCheck },
    { href: "/portal/registrar/registrations", label: "Registration Clearance", icon: FileCheck },
    { href: "/portal/registrar/grades", label: "Grade Governance", icon: FileSpreadsheet },
    { href: "/portal/registrar/grade-changes", label: "Grade Change Queue", icon: AlertCircle },
  ];

  const adminLinks = [
    { href: "/portal/admin", label: "System Health & Metrics", icon: LayoutDashboard },
    { href: "/portal/admin/curriculum", label: "Curriculum Management", icon: Layers },
    { href: "/portal/admin/users", label: "User Management", icon: Users },
    { href: "/portal/admin/audit", label: "Security Audit Trail", icon: Shield },
  ];

  const links =
    role === "STUDENT"
      ? studentLinks
      : role === "TEACHER"
      ? teacherLinks
      : role === "REGISTRAR"
      ? registrarLinks
      : adminLinks;

  return (
    <aside className="w-full md:w-64 bg-[#0B2545] text-slate-200 min-h-auto md:min-h-[calc(100vh-65px)] flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-[#134074]">
      <div className="p-4 space-y-4 md:space-y-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 px-3 mb-2">
            Academic Operations
          </div>
          <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== `/portal/${role.toLowerCase()}` && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#007A78] text-white shadow"
                      : "text-slate-300 hover:bg-[#134074]/60 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Portal Switcher / Switch Guide for reviewers */}
        <div className="bg-[#081B33] p-3 rounded-md border border-slate-700/60 text-xs text-slate-300">
          <div className="font-semibold text-teal-300 mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Portal Role Access
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Current session authenticated as <strong className="text-white">{role}</strong>. Enforcing strict RBAC rules.
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
            <Link href="/portal/login" className="text-teal-400 hover:underline">
              Switch User Role →
            </Link>
            <Link href="/" className="text-slate-400 hover:text-white">
              Public Site
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 text-center border-t border-slate-800 text-[11px] text-slate-400">
        <div>Alkan SIMS v2.4 (AAU Standard)</div>
        <div className="text-[10px] text-slate-500">Academic Year 2026/2027</div>
      </div>
    </aside>
  );
}
