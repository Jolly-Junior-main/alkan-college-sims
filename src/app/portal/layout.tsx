import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PortalHeader } from "@/components/portal-header";
import { PortalSidebar } from "@/components/portal-sidebar";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If not logged in, render child (like /portal/login) without sidebar/header
  if (!session) {
    return <>{children}</>;
  }

  // If student, fetch student academic status
  let studentDetails = null;
  if (session.role === "STUDENT") {
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
