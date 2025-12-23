import { useEffect, useState } from 'react';

export function PricingSection() {
  const [pricing, setPricing] = useState({ value: 'RM 1199', symbol: 'MYR' });

  useEffect(() => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      let priceValue = 'RM 1199';
      let currencySymbol = 'MYR';

      if (userTimeZone.includes('Australia')) {
        priceValue = 'AUD $799';
        currencySymbol = 'AUD';
      } else if (
        userTimeZone.includes('Europe') ||
        userTimeZone.includes('Amsterdam') ||
        userTimeZone.includes('Paris') ||
        userTimeZone.includes('Berlin')
      ) {
        priceValue = '€499';
        currencySymbol = 'EUR';
      } else if (userTimeZone.includes('America') || userTimeZone.includes('US')) {
        priceValue = '$499';
        currencySymbol = 'USD';
      }

      setPricing({ value: priceValue, symbol: currencySymbol });
      console.log(`LOCALE DETECTED: ${userTimeZone} -> SET CURRENCY: ${currencySymbol}`);
    } catch (e) {
      console.log('Currency detection failed, using default.');
    }
  }, []);

  return (
    <section id="pricing" className="py-24 border-t border-[#1f1f1f]">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12 border-b border-[#1f1f1f] pb-4">
        <h2 className="font-['Oswald'] text-[clamp(2rem,5vw,4rem)] uppercase">
          DEPLOYMENT PACKS
        </h2>
        <span className="uppercase text-[#ff4500] font-['Space_Mono'] text-sm">
          [ PILOT PROGRAM ACTIVE ]
        </span>
      </div>

      <p className="mb-12 max-w-[600px] text-[#ccc]">
        We are currently accepting a limited number of projects for our Q1 Portfolio Cohort.{' '}
        <span className="text-[#ff4500]">
          Secure enterprise-grade development at entry-level rates
        </span>{' '}
        in exchange for a case study.
      </p>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1f1f1f] border border-[#1f1f1f]">
        {/* Pricing Card 1: The Pilot (Landing Page) */}
        <article
          className="bg-[#080808] p-12 transition-all duration-300 hover:bg-[#0e0e0e] border border-[#ff4500] bg-[rgba(255,69,0,0.05)]"
          data-interactive
        >
          <div className="mb-6 flex justify-between items-start">
            <span className="font-['Space_Mono'] text-[#ff4500]">
              /// PILOT ACCESS
            </span>
            <span className="bg-[#ff4500] text-black text-[0.7rem] px-1.5 py-0.5">
              LIMITED SLOTS
            </span>
          </div>

          <h3 className="text-[1.5rem] mb-2 font-['Oswald'] uppercase">
            LANDING PROTOCOL
          </h3>
          <div className="font-['Oswald'] text-[3.5rem] leading-none">
            {pricing.value}
          </div>
          <p className="font-['Space_Mono'] text-xs opacity-60 mb-4">
            ONE-TIME INVESTMENT
          </p>

          {/* Risk Reversal Badge */}
          <div className="mb-8 flex items-center gap-2.5 text-sm text-[#eaeaea] bg-[rgba(255,69,0,0.1)] p-2.5 border-l-2 border-[#ff4500]">
            <span className="text-[#ff4500]">GUARANTEE:</span>
            <span>We ship in 7 days or 100% money back.</span>
          </div>

          <ul className="list-none mb-8 text-sm space-y-2">
            <li className="border-b border-[#222] pb-2">
              + High-Conversion Copywriting
            </li>
            <li className="border-b border-[#222] pb-2">
              + Mobile-First Responsive Design
            </li>
            <li className="border-b border-[#222] pb-2">
              + Analytics & Pixel Setup
            </li>
            <li className="border-b border-[#222] pb-2">
              + 5-Day Delivery Guarantee
            </li>
            <li>+ Free Domain & Hosting (1st Year)</li>
          </ul>

          <a
            href="#contact"
            className="block w-full text-center bg-[#ff4500] text-black px-10 py-4 font-['Oswald'] text-[1.1rem] tracking-wide uppercase border border-[#ff4500] transition-all duration-200 hover:bg-transparent hover:text-[#ff4500]"
            style={{
              clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
            }}
          >
            SECURE SLOT
          </a>
        </article>

        {/* Pricing Card 2: The Scale (Web App) */}
        <article
          className="bg-[#080808] p-12 transition-all duration-300 hover:bg-[#0e0e0e]"
          data-interactive
        >
          <div className="mb-6">
            <span className="font-['Space_Mono'] opacity-50">/// FULL SYSTEM</span>
          </div>

          <h3 className="text-[1.5rem] mb-2 font-['Oswald'] uppercase">
            CUSTOM ARCHITECTURE
          </h3>
          <div className="font-['Oswald'] text-[3.5rem] leading-none opacity-50">
            CUSTOM
          </div>
          <p className="font-['Space_Mono'] text-xs opacity-60 mb-8">
            BASED ON SCOPE
          </p>

          <ul className="list-none mb-8 text-sm space-y-2">
            <li className="border-b border-[#222] pb-2">
              + Multi-Page / CMS Integration
            </li>
            <li className="border-b border-[#222] pb-2">
              + Membership & Paywalls
            </li>
            <li className="border-b border-[#222] pb-2">
              + Advanced Animations (WebGL)
            </li>
            <li>+ Ongoing Optimisation</li>
          </ul>

          <a
            href="#contact"
            className="block w-full text-center bg-transparent text-white px-10 py-4 font-['Oswald'] text-[1.1rem] tracking-wide uppercase border border-[#333] transition-all duration-200 hover:border-[#ff4500] hover:text-[#ff4500]"
            style={{
              clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
            }}
          >
            REQUEST INTEL
          </a>
        </article>
      </div>
    </section>
  );
}
