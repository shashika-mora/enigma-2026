# Enigma 2026

<p>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
</p>

Official web platform and dossier management system for Enigma 2026, the annual cryptographic and algorithmic competition organized by the Mathematics Society of the University of Moratuwa, Sri Lanka. The interface is styled around Alan Turing and Bletchley Park codebreaking history (*The Imitation Game*).

## Status

Online preliminary and elimination rounds are concluded. The public registration window is closed with 73 team dossiers securely stored in Cloud Firestore. The platform is configured for the final milestone: the on-site Physical Hackathon scheduled for September 27, 2026.

## What it does

- Cryptographic terminal user interface with typewriter decoding animations, CRT scanline effects, and ambient radar particle sweeps.
- Real-time countdown timer targeting the physical hackathon on September 27, 2026, featuring floating ember canvas particles.
- Competition directives and rounds briefing for participants, outlining rules of engagement and stage structures.
- Partner and sponsor showcase recognizing Platinum Partner Yaala Labs.
- Restricted administrative dashboard at `/admin` for organizers to review participant dossiers, filter by status, search submissions, and export rosters as CSV.

## Stack

| Area | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 15.1.7 (React 19, App Router) | Static generation and client component hydration |
| Language | TypeScript 5.7.3 | Type-safe application development |
| Styling | Tailwind CSS 4.0.7 | Utility-first styling with custom phosphor theme tokens |
| Motion | Framer Motion 12.4.7 | Decryption scramble transitions and timeline effects |
| Icons | Lucide React 0.475.0 | Monospace and terminal iconography |
| Database & Hosting | Google Firebase 11.2.0 | Cloud Firestore for dossier records and Firebase Hosting |

## Run locally

Prerequisites: Node.js 18.18 or higher, npm 9 or higher.

```sh
# Clone the repository
git clone https://github.com/shashika-mora/enigma-2026.git
cd enigma-2026

# Install dependencies
npm install

# Configure environment variables (optional for local mock data)
cp .env.example .env.local

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Validate

```sh
# Run TypeScript type-checking, page generation, and production build
npm run build
```

## Project structure

```text
enigma-2026/
├── public/                 # Static assets, fonts, partner logos, and gallery images
├── src/
│   ├── app/                # Next.js App Router (layout, homepage, admin dashboard)
│   ├── components/
│   │   ├── sections/       # Section components (Hero, Rounds, Timeline, Partners, etc.)
│   │   └── ui/             # Reusable UI primitives (TextScramble, GlowingButton, Timer)
│   └── lib/                # Firebase configuration, CSV export utilities, and helper functions
├── firestore.rules         # Security rules enforcing data preservation and access control
└── firebase.json           # Firebase Hosting and Firestore deployment configuration
```

## Security and data protection

- Firestore Security Rules forbid client-side deletion (`allow delete: if false;`) to ensure all 73 submitted team records remain permanently preserved.
- Public dossier creation is disabled (`allow create: if false;`) following the official registration closing deadline.
- Unauthenticated reads of contestant records are prohibited; organizer access requires authentication.
- The administrative console passcode is configurable through the `NEXT_PUBLIC_ADMIN_PASSCODE` environment variable.

## About the maintainer

Developed and maintained by [Shashika Dayarathna](https://github.com/shashika-mora), Computer Science and Engineering undergraduate at the University of Moratuwa, for the University of Moratuwa Mathematics Society.
