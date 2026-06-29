"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Services now include pre-computed imageUrl and catSlug from the server
type ServiceWithUrl = {
  id: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  show_price?: boolean;
  price?: number;
  status?: string;
  imageUrl: string;
  catSlug: string;
  [key: string]: any;
};

export function PromotionsCarousel({ services }: { services: ServiceWithUrl[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollNext = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // If at the end, loop back to start
    if (scrollLeft >= scrollWidth - clientWidth - 10) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      // Scroll by the width of one item (first child)
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement | null;
      const itemWidth = firstChild?.offsetWidth ?? clientWidth;
      scrollContainerRef.current.scrollBy({ left: itemWidth + 32, behavior: "smooth" });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // If at the start, loop to the end
    if (scrollLeft <= 10) {
      scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
    } else {
      const firstChild = scrollContainerRef.current.firstElementChild as HTMLElement | null;
      const itemWidth = firstChild?.offsetWidth ?? clientWidth;
      scrollContainerRef.current.scrollBy({ left: -(itemWidth + 32), behavior: "smooth" });
    }
  }, []);

  // Auto-advance every 5s, pause on hover
  useEffect(() => {
    if (isHovered || services.length <= 1) return;
    const interval = setInterval(scrollNext, 5000);
    return () => clearInterval(interval);
  }, [isHovered, scrollNext, services.length]);

  return (
    <div 
      className="w-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrows — only shown when more than 1 service */}
      {services.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full bg-black/20 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Promoción anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.2} />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full bg-black/20 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Siguiente promoción"
          >
            <ChevronRight className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.2} />
          </button>
        </>
      )}

      {/* Scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-[10vw] pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {services.map((service, index) => (
          <BlurFade 
            key={service.id}
            delay={0.15 + index * 0.1} 
            inView={true} 
            className="shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] snap-center"
          >
            <Link 
              href={`/servicios/${service.catSlug}/${service.slug}`} 
              className="group/card relative block aspect-[4/5] md:aspect-[3/4] lg:aspect-square overflow-hidden bg-muted rounded-sm"
            >
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover/card:scale-105 ease-out"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-70 group-hover/card:opacity-90 transition-opacity duration-700" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-10 lg:p-12 flex flex-col justify-end text-white">
                <div className="translate-y-3 group-hover/card:translate-y-0 transition-transform duration-700 ease-out">
                  
                  {/* Label */}
                  <span className="block text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/60 mb-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-75">
                    {service.status === 'PRIVATE' ? 'Exclusivo' : 'Promoción'}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 text-white leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-serif text-white/75 text-sm md:text-base lg:text-lg line-clamp-2 mb-6 md:mb-8 max-w-xl font-light opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-150">
                    {service.short_description || service.description}
                  </p>
                  
                  {/* CTA & Price */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <span className="inline-flex items-center justify-center border border-white/40 text-white group-hover/card:bg-white group-hover/card:text-black transition-all duration-500 uppercase tracking-[0.15em] text-[10px] md:text-xs px-6 py-3 md:px-8 md:py-3.5 backdrop-blur-sm w-fit">
                      Descubrir Experiencia
                    </span>
                    
                    {service.show_price && service.price && service.price > 0 && (
                      <span className="font-serif text-base md:text-lg tracking-wide text-white/80">
                        ${service.price.toLocaleString()} COP
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
