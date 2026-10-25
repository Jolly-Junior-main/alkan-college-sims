"use server";

import { authenticateUser, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectPath = (formData.get("redirect") as string) || "";

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  const result = await authenticateUser(email, password);
  if (result.error || !result.user) {
    return { error: result.error || "Authentication failed." };
  }

  const role = result.user.role;
  let target = redirectPath;
  if (!target || target === "/portal/login" || target === "/portal") {
    const roleRoutes: Record<string, string> = {
      STUDENT: "/portal/student",
      TEACHER: "/portal/teacher",
      REGISTRAR: "/portal/registrar",
      ADMIN: "/portal/admin",
    };
    target = roleRoutes[role] || "/portal/student";
  }

  redirect(target);
}

export async function quickLoginAction(accountType: "admin" | "registrar" | "dr.alemu" | "dr.senait" | "student1" | "student2") {
  const emailMap: Record<string, string> = {
    admin: "admin@healthcollege.edu",
    registrar: "registrar@healthcollege.edu",
    "dr.alemu": "dr.alemu@healthcollege.edu",
    "dr.senait": "dr.senait@healthcollege.edu",
    student1: "student1@healthcollege.edu",
    student2: "student2@healthcollege.edu",
  };

  const email = emailMap[accountType];
  if (!email) {
    return { error: "Unknown account type." };
  }

  const result = await authenticateUser(email, "password123");
  if (result.error || !result.user) {
    return { error: result.error || "Authentication failed." };
  }

  const roleRoutes: Record<string, string> = {
    STUDENT: "/portal/student",
    TEACHER: "/portal/teacher",
    REGISTRAR: "/portal/registrar",
    ADMIN: "/portal/admin",
  };

  redirect(roleRoutes[result.user.role] || "/portal/student");
}

export async function logoutAction() {
  await clearSession();
  redirect("/portal/login");
}
