"use client";

import { Printer } from "lucide-react";

export function PrintTranscriptButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-bold shadow transition-all cursor-pointer"
    >
      <Printer className="w-4 h-4" />
      <span>Print / Download Unofficial Transcript</span>
    </button>
  );
}
