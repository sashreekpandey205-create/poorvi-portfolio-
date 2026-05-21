"use client";
import React, { useEffect } from "react";
import { Waves } from "@/components/ui/wave-background";
import { ContactHoverCards } from "@/components/ui/contact-hover-cards";

export default function LegacySections() {
  useEffect(() => {
    // Scroll reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => observer.observe(el));

    // Animated counters
    function animateCounter(el: any, target: number) {
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = target >= 1000 ? Math.round(current / 1000) + 'K' : Math.round(current);
      }, 16);
    }
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const text = entry.target.textContent.trim();
          const num = parseFloat(text);
          if (text.includes('K')) animateCounter(entry.target, num * 1000);
          else if (!isNaN(num)) animateCounter(entry.target, num);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => {
      if (el.querySelector('svg')) return;
      statObserver.observe(el);
    });
  }, []);

  return (
    <>
      {/* ========== ABOUT ========== */}
      <section id="about" className="py-24 sm:py-32 bg-cream relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="font-sub text-xl tracking-widest uppercase text-navy/50 mb-4">a little about me</p>
              <h2 className="font-heading text-4xl sm:text-5xl font-normal text-navy mb-4">The Intersection of<br/> <span className="italic text-navy/70">Law &amp; Creativity</span></h2>
              <div className="section-divider mb-8 bg-navy/20"></div>
              <div className="space-y-5 text-navy/80 leading-relaxed font-body">
                <p>I'm a law student with a deep fascination for <strong className="text-navy font-semibold">business laws, contracts, moot courts,</strong> and <strong className="text-navy font-semibold">legal research</strong>. I believe the law isn't just about rules — it's about understanding the stories behind them.</p>
                <p>Recently, I authored a research paper on <strong className="text-navy font-semibold">economic policies in India</strong>, exploring the intersection of law, governance, and socio-economic impact.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-navy/5 text-navy/80 rounded-full text-sm border border-navy/10">Business Law</span>
                <span className="px-4 py-2 bg-navy/5 text-navy/80 rounded-full text-sm border border-navy/10">Contracts</span>
                <span className="px-4 py-2 bg-navy/5 text-navy/80 rounded-full text-sm border border-navy/10">Moot Courts</span>
                <span className="px-4 py-2 bg-navy/5 text-navy/80 rounded-full text-sm border border-navy/10">Legal Research</span>
              </div>
              <a href="https://drive.google.com/file/d/1DiEQZd-wE5LRmOyEqEpv7H_QVInFxERn/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-10 px-8 py-3.5 bg-navy text-cream rounded-full font-body font-semibold hover:bg-ivy transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-navy/20 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Read My Research Paper
              </a>
            </div>
            <div className="reveal-right">
              <div className="relative z-10">
                <div className="absolute -inset-3 bg-navy/5 rounded-3xl -rotate-2"></div>
                <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-navy/5">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-navy/5 group-hover:bg-navy/10 transition-colors rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-navy/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10V4c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v6m-4 4h4m-12 0h4m-12 0H3m2 6v-6m14 6v-6m-9 6h4"/></svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-navy text-xl">Law Student</h3>
                        <p className="text-navy/50 text-sm font-body mt-1">Specialising in business law &amp; contracts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-navy/5 group-hover:bg-navy/10 transition-colors rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-navy/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-navy text-xl">Content Creator</h3>
                        <p className="text-navy/50 text-sm font-body mt-1">156K community on Instagram</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-navy/5 group-hover:bg-navy/10 transition-colors rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-navy/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-navy text-xl">Co-founder</h3>
                        <p className="text-navy/50 text-sm font-body mt-1">The Creators' Collective</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-navy/5 group-hover:bg-navy/10 transition-colors rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-navy/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-navy text-xl">Researcher</h3>
                        <p className="text-navy/50 text-sm font-body mt-1">Published work on economic policies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INSTAGRAM / SOCIAL ========== */}
      <section id="instagram" className="py-24 sm:py-32 bg-gradient-to-b from-cream to-creamon relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <p className="font-sub text-xl tracking-widest uppercase text-navy/50 mb-4">the creative side</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-normal text-navy mb-4">Documenting Life,<br/> <span className="italic text-navy/70">One Day at a Time</span></h2>
            <div className="section-divider mx-auto mb-8 bg-navy/20"></div>
            <p className="text-navy/80 font-body max-w-2xl mx-auto leading-relaxed">In May 2025, I started a <strong className="text-navy font-semibold">365-day life documentation challenge</strong> — a daily creative practice of capturing, reflecting, and sharing little moments that make life beautiful. What started as a personal project grew into a community of <strong className="text-navy font-semibold">156,000+</strong> kindred spirits.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 reveal">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-navy/5 card-hover cursor-default">
              <p className="text-3xl sm:text-4xl font-normal text-navy stat-number font-heading">156K</p>
              <p className="text-navy/50 text-sm mt-1 font-body">Followers</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-navy/5 card-hover cursor-default">
              <p className="text-3xl sm:text-4xl font-normal text-navy stat-number font-heading">365</p>
              <p className="text-navy/50 text-sm mt-1 font-body">Day Challenge</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-navy/5 card-hover cursor-default">
              <p className="text-3xl sm:text-4xl font-normal text-navy stat-number font-heading">5+</p>
              <p className="text-navy/50 text-sm mt-1 font-body">Brand Collabs</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-navy/5 card-hover cursor-default flex flex-col justify-center">
              <p className="text-3xl sm:text-4xl text-navy/70 font-heading">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/></svg>
              </p>
              <p className="text-navy/50 text-sm mt-1 font-body">A Growing Community</p>
            </div>
          </div>

          <div className="reveal">
            <h3 className="font-heading text-2xl font-normal text-navy text-center mb-8">Brand Collaborations</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="brand-pill px-6 py-3 bg-white/60 rounded-full text-navy/80 font-body text-sm border border-navy/5 shadow-sm cursor-default inline-flex items-center gap-2"><svg className="w-3 h-3 text-navy/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>Wishcare</span>
              <span className="brand-pill px-6 py-3 bg-white/60 rounded-full text-navy/80 font-body text-sm border border-navy/5 shadow-sm cursor-default inline-flex items-center gap-2"><svg className="w-3 h-3 text-navy/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>Nuvie</span>
              <span className="brand-pill px-6 py-3 bg-white/60 rounded-full text-navy/80 font-body text-sm border border-navy/5 shadow-sm cursor-default inline-flex items-center gap-2"><svg className="w-3 h-3 text-navy/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>California Burrito</span>
              <span className="brand-pill px-6 py-3 bg-white/60 rounded-full text-navy/80 font-body text-sm border border-navy/5 shadow-sm cursor-default inline-flex items-center gap-2"><svg className="w-3 h-3 text-navy/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>Moxie Beauty</span>
              <span className="brand-pill px-6 py-3 bg-white/60 rounded-full text-navy/80 font-body text-sm border border-navy/5 shadow-sm cursor-default inline-flex items-center gap-2"><svg className="w-3 h-3 text-navy/30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>Philips</span>
            </div>
          </div>

          <div className="text-center mt-14 reveal">
            <a href="https://www.instagram.com/poorvayyy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-cream rounded-full font-body font-semibold hover:bg-ivy transition-all duration-300 cursor-pointer shadow-lg shadow-navy/10 hover:shadow-xl hover:shadow-navy/20 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Follow @poorvayyy
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ========== THE CREATORS' COLLECTIVE ========== */}
      <section id="collective" className="py-24 sm:py-32 relative bg-[#104245] overflow-hidden">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)", 
            backgroundSize: "48px 48px" 
          }}
        ></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Heading */}
          <div className="text-center mb-16 reveal flex flex-col items-center">
            <p className="font-sub text-sm tracking-widest uppercase text-[#fef1b7]/70 mb-4 italic">community built with love</p>
            <img src="/assets/creators-collective-logo.svg" alt="The Creators' Collective Logo" className="h-36 md:h-56 w-auto mb-2 drop-shadow-sm" />
            <p className="font-sub text-lg text-[#fef1b7]/80 italic mt-4 lowercase tracking-wide font-medium">a space for storytellers, filmmakers &amp; creative souls</p>
            <div className="w-12 border-b border-[#fef1b7]/20 mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Polaroid Image */}
            <div className="reveal-left flex justify-center">
              <div className="bg-[#E8E4D5] p-3 pb-4 rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full border border-white/10 relative">
                <img src="/assets/collective-photo.jpg" alt="The Creators' Collective community workshop" className="w-full h-auto rounded-lg border border-black/5" />
              </div>
            </div>

            {/* Right: Content & Links */}
            <div className="reveal-right">
              <img src="/assets/creators-collective-wordmark-v2.png" alt="The Creators' Collective" className="max-w-sm md:max-w-md h-auto mb-8 opacity-100" />
              <div className="space-y-6 text-[#fef1b7]/80 font-body text-sm sm:text-base leading-relaxed">
                <p>Co-founded with <strong className="text-[#fef1b7] font-semibold">Dhruv Bhawsar</strong>, The Creators' Collective is a vibrant community of <strong className="text-[#fef1b7] font-semibold">storytellers, filmmakers, and creative enthusiasts</strong> who believe in the power of shared creativity.</p>
                <p>We host workshops, collaborative projects, and creative sessions designed to nurture talent and build meaningful connections among creators.</p>
              </div>

              {/* Action Card */}
              <div className="mt-8 bg-black/20 rounded-xl p-6 border border-white/5 shadow-inner backdrop-blur-sm card-hover cursor-default">
                <div className="flex items-start gap-4">
                  <div className="mt-1 opacity-70">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-[#fef1b7] text-lg tracking-widest uppercase">December Workshop</h4>
                    <p className="text-[#fef1b7]/60 text-xs font-body mb-3 font-medium">Storytelling &amp; Filmmaking</p>
                    <a href="https://drive.google.com/drive/folders/1UuvtC7J-DAPl_fM3BAn3NIVSMKmFeIE?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#fef1b7] font-medium font-body hover:text-[#fef1b7]/70 transition-colors duration-200">
                      View Workshop Materials &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 font-body text-sm">
                <a href="https://www.instagram.com/the_creatorscollectivee/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#fef1b7] text-[#104245] font-semibold rounded-full hover:bg-[#fef1b7]/90 transition-colors shadow-lg">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Follow the Collective
                </a>
                <a href="https://drive.google.com/drive/folders/1UuvtC7J-DAPl_fM3BAn3NIVSMKmFeIE?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#fef1b7]/30 text-[#fef1b7] font-medium rounded-full hover:bg-[#fef1b7]/10 transition-colors shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg>
                  Our December Workshop
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONSOLIDATED CONTACT SECTION ========== */}
      <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden text-navy">
        {/* Waves Background — opacity baked into strokeColor to avoid compositing layer */}
        <div className="absolute inset-0 z-0">
          <Waves backgroundColor="transparent" strokeColor="rgba(15, 23, 42, 0.06)" pointerSize={0.5} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
          
          {/* Header 1: Say Hello */}
          <div className="text-center mb-16 reveal pointer-events-auto">
            <div className="inline-block mb-4">
              <svg className="w-10 h-10 text-navy/30 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            </div>
            <p className="font-sub text-xl tracking-widest uppercase text-navy/50 mb-4 italic">let's connect</p>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-navy mb-4">Say Hello!</h2>
            <p className="text-navy/80 font-body max-w-xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">Whether it's a collaboration, a legal discussion, or just a conversation about storytelling &mdash; I'd love to hear from you.</p>
          </div>

          {/* Liquid Glass Hover Cards (Instagram / LinkedIn) */}
          <div className="reveal mb-24 pointer-events-auto">
            <ContactHoverCards />
          </div>

          {/* Header 2: Let's build something */}
          <div className="text-center reveal pointer-events-none">
            <h2 className="font-heading text-3xl sm:text-5xl font-normal text-navy mb-8 pointer-events-auto">Let's build something<br/> <span className="italic text-navy/70">meaningful</span> together.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:poorviga11@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-cream rounded-full font-body font-semibold hover:bg-ivy transition-all duration-300 shadow-lg shadow-navy/10 hover:shadow-xl hover:shadow-navy/20 cursor-pointer w-full sm:w-auto justify-center pointer-events-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                Send an Email
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-ivy text-cream/70 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left text-cream/70">
              <p className="font-accent text-2xl text-cream mb-1">Poorvi.</p>
              <p className="text-cream/50 text-sm font-body">Law Student &bull; Creator &bull; Community Builder</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/poorvayyy/" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-cream transition-colors duration-200 cursor-pointer" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/poorvi-gudagur-713214227/" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-cream transition-colors duration-200 cursor-pointer" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:poorviga11@gmail.com" className="text-cream/40 hover:text-cream transition-colors duration-200 cursor-pointer" aria-label="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-cream/40 text-sm font-body">&copy; 2025 Poorvi Gudagur. Crafted with intent.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
