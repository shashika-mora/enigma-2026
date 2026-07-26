"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TextScramble } from "@/components/ui/TextScramble";

interface Photo {
  id: number;
  src: string;
  title: string;
  description: string;
}

// Catalog of all 43 photos preserved from Enigma 2024 / 2025
const PHOTOS: Photo[] = [
  { id: 1, src: "/photos/1.avif", title: "Opening Ceremony", description: "Kick-off of Enigma 2024 at Bletchley Hall" },
  { id: 2, src: "/photos/2.avif", title: "Problem Solving Phase", description: "Participants working on complex logic challenges" },
  { id: 3, src: "/photos/3.avif", title: "Eureka Moments", description: "Breakthrough solutions being discovered" },
  { id: 4, src: "/photos/4.avif", title: "Mentorship Session", description: "Expert guidance during the competition" },
  { id: 5, src: "/photos/5.avif", title: "Final Presentations", description: "Teams presenting their decrypted solutions" },
  { id: 6, src: "/photos/6.avif", title: "Award Ceremony", description: "Celebrating the champions of Enigma" },
  { id: 7, src: "/photos/7.avif", title: "Combinatorics Challenge", description: "Intense mathematical formulation" },
  { id: 8, src: "/photos/8.avif", title: "High-Stakes Investigation", description: "Cryptographers analyzing code vectors" },
  { id: 9, src: "/photos/9.avif", title: "Team Collaboration", description: "Strategic discussions in progress" },
  { id: 10, src: "/photos/10.avif", title: "Keynote Address", description: "Insights into Alan Turing and computer science" },
  { id: 11, src: "/photos/11.avif", title: "Judges Evaluation", description: "Expert review of algorithmic proofs" },
  { id: 12, src: "/photos/12.avif", title: "Competition Floor", description: "Mind-straining atmosphere during Round 2" },
  { id: 13, src: "/photos/13.avif", title: "Mentors Guidance", description: "Academic insights from Moratuwa faculty" },
  { id: 14, src: "/photos/14.avif", title: "Trophy Unveiling", description: "The coveted Enigma trophy revealed" },
  { id: 15, src: "/photos/15.avif", title: "Networking Session", description: "Participants connecting and sharing ideas" },
  { id: 16, src: "/1.jpg", title: "Team Photo 01", description: "Brilliant minds gathered for the investigation" },
  { id: 17, src: "/2.jpg", title: "Team Photo 02", description: "Strategic logical discussions" },
  { id: 18, src: "/3.jpg", title: "Stage 1 Examination", description: "Online preliminary examination phase" },
  { id: 19, src: "/4.jpg", title: "Modular Arithmetic Task", description: "Deciphering encrypted number sequences" },
  { id: 20, src: "/5.jpg", title: "Strategic Code Cracking", description: "Team analysis of graph theory problems" },
  { id: 21, src: "/6.jpg", title: "Graph Theory Challenge", description: "Constructing optimal path algorithms" },
  { id: 22, src: "/7.jpg", title: "Undergraduate Cryptographers", description: "Sri Lankan university teams in action" },
  { id: 23, src: "/8.jpg", title: "Live Scoreboard Tracking", description: "Real-time updates on team progress" },
  { id: 24, src: "/9.jpg", title: "Inter-University Challenge", description: "Friendly competitive spirit" },
  { id: 25, src: "/10.jpg", title: "Panel Evaluation", description: "Evaluation of algorithmic time complexity" },
  { id: 26, src: "/11.jpg", title: "Bombe Stage Finalists", description: "Top 5 teams entering the grand finale" },
  { id: 27, src: "/12.jpg", title: "Live Decryption Challenge", description: "Solving live puzzles under time pressure" },
  { id: 28, src: "/13.jpg", title: "Mathematics Society", description: "Organizers overseeing competition flow" },
  { id: 29, src: "/14.jpg", title: "Final Problem Reveal", description: "Unveiling the master cipher" },
  { id: 30, src: "/15.jpg", title: "Runner-Up Presentation", description: "Honoring outstanding achievement" },
  { id: 31, src: "/16.jpg", title: "Cryptographic Workshop", description: "Preparatory training for participants" },
  { id: 32, src: "/17.jpg", title: "Team Brainstorming", description: "Creative approaches to complex proofs" },
  { id: 33, src: "/18.jpg", title: "Logic Verification", description: "Checking mathematical step-by-step rigor" },
  { id: 34, src: "/19.jpg", title: "Audience & Supporters", description: "Cheering for team breakthroughs" },
  { id: 35, src: "/20.jpg", title: "Final Countdown", description: "Last minutes of the Bombe stage" },
  { id: 36, src: "/21.jpg", title: "Award Winners", description: "Enigma 2024 champions crowned" },
  { id: 37, src: "/22.jpg", title: "Algorithmic Code Review", description: "Deep dive into problem solutions" },
  { id: 38, src: "/23.jpg", title: "Team Strategy", description: "Dividing tasks effectively" },
  { id: 39, src: "/24.jpg", title: "Certificate Distribution", description: "Recognizing all participant teams" },
  { id: 40, src: "/25.jpg", title: "Closing Remarks", description: "Concluding an unforgettable competition" },
  { id: 41, src: "/26.jpg", title: "Moratuwa Unit", description: "Faculty & student coordinators" },
  { id: 42, src: "/27.jpg", title: "Final Stage Decryption", description: "Cracking the final cipher string" },
  { id: 43, src: "/28.jpg", title: "Enigma Legacy", description: "Mathematics Society University of Moratuwa" },
];

