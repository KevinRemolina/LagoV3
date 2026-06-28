import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Droplets, Flower2, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

const services = [
  {
    title: "Estética Facial",
    description: "Rejuvenecimiento, limpieza profunda y tratamientos anti-aging personalizados.",
    icon: Sparkles,
    href: "/servicios/facial",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Estética Corporal",
    description: "Modelado, reducción y tratamientos reafirmantes con tecnología de vanguardia.",
    icon: Droplets,
    href: "/servicios/corporal",
    image: "https://images.unsplash.com/photo-1544161515-4abfbcece6b4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Spa & Relajación",
    description: "Masajes terapéuticos, piedras calientes y rituales de bienestar integral.",
    icon: Flower2,
    href: "/servicios/spa",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2148&auto=format&fit=crop",
  },
  {
    title: "Salud Integral",
    description: "Consultas nutricionales, medicina estética y equilibrio mente-cuerpo.",
    icon: Heart,
    href: "/servicios/salud",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
];

export function ServicesHighlight() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView={true} delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border/30 pb-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Nuestras Especialidades
              </h2>
              <p className="text-xl text-muted-foreground font-serif">
                Tratamientos diseñados para realzar tu belleza y promover un bienestar duradero.
              </p>
            </div>
            <Link href="/servicios" className="hidden md:inline-flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors">
              Ver Colecciones <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </BlurFade>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Link href={service.href} className="group flex flex-col gap-6 h-full">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                
                <div className="flex flex-col flex-1">
                  <h3 className="font-heading font-semibold text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-serif text-base mb-6 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center text-xs uppercase tracking-widest font-semibold text-foreground border-b border-foreground pb-1 self-start group-hover:text-primary group-hover:border-primary transition-colors">
                    Explorar
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <div className="mt-12 text-center md:hidden">
           <Link href="/servicios" className="inline-flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors">
            Ver Colecciones <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
