# Enigma 2026 Platform Setup & Architecture Process Document

**Prepared for:** Mathematics Society, University of Moratuwa  
**Project:** Enigma 2026 Official Platform (First Draft & Scalable Foundation)  
**Date:** July 2026  

---

## 1. Executive Summary & Objectives

The Enigma 2026 website is designed as a custom web application celebrating Alan Turing's mathematical legacy and the Bletchley Park codebreaking operation (*The Imitation Game* theme).

Key technical goals for this platform build:
1. **Migration to Next.js**: Replaced the legacy Astro setup in `enigma-2026` with **Next.js (App Router)**, React 19, Tailwind CSS, and Framer Motion for rich dynamic interactivity, server rendering, and scalable API backend capabilities.
2. **Firebase Backend Readiness**: Integrated client/server Firebase SDK helpers (`src/lib/firebase.ts`) configured for authentication and Firestore data persistence, enabling seamless scaling for online team registration.
3. **Asset & Repository Preservation**: Migrated visual assets (hero images, sponsor logos, committee contact photos, and competition gallery images) from `enigma-2025` into `enigma-2026/public/`. Standardized `.gitignore` rules to ensure media assets are tracked by Git for team collaboration.
4. **Bletchley Park UI/UX Design System**: Implemented custom visual styles based on `Enigma_2026_Theme_Script.md` and UI/UX Pro Max rules (Void Black background, Turing Amber highlights, Cipher Green monospace typography, Bombe Copper plugboard wiring, rotor animations, and text scramble cipher effects).

---

## 2. Technical Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15+ (App Router) | Server-side rendering, client hydration, dynamic routing, and API routes. |
| **Language** | TypeScript (Strict Mode) | Type-safe props, models, and Firebase document definitions. |
| **Styling** | Tailwind CSS + Custom CSS Variables | Theme variables for Bletchley Park colors, glows, scanlines, and terminal UI. |
| **Animations** | Framer Motion & Custom Hooks | Hover character scrambling, rotating wireframe rotors, pulsing lamps, smooth scroll reveal. |
| **Icons** | Lucide React | High-clarity vector icons for rotors, summation symbols, gears, and terminal badges. |
| **Backend / Database** | Firebase (Auth & Firestore) | Client-side SDK initialization (`src/lib/firebase.ts`) for team clearance applications. |

---

## 3. Visual Identity & Color Tokens

```css
:root {
  --bg-void: #0A0A0A;          /* Deepest black background */
  --bg-charcoal: #1C1C1E;      /* Surface card background */
  --turing-amber: #D4A843;     /* Primary accent: Enigma lamp & brass glow */
  --cipher-green: #39FF14;     /* Secondary accent: Digital terminal monospace text */
  --bombe-copper: #B87333;     /* Tertiary accent: Plugboard wiring & borders */
  --text-muted: #8E8E93;       /* Muted secondary body text */
}
```

---

## 4. Component Hierarchy

- **`src/app/layout.tsx`**: Root layout with Google Fonts (`Playfair Display`, `Inter`, `JetBrains Mono`), rotor canvas overlay, and global metadata.
- **`src/app/page.tsx`**: Main landing experience assembling all theme sections.
- **`src/components/ui/`**:
  - `TextScramble.tsx`: Reusable text scramble cipher animation component.
  - `RotorBackground.tsx`: Animated rotating wireframe rotors background component.
  - `PlugboardCable.tsx`: Copper connecting wire SVG paths.
  - `GlowingButton.tsx`: Glowing amber call-to-action button with hover effects.
- **`src/components/sections/`**:
  - `HeroSection.tsx`: "The Impossible Problem" hero experience.
  - `AboutSection.tsx`: "Hut 8" split-screen with classified stamp and math formulas.
  - `RoundsSection.tsx`: 3 Round cards (The Cipher, The Algorithm, The Bombe) with progress cable.
  - `TimelineSection.tsx`: Horizontal timeline with glowing amber lamps and dates.
  - `GallerySection.tsx`: Photo gallery preserving last year's event highlights.
  - `RegistrationSection.tsx`: "Clearance Required" terminal interface connected to Firebase.
  - `PartnersSection.tsx`: Sponsors & Mathematics Society logo section.
  - `ContactSection.tsx`: Organizing Committee profiles.
  - `Footer.tsx`: "The Legacy" quote and closing credits.

---

## 5. Firebase Online Registration Strategy

The `src/lib/firebase.ts` file provides a safe initialization helper for Firebase Auth and Firestore:
- **Registration Form**: Submits team details (Team Name, University, Leader Email, Member Count) to the `registrations` Firestore collection.
- **Terminal UX**: Shows real-time submission logs character-by-character in phosphor green, concluding with an Enigma lamp lighting sequence displaying `"ACCESS GRANTED"`.

---

## 6. Git & Media Asset Policy

Per team directives, media files (`.jpg`, `.png`, `.avif`, `.webm`, `.svg`) are **strictly excluded** from `.gitignore` and committed directly to the repository. This ensures all team members have immediate access to placeholder images for quick replacement during content updates.
