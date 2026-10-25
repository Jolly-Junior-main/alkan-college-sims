import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "health-college-sims-super-secret-key-2026-secure"
);

export const COOKIE_NAME = "sims_session_token";

export interface SessionPayload {
  userId: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN";
  name: string;
  studentProfileId?: string;
  studentIdNumber?: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED: Authentication required");
  }
  return session;
}

export async function requireRole(allowedRoles: Array<"STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN">): Promise<SessionPayload> {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    throw new Error(`FORBIDDEN: User role '${session.role}' is not authorized for this resource.`);
  }
  return session;
}

export async function authenticateUser(email: string, passwordPlain: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: {
      profile: true,
      studentProfile: {
        include: {
          program: true,
        },
      },
    },
  });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  if (user.status !== "ACTIVE") {
    return { error: "Your account has been suspended. Please contact the administrator." };
  }

  const isMatch = await bcrypt.compare(passwordPlain, user.passwordHash);
  if (!isMatch) {
    return { error: "Invalid email or password" };
  }

  const fullName = user.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : user.email.split("@")[0];

  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    role: user.role as SessionPayload["role"],
    name: fullName,
    studentProfileId: user.studentProfile?.id,
    studentIdNumber: user.studentProfile?.studentIdNumber,
  };

  const token = await createSessionToken(payload);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true, user: payload };
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
