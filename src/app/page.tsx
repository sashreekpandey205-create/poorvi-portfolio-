"use client";
import React, { useState, useEffect } from "react";

import Preloader from "@/components/Preloader";
import LegacySections from "./LegacySections";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-body">
      <Preloader />
      {/* ========== NAVIGATION ========== */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-navy/90 backdrop-blur-md shadow-lg" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#hero" className="font-accent text-2xl text-cream cursor-pointer hover:text-cream/80 transition-colors duration-200">
              Poorvi.
            </a>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">About</a>
              <a href="#instagram" className="text-sm font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">Social</a>
              <a href="#collective" className="text-sm font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">Collective</a>
              <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream text-navy rounded-full text-sm font-semibold hover:bg-cream/90 transition-all duration-200 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Connect
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden pb-6 bg-navy/95 backdrop-blur absolute w-full left-0 border-b border-white/10 shadow-xl">
              <div className="flex flex-col space-y-4 p-6 pt-4">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">About</a>
                <a href="#instagram" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">Social</a>
                <a href="#collective" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">Collective</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-cream hover:text-cream/70 transition-colors duration-200 cursor-pointer">Connect</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center hero-grain overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-navy z-0"></div>
        {/* Floating decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-ivy rounded-full blur-3xl float-element z-0"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl float-element z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ivy rounded-full blur-3xl float-element z-0"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="font-accent text-2xl sm:text-3xl text-cream/70 mb-3" style={{ animation: "fadeInUp 0.8s ease-out 0.2s both" }}>hello, I'm</p>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-normal text-cream mb-6 leading-tight tracking-tight" style={{ animation: "fadeInUp 0.8s ease-out 0.4s both" }}>
                Poorvi<br/><span className="shimmer-text">Gudagur</span>
              </h1>
              <p className="text-lg sm:text-xl text-cream/70 max-w-lg mb-8 leading-relaxed" style={{ animation: "fadeInUp 0.8s ease-out 0.6s both" }}>
                Law student by day, storyteller by heart.<br className="hidden sm:block" />
                Building communities, creating content &amp; questioning everything in between.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start" style={{ animation: "fadeInUp 0.8s ease-out 0.8s both" }}>
                <a href="#about" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-cream text-navy rounded-full font-semibold hover:bg-cream/90 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-cream/20">
                  Know More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </a>
                <a href="https://www.instagram.com/poorvayyy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-cream/30 text-cream rounded-full font-semibold hover:border-cream/50 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  @poorvayyy
                </a>
              </div>
            </div>
            {/* Portrait Side */}
            <div className="order-1 md:order-2 flex justify-center" style={{ animation: "scaleIn 1s ease-out 0.3s both" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-cream/20 to-white/5 rounded-[2rem] rotate-3"></div>
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-[2rem] overflow-hidden shadow-2xl shadow-ivy img-zoom">
                  <img src="/assets/poorvi-portrait.JPG" alt="Poorvi Gudagur — Law student and creator" className="w-full h-full object-cover" />
                </div>
                {/* Follower Badge */}
                <div className="absolute -bottom-4 -right-4 bg-cream text-navy rounded-2xl px-5 py-3 shadow-xl border border-white/10" style={{ animation: "fadeInUp 1s ease-out 1s both" }}>
                  <p className="text-2xl font-bold font-heading stat-number">156K</p>
                  <p className="text-xs text-navy/70 font-medium">Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ animation: "fadeInUp 1s ease-out 1.2s both" }}>
          <a href="#about" className="flex flex-col items-center gap-2 cursor-pointer group">
            <span className="font-sub text-sm text-cream/50 tracking-widest uppercase group-hover:text-cream transition-colors duration-200">Scroll</span>
            <svg className="w-5 h-5 text-cream/50 animate-bounce group-hover:text-cream transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
          </a>
        </div>
      </section>

      {/* Legacy Sections (About, Instagram, Collective, Contact, Footer) */}
      <LegacySections />
    </main>
  );
}
