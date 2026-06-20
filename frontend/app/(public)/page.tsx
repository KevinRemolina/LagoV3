import { Hero } from "@/components/home/Hero";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesHighlight />
      {/* We can add Trust/Specialists sections here later as needed */}
    </>
  );
}
