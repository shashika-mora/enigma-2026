import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { RotorBackground } from "@/components/ui/RotorBackground";
import { CipherParticles } from "@/components/ui/CipherParticles";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enigma 2026 — Premier Mathematics & Cryptanalysis Competition",
  description:
    "Organized by the Mathematics Society, University of Moratuwa. Step into Bletchley Park and crack the unbroken mathematical cipher.",
  keywords: [
    "Enigma 2026",
    "Mathematics Society",
    "University of Moratuwa",
    "Alan Turing",
    "Cryptanalysis",
    "Mathematics Competition",
    "Sri Lanka",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-[#E5E5E7] antialiased relative selection:bg-[#D4A843] selection:text-black">
        {/* Dynamic Cipher Particle Canvas & Rotor Wireframes */}
        <CipherParticles />
        <RotorBackground />

        {/* Page Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
