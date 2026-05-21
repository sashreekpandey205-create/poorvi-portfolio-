"use client";

import React, { useState, useEffect } from "react";

// MODULAR CONFIGURATION: Easily adjust text, fonts, and timing here
export const PRELOADER_CONFIG = {
  text: "poorvayyy",
  // Edit this array to add/remove/change fonts. 
  // The LAST font in the array is the final settled font.
  fonts: [
    "'Courier New', monospace",
    "Georgia, serif",
    "sans-serif",
    "var(--font-heading)",
    "var(--font-sub)",
    "var(--font-body)",
    "var(--font-accent)", // <--- Final font
  ],
  timing: {
    fontSwitchDelayMs: 120, // Delay between each font switch
    totalSwitches: 15,      // Number of total font flips before stopping
    holdEndDurationMs: 1200, // How long to stay on the final font before exiting
    exitDurationMs: 800,    // Duration of the slide-up exit animation
  }
};

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let switchCount = 0;
    
    if (PRELOADER_CONFIG.fonts.length === 0) return;

    // The total time flipping fonts will take
    const totalFlipTimeMs = PRELOADER_CONFIG.timing.fontSwitchDelayMs * PRELOADER_CONFIG.timing.totalSwitches;
    
    // Start progress transition right away so it reaches 100% when switches finish.
    const barStartTimeout = setTimeout(() => {
      setProgress(100);
    }, 50);

    // Font flipping interval
    const flipInterval = setInterval(() => {
      switchCount++;

      // Once we hit the total switches, stop cycling.
      if (switchCount >= PRELOADER_CONFIG.timing.totalSwitches) {
        clearInterval(flipInterval);
        
        // Lock to the last font in the array
        setCurrentFontIndex(PRELOADER_CONFIG.fonts.length - 1);

        // Hold for 'holdEndDurationMs' before exit triggers
        setTimeout(() => {
          setIsExiting(true);

          // Remove from DOM completely after slide-up duration
          setTimeout(() => {
            setIsVisible(false);
          }, PRELOADER_CONFIG.timing.exitDurationMs);
          
        }, PRELOADER_CONFIG.timing.holdEndDurationMs);
      } else {
        // Pick a random font
        const randomFontObj = PRELOADER_CONFIG.fonts[Math.floor(Math.random() * PRELOADER_CONFIG.fonts.length)];
        const fontIndex = PRELOADER_CONFIG.fonts.indexOf(randomFontObj);
        setCurrentFontIndex(fontIndex);
      }
    }, PRELOADER_CONFIG.timing.fontSwitchDelayMs);

    return () => {
      clearTimeout(barStartTimeout);
      clearInterval(flipInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-navy z-[9999] flex flex-col justify-center items-center transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionDuration: `${PRELOADER_CONFIG.timing.exitDurationMs}ms`,
      }}
    >
      <h1
        className="text-5xl md:text-7xl mb-6 text-cream tracking-tight"
        style={{
          fontFamily: PRELOADER_CONFIG.fonts[currentFontIndex],
          animation: "scaleIn 0.8s ease-out forwards",
        }}
      >
        {PRELOADER_CONFIG.text}
      </h1>
      
      <div className="w-48 h-[1px] bg-cream/20 relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-cream ease-out"
          style={{
            width: `${progress}%`,
            transitionProperty: "width",
            transitionDuration: `${PRELOADER_CONFIG.timing.fontSwitchDelayMs * PRELOADER_CONFIG.timing.totalSwitches}ms`
          }}
        ></div>
      </div>
    </div>
  );
}
