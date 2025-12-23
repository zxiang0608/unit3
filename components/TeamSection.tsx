export function TeamSection() {
  const operators = [
    {
      handle: 'ZERO_ONE',
      title: 'LEAD ARCHITECT',
      description:
        'Ex-Agency Design Lead. Specialist in high-conversion UI patterns, component systems, and user psychology.',
      ref: 'OP_01',
    },
    {
      handle: 'THE_BUILDER',
      title: 'STRATEGY DIRECTOR',
      description:
        'Deployment Strategist. Focus on sales funnels, persuasive copywriting, and maximizing revenue per visitor.',
      ref: 'OP_02',
    },
    {
      handle: 'SYSTEM_ROOT',
      title: 'CODE OPS',
      description:
        'Full-stack Engineer. React, Node, and WebGL architecture. Speed and stability are the only metrics that matter.',
      ref: 'OP_03',
    },
  ];

  return (
    <section id="team" className="py-24 border-t border-[#1f1f1f]">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
        <h2 className="font-['Oswald'] text-[clamp(2rem,5vw,4rem)] uppercase">
          THE OPERATORS
        </h2>
        <span className="uppercase text-[#ff4500] font-['Space_Mono'] text-sm">
          [ UNIT COMMAND ]
        </span>
      </div>

      <p className="mb-12 max-w-[600px] text-[#ccc]">
        You don't hire an agency. You hire a specialized unit. We are a trio of senior-level
        architects.
      </p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1f1f1f] border border-[#1f1f1f]">
        {operators.map((operator, index) => (
          <article
            key={index}
            className="bg-[#080808] p-12 transition-all duration-300 hover:bg-[#0e0e0e]"
            data-interactive
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-[#111] mb-6 border border-[#333] flex items-center justify-center relative overflow-hidden">
              <span className="font-['Space_Mono'] text-[#444] text-xs relative z-10">
                [ IMG: {operator.ref} ]
              </span>
              {/* Grid overlay */}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              />
            </div>

            <h3 className="text-[#ff4500] mb-2 font-['Oswald'] uppercase">
              {operator.title}
            </h3>
            <p className="font-['Space_Mono'] text-xs mb-4 border-b border-[#222] pb-2">
              // HANDLE: {operator.handle}
            </p>
            <p className="text-[0.95rem] opacity-80 text-[#ccc]">
              {operator.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
