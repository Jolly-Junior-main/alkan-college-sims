import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { prisma } from "@/lib/prisma";
import { Bell, Calendar, ShieldCheck, Megaphone, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Campus News & Announcements | ALKAN College",
  description: "Official bulletins, academic calendar notices, admission deadlines, and remedial program announcements from ALKAN Health Science, Business & Technology College.",
};

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#062667] via-[#0B2545] to-[#134074] text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBE704] text-xs font-semibold border border-white/20">
            <Megaphone className="w-4 h-4 text-[#FBE704]" /> Institutional Bulletin Board
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Campus Announcements & Academic Notices
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Stay informed with the latest updates from the Office of the Registrar, Academic Vice Presidents, and Campus Dean Offices across Addis Ababa, Bahir Dar, and Dessie.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="text-base font-bold text-slate-700">No Announcements Found</h2>
            <p className="text-xs text-slate-500">Check back shortly for official notifications.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3 hover:border-[#062667] transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{new Date(ann.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                  {ann.isPinned && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#1b7a3e] text-[10px] font-bold border border-emerald-200">
                      OFFICIAL NOTICE
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#062667]">{ann.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
