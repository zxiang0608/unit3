export function Header() {
  return (
    <header className="flex justify-between items-center py-12 border-b border-[#1f1f1f] sticky top-0 bg-[#080808]/95 z-[100] backdrop-blur-[10px]">
      <a href="#" className="flex items-center gap-2.5">
        <span className="font-['Oswald'] text-[2rem] font-bold tracking-tight leading-none">
          UNIT{' '}
          <span className="bg-[#ff4500] text-black px-2 py-0.5">3</span>
        </span>
      </a>
      
      <nav className="flex items-center gap-12">
        <a
          href="#work"
          className="hidden md:block text-sm font-['Space_Mono'] relative group"
        >
          MISSION LOGS
          <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#ff4500] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="#pricing"
          className="hidden md:block text-sm font-['Space_Mono'] relative group"
        >
          DEPLOYMENT
          <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#ff4500] transition-all duration-300 group-hover:w-full" />
        </a>
        <a
          href="#contact"
          className="inline-block bg-[#ff4500] text-black px-10 py-4 font-['Oswald'] text-[1.1rem] tracking-wide uppercase border border-[#ff4500] transition-all duration-200 hover:bg-transparent hover:text-[#ff4500] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_rgba(255,69,0,0.3)]"
          style={{
            clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
          }}
        >
          INITIATE
        </a>
      </nav>
    </header>
  );
}
