import Hero from "../components/shared/Hero";
import TrustPillars from "../components/shared/TrustPillars";
import CollectionsGrid from "../components/shared/CollectionsGrid";
import FeaturedProducts from "../components/shared/FeaturedProducts";
import WhyChooseUs from "../components/shared/WhyChooseUs";
import LegacySection from "../components/shared/LegacySection";
import BranchNetwork from "../components/shared/BranchNetwork";
import Testimonials from "../components/shared/Testimonials";
import FinalCTA from "../components/shared/FinalCTA";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <TrustPillars />
      <CollectionsGrid />
      <FeaturedProducts />
      <WhyChooseUs />
      <LegacySection />
      <BranchNetwork />
      <Testimonials />
      <FinalCTA />
    </>
  );
}