const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? 1 : 0;
  if (typeof val === "number") return val;
  if (val instanceof Date) return `'${val.toISOString()}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function main() {
  const lines = [];

  const tables = [
    { name: "User", data: await prisma.user.findMany() },
    { name: "Profile", data: await prisma.profile.findMany() },
    { name: "Department", data: await prisma.department.findMany() },
    { name: "Program", data: await prisma.program.findMany() },
    { name: "StudentProfile", data: await prisma.studentProfile.findMany() },
    { name: "Course", data: await prisma.course.findMany() },
    { name: "CourseAssignment", data: await prisma.courseAssignment.findMany() },
    { name: "Application", data: await prisma.application.findMany() },
    { name: "CourseRegistration", data: await prisma.courseRegistration.findMany() },
    { name: "RegistrationItem", data: await prisma.registrationItem.findMany() },
    { name: "Grade", data: await prisma.grade.findMany() },
    { name: "GradeChangeRequest", data: await prisma.gradeChangeRequest.findMany() },
    { name: "Announcement", data: await prisma.announcement.findMany() },
    { name: "AuditTrail", data: await prisma.auditTrail.findMany() },
  ];

  for (const t of tables) {
    if (t.data.length === 0) continue;
    for (const row of t.data) {
      const keys = Object.keys(row);
      const cols = keys.map((k) => `"${k}"`).join(", ");
      const vals = keys.map((k) => escapeSql(row[k])).join(", ");
      lines.push(`INSERT OR REPLACE INTO "${t.name}" (${cols}) VALUES (${vals});`);
    }
  }

  fs.writeFileSync(path.join(__dirname, "seed.sql"), lines.join("\n"), "utf8");
  console.log(`Generated seed.sql with ${lines.length} insert statements.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
