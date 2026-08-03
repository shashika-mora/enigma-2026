"use client";

import React, { useState, useRef, useEffect } from "react";

export default function TimerPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [screen, setScreen]   = useState<"input" | "running" | "over">("input");
  const [hInput, setHInput]   = useState("0");
  const [mInput, setMInput]   = useState("0");
  const [sInput, setSInput]   = useState("30");
  const [display, setDisplay] = useState({ h: "00", m: "00", s: "00" });
  const [fullscreen, setFullscreen] = useState(false);

  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const remainingRef  = useRef(0);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const pad = (n: number) => String(n).padStart(2, "0");

  const toDisplay = (total: number) => ({
    h: pad(Math.floor(total / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
  });

  // ── Timer ─────────────────────────────────────────────────────────────────
  const startTimer = () => {
    const h = Math.max(0, parseInt(hInput)  || 0);
    const m = Math.max(0, parseInt(mInput)  || 0);
    const s = Math.max(0, parseInt(sInput)  || 0);
    const total = h * 3600 + m * 60 + s;
    if (total <= 0) { alert("Please set a valid time!"); return; }

    if (intervalRef.current) clearInterval(intervalRef.current);

    remainingRef.current = total;
    setDisplay(toDisplay(total));
    setScreen("running");

    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1;
      setDisplay(toDisplay(remainingRef.current));
      if (remainingRef.current <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setScreen("over");
      }
    }, 1000);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    remainingRef.current = 0;
    setScreen("input");
    setDisplay({ h: "00", m: "00", s: "00" });
  };

  // cleanup on unmount
  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  // ── Fullscreen ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // ── Enter key ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && screen === "input") startTimer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, hInput, mInput, sInput]);

  // ── Flame config — deterministic (no Math.random) ─────────────────────────
  // Each flame: [leftPct, widthPx, heightPx, durationS, delayS, color]
  const FLAMES: [number, number, number, number, number, string][] = [
    [2,  45, 90,  1.8, 0.0,  "#8B3A0A"],
    [7,  30, 65,  1.4, 0.3,  "#D4A843"],
    [13, 55, 110, 2.1, 0.1,  "#B87333"],
    [18, 35, 75,  1.6, 0.7,  "#D4A843"],
    [23, 60, 120, 2.3, 0.2,  "#8B3A0A"],
    [28, 25, 55,  1.3, 0.5,  "#FF8C00"],
    [33, 50, 100, 2.0, 0.0,  "#B87333"],
    [38, 40, 80,  1.7, 0.4,  "#D4A843"],
    [43, 65, 130, 2.5, 0.1,  "#8B3A0A"],
    [48, 30, 60,  1.4, 0.8,  "#FF8C00"],
    [53, 55, 105, 2.0, 0.3,  "#D4A843"],
    [58, 45, 90,  1.8, 0.0,  "#B87333"],
    [63, 35, 70,  1.5, 0.6,  "#8B3A0A"],
    [68, 60, 115, 2.2, 0.2,  "#FF8C00"],
    [73, 28, 58,  1.3, 0.9,  "#D4A843"],
    [78, 50, 100, 1.9, 0.1,  "#B87333"],
    [83, 40, 80,  1.7, 0.5,  "#8B3A0A"],
    [88, 55, 110, 2.1, 0.3,  "#D4A843"],
    [93, 32, 65,  1.5, 0.7,  "#FF8C00"],
    [97, 45, 88,  1.8, 0.0,  "#B87333"],
  ];

  // ── Colours ───────────────────────────────────────────────────────────────
  const amber  = "#D4A843";
  const copper = "#B87333";
  const isOver = screen === "over";
  const accentColor = isOver ? "#ff4444" : amber;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A0A", fontFamily: "'Courier New', monospace" }}>

      {/* ── Flames ─────────────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", pointerEvents: "none", zIndex: 1 }}>
        {FLAMES.map(([left, w, h, dur, delay, color], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              left: `${left}%`,
              width:  `${w}px`,
              height: `${h}px`,
              background: `radial-gradient(ellipse 55% 80% at 50% 100%, ${color} 0%, ${color}99 30%, ${color}44 60%, transparent 80%)`,
              borderRadius: "50% 50% 20% 20%",
              animation: `enigmaFlame ${dur}s ease-in-out ${delay}s infinite`,
              transformOrigin: "bottom center",
              filter: `blur(2px)`,
            }}
          />
        ))}
        {/* Ember glow at the base */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30px", background: `linear-gradient(to top, rgba(212,168,67,0.5), rgba(184,115,51,0.25), transparent)`, filter: "blur(4px)" }} />
        {/* Ash layer */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(to top, rgba(40,20,5,0.9), transparent)" }} />
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", textAlign: "center", padding: "8vh 1rem 200px" }}>

        {/* Logo */}
        <div style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: "bold", letterSpacing: "0.3em", color: amber, textShadow: `0 0 24px rgba(212,168,67,0.8), 0 0 60px rgba(212,168,67,0.3)`, background: "rgba(0,0,0,0.55)", padding: "0.7rem 2rem", borderRadius: "12px", border: `1px solid rgba(212,168,67,0.4)` }}>
          ENIGMA 2026
        </div>

        {/* ══ INPUT SCREEN ══════════════════════════════════════════════════ */}
        {screen === "input" && (
          <>
            <h2 style={{ fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: "bold", letterSpacing: "0.2em", color: "#fff", textShadow: "0 0 12px rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.4)", padding: "0.4rem 1.4rem", borderRadius: "8px", margin: 0 }}>
              Set Timer
            </h2>

            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Hours",   val: hInput, set: setHInput, max: 99 },
                { label: "Minutes", val: mInput, set: setMInput, max: 59 },
                { label: "Seconds", val: sInput, set: setSInput, max: 59 },
              ].map(({ label, val, set, max }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <label style={{ color: amber, fontSize: "11px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    {label}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    style={{ width: "80px", height: "56px", fontSize: "1.8rem", textAlign: "center", background: "rgba(212,168,67,0.1)", border: `2px solid ${amber}`, color: "#fff", borderRadius: "10px", fontFamily: "'Courier New', monospace", outline: "none" }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={startTimer}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 44px", fontSize: "1.2rem", background: `linear-gradient(135deg, ${amber}, ${copper})`, color: "#000", border: "none", borderRadius: "10px", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Courier New', monospace", cursor: "pointer", boxShadow: `0 4px 24px rgba(212,168,67,0.5)`, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,168,67,0.7)"; }}
              onMouseOut={(e)  => { e.currentTarget.style.transform = "translateY(0)";   e.currentTarget.style.boxShadow = "0 4px 24px rgba(212,168,67,0.5)"; }}
            >
              ▶&nbsp; Start Timer
            </button>
          </>
        )}

        {/* ══ RUNNING / OVER SCREEN ══════════════════════════════════════════ */}
        {(screen === "running" || screen === "over") && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              {([{ v: display.h, l: "HOURS" }, { v: display.m, l: "MINUTES" }, { v: display.s, l: "SECONDS" }] as { v: string; l: string }[]).map((item, i) => (
                <React.Fragment key={item.l}>
                  {i > 0 && (
                    <span style={{ fontSize: "clamp(3rem,8vw,5rem)", color: accentColor, fontWeight: "bold", textShadow: `0 0 12px ${accentColor}88` }}>:</span>
                  )}
                  <div style={{ background: isOver ? "rgba(255,68,68,0.08)" : "rgba(212,168,67,0.08)", border: `3px solid ${accentColor}`, borderRadius: "20px", padding: "clamp(1rem,3vw,2.5rem)", minWidth: "clamp(90px,18vw,180px)", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: `0 0 28px ${accentColor}55` }}>
                    <span style={{ fontSize: "clamp(2.8rem,9vw,5rem)", color: isOver ? "#ff4444" : "#fff", fontWeight: "bold", textShadow: `0 0 16px ${isOver ? "rgba(255,68,68,0.7)" : "rgba(255,255,255,0.35)"}` }}>
                      {item.v}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: accentColor, letterSpacing: "0.22em", marginTop: "6px", fontWeight: "bold" }}>
                      {item.l}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {isOver && (
              <div style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: "bold", color: "#ff4444", textShadow: "0 0 30px rgba(255,68,68,0.9)", background: "rgba(0,0,0,0.8)", padding: "1.2rem 3rem", borderRadius: "20px", border: "3px solid #ff4444", letterSpacing: "0.1em", animation: "timerPulse 0.9s ease-in-out infinite alternate" }}>
                TIME OVER
              </div>
            )}

            <button
              onClick={resetTimer}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 32px", fontSize: "1.1rem", background: "rgba(184,115,51,0.15)", color: amber, border: `2px solid ${copper}`, borderRadius: "10px", fontWeight: "bold", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Courier New', monospace", cursor: "pointer", transition: "transform 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={(e)  => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              ↺&nbsp; Reset
            </button>
          </>
        )}
      </div>

      {/* ── Fullscreen button ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={toggleFullscreen}
        title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        style={{ position: "fixed", bottom: "20px", right: "20px", width: "48px", height: "48px", borderRadius: "50%", border: `2px solid ${amber}`, background: "rgba(212,168,67,0.12)", color: amber, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 100, fontSize: "20px", transition: "transform 0.2s, background 0.2s" }}
        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(212,168,67,0.25)"; e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseOut={(e)  => { e.currentTarget.style.background = "rgba(212,168,67,0.12)"; e.currentTarget.style.transform = "scale(1)"; }}
      >
        {fullscreen ? "⊡" : "⛶"}
      </button>

      {/* ── Keyframes ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes enigmaFlame {
          0%   { transform: scaleX(1.0) scaleY(0.6) translateY(0px);   opacity: 0.9; }
          20%  { transform: scaleX(0.8) scaleY(1.1) translateY(-15px); opacity: 1.0; }
          40%  { transform: scaleX(1.1) scaleY(0.9) translateY(-25px); opacity: 0.8; }
          60%  { transform: scaleX(0.7) scaleY(1.2) translateY(-35px); opacity: 0.6; }
          80%  { transform: scaleX(0.9) scaleY(0.8) translateY(-45px); opacity: 0.3; }
          100% { transform: scaleX(1.0) scaleY(0.4) translateY(-60px); opacity: 0.0; }
        }
        @keyframes timerPulse {
          from { box-shadow: 0 0 20px rgba(255,68,68,0.5); }
          to   { box-shadow: 0 0 55px rgba(255,68,68,0.95); }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { opacity: 0.4; }
      `}</style>
    </div>
  );
}
