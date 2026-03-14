import LandingFaqSection from './LandingFaqSection';
import LandingFeaturesSection from './LandingFeaturesSection';
import LandingFooter from './LandingFooter';
import LandingHeroSection from './LandingHeroSection';
import LandingNavbar from './LandingNavbar';
import LandingProcessSection from './LandingProcessSection';
import LandingQuoteSection from './LandingQuoteSection';
import LandingServicesSection from './LandingServicesSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
  );
}
