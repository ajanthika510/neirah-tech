"use client";

import { useState, useCallback } from "react";
import ChapterIndicator from "./ChapterIndicator";
import ChapterHero from "./ChapterHero";
import CapabilityReveal from "./CapabilityReveal";
import RopePinnedServices from "./RopePinnedServices";
import ImpactStats from "./ImpactStats";
import FinalCTA from "./FinalCTA";

/*
  Chapter mapping:
  0  ChapterHero          (The Invitation)
  1  CapabilityReveal     (We Build)
  2  RopePinnedServices   (Capabilities)
  3  ImpactStats          (The Impact)
  4  FinalCTA             (Lets Talk)
*/

export default function Services() {
  const [activeChapter, setActiveChapter] = useState(0);

  const handleChapterEnter = useCallback((chapter: number) => {
    setActiveChapter(chapter);
  }, []);

  return (
    <>
      <div className="relative bg-white overflow-x-hidden">
        {/* Reduced motion */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>

        {/* Sticky chapter indicator */}
        <ChapterIndicator activeChapter={activeChapter} />

        {/* Chapter I */}
        <ChapterHero onEnter={() => handleChapterEnter(0)} />

        {/* Chapter II */}
        <CapabilityReveal onEnter={() => handleChapterEnter(1)} />

        {/* Chapter III — Rope pinned service cards */}
        <RopePinnedServices onEnter={() => handleChapterEnter(2)} />

        {/* Chapter IV */}
        <ImpactStats onEnter={() => handleChapterEnter(3)} />

        {/* Chapter V */}
        <FinalCTA onEnter={() => handleChapterEnter(4)} />
      </div>
    </>
  );
}
