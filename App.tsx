import React, { useState, useEffect, useRef } from 'react';

// --- Image Imports ---
import jayImg from "figma:asset/1d5a2f78512dab3f1fedefa398c96d766d063a03.png";
import zxImg from "figma:asset/d809a145d2cdfb59f5c11c8cc9685ade131bee5b.png";
import vincentImg from "figma:asset/a6717036c45c72b13287193be61e47a014651dca.png";
import proRoofingMobile from "figma:asset/16dcb8f3b1827b49ff6cf1300661356894b9a4e3.png";
import solvixMobile from "figma:asset/ee9b043b428172acb2dff9abe8ecaa9a76474400.png";
import proRoofingDesktop from "figma:asset/9be370fcc48e7890ce3cf476332e2995c48cab2c.png";
import solvixDesktop from "figma:asset/a6c923614b3202fa227d5f14415b2e4f23c92d04.png";
import faviconImg from "figma:asset/0d919a9fc03327df96e1f993f159319e6eb584a5.png";

// --- Types ---
interface CurrencyState {
  symbol: string;
  price: string;
}

interface CursorPosition {
  x: number;
  y: number;
}

// --- Components ---

const App: React.FC = () => {
  // State
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [currency, setCurrency] = useState<CurrencyState>({ symbol: 'RM', price: '1199' });

  // Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  // 1. Set document title and favicon
  useEffect(() => {
    // Set page title
    document.title = "Unit 3 | Digital Infrastructure";
    
    // Set favicon
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconImg;
  }, []);

  // 2. Currency Detection
  useEffect(() => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      if (userTimeZone.includes("Australia")) {
        setCurrency({ symbol: 'AUD', price: '$799' });
      } else if (
        userTimeZone.includes("Europe") || 
        userTimeZone.includes("Amsterdam") || 
        userTimeZone.includes("Paris") || 
        userTimeZone.includes("Berlin")
      ) {
        setCurrency({ symbol: '€', price: '499' });
      } else if (
        userTimeZone.includes("America") || 
        userTimeZone.includes("US")
      ) {
        setCurrency({ symbol: 'USD', price: '$499' });
      } else {
        // Default MYR
        setCurrency({ symbol: 'RM', price: '1199' });
      }
      
      console.log(`LOCALE DETECTED: ${userTimeZone}`);
    } catch (e) {
      console.log("Currency detection failed, using default.");
    }
  }, []);

  // 3. Cursor Movement
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorPos({ x: clientX, y: clientY });
      
      // Direct DOM manipulation for performance on the dot, allowing React to handle the outline state
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`;
        cursorDotRef.current.style.top = `${clientY}px`;
      }
      if (cursorOutlineRef.current) {
        // Add a tiny delay effect via transition in CSS, but update position here
        cursorOutlineRef.current.style.left = `${clientX}px`;
        cursorOutlineRef.current.style.top = `${clientY}px`;
      }

      // Parallax Grid Effect
      const grid = document.getElementById('grid-bg');
      if (grid) {
        const x = (window.innerWidth - clientX * 2) / 100;
        const y = (window.innerHeight - clientY * 2) / 100;
        grid.style.transform = `perspective(1000px) rotateX(5deg) scale(1.05) translateX(${x}px) translateY(${y}px)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Helper for hover handlers
  const onHoverStart = () => setIsHovering(true);
  const onHoverEnd = () => setIsHovering(false);

  return (
    <div className="min-h-screen w-full bg-[#080808] text-[#Eaeaea] font-sans overflow-x-hidden cursor-none selection:bg-[#FF4500] selection:text-black">
      {/* Styles for Fonts & Animations that are too complex for utility classes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
        }
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }

        @keyframes heartbeat {
          0% { transform: scale(1); box-shadow: 0 0 30px rgba(255,69,0,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(255,69,0,0.7); }
          100% { transform: scale(1); box-shadow: 0 0 30px rgba(255,69,0,0.4); }
        }
        .animate-heartbeat {
          animation: heartbeat 3s infinite ease-in-out;
        }

        .clip-path-button {
          clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
        }
      `}</style>

      {/* --- Custom Cursor --- */}
      <div 
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-[#FF4500] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={cursorOutlineRef}
        className={`fixed border border-[#FF4500] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out mix-blend-difference hidden md:block
          ${isHovering ? 'w-20 h-20 bg-[#Eaeaea] border-transparent' : 'w-10 h-10 bg-transparent'}
        `}
      />

      {/* --- Backgrounds --- */}
      <div 
        id="grid-bg"
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)`,
          transformOrigin: 'center top'
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,transparent_40%,#080808_100%)]" />

      {/* --- Main Container --- */}
      <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 border-l border-r border-[#1f1f1f] min-h-screen bg-[#080808]/70 backdrop-blur-[5px]">
        
        {/* --- Header --- */}
        <header className="sticky top-0 z-50 flex justify-between items-center py-8 border-b border-[#1f1f1f] bg-[#080808] backdrop-blur-md">
          <a 
            href="#" 
            className="font-oswald text-3xl font-bold tracking-tighter flex items-center gap-2 group"
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
          >
            UNIT <span className="bg-[#FF4500] text-black px-2 py-0.5">3</span>
          </a>
          <nav className="flex items-center">
            {/* Functional renaming: MISSION LOGS -> WORK */}
            <a href="#work" className="hidden md:block font-mono text-sm mr-8 relative group">
              WORK
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#FF4500] transition-all duration-300 group-hover:w-full"></span>
            </a>
            {/* Functional renaming: DEPLOYMENT -> PRICING */}
            <a href="#pricing" className="hidden md:block font-mono text-sm mr-8 relative group">
              PRICING
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#FF4500] transition-all duration-300 group-hover:w-full"></span>
            </a>
            {/* Functional renaming: INITIATE -> GET STARTED */}
            <a 
              href="https://wa.link/7n7wj0"
              target="_blank"
              rel="noreferrer"
              className="clip-path-button inline-block bg-[#FF4500] text-black px-8 py-3 font-oswald text-lg tracking-widest uppercase border border-[#FF4500] transition-all duration-200 hover:bg-black hover:text-[#FF4500] shadow-[0_0_15px_rgba(255,69,0,0.3)]"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              GET STARTED
            </a>
          </nav>
        </header>

        {/* --- Hero Section --- */}
        <main className="py-24 md:py-40 relative overflow-hidden">
          <div className="hidden md:flex gap-8 mb-8 text-xs text-[#666] font-mono border-b border-[#1f1f1f] pb-4">
            <span>/// SYS.READY</span>
            <span>/// LOC: KUL-SYD-AMS</span>
            <span>/// EST. 2024</span>
          </div>

          <p className="font-mono text-[#FF4500] uppercase tracking-[2px] font-bold mb-4 text-sm md:text-base">
            Design & Deployment Unit
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <h1 
              className="font-oswald text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[7rem] xl:text-[9rem] font-bold leading-[0.95] relative z-10 transition-all duration-300"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              WE DEPLOY<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #333' }}>REVENUE</span><br/>
              ENGINES.
            </h1>

            <div className="border-l-2 border-[#FF4500] pl-6 opacity-90 flex flex-col justify-between h-full">
              <div>
                <p className="text-[#ccc] text-xl md:text-2xl leading-relaxed mb-12">
                  Unit 3 is a tactical design squad. We build landing pages and web apps engineered for revenue. <br/><br/>
                  <strong className="text-[#FF4500]">Page READY IN 7 DAYS.</strong>
                </p>
                <div className="relative z-20">
                  <a 
                    href="https://wa.link/7n7wj0"
                    target="_blank"
                    rel="noreferrer"
                    className="clip-path-button animate-heartbeat inline-block bg-[#FF4500] text-black px-12 py-6 font-oswald text-2xl font-bold tracking-widest uppercase border-2 border-[#FF4500] transition-all duration-200 hover:animate-none hover:scale-110 hover:shadow-[0_0_60px_rgba(255,69,0,0.8)]"
                    onMouseEnter={onHoverStart}
                    onMouseLeave={onHoverEnd}
                  >
                    START PROJECT
                  </a>
                </div>
              </div>
              <p className="font-mono text-xs mt-8 opacity-80 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                /// 2 SLOTS REMAINING FOR THIS MONTH
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* --- Marquee --- */}
      <div className="w-full bg-[#FF4500] text-black py-4 overflow-hidden whitespace-nowrap relative border-y-2 border-white -rotate-1 mb-24">
        <div className="inline-block font-oswald text-2xl font-bold animate-marquee">
          STRATEGY /// DEVELOPMENT /// UX DESIGN /// AUTOMATION /// CONVERSION RATE OPTIMISATION /// STRATEGY /// DEVELOPMENT /// UX DESIGN /// AUTOMATION /// CONVERSION RATE OPTIMISATION /// STRATEGY /// DEVELOPMENT /// UX DESIGN /// AUTOMATION /// CONVERSION RATE OPTIMISATION ///
        </div>
      </div>

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 border-l border-r border-[#1f1f1f] bg-[#080808]/70 backdrop-blur-[5px]">
        
        {/* --- Work Section (Renamed from Mission Logs) --- */}
        <section id="work" className="py-24">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">SELECTED WORK</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ CASE FILES ]</span>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-12">
            
            {/* Project 1: ProRoofing (Updated with Overlap Stack Composition) */}
            <article 
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300 hover:bg-[#111] group"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              {/* Visual Asset Container */}
              <div 
                className="bg-[#111] min-h-[500px] relative overflow-hidden border-r border-[#1f1f1f] flex flex-col items-center justify-center p-8 group-hover:bg-[#151515]"
                style={{
                    background: 'radial-gradient(circle at center, #222 0%, #0a0a0a 100%)'
                }}
              >
                {/* Layer 1: Desktop View */}
                <div className="hidden lg:block absolute top-0 left-0 w-[100%] h-full z-0 transform transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10"></div> 
                    <img 
                        src={proRoofingDesktop} 
                        alt="Desktop View" 
                        className="w-full h-full object-cover object-left-top opacity-70"
                    />
                </div>

                {/* Layer 2: Mobile View (iPhone 17 Pro Max) */}
                <div 
                    className="relative z-20 transition-all duration-500 lg:absolute lg:right-8 lg:bottom-[-40px] lg:rotate-[-2deg] lg:group-hover:rotate-0 lg:group-hover:translate-y-[-10px] w-[240px] h-[500px]"
                >
                    <div 
                        className="w-full h-full bg-black rounded-[46px] border-[3px] border-[#333] shadow-2xl lg:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-black flex flex-col"
                    >
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-30 flex justify-center items-center pointer-events-none">
                            <div className="w-[12px] h-[12px] rounded-full bg-[#1a1a1a] mr-5 opacity-60"></div>
                        </div>
                        
                        <div className="w-full h-full bg-white relative flex flex-col overflow-hidden">
                            <img 
                              src={proRoofingMobile} 
                              alt="ProRoofing Mobile Interface" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 font-mono text-[10px] text-[#666] uppercase tracking-widest group-hover:text-[#FF4500] transition-colors lg:hidden">
                    [ TAP TO INTERACT ]
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center relative z-10 bg-[#0a0a0a] lg:bg-transparent">
                <span className="font-mono text-xs text-[#666] mb-6 block">/// SECTOR: LOCAL SERVICES</span>
                <h3 className="font-oswald text-3xl mb-4 text-[#FF4500]">PROROOFING LEAD ENGINE</h3>
                <p className="text-[#ccc] mb-6 text-[0.95rem] leading-relaxed">
                  Restructured lead-acquisition flow for high-ticket roofing services. Replaced legacy brochureware with a 'Trust-First' mobile architecture and sticky conversion mechanics to capture urgent traffic.
                </p>
                <div className="font-oswald text-5xl text-[#FF4500] leading-none mb-2">+30%</div>
                <div className="font-mono text-xs text-[#666]">LEAD CAPTURE RATE</div>
              </div>
            </article>

            {/* Project 2: Solvix (Replaced Velocity Store) */}
            <article 
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300 hover:bg-[#111] group"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              {/* Visual Asset Container */}
              <div 
                className="bg-[#111] min-h-[500px] relative overflow-hidden border-r border-[#1f1f1f] flex flex-col items-center justify-center p-8 group-hover:bg-[#151515]"
                style={{
                    background: 'radial-gradient(circle at center, #222 0%, #0a0a0a 100%)'
                }}
              >
                {/* Layer 1: Desktop View */}
                <div className="hidden lg:block absolute top-0 left-0 w-[100%] h-full z-0 transform transition-transform duration-700 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10"></div> 
                    <img 
                        src={solvixDesktop} 
                        alt="Solvix Desktop" 
                        className="w-full h-full object-cover object-left-top opacity-70"
                    />
                </div>

                {/* Layer 2: Mobile View (iPhone 17 Pro Max) */}
                <div 
                    className="relative z-20 transition-all duration-500 lg:absolute lg:right-8 lg:bottom-[-40px] lg:rotate-[-2deg] lg:group-hover:rotate-0 lg:group-hover:translate-y-[-10px] w-[240px] h-[500px]"
                >
                    <div 
                        className="w-full h-full bg-black rounded-[46px] border-[3px] border-[#333] shadow-2xl lg:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-black flex flex-col"
                    >
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-30 flex justify-center items-center pointer-events-none">
                            <div className="w-[12px] h-[12px] rounded-full bg-[#1a1a1a] mr-5 opacity-60"></div>
                        </div>
                        
                        <div className="w-full h-full bg-white relative flex flex-col overflow-hidden">
                            <img 
                              src={solvixMobile} 
                              alt="Solvix Mobile Interface" 
                              className="w-full h-full object-cover"
                            />
                            {/* Tap Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 font-mono text-[10px] text-[#666] uppercase tracking-widest group-hover:text-[#FF4500] transition-colors lg:hidden">
                    [ TAP TO INTERACT ]
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center relative z-10 bg-[#0a0a0a] lg:bg-transparent">
                <span className="font-mono text-xs text-[#666] mb-6 block">/// SECTOR: CREATIVE SERVICES</span>
                <h3 className="font-oswald text-3xl mb-4 text-[#FF4500]">SOLVIX PORTFOLIO SYSTEM</h3>
                <p className="text-[#ccc] mb-6 text-[0.95rem] leading-relaxed">
                  Solvix had a stellar Instagram portfolio, but their legacy website wasn't doing it justice. We designed a bold, modern web architecture to capture their high-end clientele and mirror their brand quality.
                </p>
                <div className="font-oswald text-5xl text-[#FF4500] leading-none mb-2">3X</div>
                <div className="font-mono text-xs text-[#666]">WEB INQUIRIES</div>
              </div>
            </article>

          </div>
        </section>

        {/* --- NEW: Client Debriefs (Testimonials) --- */}
        <section className="py-24 border-t border-[#1f1f1f]">
           <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">CLIENT DEBRIEFS</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ VERIFIED INTEL ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1: ProRoofing */}
            <article className="border border-[#1f1f1f] p-8 bg-[#0a0a0a] hover:border-[#FF4500] transition-colors duration-300">
              <div className="text-[#FF4500] text-4xl font-oswald mb-4">"</div>
              <p className="text-[#ccc] text-lg leading-relaxed mb-6 font-inter">
                Unit 3 didn't just build a website. They built a war machine. Our lead volume tripled in the first week of deployment. The 7-day timeline wasn't a marketing gimmick; it was a promise kept.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#222] rounded-full overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-oswald text-white">MARCUS T.</h4>
                  <p className="font-mono text-xs text-[#666]">CEO, PROROOFING</p>
                </div>
              </div>
            </article>

            {/* Testimonial 2: Solvix (Updated for SC) */}
            <article className="border border-[#1f1f1f] p-8 bg-[#0a0a0a] hover:border-[#FF4500] transition-colors duration-300">
              <div className="text-[#FF4500] text-4xl font-oswald mb-4">"</div>
              <p className="text-[#ccc] text-lg leading-relaxed mb-6 font-inter">
                Our Instagram was incredible, but our website was a letdown. Unit 3 built a bold, modern platform that finally does our work justice. It captures the exact vibe we were missing.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#222] rounded-full overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-oswald text-white">SC</h4>
                  <p className="font-mono text-xs text-[#666]">FOUNDER, SOLVIX</p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* --- Pricing (Renamed from Deployment Packs) --- */}
        <section id="pricing" className="py-24 border-t border-[#1f1f1f]">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            {/* Functional renaming: DEPLOYMENT PACKS -> PRICING PACKAGES */}
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">PRICING PACKAGES</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ PILOT PROGRAM ACTIVE ]</span>
          </div>
          
          <p className="mb-12 max-w-[600px] text-[#ccc]">
            We are currently accepting a limited number of projects for our Q1 Portfolio Cohort. 
            <span className="text-[#FF4500] ml-1">Secure enterprise-grade development at entry-level rates</span> in exchange for a case study.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pilot Tier */}
            <article 
              className="border border-[#FF4500] bg-[rgba(255,69,0,0.05)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgba(255,69,0,0.1)] flex flex-col h-full"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <div className="mb-6 flex justify-between items-start">
                <span className="font-mono text-[#FF4500] text-sm">/// PILOT ACCESS</span>
                <span className="bg-[#FF4500] text-black text-[0.7rem] px-2 py-0.5 font-bold">LIMITED SLOTS</span>
              </div>
              
              <h3 className="font-oswald text-2xl mb-2">LANDING PROTOCOL</h3>
              <div className="font-oswald leading-none mb-1 flex items-baseline">
                <span className="text-2xl mr-2">{currency.symbol}</span>
                <span className="text-6xl">{currency.price}</span>
              </div>
              <p className="font-mono text-xs opacity-60 mb-6">ONE-TIME INVESTMENT</p>

              {/* Guarantee Badge */}
              <div className="mb-8 flex items-center gap-3 text-sm bg-[rgba(255,69,0,0.1)] p-3 border-l-2 border-[#FF4500]">
                <span className="font-bold text-[#FF4500]">GUARANTEE:</span>
                <span>We ship in 7 days or 100% money back.</span>
              </div>

              <ul className="list-none mb-8 text-sm flex-grow">
                {['High-Conversion Copywriting', 'Mobile-First Responsive Design', 'Analytics & Pixel Setup', '5-Day Delivery Guarantee', 'Free Domain & Hosting (1st Year)'].map((item, i) => (
                  <li key={i} className="mb-2 border-b border-[#222] pb-2 last:border-0">+ {item}</li>
                ))}
              </ul>

              <a 
                href="https://wa.link/7n7wj0"
                target="_blank"
                rel="noreferrer"
                className="clip-path-button w-full text-center inline-block bg-[#FF4500] text-black px-6 py-4 font-oswald text-lg tracking-widest uppercase border border-[#FF4500] transition-all duration-200 hover:bg-transparent hover:text-[#FF4500]"
              >
                SECURE SLOT
              </a>
            </article>

            {/* Custom Tier */}
            <article 
              className="border border-[#1f1f1f] bg-[#080808] p-8 transition-all duration-300 hover:bg-[#0e0e0e] flex flex-col h-full"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <div className="mb-6">
                <span className="font-mono text-sm opacity-50">/// FULL SYSTEM</span>
              </div>
              
              <h3 className="font-oswald text-2xl mb-2">CUSTOM ARCHITECTURE</h3>
              <div className="font-oswald text-6xl leading-none mb-1 opacity-50">CUSTOM</div>
              <p className="font-mono text-xs opacity-60 mb-8">BASED ON SCOPE</p>

              <ul className="list-none mb-8 text-sm flex-grow opacity-80">
                {['Multi-Page / CMS Integration', 'Membership & Paywalls', 'Advanced Animations (WebGL)', 'Ongoing Optimisation'].map((item, i) => (
                  <li key={i} className="mb-2 border-b border-[#222] pb-2 last:border-0">+ {item}</li>
                ))}
              </ul>

              <a 
                href="https://wa.link/qr1fsi"
                target="_blank"
                rel="noreferrer"
                className="clip-path-button w-full text-center inline-block bg-transparent text-white px-6 py-4 font-oswald text-lg tracking-widest uppercase border border-[#333] transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
              >
                GET CUSTOM QUOTE
              </a>
            </article>

          </div>
        </section>

        {/* --- Team (The Operators) --- */}
        <section id="team" className="py-24 border-t border-[#1f1f1f]">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">THE TEAM</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ UNIT COMMAND ]</span>
          </div>
          
          <p className="mb-12 max-w-[600px] text-[#ccc]">
            You don't hire an agency. You hire a specialized unit. We are a trio of senior-level architects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "DESIGN DIRECTOR", 
                handle: "JAY", 
                desc: "Ex-Agency Design Lead. Specialist in high-conversion UI patterns, component systems, and user psychology.", 
                img: jayImg
              },
              { 
                title: "STRATEGY DIRECTOR", 
                handle: "ZX", 
                desc: "Deployment Strategist. Focus on sales funnels, persuasive copywriting, and maximizing revenue per visitor.", 
                img: zxImg
              },
              { 
                title: "TECHNICAL DIRECTOR", 
                handle: "VINCENT", 
                desc: "Full-stack Engineer. React, Node, and WebGL architecture. Speed and stability are the only metrics that matter.", 
                img: vincentImg
              }
            ].map((op, i) => (
              <article 
                key={i} 
                className="bg-[#080808] p-6 border border-[#1f1f1f] hover:border-[#FF4500] transition-colors duration-300 group"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <div className="w-full aspect-square bg-[#111] mb-6 border border-[#333] flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={op.img} 
                    alt={op.handle}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-oswald text-xl text-[#FF4500] mb-2">{op.title}</h3>
                <p className="font-mono text-xs mb-4 border-b border-[#222] pb-2">// HANDLE: {op.handle}</p>
                <p className="text-sm opacity-80 leading-relaxed">{op.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Capabilities --- */}
        <section id="capabilities" className="py-24">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">OUR SERVICES</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ OPERATIONAL ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#1f1f1f] border border-[#1f1f1f]">
            {[
              { num: "01", title: "Landing Page Systems", desc: "High-performance pages optimised for conversion. We utilise a component-driven architecture to launch in 7 days or less. Zero bloat. Maximum speed." },
              { num: "02", title: "Custom Web Apps", desc: "React & Node solutions for complex business logic. Scalable, secure, and built for international markets (MY/AU/NL)." },
              { num: "03", title: "Membership Architecture", desc: "Gated content systems designed to maximise recurring revenue. Seamless payment integration and user management." }
            ].map((item, i) => (
              <article 
                key={i} 
                className="bg-[#080808] p-8 hover:bg-[#0e0e0e] transition-colors duration-300 group h-full"
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
              >
                <span className="font-oswald text-6xl text-[#333] mb-4 block group-hover:text-[#FF4500] transition-colors duration-300">{item.num}</span>
                <h3 className="font-oswald text-2xl uppercase mb-4">{item.title}</h3>
                <p className="text-base opacity-80 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Emergency Banner --- */}
        <section className="mt-24 p-8 border border-[#FF4500] relative overflow-hidden" 
          style={{
            background: 'repeating-linear-gradient(45deg, #111, #111 10px, #1a1a1a 10px, #1a1a1a 20px)'
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="flex items-center text-2xl font-oswald uppercase mb-2">
                <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-3 animate-pulse-custom shadow-[0_0_0_rgba(255,0,0,0.4)]"></span>
                EMERGENCY DEPLOYMENT
              </h3>
              <p className="font-inter max-w-[500px]">
                Need it yesterday? We keep <span className="text-[#FF4500]">2 slots open</span> per month for 48-hour turnarounds. Premium rates apply.
              </p>
            </div>
            <a 
              href="https://wa.link/97qgk9"
              target="_blank"
              rel="noreferrer"
              className="clip-path-button inline-block bg-transparent text-[#FF4500] px-8 py-3 font-oswald text-lg tracking-widest uppercase border border-[#FF4500] transition-all duration-200 hover:bg-[#FF4500] hover:text-black"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              CHECK AVAILABILITY
            </a>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer id="contact" className="py-24 mt-24 border-t border-[#1f1f1f]">
          <div className="font-mono text-[#FF4500] uppercase mb-8 text-sm">/// Transmission End</div>
          
          <div className="mb-16">
            <h2 className="font-oswald text-4xl md:text-5xl mb-8">READY TO DEPLOY?</h2>
            <a 
              href="https://wa.link/7n7wj0"
              target="_blank"
              rel="noreferrer"
              className="clip-path-button inline-block bg-[#FF4500] text-black px-10 py-5 font-oswald text-xl tracking-widest uppercase border border-[#FF4500] transition-all duration-200 hover:bg-black hover:text-[#FF4500] shadow-[0_0_15px_rgba(255,69,0,0.3)]"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              CLICK HERE TO START YOUR PROJECT
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8 pt-8 border-t border-[#333] opacity-60 font-mono text-sm">
            <div>
              <strong className="block mb-2 text-white">BASE OF OPERATIONS</strong>
              Kuala Lumpur • Sydney • Amsterdam
            </div>
            <div>
              <strong className="block mb-2 text-white">DIRECT LINE</strong>
              +60 11 5559 4933
            </div>
            <div>
              © 2025 UNIT 3.<br/>
              ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;