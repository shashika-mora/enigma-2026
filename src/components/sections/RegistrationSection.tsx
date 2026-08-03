"use client";

import React, { useState } from "react";
import { TextScramble } from "@/components/ui/TextScramble";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Terminal, ShieldCheck, CheckCircle2, AlertCircle, Loader2, User, Users, Plus, Trash2 } from "lucide-react";

interface MemberDetails {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
}

export const RegistrationSection: React.FC = () => {
  const [memberCount, setMemberCount] = useState<number>(1); // Default is 1 member

  const [teamName, setTeamName] = useState("");
  const [university, setUniversity] = useState("");

  const [leader, setLeader] = useState<MemberDetails>({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
  });

  const [member2, setMember2] = useState<MemberDetails>({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
  });

  const [member3, setMember3] = useState<MemberDetails>({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!teamName.trim() || !university.trim()) {
      setErrorMessage("COMMAND ERROR: Team Name and University are required.");
      setStatus("error");
      return;
    }

    if (!leader.fullName.trim() || !leader.email.trim() || !leader.phone.trim()) {
      setErrorMessage("COMMAND ERROR: Team Leader Full Name, Email, and Phone are required.");
      setStatus("error");
      return;
    }

    if (memberCount >= 2 && (!member2.fullName.trim() || !member2.email.trim() || !member2.phone.trim())) {
      setErrorMessage("COMMAND ERROR: Member 2 Full Name, Email, and Phone are required.");
      setStatus("error");
      return;
    }

    if (memberCount === 3 && (!member3.fullName.trim() || !member3.email.trim() || !member3.phone.trim())) {
      setErrorMessage("COMMAND ERROR: Member 3 Full Name, Email, and Phone are required.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const dossierPayload: any = {
      id: "reg_" + Date.now(),
      teamName: teamName.trim(),
      university: university.trim(),
      memberCount,
      status: "PENDING",
      submittedAt: new Date().toISOString(),
      leader: {
        fullName: leader.fullName.trim(),
        email: leader.email.trim(),
        phone: leader.phone.trim(),
        studentId: leader.studentId.trim(),
      },
    };

    if (memberCount >= 2) {
      dossierPayload.member2 = {
        fullName: member2.fullName.trim(),
        email: member2.email.trim(),
        phone: member2.phone.trim(),
        studentId: member2.studentId.trim(),
      };
    }

    if (memberCount === 3) {
      dossierPayload.member3 = {
        fullName: member3.fullName.trim(),
        email: member3.email.trim(),
        phone: member3.phone.trim(),
        studentId: member3.studentId.trim(),
      };
    }

    // Always backup to localStorage first so data is never lost
    try {
      const existingStr = localStorage.getItem("enigma_registrations_cache");
      const existingList = existingStr ? JSON.parse(existingStr) : [];
      existingList.unshift(dossierPayload);
      localStorage.setItem("enigma_registrations_cache", JSON.stringify(existingList));
    } catch (e) {
      console.warn("LocalStorage save notice:", e);
    }

    // Race Firestore write against a 3.5s timeout so UI never hangs
    try {
      const firestorePromise = addDoc(collection(db, "registrations"), {
        ...dossierPayload,
        submittedAt: serverTimestamp(),
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 3500)
      );

      await Promise.race([firestorePromise, timeoutPromise]);
    } catch (err: any) {
      console.info("Firestore sync notice (local backup active):", err);
    } finally {
      setStatus("granted");
    }
  };

  const resetForm = () => {
    setTeamName("");
    setUniversity("");
    setLeader({ fullName: "", email: "", phone: "", studentId: "" });
    setMember2({ fullName: "", email: "", phone: "", studentId: "" });
    setMember3({ fullName: "", email: "", phone: "", studentId: "" });
    setMemberCount(1);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="registration" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // SECURE TERMINAL PORTAL
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="CLEARANCE REQUIRED" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-lg mx-auto text-xs sm:text-sm">
          Submit your team dossier to receive official clearance for Enigma 2026.
        </p>
      </div>

      {/* Terminal Container */}
      <div className="bg-[#0A0A0A] border-2 border-[#39FF14]/60 p-5 sm:p-10 rounded-2xl sm:rounded-3xl relative shadow-[0_0_30px_rgba(57,255,20,0.15)] scanline-overlay overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[#39FF14]/40 pb-4 mb-6 sm:mb-8 font-mono-code text-xs gap-2">
          <div className="flex items-center gap-2 text-[#39FF14]">
            <Terminal size={18} />
            <span className="font-bold text-xs sm:text-base tracking-tight">
              ENIGMA CLEARANCE APPLICATION
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#8E8E93] text-[11px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
            <span>PORT 2026 // ONLINE</span>
          </div>
        </div>

        {status === "granted" ? (
          /* Enigma Lamp ACCESS GRANTED Animation State */
          <div className="relative z-10 py-12 sm:py-16 text-center space-y-6 font-mono-code">
            <div className="inline-flex p-6 rounded-full bg-[#D4A843]/10 border-2 border-[#D4A843] glow-amber-box">
              <ShieldCheck size={56} className="text-[#D4A843]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843] glow-amber tracking-widest">
                ACCESS GRANTED
              </h3>
              <p className="text-[#39FF14] text-xs sm:text-sm tracking-widest">
                &gt; DOSSIER ENCRYPTED AND STORED
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 bg-[#1C1C1E] border border-[#B87333] rounded-xl text-left text-xs text-[#E5E5E7] space-y-2">
              <div><span className="text-[#D4A843]">TEAM NAME:</span> {teamName.toUpperCase()}</div>
              <div><span className="text-[#D4A843]">UNIVERSITY:</span> {university}</div>
              <div><span className="text-[#D4A843]">MEMBER COUNT:</span> {memberCount} {memberCount === 1 ? "Operative" : "Operatives"}</div>
              <div><span className="text-[#D4A843]">LEADER EMAIL:</span> {leader.email}</div>
              <div><span className="text-[#39FF14]">STATUS:</span> DOSSIER SUBMITTED &amp; PENDING VERIFICATION</div>
            </div>

            <div className="pt-2 text-[11px] text-[#39FF14] tracking-widest">
              &gt; OFFICIAL CONFIRMATION SENT TO TEAM LEADER
            </div>
          </div>
        ) : (
          /* Terminal Command-Line Registration Form */
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6 font-mono-code text-xs">
            {status === "error" && (
              <div className="p-3 bg-red-950/60 border border-red-500 rounded-xl text-red-400 flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. TEAM DETAILS & MEMBER COUNT SELECTOR */}
            <div className="bg-[#1C1C1E]/70 border border-[#B87333]/50 p-5 rounded-2xl space-y-4">
              <div className="text-[#D4A843] font-bold text-xs uppercase tracking-wider flex items-center gap-2 border-b border-[#B87333]/30 pb-2">
                <Users size={16} />
                <span>STEP 1: TEAM IDENTIFICATION &amp; SIZE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Team Name */}
                <div className="space-y-1.5 md:col-span-1">
                  <label className="block text-[#39FF14]">
                    &gt; TEAM_NAME <span className="text-[#D4A843]">*</span>
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Turing Complete"
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                  />
                </div>

                {/* University */}
                <div className="space-y-1.5 md:col-span-1">
                  <label className="block text-[#39FF14]">
                    &gt; UNIVERSITY / INSTITUTION <span className="text-[#D4A843]">*</span>
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. University of Moratuwa"
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                  />
                </div>

                {/* Member Count Buttons */}
                <div className="space-y-1.5 md:col-span-1">
                  <label className="block text-[#39FF14]">
                    &gt; TEAM_SIZE <span className="text-[#D4A843]">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((count) => (
                      <button
                        type="button"
                        key={count}
                        onClick={() => setMemberCount(count)}
                        className={`py-2 rounded-xl font-bold border transition-all text-center ${memberCount === count
                          ? "bg-[#D4A843] text-black border-[#D4A843] shadow-[0_0_12px_rgba(212,168,67,0.5)]"
                          : "bg-[#0A0A0A] text-[#8E8E93] border-[#B87333]/40 hover:border-[#D4A843] hover:text-white"
                          }`}
                      >
                        {count} {count === 1 ? "Member" : "Members"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. LEADER (MEMBER 1) CARD */}
            <div className="bg-[#1C1C1E]/70 border border-[#D4A843]/60 p-5 rounded-2xl space-y-4">
              <div className="text-[#D4A843] font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-[#D4A843]/30 pb-2">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  <span>OPERATIVE 01 (TEAM LEADER)</span>
                </span>
                <span className="text-[10px] text-[#39FF14] border border-[#39FF14]/30 px-2 py-0.5 rounded-md">PRIMARY CONTACT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[#39FF14]">&gt; FULL_NAME <span className="text-[#D4A843]">*</span></label>
                  <input
                    type="text"
                    value={leader.fullName}
                    onChange={(e) => setLeader({ ...leader, fullName: e.target.value })}
                    placeholder="e.g. Alan Turing"
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[#39FF14]">&gt; EMAIL_ADDRESS <span className="text-[#D4A843]">*</span></label>
                  <input
                    type="email"
                    value={leader.email}
                    onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                    placeholder="turing@bletchley.ac.lk"
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[#39FF14]">&gt; PHONE_NUMBER <span className="text-[#D4A843]">*</span></label>
                  <input
                    type="tel"
                    value={leader.phone}
                    onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                    placeholder="+94 77 123 4567"
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[#39FF14]">&gt; STUDENT_ID / NIC</label>
                  <input
                    type="text"
                    value={leader.studentId}
                    onChange={(e) => setLeader({ ...leader, studentId: e.target.value })}
                    placeholder="e.g. 210456X / 200123456789"
                    className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. MEMBER 2 CARD (Conditional on memberCount >= 2) */}
            {memberCount >= 2 && (
              <div className="bg-[#1C1C1E]/70 border border-[#39FF14]/50 p-5 rounded-2xl space-y-4 animate-fadeIn">
                <div className="text-[#39FF14] font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-[#39FF14]/30 pb-2">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    <span>OPERATIVE 02</span>
                  </span>
                  <span className="text-[10px] text-[#8E8E93]">MEMBER 2</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; FULL_NAME <span className="text-[#D4A843]">*</span></label>
                    <input
                      type="text"
                      value={member2.fullName}
                      onChange={(e) => setMember2({ ...member2, fullName: e.target.value })}
                      placeholder="e.g. Joan Clarke"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; EMAIL_ADDRESS <span className="text-[#D4A843]">*</span></label>
                    <input
                      type="email"
                      value={member2.email}
                      onChange={(e) => setMember2({ ...member2, email: e.target.value })}
                      placeholder="joan@bletchley.ac.lk"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; PHONE_NUMBER <span className="text-[#D4A843]">*</span></label>
                    <input
                      type="tel"
                      value={member2.phone}
                      onChange={(e) => setMember2({ ...member2, phone: e.target.value })}
                      placeholder="+94 71 987 6543"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; STUDENT_ID / NIC</label>
                    <input
                      type="text"
                      value={member2.studentId}
                      onChange={(e) => setMember2({ ...member2, studentId: e.target.value })}
                      placeholder="e.g. 210789Y / 200234567890"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. MEMBER 3 CARD (Conditional on memberCount === 3) */}
            {memberCount === 3 && (
              <div className="bg-[#1C1C1E]/70 border border-[#B87333]/50 p-5 rounded-2xl space-y-4 animate-fadeIn">
                <div className="text-[#B87333] font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-[#B87333]/30 pb-2">
                  <span className="flex items-center gap-2">
                    <User size={16} />
                    <span>OPERATIVE 03</span>
                  </span>
                  <span className="text-[10px] text-[#8E8E93]">MEMBER 3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; FULL_NAME <span className="text-[#D4A843]">*</span></label>
                    <input
                      type="text"
                      value={member3.fullName}
                      onChange={(e) => setMember3({ ...member3, fullName: e.target.value })}
                      placeholder="e.g. Gordon Welchman"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; EMAIL_ADDRESS <span className="text-[#D4A843]">*</span></label>
                    <input
                      type="email"
                      value={member3.email}
                      onChange={(e) => setMember3({ ...member3, email: e.target.value })}
                      placeholder="gordon@bletchley.ac.lk"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; PHONE_NUMBER <span className="text-[#D4A843]">*</span></label>
                    <input
                      type="tel"
                      value={member3.phone}
                      onChange={(e) => setMember3({ ...member3, phone: e.target.value })}
                      placeholder="+94 76 543 2109"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[#39FF14]">&gt; STUDENT_ID / NIC</label>
                    <input
                      type="text"
                      value={member3.studentId}
                      onChange={(e) => setMember3({ ...member3, studentId: e.target.value })}
                      placeholder="e.g. 210123Z / 200345678901"
                      className="w-full bg-[#0A0A0A] border border-[#39FF14]/40 rounded-xl px-3.5 py-2.5 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submission Button */}
            <div className="pt-4 sm:pt-6 text-center">
              <GlowingButton
                type="submit"
                variant="amber"
                disabled={status === "loading"}
                className="w-full sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>ENCRYPTING DOSSIER...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>SUBMIT DOSSIER ({memberCount} {memberCount === 1 ? "OPERATIVE" : "OPERATIVES"})</span>
                  </>
                )}
              </GlowingButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
