export function Marquee() {
  const text =
    'STRATEGY /// DEVELOPMENT /// UX DESIGN /// AUTOMATION /// CONVERSION RATE OPTIMISATION /// ';

  return (
    <div className="w-screen bg-[#ff4500] text-black py-4 overflow-hidden whitespace-nowrap relative left-1/2 -ml-[50vw] border-t-2 border-b-2 border-white mb-24">
      <div className="inline-block font-['Oswald'] text-[2rem] animate-marquee">
        {text}
        {text}
      </div>
    </div>
  );
}
