export function Footer() {
  return (
    <footer id="contact" className="py-40 mt-40 border-t border-[#1f1f1f]">
      <div className="uppercase text-[#ff4500] font-['Space_Mono'] mb-4">
        /// Transmission End
      </div>

      <a
        href="https://calendly.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block font-['Oswald'] text-[clamp(3rem,8vw,7rem)] leading-[0.9] mb-12 transition-colors duration-300 hover:text-[#ff4500]"
        style={{
          WebkitTextStroke: '0px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.WebkitTextStroke = '2px #ff4500';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.WebkitTextStroke = '0px';
        }}
      >
        BOOK RECON
        <br />
        CALL
      </a>

      <div className="flex justify-between flex-wrap gap-8 opacity-60 text-sm border-t border-[#333] pt-8 font-['Space_Mono']">
        <div>
          <strong className="block mb-2">BASE OF OPERATIONS</strong>
          Kuala Lumpur • Sydney • Amsterdam
        </div>
        <div>
          <strong className="block mb-2">DIRECT LINE</strong>
          <a href="mailto:hello@unit3.com" className="underline block mb-1">
            hello@unit3.com
          </a>
          +60 12 345 6789
        </div>
        <div>
          © 2024 UNIT 3.
          <br />
          ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
