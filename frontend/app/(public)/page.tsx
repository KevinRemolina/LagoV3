import { Hero } from "@/components/home/Hero";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FeaturedSpecialists } from "@/components/home/FeaturedSpecialists";
import { PromotionsSection } from "@/components/home/PromotionsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesHighlight />
      <PromotionsSection />
      <FeaturedServices />
      <FeaturedSpecialists />
    </>
  );
}
