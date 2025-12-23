export function WorkSection() {
  return (
    <section id="work" className="py-24">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
        <h2 className="font-['Oswald'] text-[clamp(2rem,5vw,4rem)] uppercase">
          MISSION LOGS
        </h2>
        <span className="uppercase text-[#ff4500] font-['Space_Mono'] text-sm">
          [ SELECTED CASE FILES ]
        </span>
      </div>

      {/* Work Grid */}
      <div className="grid grid-cols-1 gap-12 mt-12">
        {/* Project 1 */}
        <article
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300 hover:border-[#333]"
          data-interactive
        >
          <div className="bg-[#111] min-h-[300px] relative overflow-hidden border-r border-[#1f1f1f] group">
            {/* Placeholder Pattern */}
            <div
              className="absolute top-0 left-0 w-full h-full opacity-50 transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute bottom-5 left-5 font-['Space_Mono'] text-xs bg-black px-1.5 py-1">
              IMG_REF: SAAS_01
            </div>
          </div>

          <div className="p-12 flex flex-col justify-center">
            <span className="font-['Space_Mono'] text-xs text-[#666] mb-6 block">
              /// SECTOR: FINTECH SAAS
            </span>
            <h3 className="text-[2rem] mb-4 font-['Oswald'] uppercase">
              FINFLOW DASHBOARD
            </h3>
            <p className="mb-6 text-[0.95rem] text-[#ccc]">
              Complete overhaul of user onboarding flow. Reduced friction points and
              implemented local payment gateways for Malaysia/Singapore markets.
            </p>
            <div className="font-['Oswald'] text-[3rem] text-[#ff4500] leading-none mb-2">
              +210%
            </div>
            <div className="font-['Space_Mono'] text-xs text-[#666]">
              CONVERSION UPLIFT
            </div>
          </div>
        </article>

        {/* Project 2 */}
        <article
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] border border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300 hover:border-[#333]"
          data-interactive
        >
          <div className="bg-[#111] min-h-[300px] relative overflow-hidden border-r border-[#1f1f1f] group">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-50 transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute bottom-5 left-5 font-['Space_Mono'] text-xs bg-black px-1.5 py-1">
              IMG_REF: ECOM_SPRINT
            </div>
          </div>

          <div className="p-12 flex flex-col justify-center">
            <span className="font-['Space_Mono'] text-xs text-[#666] mb-6 block">
              /// SECTOR: E-COMMERCE
            </span>
            <h3 className="text-[2rem] mb-4 font-['Oswald'] uppercase">
              VELOCITY STORE
            </h3>
            <p className="mb-6 text-[0.95rem] text-[#ccc]">
              Emergency deployment for holiday season. Built and launched in 5 days using our
              proprietary component system.
            </p>
            <div className="font-['Oswald'] text-[3rem] text-[#ff4500] leading-none mb-2">
              $50K
            </div>
            <div className="font-['Space_Mono'] text-xs text-[#666]">
              REVENUE WEEK 1
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
