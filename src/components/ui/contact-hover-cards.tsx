"use client";

import React, { useState, useRef, useEffect } from "react";

export function ContactHoverCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const smoothPositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const isSectionVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isLoopRunningRef = useRef(false);

  const startLoop = () => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const animate = () => {
      if (!isSectionVisibleRef.current) {
        isLoopRunningRef.current = false;
        animationRef.current = null;
        return;
      }

      // Calculate translation difference
      const dx = mousePositionRef.current.x - smoothPositionRef.current.x;
      const dy = mousePositionRef.current.y - smoothPositionRef.current.y;

      // If not hovering and the showcase has caught up to the mouse,
      // completely pause DOM updates to save CPU.
      if (!isHoveringRef.current && Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        isLoopRunningRef.current = false;
        animationRef.current = null;
        return;
      }

      // Lerp for buttery smooth 120hz tracking
      smoothPositionRef.current.x += dx * 0.15;
      smoothPositionRef.current.y += dy * 0.15;
      
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translate3d(${smoothPositionRef.current.x + 20}px, ${smoothPositionRef.current.y - 120}px, 0)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Use Intersection Observer to completely disable logic when off-screen
    const observer = new IntersectionObserver((entries) => {
        isSectionVisibleRef.current = entries[0].isIntersecting;
        if (isSectionVisibleRef.current) {
          startLoop();
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
          isLoopRunningRef.current = false;
        }
    }, { threshold: 0 });

    if (containerRef.current) {
        observer.observe(containerRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePositionRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
    if (isSectionVisibleRef.current) {
      startLoop();
    }
  };

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
    setIsVisible(true);
    isHoveringRef.current = true;
    if (isSectionVisibleRef.current) {
      startLoop();
    }
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setIsVisible(false);
    isHoveringRef.current = false;
  };

  const images = {
    instagram: "/assets/instagram-photo.jpg",
    linkedin: "/assets/linkedin-photo.jpg"
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Floating Showcase Overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] overflow-hidden rounded-2xl shadow-2xl border border-white/20 hover-overlay"
        style={{
          opacity: isVisible ? 1 : 0,
          width: "320px",
          height: "220px",
          willChange: "transform"
        }}
      >
        <div className="relative w-full h-full bg-navy overflow-hidden">
          <img
            src={images.instagram}
            alt="Instagram Showcase"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
            style={{ opacity: hoveredCard === 'instagram' ? 1 : 0 }}
          />
          <img
            src={images.linkedin}
            alt="LinkedIn Showcase"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
            style={{ opacity: hoveredCard === 'linkedin' ? 1 : 0 }}
          />
        </div>
      </div>

      {/* Pristine Clean Cards */}
      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto pointer-events-none">
        
        {/* Instagram Card */}
        <a 
          href="https://www.instagram.com/poorvayyy/" 
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={() => handleMouseEnter('instagram')}
          onMouseLeave={handleMouseLeave}
          className="group block pointer-events-auto w-full"
        >
          <div className="w-full py-12 flex flex-col items-center justify-center gap-6 bg-white/60 backdrop-blur-md border border-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] relative overflow-hidden">
            <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-navy/5">
              <svg className="w-8 h-8 text-navy" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div className="text-center mt-2">
              <h3 className="font-sub font-normal text-navy text-4xl mb-1 tracking-[-0.03em]">Instagram</h3>
              <p className="text-navy/60 text-sm font-body tracking-wider lowercase relative inline-block">
                @poorvayyy
                <span className="absolute left-0 -bottom-1 h-px bg-navy/40 transition-all duration-300 w-0 group-hover:w-full"></span>
              </p>
            </div>
          </div>
        </a>

        {/* LinkedIn Card */}
        <a 
          href="https://www.linkedin.com/in/poorvi-gudagur-713214227/" 
          target="_blank" 
          rel="noopener noreferrer"
          onMouseEnter={() => handleMouseEnter('linkedin')}
          onMouseLeave={handleMouseLeave}
          className="group block pointer-events-auto w-full"
        >
          <div className="w-full py-12 flex flex-col items-center justify-center gap-6 bg-white/60 backdrop-blur-md border border-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem] relative overflow-hidden">
            <div className="w-16 h-16 bg-white shadow-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-navy/5">
              <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <div className="text-center mt-2">
              <h3 className="font-sub font-normal text-navy text-4xl mb-1 tracking-[-0.03em]">LinkedIn</h3>
              <p className="text-navy/60 text-sm font-body tracking-wider lowercase relative inline-block">
                connect with me
                <span className="absolute left-0 -bottom-1 h-px bg-navy/40 transition-all duration-300 w-0 group-hover:w-full"></span>
              </p>
            </div>
          </div>
        </a>

      </div>
    </div>
  );
}
