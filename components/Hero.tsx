export function Hero() {
  return (
    <main className="py-24 relative overflow-hidden">
      {/* Meta Information */}
      <div className="hidden md:flex gap-8 mb-8 text-xs text-[#666] border-b border-[#1f1f1f] pb-4 w-fit">
        <span className="font-['Space_Mono']">/// SYS.READY</span>
        <span className="font-['Space_Mono']">/// LOC: KUL-SYD-AMS</span>
        <span className="font-['Space_Mono']">/// EST. 2024</span>
      </div>

      <p className="uppercase text-[#ff4500] font-['Space_Mono'] tracking-[2px] mb-4">
        Design & Deployment Unit
      </p>

      <h1 className="font-['Oswald'] uppercase leading-[0.95] mb-12 relative z-[2]">
        <span className="block text-[clamp(3.5rem,10vw,9rem)]">WE DEPLOY</span>
        <span
          className="block text-[clamp(3.5rem,10vw,9rem)]"
          style={{
            WebkitTextStroke: '2px #333',
            color: 'transparent',
          }}
        >
          REVENUE
        </span>
        <span className="block text-[clamp(3.5rem,10vw,9rem)]">ENGINES.</span>
      </h1>

      <div className="max-w-[600px] mb-24 border-l-2 border-[#ff4500] pl-6 opacity-90">
        <p className="text-[1.2rem] leading-[1.7] text-[#ccc]">
          Unit 3 is a tactical design squad. We build high-conversion digital infrastructure.
          Standardised protocols. Rapid deployment.
          <br />
          <br />
          <strong className="text-[#ff4500]">REVENUE-READY IN 7 DAYS.</strong>
        </p>

        <div className="mt-10">
          <a
            href="#pricing"
            className="inline-block bg-[#ff4500] text-black px-12 py-5 font-['Oswald'] text-[1.2rem] tracking-wide uppercase border border-[#ff4500] transition-all duration-200 hover:bg-transparent hover:text-[#ff4500] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_rgba(255,69,0,0.3)]"
            style={{
              clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
            }}
          >
            START PROJECT
          </a>
          <p className="font-['Space_Mono'] text-xs mt-4 opacity-60">
            /// 2 SLOTS REMAINING FOR THIS MONTH
          </p>
        </div>
      </div>
    </main>
  );
}
