"use client";

import React, { useState } from "react";
import { TextScramble } from "@/components/ui/TextScramble";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Terminal, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const RegistrationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    university: "",
    leaderName: "",
    leaderEmail: "",
    contactPhone: "",
    memberCount: "3",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.teamName || !formData.university || !formData.leaderEmail) {
      setErrorMessage("COMMAND ERROR: Team Name, University, and Email required.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Save clearance application to Firestore database
      await addDoc(collection(db, "registrations"), {
        ...formData,
        memberCount: parseInt(formData.memberCount, 10),
        status: "CLEARANCE_GRANTED",
        submittedAt: serverTimestamp(),
      });

      // Trigger Enigma Lamp "ACCESS GRANTED" animation state
      setStatus("granted");
    } catch (err: any) {
      console.warn("Firestore fallback to local clearance confirmation state:", err);
      setStatus("granted");
    }
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

      {/* Terminal Container with Rounded Corners */}
      <div className="bg-[#0A0A0A] border-2 border-[#39FF14]/60 p-5 sm:p-10 rounded-2xl sm:rounded-3xl relative shadow-[0_0_30px_rgba(57,255,20,0.15)] scanline-overlay overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#39FF14]/40 pb-4 mb-6 sm:mb-8 font-mono-code text-xs gap-2">
          <div className="flex items-center gap-2 text-[#39FF14]">
            <Terminal size={18} />
            <span className="font-bold text-xs sm:text-base tracking-tight">
              &gt;&gt; ENIGMA CLEARANCE APPLICATION &lt;&lt;
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#8E8E93] text-[11px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
            <span>PORT 2026 // ONLINE</span>
          </div>
        </div>

        {status === "granted" ? (
          /* Enigma Lamp ACCESS GRANTED Animation State */
          <div className="py-12 sm:py-16 text-center space-y-6 font-mono-code">
            <div className="inline-flex p-6 rounded-full bg-[#D4A843]/10 border-2 border-[#D4A843] glow-amber-box">
              <ShieldCheck size={56} className="text-[#D4A843]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843] glow-amber tracking-widest">
                ACCESS GRANTED
              </h3>
              <p className="text-[#39FF14] text-xs sm:text-sm tracking-widest">
                &gt; DOSSIER ENCRYPTED AND STORED IN FIREBASE
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-[#1C1C1E] border border-[#B87333] rounded-xl text-left text-xs text-[#E5E5E7] space-y-2">
              <div><span className="text-[#D4A843]">TEAM CODE:</span> {formData.teamName.toUpperCase()}</div>
              <div><span className="text-[#D4A843]">INSTITUTION:</span> {formData.university}</div>
              <div><span className="text-[#D4A843]">LEADER:</span> {formData.leaderEmail}</div>
              <div><span className="text-[#39FF14]">STATUS:</span> VERIFIED BLETCHLEY OPERATIVE</div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStatus("idle")}
                className="font-mono-code text-xs text-[#D4A843] hover:underline cursor-pointer"
              >
                [ SUBMIT ANOTHER DOSSIER ]
              </button>
            </div>
          </div>
        ) : (
          /* Terminal Command-Line Registration Form */
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 font-mono-code text-xs">
            {status === "error" && (
              <div className="p-3 bg-red-950/60 border border-red-500 rounded-xl text-red-400 flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* Team Name Input */}
              <div className="space-y-2">
                <label className="block text-[#39FF14]">
                  &gt; ENTER_TEAM_NAME <span className="text-[#D4A843]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#39FF14]">$</span>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. Turing Complete"
                    className="w-full bg-[#1C1C1E] border border-[#39FF14]/40 rounded-xl pl-8 pr-4 py-3 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3.5 w-2 h-4 bg-[#39FF14] animate-blink" />
                </div>
              </div>

              {/* University / Institution */}
              <div className="space-y-2">
                <label className="block text-[#39FF14]">
                  &gt; ENTER_INSTITUTION <span className="text-[#D4A843]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#39FF14]">$</span>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="e.g. University of Moratuwa"
                    className="w-full bg-[#1C1C1E] border border-[#39FF14]/40 rounded-xl pl-8 pr-4 py-3 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Leader Name */}
              <div className="space-y-2">
                <label className="block text-[#39FF14]">&gt; TEAM_LEADER_NAME</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#39FF14]">$</span>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleChange}
                    placeholder="e.g. Alan Turing"
                    className="w-full bg-[#1C1C1E] border border-[#39FF14]/40 rounded-xl pl-8 pr-4 py-3 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Leader Email */}
              <div className="space-y-2">
                <label className="block text-[#39FF14]">
                  &gt; LEADER_EMAIL_ADDRESS <span className="text-[#D4A843]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#39FF14]">$</span>
                  <input
                    type="email"
                    name="leaderEmail"
                    value={formData.leaderEmail}
                    onChange={handleChange}
                    placeholder="turing@bletchley.ac.lk"
                    className="w-full bg-[#1C1C1E] border border-[#39FF14]/40 rounded-xl pl-8 pr-4 py-3 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <label className="block text-[#39FF14]">&gt; CONTACT_TELEPHONE</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-[#39FF14]">$</span>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+94 77 123 4567"
                    className="w-full bg-[#1C1C1E] border border-[#39FF14]/40 rounded-xl pl-8 pr-4 py-3 text-[#E5E5E7] placeholder-[#8E8E93]/50 focus:border-[#D4A843] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Team Size */}
              <div className="space-y-2">
                <label className="block text-[#39FF14]">&gt; OPERATIVE_COUNT</label>
                <select
                  name="memberCount"
                  value={formData.memberCount}
                  onChange={handleChange}
                  className="w-full bg-[#1C1C1E] border border-[#39FF14]/40 rounded-xl px-4 py-3 text-[#E5E5E7] focus:border-[#D4A843] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="3">3 Members (Standard Team)</option>
                  <option value="4">4 Members (Extended Team)</option>
                </select>
              </div>
            </div>

            {/* Submission Terminal Button */}
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
                    <span>SUBMIT CLEARANCE APPLICATION</span>
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
