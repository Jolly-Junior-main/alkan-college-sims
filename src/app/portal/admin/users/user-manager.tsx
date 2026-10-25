"use client";

import { useState, useTransition } from "react";
import { createUser, toggleUserStatus } from "@/actions/admin-actions";
import {
  Users,
  UserPlus,
  Shield,
  CheckCircle2,
  Ban,
  Check,
  AlertCircle,
  Search,
} from "lucide-react";

interface UserItem {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  studentIdNumber?: string;
  programName?: string;
  createdAt: string;
}

interface ProgramOption {
  id: string;
  name: string;
}

interface UserManagerProps {
  users: UserItem[];
  programs: ProgramOption[];
}

export function UserManager({ users, programs }: UserManagerProps) {
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New User Form State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TEACHER" | "REGISTRAR" | "ADMIN">("STUDENT");
  const [programId, setProgramId] = useState(programs[0]?.id || "");

  const filtered = users.filter((u) => {
    if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.studentIdNumber && u.studentIdNumber.toLowerCase().includes(q));
    }
    return true;
  });

  function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const res = await createUser({
        email,
        firstName,
        lastName,
        role,
        programId: role === "STUDENT" ? programId : undefined,
      });

      if (!res.success) {
        setMessage({ type: "error", text: res.error || "Failed to create user." });
      } else {
        setMessage({ type: "success", text: `User ${email} created successfully with role ${role}.` });
        setShowAddModal(false);
        setEmail("");
        setFirstName("");
        setLastName("");
      }
    });
  }

  function handleToggleStatus(userId: string, currentStatus: "ACTIVE" | "SUSPENDED") {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setMessage(null);

    startTransition(async () => {
      const res = await toggleUserStatus(userId, newStatus);
      if (!res.success) {
        setMessage({ type: "error", text: "Failed to update user status." });
      } else {
        setMessage({ type: "success", text: `User account status shifted to ${newStatus}.` });
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          {["ALL", "STUDENT", "TEACHER", "REGISTRAR", "ADMIN"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                roleFilter === r
                  ? "bg-[#0B2545] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#007A78] w-64"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create User</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 border ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B2545] text-white">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Matriculation / Program</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => {
                const badge = {
                  STUDENT: "bg-teal-50 text-teal-800 border-teal-200",
                  TEACHER: "bg-blue-50 text-blue-800 border-blue-200",
                  REGISTRAR: "bg-amber-50 text-amber-800 border-amber-200",
                  ADMIN: "bg-purple-50 text-purple-800 border-purple-200",
                }[u.role];

                return (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${badge}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.studentIdNumber ? (
                        <div>
                          <span className="font-mono font-bold text-[#0B2545]">{u.studentIdNumber}</span>
                          <div className="text-[11px] text-slate-500">{u.programName}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">N/A</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          u.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-red-50 text-red-800 border-red-200"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u.id, u.status)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                          u.status === "ACTIVE"
                            ? "border-red-200 text-red-700 hover:bg-red-50"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {u.status === "ACTIVE" ? "Suspend Account" : "Activate Account"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddUser}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs"
          >
            <h3 className="font-bold text-sm text-[#0B2545]">Provision New System Account</h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
              <input
                type="email"
                required
                placeholder="e.g. j.doe@healthcollege.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">System Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserItem["role"])}
                className="w-full p-2 border rounded-lg font-bold"
              >
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER (Faculty)</option>
                <option value="REGISTRAR">REGISTRAR</option>
                <option value="ADMIN">ADMIN (System Administrator)</option>
              </select>
            </div>

            {role === "STUDENT" && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Academic Program</label>
                <select
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="p-2.5 bg-slate-50 border rounded-lg text-slate-500 text-[11px]">
              Default initial credential password: <strong className="text-slate-800">password123</strong>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-1.5 rounded-lg bg-[#007A78] hover:bg-[#00605E] text-white text-xs font-bold shadow"
              >
                Provision Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
