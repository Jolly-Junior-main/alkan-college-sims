import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AuditViewer } from "./audit-viewer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminAuditPage() {
  const session = await getSession();

  const logs = await prisma.auditTrail.findMany({
    include: {
      user: { include: { profile: true } },
    },
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  const mapped = logs.map((l) => ({
    id: l.id,
    action: l.action,
    resource: l.resource,
    resourceId: l.resourceId,
    ipAddress: l.ipAddress,
    timestamp: l.timestamp.toISOString(),
    userName: l.user?.profile
      ? `${l.user.profile.firstName} ${l.user.profile.lastName}`
      : l.user?.email || "System Daemon",
    userEmail: l.user?.email || "internal@system",
    diffPayload: l.diffPayload,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/portal/admin"
          className="text-xs font-semibold text-[#007A78] hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
        </Link>
        <h1 className="text-xl font-bold text-[#0B2545]">Security & Operational Audit Trail</h1>
        <p className="text-xs text-slate-500">
          Immutable event telemetry capturing user authentication, admissions provisioning, course registrations, and grade publications.
        </p>
      </div>

      <AuditViewer logs={mapped} />
    </div>
  );
}
