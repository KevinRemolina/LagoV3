import { Hero } from "@/components/home/Hero";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FeaturedSpecialists } from "@/components/home/FeaturedSpecialists";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesHighlight />
      <FeaturedServices />
      <FeaturedSpecialists />
    </>
  );
}
