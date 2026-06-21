import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Droplets, Flower2, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Descubre nuestros servicios
          </h2>
          <p className="text-lg text-muted-foreground">
            Ofrecemos una amplia gama de tratamientos diseñados para realzar tu belleza natural y promover un bienestar duradero.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group h-full">
              <Card className="h-full overflow-hidden border-border/50 bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary">
                    <service.icon className="w-5 h-5" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Explorar <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
