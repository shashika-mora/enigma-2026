"use client";

import React, { useState, useRef, useEffect } from "react";

// ── Sparks — CSS divs with bonfire sway keyframes ─────────────────────────────
function Sparks() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const COLORS = ["#D4A843", "#B87333", "#FF6B00", "#FF4500", "#FFD580", "#C0501A", "#FF8C00"];
  const KEYFRAMES = ["sparkRise1", "sparkRise2", "sparkRise3"];

  // 30 smaller sparks drifting like bonfire embers
  const sparks = Array.from({ length: 30 }, (_, i) => {
    const ang = i * 137.508;
    return {
      id:       i,
      left:     (ang % 94) + 2,                // 2 – 96 %
      size:     1.5 + (i % 4) * 0.7,           // 1.5 – 3.6 px
      dur:      2.8 + (i % 7) * 0.45,          // 2.8 – 5.5 s
      delay:    (i * 0.18) % 5,                // 0 – 5 s stagger
      color:    COLORS[i % COLORS.length],
      keyframe: KEYFRAMES[i % KEYFRAMES.length],
    };
  });

  return (
    <>
      {sparks.map((sp) => (
        <div
          key={sp.id}
          style={{
            position:      "fixed",
            bottom:        "4px",
            left:          `${sp.left}%`,
            width:         `${sp.size}px`,
            height:        `${sp.size}px`,
            borderRadius:  "50%",
            background:    sp.color,
            boxShadow:     `0 0 ${sp.size * 4}px ${sp.size * 2}px ${sp.color}aa, 0 0 ${sp.size}px ${sp.size}px #ffffffaa`,
            pointerEvents: "none",
            zIndex:        3,
            animation:     `${sp.keyframe} ${sp.dur}s ease-out ${sp.delay}s infinite`,
          }}
        />
      ))}

      {/* Ember glow base */}
      <div
        style={{
          position:      "fixed",
          bottom:         0,
          left:           0,
          right:          0,
          height:         "70px",
          background:     "linear-gradient(to top, rgba(139,58,10,0.45), rgba(212,168,67,0.1), transparent)",
          pointerEvents:  "none",
          zIndex:          2,
        }}
      />
    </>
  );
}

