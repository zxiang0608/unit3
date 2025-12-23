export function EmergencyBanner() {
  return (
    <section
      className="mt-40 border border-[#ff4500] p-12 relative overflow-hidden"
      style={{
        background:
          'repeating-linear-gradient(45deg, #111, #111 10px, #1a1a1a 10px, #1a1a1a 20px)',
      }}
    >
      <div className="relative z-[2] flex justify-between items-center flex-wrap gap-8">
        <div>
          <h3 className="mb-2 flex items-center font-['Oswald'] uppercase text-[1.5rem]">
            <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2.5 shadow-[0_0_0_rgba(255,0,0,0.4)] animate-pulse-dot" />
            EMERGENCY DEPLOYMENT
          </h3>
          <p className="font-['Inter'] max-w-[500px] text-[#ccc]">
            Need it yesterday? We keep{' '}
            <span className="text-[#ff4500]">2 slots open</span> per month for 48-hour
            turnarounds. Premium rates apply.
          </p>
        </div>
        <a
          href="#contact"
          className="bg-transparent text-[#ff4500] border-[#ff4500] px-10 py-4 font-['Oswald'] text-[1.1rem] tracking-wide uppercase border transition-all duration-200 hover:bg-[#ff4500] hover:text-black"
          style={{
            clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
          }}
        >
          CHECK AVAILABILITY
        </a>
      </div>
    </section>
  );
}
