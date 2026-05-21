"use client";
import React, { useState, useEffect } from "react";
import UnicornBackground from "@/components/UnicornBackground";
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

      {/* ========== HERO: Unicorn Studio WebGL Scene ========== */}
      <section id="hero" className="relative overflow-hidden min-h-screen bg-navy">
        <UnicornBackground width="100%" height="100vh" />
      </section>

      {/* Legacy Sections (About, Instagram, Collective, Contact, Footer) */}
      <LegacySections />
    </main>
  );
}
