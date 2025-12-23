import React, { useState, useEffect, useRef } from 'react';

// --- Image Imports ---
import jayImg from "./assets/jay.png";
import zxImg from "./assets/zx.png";
import vincentImg from "./assets/vincent.png";
import proRoofingMobile from "./assets/proroof.jpg"; // Changed to .jpg
import solvixMobile from "./assets/solvix.jpg";       // Changed to .jpg
import proRoofingDesktop from "./assets/proroof1.png";
import solvixDesktop from "./assets/solvix1.png";
import faviconImg from "./assets/unit3logo.png";

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
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`;
        cursorDotRef.current.style.top = `${clientY}px`;
      }
      if (cursorOutlineRef.current) {
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
      {/* Styles for Fonts & Animations */}
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
            <a href="#work" className="hidden md:block font-mono text-sm mr-8 relative group">WORK</a>
            <a href="#pricing" className="hidden md:block font-mono text-sm mr-8 relative group">PRICING</a>
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
          STRATEGY /// DEVELOPMENT /// UX DESIGN /// AUTOMATION /// CONVERSION RATE OPTIMISATION /// STRATEGY /// DEVELOPMENT /// UX DESIGN /// AUTOMATION /// CONVERSION RATE OPTIMISATION ///
        </div>
      </div>

      <div className="relative max-w-[1300px] mx-auto px-6 md:px-12 border-l border-r border-[#1f1f1f] bg-[#080808]/70 backdrop-blur-[5px]">
        
        {/* --- Work Section --- */}
        <section id="work" className="py-24">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">SELECTED WORK</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ CASE FILES ]</span>
          </div>

          <div className="grid grid-cols-1 gap-12 mt-12">
            
            {/* Project 1: ProRoofing */}
            <article 
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300 hover:bg-[#111] group"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <div 
                className="bg-[#111] min-h-[500px] relative overflow-hidden border-r border-[#1f1f1f] flex flex-col items-center justify-center p-8 group-hover:bg-[#151515]"
                style={{ background: 'radial-gradient(circle at center, #222 0%, #0a0a0a 100%)' }}
              >
                <div className="hidden lg:block absolute top-0 left-0 w-[100%] h-full z-0 transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10"></div> 
                  <img src={proRoofingDesktop} alt="Desktop View" className="w-full h-full object-cover object-left-top opacity-70" />
                </div>
                <div className="relative z-20 transition-all duration-500 lg:absolute lg:right-8 lg:bottom-[-40px] lg:rotate-[-2deg] lg:group-hover:rotate-0 lg:group-hover:translate-y-[-10px] w-[240px] h-[500px]">
                  <div className="w-full h-full bg-black rounded-[46px] border-[3px] border-[#333] shadow-2xl lg:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
                    <img src={proRoofingMobile} alt="ProRoofing Mobile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center bg-[#0a0a0a] lg:bg-transparent">
                <span className="font-mono text-xs text-[#666] mb-6 block">/// SECTOR: LOCAL SERVICES</span>
                <h3 className="font-oswald text-3xl mb-4 text-[#FF4500]">PROROOFING LEAD ENGINE</h3>
                <p className="text-[#ccc] mb-6 text-[0.95rem] leading-relaxed">Restructured lead-acquisition flow for high-ticket roofing services.</p>
                <div className="font-oswald text-5xl text-[#FF4500] leading-none mb-2">+30%</div>
                <div className="font-mono text-xs text-[#666]">LEAD CAPTURE RATE</div>
              </div>
            </article>

            {/* Project 2: Solvix */}
            <article 
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300 hover:bg-[#111] group"
              onMouseEnter={onHoverStart}
              onMouseLeave={onHoverEnd}
            >
              <div 
                className="bg-[#111] min-h-[500px] relative overflow-hidden border-r border-[#1f1f1f] flex flex-col items-center justify-center p-8 group-hover:bg-[#151515]"
                style={{ background: 'radial-gradient(circle at center, #222 0%, #0a0a0a 100%)' }}
              >
                <div className="hidden lg:block absolute top-0 left-0 w-[100%] h-full z-0 transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10"></div> 
                  <img src={solvixDesktop} alt="Solvix Desktop" className="w-full h-full object-cover object-left-top opacity-70" />
                </div>
                <div className="relative z-20 transition-all duration-500 lg:absolute lg:right-8 lg:bottom-[-40px] lg:rotate-[-2deg] lg:group-hover:rotate-0 lg:group-hover:translate-y-[-10px] w-[240px] h-[500px]">
                  <div className="w-full h-full bg-black rounded-[46px] border-[3px] border-[#333] shadow-2xl lg:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
                    <img src={solvixMobile} alt="Solvix Mobile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center bg-[#0a0a0a] lg:bg-transparent">
                <span className="font-mono text-xs text-[#666] mb-6 block">/// SECTOR: CREATIVE SERVICES</span>
                <h3 className="font-oswald text-3xl mb-4 text-[#FF4500]">SOLVIX PORTFOLIO SYSTEM</h3>
                <p className="text-[#ccc] mb-6 text-[0.95rem] leading-relaxed">Modern web architecture mirroring high-end brand quality.</p>
                <div className="font-oswald text-5xl text-[#FF4500] leading-none mb-2">3X</div>
                <div className="font-mono text-xs text-[#666]">WEB INQUIRIES</div>
              </div>
            </article>
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-24 border-t border-[#1f1f1f]">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">PRICING PACKAGES</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ PILOT PROGRAM ACTIVE ]</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="border border-[#FF4500] bg-[rgba(255,69,0,0.05)] p-8 flex flex-col h-full">
              <span className="font-mono text-[#FF4500] text-sm mb-6">/// PILOT ACCESS</span>
              <h3 className="font-oswald text-2xl mb-2">LANDING PROTOCOL</h3>
              <div className="font-oswald leading-none mb-1 flex items-baseline">
                <span className="text-2xl mr-2">{currency.symbol}</span>
                <span className="text-6xl">{currency.price}</span>
              </div>
              <ul className="list-none mb-8 text-sm flex-grow">
                {['High-Conversion Copywriting', 'Mobile-First Design', '7-Day Guarantee'].map((item, i) => (
                  <li key={i} className="mb-2 border-b border-[#222] pb-2 last:border-0">+ {item}</li>
                ))}
              </ul>
              <a href="https://wa.link/7n7wj0" className="clip-path-button w-full text-center bg-[#FF4500] text-black px-6 py-4 font-oswald text-lg tracking-widest uppercase">SECURE SLOT</a>
            </article>

            <article className="border border-[#1f1f1f] bg-[#080808] p-8 flex flex-col h-full">
              <span className="font-mono text-sm opacity-50 mb-6">/// FULL SYSTEM</span>
              <h3 className="font-oswald text-2xl mb-2">CUSTOM ARCHITECTURE</h3>
              <div className="font-oswald text-6xl leading-none mb-1 opacity-50">CUSTOM</div>
              <a href="https://wa.link/qr1fsi" className="clip-path-button w-full text-center border border-[#333] text-white px-6 py-4 font-oswald text-lg tracking-widest uppercase">GET QUOTE</a>
            </article>
          </div>
        </section>

        {/* --- Team Section --- */}
        <section id="team" className="py-24 border-t border-[#1f1f1f]">
          <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
            <h2 className="font-oswald text-4xl md:text-6xl uppercase font-bold">THE TEAM</h2>
            <span className="font-mono text-[#FF4500] uppercase text-sm">[ UNIT COMMAND ]</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "DESIGN DIRECTOR", handle: "JAY", img: jayImg },
              { title: "STRATEGY DIRECTOR", handle: "ZX", img: zxImg },
              { title: "TECHNICAL DIRECTOR", handle: "VINCENT", img: vincentImg }
            ].map((op, i) => (
              <article key={i} className="bg-[#080808] p-6 border border-[#1f1f1f] hover:border-[#FF4500] transition-colors duration-300 group">
                <div className="w-full aspect-square bg-[#111] mb-6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300">
                  <img src={op.img} alt={op.handle} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-oswald text-xl text-[#FF4500] mb-2">{op.title}</h3>
                <p className="font-mono text-xs mb-4 border-b border-[#222] pb-2">// HANDLE: {op.handle}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer id="contact" className="py-24 mt-24 border-t border-[#1f1f1f]">
          <div className="font-mono text-[#FF4500] uppercase mb-8 text-sm">/// Transmission End</div>
          <h2 className="font-oswald text-4xl md:text-5xl mb-8">READY TO DEPLOY?</h2>
          <a href="https://wa.link/7n7wj0" className="clip-path-button inline-block bg-[#FF4500] text-black px-10 py-5 font-oswald text-xl tracking-widest uppercase shadow-[0_0_15px_rgba(255,69,0,0.3)]">START YOUR PROJECT</a>
          <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-[#333] opacity-60 font-mono text-sm mt-16">
            <div>© 2025 UNIT 3. ALL RIGHTS RESERVED.</div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
