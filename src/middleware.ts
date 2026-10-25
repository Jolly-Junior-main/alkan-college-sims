import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "health-college-sims-super-secret-key-2026-secure"
);

const COOKIE_NAME = "sims_session_token";

interface TokenPayload {
  userId: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN";
  name: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /portal routes
  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  // Allow login page and API auth endpoints
  if (pathname === "/portal/login" || pathname === "/portal/forgot-password") {
    // If user is already authenticated, redirect them to their portal
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const user = payload as unknown as TokenPayload;
        const roleRedirects: Record<string, string> = {
          STUDENT: "/portal/student",
          TEACHER: "/portal/teacher",
          REGISTRAR: "/portal/registrar",
          ADMIN: "/portal/admin",
        };
        const dest = roleRedirects[user.role] || "/portal/student";
        return NextResponse.redirect(new URL(dest, request.url));
      } catch {
        // Token invalid, allow access to login page
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/portal/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const user = payload as unknown as TokenPayload;

    // Handle /portal root redirect
    if (pathname === "/portal") {
      const roleRedirects: Record<string, string> = {
        STUDENT: "/portal/student",
        TEACHER: "/portal/teacher",
        REGISTRAR: "/portal/registrar",
        ADMIN: "/portal/admin",
      };
      return NextResponse.redirect(new URL(roleRedirects[user.role] || "/portal/student", request.url));
    }

    // Role-gated route enforcement
    if (pathname.startsWith("/portal/student") && user.role !== "STUDENT") {
      return NextResponse.redirect(new URL(`/portal/${user.role.toLowerCase()}`, request.url));
    }

    if (pathname.startsWith("/portal/teacher") && user.role !== "TEACHER") {
      return NextResponse.redirect(new URL(`/portal/${user.role.toLowerCase()}`, request.url));
    }

    if (pathname.startsWith("/portal/registrar") && user.role !== "REGISTRAR") {
      return NextResponse.redirect(new URL(`/portal/${user.role.toLowerCase()}`, request.url));
    }

    if (pathname.startsWith("/portal/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL(`/portal/${user.role.toLowerCase()}`, request.url));
    }

    return NextResponse.next();
  } catch {
    // Invalid or expired token
    const loginUrl = new URL("/portal/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: ["/portal/:path*"],
};
