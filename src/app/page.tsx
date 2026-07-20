import { Hero } from '@/sections/hero';
import { About } from '@/sections/about';
import { Services } from '@/sections/services';
import { Projects } from '@/sections/projects';
import { WhyChooseUs } from '@/sections/why-choose-us';
import { TechStack } from '@/sections/tech-stack';
import { Process } from '@/sections/process';

import { Testimonials } from '@/sections/testimonials';
import { FAQ } from '@/sections/faq';
import { CTA } from '@/sections/cta';

export default function Home() {
  return (
    <main className="relative flex flex-col w-full bg-transparent overflow-x-hidden min-h-screen">
      {/* Background radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-white/3 to-transparent blur-[120px] pointer-events-none -z-10" />
      
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyChooseUs />
      <TechStack />
      <Process />

      <Testimonials />
      <CTA />
      <FAQ />
    </main>
  );
}