// ── Timer page ────────────────────────────────────────────────────────────────
export default function TimerPage() {
  const [screen, setScreen]   = useState<"input" | "running" | "paused" | "over">("input");
  const [hInput, setHInput]   = useState("0");
  const [mInput, setMInput]   = useState("0");
  const [sInput, setSInput]   = useState("30");
  const [display, setDisplay] = useState({ h: "00", m: "00", s: "00" });
  const [fullscreen, setFullscreen] = useState(false);

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const remainingRef = useRef(0);

  const pad = (n: number) => String(n).padStart(2, "0");
  const toDisplay = (t: number) => ({
    h: pad(Math.floor(t / 3600)),
    m: pad(Math.floor((t % 3600) / 60)),
    s: pad(t % 60),
  });

  // ── Timer Controls ────────────────────────────────────────────────────────
  const startTimer = () => {
    const h = Math.max(0, parseInt(hInput) || 0);
    const m = Math.max(0, parseInt(mInput) || 0);
    const s = Math.max(0, parseInt(sInput) || 0);
    const total = h * 3600 + m * 60 + s;
    if (total <= 0) { alert("Please set a valid time!"); return; }
    
    remainingRef.current = total;
    setDisplay(toDisplay(total));
    runCountdown();
  };

  const resumeTimer = () => {
    if (remainingRef.current > 0) {
      runCountdown();
    }
  };

  const runCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
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

  const pauseTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setScreen("paused");
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    remainingRef.current = 0;
    setScreen("input");
    setDisplay({ h: "00", m: "00", s: "00" });
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  // ── Fullscreen ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  // ── Enter key ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (screen === "input") startTimer();
        else if (screen === "paused") resumeTimer();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, hInput, mInput, sInput]);

  const amber  = "#D4A843";
  const copper = "#B87333";
  const isOver = screen === "over";
  const accent = isOver ? "#ff4444" : amber;

  const buttonStyle: React.CSSProperties = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: `2px solid ${amber}`,
    background: "rgba(212,168,67,0.15)",
    color: amber,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    fontSize: "20px",
    transition: "all 0.2s ease",
    boxShadow: "0 0 15px rgba(212,168,67,0.2)",
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A0A", fontFamily: "'Courier New', monospace" }}>

      <Sparks />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center", padding: "0 1rem" }}>

        {/* Logo */}
        <div style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: "bold", letterSpacing: "0.3em", color: amber, textShadow: `0 0 24px rgba(212,168,67,0.8), 0 0 60px rgba(212,168,67,0.3)`, background: "rgba(0,0,0,0.55)", padding: "0.7rem 2rem", borderRadius: "12px", border: `1px solid rgba(212,168,67,0.4)` }}>
          ENIGMA 2026
        </div>

        {/* ── INPUT ───────────────────────────────────────────────────────── */}
        {screen === "input" && (
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Hours",   val: hInput, set: setHInput, max: 99 },
              { label: "Minutes", val: mInput, set: setMInput, max: 59 },
              { label: "Seconds", val: sInput, set: setSInput, max: 59 },
            ].map(({ label, val, set, max }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <label style={{ color: amber, fontSize: "13px", fontWeight: "bold", letterSpacing: "0.2em", textTransform: "uppercase" }}>{label}</label>
                <input
                  type="number" min={0} max={max} value={val}
                  onChange={(e) => set(e.target.value)}
                  style={{ width: "105px", height: "72px", fontSize: "2.5rem", fontWeight: 900, textAlign: "center", background: "rgba(212,168,67,0.12)", border: `2px solid ${amber}`, color: "#fff", borderRadius: "12px", fontFamily: "'Courier New', monospace", outline: "none", boxShadow: "0 0 15px rgba(212,168,67,0.2)" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── RUNNING / PAUSED / OVER ─────────────────────────────────────── */}
        {(screen === "running" || screen === "paused" || screen === "over") && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap", justifyContent: "center" }}>
              {([{ v: display.h, l: "HOURS" }, { v: display.m, l: "MINUTES" }, { v: display.s, l: "SECONDS" }] as { v: string; l: string }[]).map((item, i) => (
                <React.Fragment key={item.l}>
                  {i > 0 && <span style={{ fontSize: "clamp(3.5rem,10vw,6.5rem)", color: accent, fontWeight: 900 }}>:</span>}
                  <div style={{ background: isOver ? "rgba(255,68,68,0.08)" : "rgba(212,168,67,0.08)", border: `3.5px solid ${accent}`, borderRadius: "22px", padding: "clamp(1.2rem, 3.5vw, 3rem)", minWidth: "clamp(110px, 22vw, 220px)", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: `0 0 35px ${accent}66` }}>
                    <span style={{ fontSize: "clamp(3.8rem,12vw,7rem)", color: isOver ? "#ff4444" : "#fff", fontWeight: 900, letterSpacing: "0.02em", textShadow: `0 0 25px ${isOver ? "rgba(255,68,68,0.8)" : "rgba(255,255,255,0.4)"}` }}>{item.v}</span>
                    <span style={{ fontSize: "0.85rem", color: accent, letterSpacing: "0.25em", marginTop: "10px", fontWeight: 900 }}>{item.l}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {isOver && (
              <div style={{ fontSize: "clamp(2rem,6vw,4rem)", fontWeight: "bold", color: "#ff4444", textShadow: "0 0 30px rgba(255,68,68,0.9)", background: "rgba(0,0,0,0.8)", padding: "1.2rem 3rem", borderRadius: "20px", border: "3px solid #ff4444", letterSpacing: "0.1em", animation: "timerPulse 0.9s ease-in-out infinite alternate" }}>
                TIME OVER
              </div>
            )}
          </>
        )}
      </div>

      {/* ── BOTTOM RIGHT FLOATING CONTROL DOCK ─────────────────────────────── */}
      <div style={{ position: "fixed", bottom: "20px", right: "20px", display: "flex", alignItems: "center", gap: "12px", zIndex: 100 }}>
        
        {/* Play / Start Button */}
        {screen === "input" && (
          <button
            type="button"
            onClick={startTimer}
            title="Start Timer"
            style={buttonStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(212,168,67,0.3)"; }}
            onMouseOut={(e)  => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.background = "rgba(212,168,67,0.15)"; }}
          >
            ▶
          </button>
        )}

        {/* Resume Button */}
        {screen === "paused" && (
          <button
            type="button"
            onClick={resumeTimer}
            title="Resume Timer"
            style={buttonStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(212,168,67,0.3)"; }}
            onMouseOut={(e)  => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.background = "rgba(212,168,67,0.15)"; }}
          >
            ▶
          </button>
        )}

        {/* Pause Button */}
        {screen === "running" && (
          <button
            type="button"
            onClick={pauseTimer}
            title="Pause Timer"
            style={buttonStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(212,168,67,0.3)"; }}
            onMouseOut={(e)  => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.background = "rgba(212,168,67,0.15)"; }}
          >
            ⏸
          </button>
        )}

        {/* Reset Button (when running, paused, or over) */}
        {(screen === "running" || screen === "paused" || screen === "over") && (
          <button
            type="button"
            onClick={resetTimer}
            title="Reset Timer"
            style={buttonStyle}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(212,168,67,0.3)"; }}
            onMouseOut={(e)  => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.background = "rgba(212,168,67,0.15)"; }}
          >
            ↺
          </button>
        )}

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          style={buttonStyle}
          onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.background = "rgba(212,168,67,0.3)"; }}
          onMouseOut={(e)  => { e.currentTarget.style.transform = "scale(1)";   e.currentTarget.style.background = "rgba(212,168,67,0.15)"; }}
        >
          {fullscreen ? "⊡" : "⛶"}
        </button>
      </div>
    </div>
  );
}
