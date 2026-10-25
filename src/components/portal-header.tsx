import { logoutAction } from "@/actions/auth-actions";
import { LogOut, User as UserIcon, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

interface PortalHeaderProps {
  user: {
    userId: string;
    email: string;
    role: "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN";
    name: string;
    studentIdNumber?: string;
  };
  studentDetails?: {
    programName: string;
    academicYear: string;
    currentSemester: number;
    status: string;
  } | null;
}

export function PortalHeader({ user, studentDetails }: PortalHeaderProps) {
  const roleBadges: Record<string, { label: string; bg: string; text: string }> = {
    STUDENT: { label: "Undergraduate Student", bg: "bg-teal-50 text-teal-800 border-teal-300", text: "text-teal-700" },
    TEACHER: { label: "Academic Faculty / Instructor", bg: "bg-blue-50 text-blue-800 border-blue-300", text: "text-blue-700" },
    REGISTRAR: { label: "Office of the Registrar", bg: "bg-amber-50 text-amber-900 border-amber-300", text: "text-amber-700" },
    ADMIN: { label: "System Administrator", bg: "bg-purple-50 text-purple-900 border-purple-300", text: "text-purple-700" },
  };

  const badge = roleBadges[user.role] || roleBadges.STUDENT;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Academic Status Bar for Students */}
      {user.role === "STUDENT" && studentDetails && (
        <div className="bg-[#0B2545] text-white text-xs px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2 border-b border-slate-700">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-slate-400">ID:</span>
              <span className="font-bold text-teal-300 bg-slate-800/80 px-2 py-0.5 rounded">
                {user.studentIdNumber || "HC/UG/2026/001"}
              </span>
            </div>
            <span className="hidden sm:inline text-slate-500">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Program:</span>
              <span className="font-semibold text-slate-100">{studentDetails.programName}</span>
            </div>
            <span className="hidden sm:inline text-slate-500">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Level:</span>
              <span className="font-semibold text-slate-100">
                Year {Math.ceil(studentDetails.currentSemester / 2)}, Semester {studentDetails.currentSemester} ({studentDetails.academicYear})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-300 font-semibold uppercase text-[11px] tracking-wide">
              {studentDetails.status || "ACTIVE MATRICULATION"}
            </span>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/portal/${user.role.toLowerCase()}`} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-[#0B2545] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              AH
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-[#0B2545] flex items-center gap-1.5">
                ALKAN SIMS
                <span className={`text-[11px] px-2 py-0.2 rounded border font-medium ${badge.bg}`}>
                  {user.role}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                Academic Management & Information Portal
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{user.name}</div>
            <div className="text-[11px] text-slate-500">{user.email}</div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs shadow-inner">
            {user.name.charAt(0)}
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              title="Sign Out"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded border border-slate-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
