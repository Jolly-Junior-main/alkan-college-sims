"use client";

import { useState, useTransition } from "react";
import { submitAdmissionApplication, AdmissionFormData } from "@/actions/admissions-actions";
import {
  User,
  GraduationCap,
  BookOpen,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Copy,
  Printer,
} from "lucide-react";
import Link from "next/link";

interface ProgramOption {
  id: string;
  name: string;
  degreeType: string;
  departmentName: string;
}

interface AdmissionWizardProps {
  programs: ProgramOption[];
}

export function AdmissionWizard({ programs }: AdmissionWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<AdmissionFormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "2005-01-01",
    gender: "FEMALE",
    nationalId: "",
    city: "Addis Ababa",
    address: "",

    highSchool: "",
    completionYear: "2025",
    gpa: "3.80",
    nationalExamScore: "520",

    programId: programs[0]?.id || "",

    documents: [
      "https://storage.healthcollege.edu/docs/high_school_transcript.pdf",
      "https://storage.healthcollege.edu/docs/national_exam_certificate.pdf",
    ],
  });

  function updateField<K extends keyof AdmissionFormData>(field: K, value: AdmissionFormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError("Please fill in all mandatory personal details.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.highSchool || !formData.gpa || !formData.nationalExamScore) {
        setError("Please enter your high school and exam metrics.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.programId) {
        setError("Please select an academic program.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      // Final submission
      startTransition(async () => {
        const res = await submitAdmissionApplication(formData);
        if (!res.success) {
          setError(res.error || "Submission failed.");
        } else {
          setSubmittedRef(res.referenceNo!);
        }
      });
    }
  }

  if (submittedRef) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-lg text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#007A78] flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Application Received Successfully
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] mt-2">
            Welcome to the Alkan Health Scholar Candidate Pool
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Your admission file has been logged in the official Registrar clearance queue.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 uppercase">Your Reference Number:</span>
            <span className="font-mono text-base font-extrabold text-[#0B2545] bg-white px-3 py-1 rounded border shadow-2xs">
              {submittedRef}
            </span>
          </div>

          <div className="text-xs text-slate-700 space-y-1 pt-2 border-t border-slate-200">
            <div>
              Applicant: <strong>{formData.firstName} {formData.lastName}</strong>
            </div>
            <div>
              Email: <strong>{formData.email}</strong>
            </div>
            <div>
              Selected Program: <strong>{programs.find((p) => p.id === formData.programId)?.name}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <Link
            href="/admissions/status"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center justify-center gap-2"
          >
            <span>Track Application Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Confirmation</span>
          </button>
        </div>
      </div>
    );
  }

  const stepsMeta = [
    { num: 1, title: "Personal Details", icon: User },
    { num: 2, title: "Academic Records", icon: GraduationCap },
    { num: 3, title: "Program Selection", icon: BookOpen },
    { num: 4, title: "Documents & Submit", icon: FileCheck },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 border-b pb-6">
        {stepsMeta.map((s) => {
          const Icon = s.icon;
          const isActive = step === s.num;
          const isPassed = step > s.num;

          return (
            <div key={s.num} className="text-center space-y-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#007A78] text-white shadow-md ring-4 ring-teal-100"
                    : isPassed
                    ? "bg-[#0B2545] text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isPassed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div
                className={`text-[11px] font-semibold hidden sm:block ${
                  isActive ? "text-[#007A78]" : "text-slate-500"
                }`}
              >
                Step {s.num}: {s.title}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={handleNextStep} className="space-y-6">
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0B2545]">
              Step 1: Personal & Contact Information
            </h3>
            <p className="text-xs text-slate-500">
              Provide your official name and identification details as they appear on your secondary education certificate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dawit"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Father / Middle Name</label>
                <input
                  type="text"
                  placeholder="e.g. Haile"
                  value={formData.middleName}
                  onChange={(e) => updateField("middleName", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grandfather / Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Demissie"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. dawit.haile@gmail.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+251 9..."
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">City / Region</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">National ID / Kebele ID</label>
                <input
                  type="text"
                  placeholder="ETH-2026-..."
                  value={formData.nationalId}
                  onChange={(e) => updateField("nationalId", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Academic History */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0B2545]">
              Step 2: Academic Records & Secondary School Metrics
            </h3>
            <p className="text-xs text-slate-500">
              Enter your secondary school credentials, Grade 12 completion average, and University Entrance Examination results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Preparatory / Secondary School Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bole Senior Secondary School"
                  value={formData.highSchool}
                  onChange={(e) => updateField("highSchool", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Completion Year</label>
                <input
                  type="text"
                  value={formData.completionYear}
                  onChange={(e) => updateField("completionYear", e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grade 12 GPA (out of 4.00) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3.85"
                  value={formData.gpa}
                  onChange={(e) => updateField("gpa", e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-mono font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  National University Entrance Exam Score *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 540 / 700"
                  value={formData.nationalExamScore}
                  onChange={(e) => updateField("nationalExamScore", e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-mono font-bold text-teal-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Program Selection */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0B2545]">
              Step 3: Academic Program Selection
            </h3>
            <p className="text-xs text-slate-500">
              Select your intended healthcare specialization. All programs are 4-year Bachelor of Science degrees with clinical hospital rotations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.map((p) => {
                const isSelected = formData.programId === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => updateField("programId", p.id)}
                    className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#007A78] bg-teal-50/40 shadow-sm"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-[#0B2545]">{p.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        {p.degreeType}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{p.departmentName}</div>
                    <div className="text-[11px] text-slate-500 mt-2">
                      4 Years • Tikur Anbessa Hospital Clinical Rotations
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Document Uploads & Submit */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0B2545]">
              Step 4: Upload Supporting Credentials & Final Submit
            </h3>
            <p className="text-xs text-slate-500">
              Upload scanned copies of your high school matriculation transcript and national entrance exam certificate.
            </p>

            <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center space-y-2">
              <Upload className="w-8 h-8 text-teal-600 mx-auto" />
              <div className="text-xs font-bold text-slate-700">Digital Document Verification Vault</div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Documents pre-attached for application demonstration. The Registrar Committee will inspect these during review.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <span className="px-3 py-1 rounded bg-white border text-[11px] font-semibold text-slate-700">
                  📄 High_School_Transcript.pdf (Attached)
                </span>
                <span className="px-3 py-1 rounded bg-white border text-[11px] font-semibold text-slate-700">
                  📄 National_Exam_Certificate.pdf (Attached)
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border text-xs text-slate-600">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked required className="rounded mt-0.5 text-[#007A78]" />
                <span>
                  I declare under penalty of academic dismissal that all information entered and supporting records attached are authentic and verifiable with the Ethiopian Ministry of Education.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <span>Submitting Application to College...</span>
            ) : step === 4 ? (
              <span>Finalize & Submit Application</span>
            ) : (
              <>
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
