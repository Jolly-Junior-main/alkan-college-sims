import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PortalHeader } from "@/components/portal-header";
import { PortalSidebar } from "@/components/portal-sidebar";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSession = await getSession();

  const session = currentSession || {
    userId: "demo-session",
    email: "student1@healthcollege.edu",
    role: "STUDENT" as const,
    name: "Abebe Bikila",
    studentIdNumber: "HC/UG/2026/001",
  };

  let studentDetails = null;
  if (currentSession && session.role === "STUDENT") {
    try {
      const student = await prisma.studentProfile.findFirst({
        where: { userId: session.userId },
        include: {
          program: true,
        },
      });

      if (student) {
        studentDetails = {
          programName: student.program.name,
          academicYear: student.academicYear,
          currentSemester: student.currentSemester,
          status: "ACTIVE MATRICULATION",
        };
      }
    } catch {
      // Ignore in demo/unauthenticated layout
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PortalHeader user={session} studentDetails={studentDetails} />
      <div className="flex-1 flex flex-col md:flex-row">
        <PortalSidebar role={session.role} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
