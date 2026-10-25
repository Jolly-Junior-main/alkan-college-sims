import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { prisma } from "@/lib/prisma";
import { Bell, Calendar, ShieldCheck } from "lucide-react";

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#007A78]">
            Campus News & Circulars
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] mt-1">
            Official Announcements & Academic Calendar
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Stay updated with academic notices, exam timetables, clinical attachment orientations, and registration deadlines.
          </p>
        </div>

        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                </div>
                {ann.isPinned && (
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                    OFFICIAL NOTIFICATION
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">{ann.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ann.content}</p>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
