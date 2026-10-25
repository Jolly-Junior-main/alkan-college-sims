import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserManager } from "./user-manager";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session) return null;

  const [users, programs] = await Promise.all([
    prisma.user.findMany({
      include: {
        profile: true,
        studentProfile: {
          include: {
            program: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.program.findMany({ orderBy: { name: "asc" } }),
  ]);

  const mappedUsers = users.map((u) => {
    const fullName = u.profile
      ? `${u.profile.firstName} ${u.profile.lastName}`
      : u.email.split("@")[0];

    return {
      id: u.id,
      email: u.email,
      name: fullName,
      role: u.role as "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN",
      status: u.status as "ACTIVE" | "SUSPENDED",
      studentIdNumber: u.studentProfile?.studentIdNumber,
      programName: u.studentProfile?.program.name,
      createdAt: u.createdAt.toISOString(),
    };
  });

  const mappedPrograms = programs.map((p) => ({
    id: p.id,
    name: p.name,
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
        <h1 className="text-xl font-bold text-[#0B2545]">User Accounts & Role Governance</h1>
        <p className="text-xs text-slate-500">
          Supervise role permissions, provision new faculty and student credentials, and toggle account access.
        </p>
      </div>

      <UserManager users={mappedUsers} programs={mappedPrograms} />
    </div>
  );
}
