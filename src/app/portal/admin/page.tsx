import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  Layers,
  Shield,
  BookOpen,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Server,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();

  const [studentCount, teacherCount, registrarCount, deptCount, programCount, courseCount, auditCount] =
    await Promise.all([
      prisma.user.count({ where: { role: "STUDENT", status: "ACTIVE" } }),
      prisma.user.count({ where: { role: "TEACHER", status: "ACTIVE" } }),
      prisma.user.count({ where: { role: "REGISTRAR", status: "ACTIVE" } }),
      prisma.department.count(),
      prisma.program.count(),
      prisma.course.count(),
      prisma.auditTrail.count(),
    ]);

  const recentAudits = await prisma.auditTrail.findMany({
    include: { user: { include: { profile: true } } },
    orderBy: { timestamp: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] rounded-xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
            System Administration & SIMS Core
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Health Sciences Campus Management System
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Enterprise RBAC governance, curriculum cataloging, and immutable audit telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>SIMS Cluster Healthy (100% Operational)</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Scholars
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {studentCount} <span className="text-xs font-normal text-slate-400">Active</span>
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">Undergraduate Health</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-teal-50 text-[#007A78] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Academic Faculty
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {teacherCount} <span className="text-xs font-normal text-slate-400">Instructors</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Clinical Professors & Lecturers</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#134074] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Curriculum Programs
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {programCount} <span className="text-xs font-normal text-slate-400">Across {deptCount} Depts</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">{courseCount} Accredited Courses</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Security Audit Trails
            </div>
            <div className="text-2xl font-extrabold text-[#0B2545] mt-1">
              {auditCount} <span className="text-xs font-normal text-slate-400">Events</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-1">Tamper-proof Log Storage</div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Cards & Recent Audit Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[#0B2545]">Core Administration Modules</h3>
            
            <Link
              href="/portal/admin/curriculum"
              className="p-3 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-slate-50 flex items-center justify-between transition-all block"
            >
              <div>
                <div className="font-bold text-xs text-slate-900">Curriculum Management</div>
                <div className="text-[11px] text-slate-500">Depts, Degree Programs, Courses & Allocations</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/portal/admin/users"
              className="p-3 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-slate-50 flex items-center justify-between transition-all block"
            >
              <div>
                <div className="font-bold text-xs text-slate-900">User & RBAC Accounts</div>
                <div className="text-[11px] text-slate-500">Provision roles, suspend accounts, password resets</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/portal/admin/audit"
              className="p-3 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-slate-50 flex items-center justify-between transition-all block"
            >
              <div>
                <div className="font-bold text-xs text-slate-900">Security Audit Trail</div>
                <div className="text-[11px] text-slate-500">Searchable ledger of all sensitive state changes</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
              <Server className="w-4 h-4" />
              <span>Database & System Architecture</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Equipped with Prisma ORM transactional consistency, strict double-blind grade security, and automated student provisioning upon registrar approval.
            </p>
          </div>
        </div>

        {/* Recent Audit Log Feed */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-[#0B2545]">Recent Sensitive Activity Feed</h3>
              <p className="text-[11px] text-slate-500">Real-time audit recording of grade, admission, and clearance actions</p>
            </div>
            <Link
              href="/portal/admin/audit"
              className="text-xs font-bold text-[#007A78] hover:underline"
            >
              Full Audit Log →
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentAudits.map((a) => {
              const u = a.user?.profile;
              const userName = u ? `${u.firstName} ${u.lastName}` : a.user?.email || "System Service";

              return (
                <div
                  key={a.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#0B2545] bg-white px-2 py-0.5 rounded border">
                        {a.action}
                      </span>
                      <span className="text-slate-600 font-medium">on {a.resource} ({a.resourceId})</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Initiated by: <strong className="text-slate-700">{userName}</strong> • IP: {a.ipAddress}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
