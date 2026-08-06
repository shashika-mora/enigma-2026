"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { exportRegistrationsToCSV, RegistrationData } from "@/lib/csvExport";
import {
  ShieldAlert,
  Search,
  Download,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Users,
  RefreshCw,
  X,
  Check,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Editing state
  const [editingItem, setEditingItem] = useState<RegistrationData | null>(null);
  const [editStatus, setEditStatus] = useState<string>("PENDING");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Default Passcode for Organizers (Can be updated as needed)
  const ADMIN_PASSCODE = "ENIGMA2026";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.info("Firebase auth session notice:", err);
      }
      setIsAuthenticated(true);
      setAuthError("");
      fetchRegistrations();
    } else {
      setAuthError("INVALID PASSCODE — ACCESS DENIED");
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    let combinedList: RegistrationData[] = [];

    // Load local backup cache first
    try {
      const cached = localStorage.getItem("enigma_registrations_cache");
      if (cached) {
        combinedList = JSON.parse(cached);
      }
    } catch (e) {
      console.warn("Local storage read error:", e);
    }

    // Try fetching from Firestore with 12s timeout
    try {
      const firestoreFetch = async () => {
        const snapshot = await getDocs(collection(db, "registrations"));
        const list: RegistrationData[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...(d.data() as any) });
        });
        // Sort locally by submittedAt descending
        list.sort((a, b) => {
          const timeA = typeof a.submittedAt === "string" ? a.submittedAt : "";
          const timeB = typeof b.submittedAt === "string" ? b.submittedAt : "";
          return timeB.localeCompare(timeA);
        });
        return list;
      };

      const timeout = new Promise<RegistrationData[]>((_, reject) =>
        setTimeout(() => reject(new Error("Database fetch timeout")), 12000)
      );

      const firestoreList = await Promise.race([firestoreFetch(), timeout]);
      
      // Merge Firestore list & local list without duplicates
      const seen = new Set<string>();
      const merged: RegistrationData[] = [];

      for (const item of [...firestoreList, ...combinedList]) {
        const key = item.id || `${item.teamName}_${item.leader?.email}`;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      }
      combinedList = merged;
    } catch (err: any) {
      console.info("Firestore fetch notice:", err);
    } finally {
      setRegistrations(combinedList);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  // Filter & Search logic
  const filteredData = registrations.filter((item) => {
    const matchesSearch =
      item.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.university?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leader?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leader?.fullName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || (item.status || "PENDING").toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setRegistrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    try {
      await updateDoc(doc(db, "registrations", id), { status: newStatus });
    } catch (err: any) {
      console.warn("Firestore update notice:", err);
    }
  };

  const handleDelete = async (id: string, teamName: string) => {
    if (confirm(`Are you sure you want to delete dossier for team "${teamName}"? This action cannot be undone.`)) {
      setRegistrations((prev) => prev.filter((item) => item.id !== id));
      try {
        const cached = localStorage.getItem("enigma_registrations_cache");
        if (cached) {
          const list: RegistrationData[] = JSON.parse(cached);
          const updated = list.filter((i) => i.id !== id && i.teamName !== teamName);
          localStorage.setItem("enigma_registrations_cache", JSON.stringify(updated));
        }
      } catch (e) {}

      try {
        await deleteDoc(doc(db, "registrations", id));
      } catch (err: any) {
        console.warn("Firestore delete notice:", err);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingItem || !editingItem.id) return;
    setIsSaving(true);
    const updatedItem = { ...editingItem, status: editStatus };

    setRegistrations((prev) =>
      prev.map((item) => (item.id === editingItem.id ? updatedItem : item))
    );

    try {
      await updateDoc(doc(db, "registrations", editingItem.id), {
        teamName: editingItem.teamName,
        university: editingItem.university,
        status: editStatus,
        leader: editingItem.leader,
        member2: editingItem.member2 || null,
        member3: editingItem.member3 || null,
      });
    } catch (err: any) {
      console.warn("Firestore save notice:", err);
    } finally {
      setIsSaving(false);
      setEditingItem(null);
    }
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] text-[#E5E5E7] flex items-center justify-center p-4 font-mono-code">
        <div className="max-w-md w-full bg-[#1C1C1E] border-2 border-[#D4A843] p-6 sm:p-8 rounded-2xl shadow-[0_0_40px_rgba(212,168,67,0.2)] text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-[#0A0A0A] border border-[#D4A843]">
            <Lock size={32} className="text-[#D4A843]" />
          </div>

          <div>
            <h1 className="font-serif-heading text-2xl font-bold text-[#D4A843] tracking-widest uppercase">
              ORGANIZER ACCESS PORTAL
            </h1>
            <p className="text-xs text-[#8E8E93] mt-1">
              ENIGMA 2026 // BLETCHLEY CLEARANCE
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left text-xs">
            {authError && (
              <div className="p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-400 text-center font-bold">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[#39FF14]">&gt; ENTER_ACCESS_PASSCODE</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter clearance passcode..."
                className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-4 py-3 text-center text-base text-[#D4A843] tracking-widest placeholder-[#8E8E93]/40 focus:border-[#D4A843] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4A843] text-black font-bold rounded-xl hover:bg-[#b88c30] transition-colors tracking-widest uppercase cursor-pointer"
            >
              AUTHENTICATE ACCESS
            </button>
          </form>

          <div className="pt-2 text-[11px] text-[#8E8E93]">
            <Link href="/" className="hover:text-[#D4A843] flex items-center justify-center gap-1">
              <ArrowLeft size={12} /> Return to Main Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E5E5E7] p-4 sm:p-8 font-mono-code">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#B87333]/40 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-[#1C1C1E] border border-[#B87333]/50 rounded-xl hover:border-[#D4A843] transition-colors">
            <ArrowLeft size={18} className="text-[#D4A843]" />
          </Link>
          <div>
            <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#D4A843]">
              REGISTRATION CONTROL CENTER
            </h1>
            <p className="text-xs text-[#8E8E93]">
              TOTAL DOSSIERS SUBMITTED: <span className="text-[#39FF14] font-bold">{registrations.length}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRegistrations}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#1C1C1E] border border-[#B87333] rounded-xl text-xs text-[#E5E5E7] hover:border-[#D4A843] transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-[#D4A843]" : "text-[#D4A843]"} />
            <span>REFRESH</span>
          </button>

          <button
            onClick={() => exportRegistrationsToCSV(filteredData)}
            className="flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#32d611] transition-colors text-xs cursor-pointer shadow-[0_0_15px_rgba(57,255,20,0.3)]"
          >
            <Download size={14} />
            <span>EXPORT TO CSV ({filteredData.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="sm:col-span-2 relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-[#8E8E93]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Team Name, University, Leader Email or Name..."
            className="w-full bg-[#1C1C1E] border border-[#B87333]/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#E5E5E7] placeholder-[#8E8E93]/60 focus:border-[#D4A843] focus:outline-none"
          />
        </div>

        {/* Filter by Status */}
        <div className="flex items-center gap-2 bg-[#1C1C1E] border border-[#B87333]/50 rounded-xl px-3 py-1.5">
          <span className="text-xs text-[#8E8E93] shrink-0">STATUS:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-[#D4A843] font-bold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-[#1C1C1E] text-white">ALL STATUSES</option>
            <option value="PENDING" className="bg-[#1C1C1E] text-[#D4A843]">PENDING</option>
            <option value="APPROVED" className="bg-[#1C1C1E] text-[#39FF14]">APPROVED</option>
            <option value="REJECTED" className="bg-[#1C1C1E] text-red-400">REJECTED</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="max-w-7xl mx-auto bg-[#1C1C1E] border border-[#B87333] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0A0A0A] border-b border-[#B87333]/60 text-[#D4A843] uppercase tracking-wider">
                <th className="p-4">#</th>
                <th className="p-4">Team Name</th>
                <th className="p-4">University</th>
                <th className="p-4 text-center">Members</th>
                <th className="p-4">Leader Info</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B87333]/20 text-[#E5E5E7]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#8E8E93]">
                    LOADING DOSSIERS FROM FIREBASE...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#8E8E93]">
                    NO REGISTRATION RECORDS FOUND.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-[#0A0A0A]/50 transition-colors">
                    <td className="p-4 text-[#8E8E93] font-bold">{index + 1}</td>

                    <td className="p-4 font-bold text-[#E5E5E7] tracking-wider">
                      {item.teamName}
                    </td>

                    <td className="p-4 text-[#8E8E93]">
                      {item.university}
                    </td>

                    <td className="p-4 text-center font-bold">
                      <span className="bg-[#0A0A0A] border border-[#D4A843]/40 text-[#D4A843] px-2.5 py-1 rounded-lg">
                        {item.memberCount || 1}
                      </span>
                    </td>

                    <td className="p-4 space-y-0.5">
                      <div className="font-bold text-[#E5E5E7]">{item.leader?.fullName}</div>
                      <div className="text-[11px] text-[#39FF14]">{item.leader?.email}</div>
                      <div className="text-[10px] text-[#8E8E93]">{item.leader?.phone}</div>
                    </td>

                    <td className="p-4">
                      <select
                        value={item.status || "PENDING"}
                        onChange={(e) => handleStatusChange(item.id!, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-[#0A0A0A] cursor-pointer focus:outline-none ${
                          (item.status || "PENDING") === "APPROVED"
                            ? "text-[#39FF14] border-[#39FF14]/50"
                            : (item.status || "PENDING") === "REJECTED"
                            ? "text-red-400 border-red-500/50"
                            : "text-[#D4A843] border-[#D4A843]/50"
                        }`}
                      >
                        <option value="PENDING" className="text-[#D4A843]">PENDING</option>
                        <option value="APPROVED" className="text-[#39FF14]">APPROVED</option>
                        <option value="REJECTED" className="text-red-400">REJECTED</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingItem({ ...item });
                            setEditStatus(item.status || "PENDING");
                          }}
                          className="p-1.5 bg-[#0A0A0A] border border-[#D4A843]/40 rounded-lg text-[#D4A843] hover:bg-[#D4A843] hover:text-black transition-colors cursor-pointer"
                          title="View / Edit Dossier"
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id!, item.teamName)}
                          className="p-1.5 bg-[#0A0A0A] border border-red-500/40 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete Dossier"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border-2 border-[#D4A843] p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#B87333]/40 pb-3">
              <h2 className="font-serif-heading text-xl font-bold text-[#D4A843]">
                EDIT DOSSIER // {editingItem.teamName}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-[#8E8E93] hover:text-white p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#39FF14]">Team Name</label>
                  <input
                    type="text"
                    value={editingItem.teamName}
                    onChange={(e) => setEditingItem({ ...editingItem, teamName: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl p-2.5 text-white mt-1"
                  />
                </div>

                <div>
                  <label className="text-[#39FF14]">University</label>
                  <input
                    type="text"
                    value={editingItem.university}
                    onChange={(e) => setEditingItem({ ...editingItem, university: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl p-2.5 text-white mt-1"
                  />
                </div>
              </div>

              {/* Leader Card */}
              <div className="p-3 bg-[#0A0A0A] border border-[#D4A843]/40 rounded-xl space-y-2">
                <div className="text-[#D4A843] font-bold">OPERATIVE 01 (LEADER)</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editingItem.leader?.fullName || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        leader: { ...editingItem.leader, fullName: e.target.value },
                      })
                    }
                    placeholder="Full Name"
                    className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                  />
                  <input
                    type="email"
                    value={editingItem.leader?.email || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        leader: { ...editingItem.leader, email: e.target.value },
                      })
                    }
                    placeholder="Email"
                    className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                  />
                  <input
                    type="tel"
                    value={editingItem.leader?.phone || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        leader: { ...editingItem.leader, phone: e.target.value },
                      })
                    }
                    placeholder="Phone"
                    className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                  />
                  <input
                    type="text"
                    value={editingItem.leader?.studentId || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        leader: { ...editingItem.leader, studentId: e.target.value },
                      })
                    }
                    placeholder="Student ID / NIC"
                    className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              {/* Member 2 Card */}
              {editingItem.memberCount >= 2 && (
                <div className="p-3 bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl space-y-2">
                  <div className="text-[#39FF14] font-bold">OPERATIVE 02</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editingItem.member2?.fullName || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member2: { ...editingItem.member2, fullName: e.target.value } as any,
                        })
                      }
                      placeholder="Full Name"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                    <input
                      type="email"
                      value={editingItem.member2?.email || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member2: { ...editingItem.member2, email: e.target.value } as any,
                        })
                      }
                      placeholder="Email"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                    <input
                      type="tel"
                      value={editingItem.member2?.phone || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member2: { ...editingItem.member2, phone: e.target.value } as any,
                        })
                      }
                      placeholder="Phone"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                    <input
                      type="text"
                      value={editingItem.member2?.studentId || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member2: { ...editingItem.member2, studentId: e.target.value } as any,
                        })
                      }
                      placeholder="Student ID / NIC"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Member 3 Card */}
              {editingItem.memberCount === 3 && (
                <div className="p-3 bg-[#0A0A0A] border border-[#B87333]/40 rounded-xl space-y-2">
                  <div className="text-[#B87333] font-bold">OPERATIVE 03</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editingItem.member3?.fullName || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member3: { ...editingItem.member3, fullName: e.target.value } as any,
                        })
                      }
                      placeholder="Full Name"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                    <input
                      type="email"
                      value={editingItem.member3?.email || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member3: { ...editingItem.member3, email: e.target.value } as any,
                        })
                      }
                      placeholder="Email"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                    <input
                      type="tel"
                      value={editingItem.member3?.phone || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member3: { ...editingItem.member3, phone: e.target.value } as any,
                        })
                      }
                      placeholder="Phone"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                    <input
                      type="text"
                      value={editingItem.member3?.studentId || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          member3: { ...editingItem.member3, studentId: e.target.value } as any,
                        })
                      }
                      placeholder="Student ID / NIC"
                      className="bg-[#1C1C1E] border border-gray-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#B87333]/40">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-[#0A0A0A] text-gray-400 rounded-xl hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="px-5 py-2 bg-[#D4A843] text-black font-bold rounded-xl hover:bg-[#b88c30] transition-colors cursor-pointer"
              >
                {isSaving ? "Saving..." : "Save Dossier Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
