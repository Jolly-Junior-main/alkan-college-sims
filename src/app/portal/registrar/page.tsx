import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  UserCheck,
  FileCheck,
  FileSpreadsheet,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Users,
} from "lucide-react";

export default async function RegistrarDashboardPage() {
  const session = await getSession();

  // Counts
  const pendingApplications = await prisma.application.count({
    where: { status: "SUBMITTED" },
  });

  const pendingRegistrations = await prisma.courseRegistration.count({
    where: { status: "SUBMITTED" },
  });

  const pendingGradesCount = await prisma.grade.count({
    where: { status: "SUBMITTED" },
  });

  const pendingGradeChanges = await prisma.gradeChangeRequest.count({
    where: { status: "PENDING" },
  });

  const totalStudents = await prisma.studentProfile.count();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] rounded-xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
            Office of the College Registrar
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Academic Operations & Governance Desk
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Official AAU-standard administrative clearance, admissions provisioning, and grade publication hub.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span>Active Academic Session 2026/2027</span>
        </div>
      </div>

      {/* 4 Operations Queues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Admissions Queue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Admissions Inbox
            </span>
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#007A78] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545]">
            {pendingApplications} <span className="text-xs font-normal text-slate-400">Pending</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Awaiting matriculation decision</div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/portal/registrar/admissions"
              className="text-xs font-bold text-[#007A78] hover:underline flex items-center justify-between"
            >
              <span>Process Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Registration Clearance Queue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Registration Clearance
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#134074] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545]">
            {pendingRegistrations} <span className="text-xs font-normal text-slate-400">Batches</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Course enrollment clearances</div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/portal/registrar/registrations"
              className="text-xs font-bold text-[#007A78] hover:underline flex items-center justify-between"
            >
              <span>Clear Registrations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Grade Governance Queue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Grade Governance
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545]">
            {pendingGradesCount} <span className="text-xs font-normal text-slate-400">Submitted</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Ready for approval & publication</div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/portal/registrar/grades"
              className="text-xs font-bold text-[#007A78] hover:underline flex items-center justify-between"
            >
              <span>Review & Publish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Grade Change Requests Queue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Correction Requests
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0B2545]">
            {pendingGradeChanges} <span className="text-xs font-normal text-slate-400">Pending</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Post-submission faculty petitions</div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/portal/registrar/grade-changes"
              className="text-xs font-bold text-[#007A78] hover:underline flex items-center justify-between"
            >
              <span>Audit Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Institutional Highlights */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h2 className="text-base font-bold text-[#0B2545]">Registrar Verification Workflow Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">1. Admissions Provisioning</div>
            <p className="text-slate-600 leading-relaxed">
              When an applicant like <strong>HC-2026-1001</strong> is approved, the system automatically creates their official Student Profile, assigns a unique student ID (e.g. <code>HC/UG/2026/005</code>), and provisions student portal credentials.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">2. Course Registration Clearance</div>
            <p className="text-slate-600 leading-relaxed">
              Verify curriculum credit hours (12 to 22 bounds). With 1 click, approve batches to clear students for the semester and instantiate faculty grade sheets.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 mb-1">3. Grade Governance & Double-Blind Release</div>
            <p className="text-slate-600 leading-relaxed">
              Teachers submit 50-mark continuous assessment and 50-mark final exam. Grades remain invisible to students until you click &quot;Approve &amp; Publish&quot;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
