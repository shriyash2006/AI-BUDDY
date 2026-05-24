import { AuthPreview } from "@/components/auth-preview";
import { DashboardSection } from "@/components/dashboard-section";
import { HeroSection } from "@/components/hero-section";
import { MarketplaceSection } from "@/components/marketplace-section";
import { OnboardingSection } from "@/components/onboarding-section";
import { PlatformSection } from "@/components/platform-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <SiteHeader />
      <HeroSection />
      <PlatformSection />
      <OnboardingSection />
      <DashboardSection />
      <MarketplaceSection />
      <AuthPreview />
      <SiteFooter />
    </main>
  );
}