export const GallerySection: React.FC = () => {
  // Infinite array repeating photos for smooth endless looping
  const infinitePhotos = [...PHOTOS, ...PHOTOS, ...PHOTOS, ...PHOTOS, ...PHOTOS];
  const initialIndex = Math.floor(infinitePhotos.length / 2);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Automatic slide transition every 3 seconds (3000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % infinitePhotos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [infinitePhotos.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + infinitePhotos.length) % infinitePhotos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % infinitePhotos.length);
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Title */}
      <div className="text-center space-y-3 mb-12">
        <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-[#D4A843] glow-amber">
          <TextScramble text="PHOTO GALLERY" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-sm">
          Witness the brilliant minds at work during previous Enigma investigations.
        </p>
      </div>

      {/* Main 3D Carousel Viewport */}
      <div className="relative h-[380px] sm:h-[480px] md:h-[560px] flex items-center justify-center w-full">
        {/* Background & Active Photo Carousel Stream */}
        <div className="absolute inset-0 flex items-center justify-center">
          {infinitePhotos.map((photo, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);

            // Render active center photo + 2 adjacent photos on each side (what passed & what's next)
            if (absOffset > 2) return null;

            const isCenter = index === currentIndex;

            return (
              <motion.div
                key={`${photo.id}-${index}`}
                className="absolute cursor-pointer"
                initial={false}
                animate={{
                  x: offset * 320,
                  scale: isCenter ? 1 : 0.8 - absOffset * 0.08,
                  zIndex: isCenter ? 20 : 10 - absOffset,
                  opacity: absOffset > 1 ? 0.3 : isCenter ? 1 : 0.65,
                  rotateY: offset * 12,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
                onClick={() => (isCenter ? setSelectedPhoto(photo) : setCurrentIndex(index))}
              >
                {/* Photo Card Container matching last year's visual rounded card look */}
                <div className={`relative w-[280px] sm:w-[480px] md:w-[680px] aspect-16/10 rounded-3xl overflow-hidden border-2 shadow-2xl transition-colors duration-300 group ${
                  isCenter ? "border-[#D4A843] shadow-[0_0_30px_rgba(212,168,67,0.4)]" : "border-[#B87333]/40"
                }`}>
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Photo Info Banner overlay at bottom of card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 flex items-end justify-between">
                    <div>
                      <h3 className="text-white font-serif-heading font-bold text-base sm:text-xl mb-1 glow-amber">
                        {photo.title}
                      </h3>
                      {photo.description && (
                        <p className="text-[#E5E5E7]/80 font-sans text-xs sm:text-sm line-clamp-1">
                          {photo.description}
                        </p>
                      )}
                    </div>

                    {/* ENIGMA Moratuwa Footer Badge inside card */}
                    <div className="hidden sm:flex flex-col items-end font-mono-code text-[10px] text-[#39FF14]">
                      <span>ENIGMA &apos;24</span>
                      <span className="text-[#8E8E93]">University of Moratuwa</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Manual Navigation Chevrons (Left & Right Circular Buttons) */}
        <button
          onClick={goToPrevious}
          aria-label="Previous Photo"
          className="absolute left-2 sm:left-6 z-30 bg-[#0A0A0A]/80 hover:bg-[#D4A843] text-[#D4A843] hover:text-black border border-[#D4A843] rounded-full p-3 transition-all duration-300 shadow-lg cursor-pointer hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          aria-label="Next Photo"
          className="absolute right-2 sm:right-6 z-30 bg-[#0A0A0A]/80 hover:bg-[#D4A843] text-[#D4A843] hover:text-black border border-[#D4A843] rounded-full p-3 transition-all duration-300 shadow-lg cursor-pointer hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Lightbox Modal on Image Click */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-[#D4A843] hover:text-white border border-[#D4A843] p-2 rounded-full transition-colors z-60"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full bg-[#1C1C1E] border-2 border-[#D4A843] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-16/10 w-full bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-[#0A0A0A] border-t border-[#B87333]/40">
                <h3 className="text-xl font-serif-heading font-bold text-[#D4A843] mb-1 glow-amber">
                  {selectedPhoto.title}
                </h3>
                <p className="text-[#E5E5E7]/80 font-sans text-sm">{selectedPhoto.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
