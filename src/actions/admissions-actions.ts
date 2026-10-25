"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { logAuditTrail } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export interface AdmissionFormData {
  // Step 1: Personal
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationalId?: string;
  city: string;
  address?: string;

  // Step 2: Academic Records
  highSchool: string;
  completionYear: string;
  gpa: string;
  nationalExamScore: string;

  // Step 3: Program Selection
  programId: string;

  // Step 4: Documents
  documents: string[];
}

export async function submitAdmissionApplication(data: AdmissionFormData) {
  try {
    if (!data.firstName || !data.lastName || !data.email || !data.programId) {
      return { success: false, error: "Missing required application fields." };
    }

    const year = new Date().getFullYear();
    // Count existing applications to generate unique reference sequence
    const count = await prisma.application.count();
    const sequence = 1000 + count + 1;
    const referenceNo = `HC-${year}-${sequence}`;

    const personalInfo = {
      firstName: data.firstName.trim(),
      middleName: data.middleName?.trim() || "",
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationalId: data.nationalId || "",
      city: data.city,
      address: data.address || "",
    };

    const academicHistory = {
      highSchool: data.highSchool,
      completionYear: data.completionYear,
      gpa: data.gpa,
      nationalExamScore: data.nationalExamScore,
    };

    const application = await prisma.application.create({
      data: {
        referenceNo,
        personalInfo: JSON.stringify(personalInfo),
        academicHistory: JSON.stringify(academicHistory),
        programId: data.programId,
        documents: JSON.stringify(data.documents || []),
        status: "SUBMITTED",
      },
      include: {
        program: {
          include: {
            department: true,
          },
        },
      },
    });

    await logAuditTrail({
      action: "ADMISSION_APPLY",
      resource: "Application",
      resourceId: application.id,
      diffPayload: { referenceNo, applicantEmail: personalInfo.email },
    });

    return {
      success: true,
      referenceNo,
      applicantName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      programName: application.program.name,
      submittedAt: application.submittedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, error: "An unexpected error occurred while submitting your application." };
  }
}

export async function lookupApplicationStatus(referenceNo: string, email: string) {
  try {
    const cleanRef = referenceNo.trim();
    const cleanEmail = email.toLowerCase().trim();

    const application = await prisma.application.findUnique({
      where: { referenceNo: cleanRef },
      include: {
        program: {
          include: {
            department: true,
          },
        },
      },
    });

    if (!application) {
      return { success: false, error: "No application found with the provided Reference Number." };
    }

    const personal = JSON.parse(application.personalInfo);
    if (personal.email.toLowerCase() !== cleanEmail) {
      return { success: false, error: "The provided email does not match the record for this application." };
    }

    return {
      success: true,
      application: {
        id: application.id,
        referenceNo: application.referenceNo,
        applicantName: `${personal.firstName} ${personal.middleName ? personal.middleName + " " : ""}${personal.lastName}`,
        email: personal.email,
        phone: personal.phone,
        programName: application.program.name,
        departmentName: application.program.department.name,
        status: application.status,
        reviewNotes: application.reviewNotes,
        submittedAt: application.submittedAt,
        updatedAt: application.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error looking up application:", error);
    return { success: false, error: "Failed to query application status." };
  }
}

export async function processApplicationDecision(
  applicationId: string,
  decision: "UNDER_REVIEW" | "APPROVED" | "REJECTED",
  reviewNotes: string
) {
  const session = await requireRole(["REGISTRAR", "ADMIN"]);

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { program: true },
  });

  if (!application) {
    return { success: false, error: "Application not found." };
  }

  const previousStatus = application.status;

  // If approving, provision formal Student Record, Student ID, and User Account!
  let provisionedCredentials = null;

  if (decision === "APPROVED" && previousStatus !== "APPROVED") {
    const personal = JSON.parse(application.personalInfo);
    const applicantEmail = personal.email.toLowerCase();

    // Generate unique student ID number: HC/UG/2026/XXXX
    const studentCount = await prisma.studentProfile.count();
    const seqNum = String(studentCount + 1).padStart(3, "0");
    const year = new Date().getFullYear();
    const studentIdNumber = `HC/UG/${year}/${seqNum}`;

    // Provision User account (if not already existing)
    let user = await prisma.user.findUnique({
      where: { email: applicantEmail },
    });

    const defaultPassword = "password123";
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: applicantEmail,
          passwordHash,
          role: "STUDENT",
          status: "ACTIVE",
          profile: {
            create: {
              firstName: personal.firstName,
              middleName: personal.middleName || null,
              lastName: personal.lastName,
              phone: personal.phone,
              gender: personal.gender,
              nationalId: personal.nationalId || null,
            },
          },
          studentProfile: {
            create: {
              studentIdNumber,
              programId: application.programId,
              academicYear: `${year}/${year + 1}`,
              currentSemester: 1,
            },
          },
        },
      });
    } else {
      // Ensure student role and create student profile if missing
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "STUDENT" },
      });

      const existingSP = await prisma.studentProfile.findUnique({
        where: { userId: user.id },
      });

      if (!existingSP) {
        await prisma.studentProfile.create({
          data: {
            userId: user.id,
            studentIdNumber,
            programId: application.programId,
            academicYear: `${year}/${year + 1}`,
            currentSemester: 1,
          },
        });
      }
    }

    provisionedCredentials = {
      email: applicantEmail,
      studentIdNumber,
      temporaryPassword: defaultPassword,
    };
  }

  const updatedApplication = await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: decision,
      reviewedById: session.userId,
      reviewNotes: reviewNotes || (decision === "APPROVED" ? "Application cleared and approved by Registrar Office." : null),
    },
  });

  await logAuditTrail({
    userId: session.userId,
    action: `ADMISSION_${decision}`,
    resource: "Application",
    resourceId: applicationId,
    diffPayload: {
      referenceNo: application.referenceNo,
      previousStatus,
      newStatus: decision,
      provisionedCredentials,
    },
  });

  revalidatePath("/portal/registrar/admissions");
  return { success: true, application: updatedApplication, provisionedCredentials };
}
