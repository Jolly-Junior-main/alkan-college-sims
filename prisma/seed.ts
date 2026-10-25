import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export function calculateGrade(total: number) {
  if (total >= 85) return { letter: "A", point: 4.0 };
  if (total >= 80) return { letter: "A-", point: 3.75 };
  if (total >= 75) return { letter: "B+", point: 3.5 };
  if (total >= 70) return { letter: "B", point: 3.0 };
  if (total >= 65) return { letter: "B-", point: 2.75 };
  if (total >= 60) return { letter: "C+", point: 2.5 };
  if (total >= 50) return { letter: "C", point: 2.0 };
  if (total >= 40) return { letter: "D", point: 1.0 };
  return { letter: "F", point: 0.0 };
}

async function main() {
  console.log("Cleaning existing database...");
  await prisma.auditTrail.deleteMany({});
  await prisma.gradeChangeRequest.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.registrationItem.deleteMany({});
  await prisma.courseRegistration.deleteMany({});
  await prisma.courseAssignment.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);

  console.log("Creating Departments...");
  const deptNursing = await prisma.department.create({
    data: {
      name: "Department of Nursing",
      code: "NURS",
      faculty: "Faculty of Health Sciences",
    },
  });

  const deptPublicHealth = await prisma.department.create({
    data: {
      name: "Department of Public Health",
      code: "PUBH",
      faculty: "Faculty of Health Sciences",
    },
  });

  const deptPharmacy = await prisma.department.create({
    data: {
      name: "Department of Pharmacy",
      code: "PHARM",
      faculty: "Faculty of Pharmaceutical Sciences",
    },
  });

  const deptMLS = await prisma.department.create({
    data: {
      name: "Department of Medical Laboratory Sciences",
      code: "MLS",
      faculty: "Faculty of Health Sciences",
    },
  });

  console.log("Creating Programs...");
  const progNursing = await prisma.program.create({
    data: {
      name: "BSc in Nursing",
      departmentId: deptNursing.id,
      degreeType: "BSC",
      totalCreditsRequired: 136,
    },
  });

  const progPublicHealth = await prisma.program.create({
    data: {
      name: "BSc in Public Health",
      departmentId: deptPublicHealth.id,
      degreeType: "BSC",
      totalCreditsRequired: 132,
    },
  });

  const progPharmacy = await prisma.program.create({
    data: {
      name: "BSc in Pharmacy",
      departmentId: deptPharmacy.id,
      degreeType: "BSC",
      totalCreditsRequired: 140,
    },
  });

  const progMLS = await prisma.program.create({
    data: {
      name: "BSc in Medical Laboratory Science",
      departmentId: deptMLS.id,
      degreeType: "BSC",
      totalCreditsRequired: 134,
    },
  });

  console.log("Creating Core Courses...");
  const courseNurs201 = await prisma.course.create({
    data: {
      code: "NURS201",
      title: "Fundamentals of Nursing Practice",
      creditHours: 3,
      lectureHours: 2,
      labHours: 3,
      departmentId: deptNursing.id,
      semester: 1,
      yearLevel: 2,
    },
  });

  const courseNurs203 = await prisma.course.create({
    data: {
      code: "NURS203",
      title: "Advanced Human Anatomy & Physiology",
      creditHours: 4,
      lectureHours: 3,
      labHours: 3,
      departmentId: deptNursing.id,
      semester: 1,
      yearLevel: 2,
    },
  });

  const coursePubh201 = await prisma.course.create({
    data: {
      code: "PUBH201",
      title: "Principles of Epidemiology & Disease Control",
      creditHours: 3,
      lectureHours: 3,
      labHours: 0,
      departmentId: deptPublicHealth.id,
      semester: 1,
      yearLevel: 2,
    },
  });

  const coursePubh205 = await prisma.course.create({
    data: {
      code: "PUBH205",
      title: "Biostatistics for Health Sciences",
      creditHours: 3,
      lectureHours: 2,
      labHours: 2,
      departmentId: deptPublicHealth.id,
      semester: 1,
      yearLevel: 2,
    },
  });

  // Additional 2 curriculum courses for realistic registration credit calculation
  const courseNurs205 = await prisma.course.create({
    data: {
      code: "NURS205",
      title: "Health Assessment & Clinical Diagnostics",
      creditHours: 3,
      lectureHours: 2,
      labHours: 3,
      departmentId: deptNursing.id,
      semester: 1,
      yearLevel: 2,
    },
  });

  const coursePubh207 = await prisma.course.create({
    data: {
      code: "PUBH207",
      title: "Environmental & Occupational Health",
      creditHours: 3,
      lectureHours: 3,
      labHours: 0,
      departmentId: deptPublicHealth.id,
      semester: 1,
      yearLevel: 2,
    },
  });

  console.log("Creating Admin & Registrar...");
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@healthcollege.edu",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "System",
          middleName: "Super",
          lastName: "Administrator",
          phone: "+251911000001",
          gender: "MALE",
        },
      },
    },
  });

  const registrarUser = await prisma.user.create({
    data: {
      email: "registrar@healthcollege.edu",
      passwordHash,
      role: "REGISTRAR",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Ermias",
          middleName: "Kassahun",
          lastName: "Bekele",
          phone: "+251911000002",
          gender: "MALE",
        },
      },
    },
  });

  console.log("Creating Instructors...");
  const drAlemu = await prisma.user.create({
    data: {
      email: "dr.alemu@healthcollege.edu",
      passwordHash,
      role: "TEACHER",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Alemu",
          middleName: "Kebede",
          lastName: "Mengistu",
          phone: "+251911123456",
          gender: "MALE",
        },
      },
    },
  });

  const drSenait = await prisma.user.create({
    data: {
      email: "dr.senait@healthcollege.edu",
      passwordHash,
      role: "TEACHER",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Senait",
          middleName: "Tadesse",
          lastName: "Wolde",
          phone: "+251911654321",
          gender: "FEMALE",
        },
      },
    },
  });

  console.log("Creating Course Assignments for Teachers...");
  await prisma.courseAssignment.create({
    data: {
      courseId: courseNurs201.id,
      teacherId: drAlemu.id,
      academicYear: "2026/2027",
      semester: 1,
      section: "Section A",
    },
  });

  await prisma.courseAssignment.create({
    data: {
      courseId: coursePubh201.id,
      teacherId: drAlemu.id,
      academicYear: "2026/2027",
      semester: 1,
      section: "Section A",
    },
  });

  await prisma.courseAssignment.create({
    data: {
      courseId: courseNurs203.id,
      teacherId: drSenait.id,
      academicYear: "2026/2027",
      semester: 1,
      section: "Section A",
    },
  });

  await prisma.courseAssignment.create({
    data: {
      courseId: coursePubh205.id,
      teacherId: drSenait.id,
      academicYear: "2026/2027",
      semester: 1,
      section: "Section A",
    },
  });

  console.log("Creating 4 Students...");
  const student1User = await prisma.user.create({
    data: {
      email: "student1@healthcollege.edu",
      passwordHash,
      role: "STUDENT",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Abebe",
          middleName: "Bikila",
          lastName: "Desta",
          phone: "+251920111111",
          gender: "MALE",
          nationalId: "ETH-2026-9011",
        },
      },
      studentProfile: {
        create: {
          studentIdNumber: "HC/UG/2026/001",
          programId: progNursing.id,
          academicYear: "2026/2027",
          currentSemester: 1,
        },
      },
    },
    include: { studentProfile: true },
  });

  const student2User = await prisma.user.create({
    data: {
      email: "student2@healthcollege.edu",
      passwordHash,
      role: "STUDENT",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Tigist",
          middleName: "Assefa",
          lastName: "Tilahun",
          phone: "+251920222222",
          gender: "FEMALE",
          nationalId: "ETH-2026-9012",
        },
      },
      studentProfile: {
        create: {
          studentIdNumber: "HC/UG/2026/002",
          programId: progNursing.id,
          academicYear: "2026/2027",
          currentSemester: 1,
        },
      },
    },
    include: { studentProfile: true },
  });

  const student3User = await prisma.user.create({
    data: {
      email: "student3@healthcollege.edu",
      passwordHash,
      role: "STUDENT",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Chala",
          middleName: "Bekele",
          lastName: "Oljira",
          phone: "+251920333333",
          gender: "MALE",
          nationalId: "ETH-2026-9013",
        },
      },
      studentProfile: {
        create: {
          studentIdNumber: "HC/UG/2026/003",
          programId: progPublicHealth.id,
          academicYear: "2026/2027",
          currentSemester: 1,
        },
      },
    },
    include: { studentProfile: true },
  });

  const student4User = await prisma.user.create({
    data: {
      email: "student4@healthcollege.edu",
      passwordHash,
      role: "STUDENT",
      status: "ACTIVE",
      profile: {
        create: {
          firstName: "Hana",
          middleName: "Girma",
          lastName: "Zewdu",
          phone: "+251920444444",
          gender: "FEMALE",
          nationalId: "ETH-2026-9014",
        },
      },
      studentProfile: {
        create: {
          studentIdNumber: "HC/UG/2026/004",
          programId: progPublicHealth.id,
          academicYear: "2026/2027",
          currentSemester: 1,
        },
      },
    },
    include: { studentProfile: true },
  });

  const sp1 = student1User.studentProfile!;
  const sp2 = student2User.studentProfile!;
  const sp3 = student3User.studentProfile!;
  const sp4 = student4User.studentProfile!;

  console.log("Creating Course Registrations...");
  // Student 1: Approved registration
  const reg1 = await prisma.courseRegistration.create({
    data: {
      studentId: sp1.id,
      academicYear: "2026/2027",
      semester: 1,
      status: "APPROVED",
      approvedById: registrarUser.id,
      approvedAt: new Date(),
      items: {
        create: [
          { courseId: courseNurs201.id },
          { courseId: courseNurs203.id },
          { courseId: courseNurs205.id },
        ],
      },
    },
  });

  // Student 2: Submitted registration (Registrar can review and approve)
  const reg2 = await prisma.courseRegistration.create({
    data: {
      studentId: sp2.id,
      academicYear: "2026/2027",
      semester: 1,
      status: "SUBMITTED",
      items: {
        create: [
          { courseId: courseNurs201.id },
          { courseId: courseNurs203.id },
          { courseId: courseNurs205.id },
        ],
      },
    },
  });

  // Student 3: Approved registration
  const reg3 = await prisma.courseRegistration.create({
    data: {
      studentId: sp3.id,
      academicYear: "2026/2027",
      semester: 1,
      status: "APPROVED",
      approvedById: registrarUser.id,
      approvedAt: new Date(),
      items: {
        create: [
          { courseId: coursePubh201.id },
          { courseId: coursePubh205.id },
          { courseId: coursePubh207.id },
        ],
      },
    },
  });

  // Student 4: Draft registration (Student can add/remove and submit)
  const reg4 = await prisma.courseRegistration.create({
    data: {
      studentId: sp4.id,
      academicYear: "2026/2027",
      semester: 1,
      status: "DRAFT",
      items: {
        create: [
          { courseId: coursePubh201.id },
        ],
      },
    },
  });

  console.log("Seeding Grades across various states (PUBLISHED, SUBMITTED, DRAFT)...");
  // Student 1: Grades published (visible in student portal)
  const g1Nurs201 = calculateGrade(42 + 45); // 87 -> A (4.0)
  await prisma.grade.create({
    data: {
      studentId: sp1.id,
      courseId: courseNurs201.id,
      assessmentMarks: 42,
      examMarks: 45,
      totalMarks: 87,
      letterGrade: g1Nurs201.letter,
      gradePoint: g1Nurs201.point,
      status: "PUBLISHED",
      submittedById: drAlemu.id,
      approvedById: registrarUser.id,
      publishedAt: new Date(),
    },
  });

  const g1Nurs203 = calculateGrade(38 + 42); // 80 -> A- (3.75)
  await prisma.grade.create({
    data: {
      studentId: sp1.id,
      courseId: courseNurs203.id,
      assessmentMarks: 38,
      examMarks: 42,
      totalMarks: 80,
      letterGrade: g1Nurs203.letter,
      gradePoint: g1Nurs203.point,
      status: "PUBLISHED",
      submittedById: drSenait.id,
      approvedById: registrarUser.id,
      publishedAt: new Date(),
    },
  });

  // Student 3: Grade published
  const g3Pubh201 = calculateGrade(40 + 44); // 84 -> A- (3.75)
  await prisma.grade.create({
    data: {
      studentId: sp3.id,
      courseId: coursePubh201.id,
      assessmentMarks: 40,
      examMarks: 44,
      totalMarks: 84,
      letterGrade: g3Pubh201.letter,
      gradePoint: g3Pubh201.point,
      status: "PUBLISHED",
      submittedById: drAlemu.id,
      approvedById: registrarUser.id,
      publishedAt: new Date(),
    },
  });

  // Student 2: Grade submitted to registrar (ready for registrar to review and publish)
  const g2Nurs201 = calculateGrade(36 + 39); // 75 -> B+ (3.5)
  const gradeSubmitted = await prisma.grade.create({
    data: {
      studentId: sp2.id,
      courseId: courseNurs201.id,
      assessmentMarks: 36,
      examMarks: 39,
      totalMarks: 75,
      letterGrade: g2Nurs201.letter,
      gradePoint: g2Nurs201.point,
      status: "SUBMITTED",
      submittedById: drAlemu.id,
    },
  });

  // Student 2: Grade draft (ready for teacher to grade)
  await prisma.grade.create({
    data: {
      studentId: sp2.id,
      courseId: courseNurs203.id,
      assessmentMarks: 30,
      examMarks: 32,
      totalMarks: 62,
      letterGrade: "C+",
      gradePoint: 2.5,
      status: "DRAFT",
      submittedById: drSenait.id,
    },
  });

  console.log("Creating Grade Change Request sample...");
  await prisma.gradeChangeRequest.create({
    data: {
      gradeId: gradeSubmitted.id,
      previousTotalMarks: 75,
      proposedTotalMarks: 81,
      reason: "Calculation error in continuous assessment laboratory evaluation (Rubric sheet recount)",
      requestedById: drAlemu.id,
      status: "PENDING",
      auditNote: "Instructor submitted laboratory logbook verification.",
    },
  });

  console.log("Creating Admissions Applications...");
  await prisma.application.create({
    data: {
      referenceNo: "HC-2026-1001",
      personalInfo: JSON.stringify({
        firstName: "Dawit",
        middleName: "Haile",
        lastName: "Demissie",
        email: "dawit.haile@gmail.com",
        phone: "+251912345678",
        gender: "MALE",
        dateOfBirth: "2004-05-14",
        city: "Addis Ababa",
      }),
      academicHistory: JSON.stringify({
        highSchool: "Bole Secondary School",
        completionYear: "2025",
        gpa: "3.85",
        nationalExamScore: "542/700",
      }),
      programId: progNursing.id,
      documents: JSON.stringify([
        "https://example.com/docs/matric_transcript.pdf",
        "https://example.com/docs/national_id_scan.jpg",
      ]),
      status: "SUBMITTED",
    },
  });

  await prisma.application.create({
    data: {
      referenceNo: "HC-2026-1002",
      personalInfo: JSON.stringify({
        firstName: "Meron",
        middleName: "Bekele",
        lastName: "Asfaw",
        email: "meron.asfaw@yahoo.com",
        phone: "+251923456789",
        gender: "FEMALE",
        dateOfBirth: "2003-11-20",
        city: "Hawassa",
      }),
      academicHistory: JSON.stringify({
        highSchool: "Hawassa Tabor High School",
        completionYear: "2025",
        gpa: "3.92",
        nationalExamScore: "565/700",
      }),
      programId: progPublicHealth.id,
      documents: JSON.stringify([
        "https://example.com/docs/high_school_diploma.pdf",
      ]),
      status: "APPROVED",
      reviewedById: registrarUser.id,
      reviewNotes: "Strong academic record in biological sciences. Approved for BSc Public Health.",
    },
  });

  await prisma.application.create({
    data: {
      referenceNo: "HC-2026-1003",
      personalInfo: JSON.stringify({
        firstName: "Yohannes",
        middleName: "Tesfaye",
        lastName: "Kidanemariam",
        email: "yohannes.t@gmail.com",
        phone: "+251934567890",
        gender: "MALE",
        dateOfBirth: "2004-01-09",
        city: "Adama",
      }),
      academicHistory: JSON.stringify({
        highSchool: "Adama Comprehensive High School",
        completionYear: "2025",
        gpa: "3.60",
        nationalExamScore: "498/700",
      }),
      programId: progPharmacy.id,
      documents: JSON.stringify([
        "https://example.com/docs/transcript_adama.pdf",
      ]),
      status: "UNDER_REVIEW",
      reviewedById: registrarUser.id,
      reviewNotes: "Pending confirmation of chemistry prerequisite score.",
    },
  });

  console.log("Creating Announcements...");
  await prisma.announcement.create({
    data: {
      title: "Welcome to Academic Year 2026/2027 Semester I Course Registration",
      slug: "welcome-academic-year-2026-2027-registration",
      content:
        "The Office of the Registrar announces that regular online course registration for Semester I is officially open. All health science students must confirm their pre-matched curriculum courses and obtain clearance from the registrar before October 31, 2026.",
      targetRoles: "STUDENT,REGISTRAR",
      isPinned: true,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "Continuous Assessment & Midterm Submission Schedule for Instructors",
      slug: "continuous-assessment-submission-schedule",
      content:
        "All academic staff are reminded that Continuous Assessment grades (comprising 50% of the overall evaluation) must be submitted via the Teacher Portal Grade Sheet Engine by the end of Week 10.",
      targetRoles: "TEACHER,ADMIN",
      isPinned: true,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "Clinical Attachment Orientation at Tikur Anbessa Specialized Hospital",
      slug: "clinical-attachment-orientation",
      content:
        "Second and Third Year Nursing and Public Health students assigned to clinical attachments must attend the mandatory infection prevention and clinical protocol orientation this Friday in Auditorium B.",
      targetRoles: "STUDENT,TEACHER",
      isPinned: false,
    },
  });

  console.log("Creating Initial Audit Trails...");
  await prisma.auditTrail.create({
    data: {
      userId: adminUser.id,
      action: "SYSTEM_INITIALIZE",
      resource: "System",
      resourceId: "ROOT",
      diffPayload: JSON.stringify({ status: "Initialized with baseline academic structure" }),
      ipAddress: "127.0.0.1",
    },
  });

  await prisma.auditTrail.create({
    data: {
      userId: registrarUser.id,
      action: "GRADE_PUBLISH",
      resource: "Grade",
      resourceId: courseNurs201.id,
      diffPayload: JSON.stringify({ course: "NURS201", status: "PUBLISHED", studentId: sp1.id }),
      ipAddress: "192.168.1.10",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
