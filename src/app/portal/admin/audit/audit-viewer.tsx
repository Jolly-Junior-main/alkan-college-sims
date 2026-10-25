"use client";

import { useState } from "react";
import { Shield, Search, Eye, Filter } from "lucide-react";

interface AuditItem {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress?: string | null;
  timestamp: string;
  userName: string;
  userEmail: string;
  diffPayload?: string | null;
}

interface AuditViewerProps {
  logs: AuditItem[];
}

export function AuditViewer({ logs }: AuditViewerProps) {
  const [search, setSearch] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditItem | null>(null);

  const filtered = logs.filter((log) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) ||
      log.resource.toLowerCase().includes(q) ||
      log.resourceId.toLowerCase().includes(q) ||
      log.userName.toLowerCase().includes(q) ||
      log.userEmail.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by action, user, resource ID, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007A78]"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Logged Events: <strong className="text-slate-900">{filtered.length}</strong>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Initiating User</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4 text-right">Payload Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B2545]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border text-[11px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {log.resource} ({log.resourceId.slice(0, 8)}...)
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{log.userName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{log.userEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                    {log.ipAddress || "127.0.0.1"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {log.diffPayload ? (
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#007A78] hover:underline cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect JSON</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 italic">No Payload</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect JSON Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#0B2545] bg-slate-100 px-2 py-0.5 rounded border">
                  {selectedLog.action}
                </span>
                <div className="text-xs text-slate-500 mt-1">
                  Event ID: <span className="font-mono">{selectedLog.id}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-700 mb-1">Audit Record Diff Payload:</div>
              <pre className="p-4 bg-slate-900 text-teal-300 rounded-xl text-xs font-mono overflow-x-auto max-h-72">
                {(() => {
                  try {
                    return JSON.stringify(JSON.parse(selectedLog.diffPayload || "{}"), null, 2);
                  } catch {
                    return selectedLog.diffPayload;
                  }
                })()}
              </pre>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
