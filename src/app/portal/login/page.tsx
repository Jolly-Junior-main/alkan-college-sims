"use client";

import { useTransition, useState, Suspense } from "react";
import { loginAction, quickLoginAction } from "@/actions/auth-actions";
import { GraduationCap, Lock, Mail, Shield, CheckCircle2, User, KeyRound, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PortalLoginContent() {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "";
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) {
        setErrorMessage(res.error);
      }
    });
  }

  function handleQuickLogin(account: "admin" | "registrar" | "dr.alemu" | "dr.senait" | "student1" | "student2") {
    setErrorMessage(null);
    startTransition(async () => {
      const res = await quickLoginAction(account);
      if (res?.error) {
        setErrorMessage(res.error);
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#081B33] flex flex-col justify-between text-white">
      {/* Top Header */}
      <div className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-[#007A78] flex items-center justify-center text-white shadow">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white">ALKAN HEALTH COLLEGE</div>
            <div className="text-xs text-teal-300 font-medium">SIMS Institutional Portal</div>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded border border-slate-600 hover:border-slate-400 transition-colors"
        >
          ← Return to Public Website
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Institutional Info & Role Guide */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <Shield className="w-3.5 h-3.5" /> AAU SIMS Standard Architecture
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Single Sign-On Academic Portal
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unified authentication gateway for Health College scholars, academic faculty, registrars, and university administrators.
            </p>

            {/* Quick Demo Login Box */}
            <div className="bg-slate-900/70 border border-teal-500/30 rounded-xl p-4 shadow-xl backdrop-blur-sm">
              <div className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>⚡ 1-Click Role Login (Demo Accounts)</span>
              </div>
              <p className="text-[11px] text-slate-300 mb-3">
                Click any role to test its specific features without typing credentials:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleQuickLogin("student1")}
                  className="p-2 rounded bg-[#0B2545] hover:bg-teal-700 border border-slate-700 text-left transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-teal-200">Student 1</div>
                  <div className="text-[10px] text-slate-300">Abebe (BSc Nursing)</div>
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleQuickLogin("student2")}
                  className="p-2 rounded bg-[#0B2545] hover:bg-teal-700 border border-slate-700 text-left transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-teal-200">Student 2</div>
                  <div className="text-[10px] text-slate-300">Tigist (Registration demo)</div>
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleQuickLogin("dr.alemu")}
                  className="p-2 rounded bg-[#134074] hover:bg-teal-700 border border-slate-700 text-left transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-blue-200">Dr. Alemu (Faculty)</div>
                  <div className="text-[10px] text-slate-300">Instructor (Grading)</div>
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleQuickLogin("dr.senait")}
                  className="p-2 rounded bg-[#134074] hover:bg-teal-700 border border-slate-700 text-left transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-blue-200">Dr. Senait (Faculty)</div>
                  <div className="text-[10px] text-slate-300">Instructor (Anatomy)</div>
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleQuickLogin("registrar")}
                  className="p-2 rounded bg-amber-950/60 hover:bg-amber-800 border border-amber-600/40 text-left transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-amber-200">Registrar Office</div>
                  <div className="text-[10px] text-amber-300">Clearance & Publish</div>
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleQuickLogin("admin")}
                  className="p-2 rounded bg-purple-950/60 hover:bg-purple-800 border border-purple-600/40 text-left transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                >
                  <div className="font-bold text-purple-200">Administrator</div>
                  <div className="text-[10px] text-purple-300">Curriculum & Users</div>
                </button>
              </div>

              <div className="mt-3 text-[10px] text-slate-400">
                Default password for all accounts: <code className="text-teal-300 bg-black/40 px-1 py-0.5 rounded">password123</code>
              </div>
            </div>
          </div>

          {/* Standard Login Card */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-2xl p-7 text-slate-900 shadow-2xl border border-slate-200">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0B2545]">Sign In to Your Account</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your registered institutional email and password to access your role dashboard.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <Shield className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input type="hidden" name="redirect" value={redirectParam} />

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g., student1@healthcollege.edu"
                      defaultValue="student1@healthcollege.edu"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007A78] focus:border-transparent text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Account Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••••••"
                      defaultValue="password123"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007A78] focus:border-transparent text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#007A78] focus:ring-[#007A78]" />
                    <span>Keep me logged in on this browser</span>
                  </label>
                  <span className="text-[#007A78] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isPending ? (
                    <span>Authenticating Credentials...</span>
                  ) : (
                    <>
                      <span>Secure Portal Login</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
                <span>Prospective applicant?</span>
                <Link href="/admissions" className="font-semibold text-[#007A78] hover:underline">
                  Start Online Admission Application →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-slate-400 border-t border-slate-800">
        © 2026 Alkan Health Sciences College. Academic Management Security System.
      </div>
    </div>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B2545] flex items-center justify-center text-white text-xs">
          Loading Academic Management Portal...
        </div>
      }
    >
      <PortalLoginContent />
    </Suspense>
  );
}
