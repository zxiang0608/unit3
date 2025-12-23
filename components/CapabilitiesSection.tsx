export function CapabilitiesSection() {
  const services = [
    {
      number: '01',
      title: 'Landing Page Systems',
      description:
        'High-performance pages optimised for conversion. We utilise a component-driven architecture to launch in 7 days or less. Zero bloat. Maximum speed.',
    },
    {
      number: '02',
      title: 'Custom Web Apps',
      description:
        'React & Node solutions for complex business logic. Scalable, secure, and built for international markets (MY/AU/NL).',
    },
    {
      number: '03',
      title: 'Membership Architecture',
      description:
        'Gated content systems designed to maximise recurring revenue. Seamless payment integration and user management.',
    },
  ];

  return (
    <section id="capabilities" className="py-24">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
        <h2 className="font-['Oswald'] text-[clamp(2rem,5vw,4rem)] uppercase">
          UNIT CAPABILITIES
        </h2>
        <span className="uppercase text-[#ff4500] font-['Space_Mono'] text-sm">
          [ OPERATIONAL ]
        </span>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1f1f1f] border border-[#1f1f1f]">
        {services.map((service, index) => (
          <article
            key={index}
            className="bg-[#080808] p-12 transition-all duration-300 hover:bg-[#0e0e0e] group h-full"
            data-interactive
          >
            <span className="font-['Oswald'] text-[4rem] text-[#333] mb-6 block leading-none transition-colors duration-300 group-hover:text-[#ff4500]">
              {service.number}
            </span>
            <h3 className="mb-4 font-['Oswald'] uppercase text-[1.5rem]">
              {service.title}
            </h3>
            <p className="mt-4 opacity-80 text-[#ccc]">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
