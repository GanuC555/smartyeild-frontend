'use client';

import LandingFaqSection from './LandingFaqSection';
import LandingFeaturesSection from './LandingFeaturesSection';
import LandingFooter from './LandingFooter';
import LandingHeroSection from './LandingHeroSection';
import LandingNavbar from './LandingNavbar';
import LandingProcessSection from './LandingProcessSection';
import LandingQuoteSection from './LandingQuoteSection';
import LandingServicesSection from './LandingServicesSection';
import { GrainGradient } from '@paper-design/shaders-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Global Fixed Background */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-80 z-0">
        <GrainGradient
          width={'min(100vw)'}
          height={'min(100vh)'}
          colors={['#7300ff', '#e58fff', '#00bfff', '#2b00ff']}
          colorBack="#000000"
          softness={0.5}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_hsl(var(--background))_70%)]" />
      </div>

      <div className="relative z-10 w-full h-full">
        <LandingNavbar />
        <main>
          <LandingHeroSection />
          <LandingFeaturesSection />
          <LandingServicesSection />
          <LandingProcessSection />
          <LandingQuoteSection />
          <LandingFaqSection />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
