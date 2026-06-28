"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PromotionsCarousel({ services }: { services: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [checkScrollability]);

  const scrollNext = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // If we are at the end, loop back to start
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || clientWidth;
        scrollContainerRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // If we are at the start, loop to the end
      if (scrollLeft <= 0) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || clientWidth;
        scrollContainerRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    if (!isHovered && services.length > 1) {
      const interval = setInterval(scrollNext, 5000); // Auto-scroll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered, scrollNext, services.length]);

  return (
    <div 
      className="w-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {services.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full bg-background/20 hover:bg-background/80 text-foreground border border-border/10 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            aria-label="Promoción anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 font-light" strokeWidth={1} />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 md:p-4 rounded-full bg-background/20 hover:bg-background/80 text-foreground border border-border/10 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            aria-label="Siguiente promoción"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 font-light" strokeWidth={1} />
          </button>
        </>
      )}

      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-[10vw] pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        {services.map((service, index) => {
          const coverImage = service.service_images?.find((img: any) => img.is_cover) || service.service_images?.[0];
          let imageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop";
          if (coverImage?.storage_path) {
            imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/services/${coverImage.storage_path}`;
          }

          const catSlug = service.categories?.slug || 'facial';

          return (
            <BlurFade 
              key={`${service.id}-${index}`} 
              delay={0.2 + index * 0.1} 
              inView={true} 
              className="shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] snap-center"
            >
              <Link 
                href={`/servicios/${catSlug}/${service.slug}`} 
                className="group/card relative block aspect-[4/5] md:aspect-[3/4] lg:aspect-square overflow-hidden bg-muted rounded-sm"
              >
                <Image
                  src={imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover/card:scale-105 ease-out"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-70 group-hover/card:opacity-90 transition-opacity duration-700" />
                
                {/* Content Container */}
                <div className="absolute inset-0 p-6 md:p-10 lg:p-12 flex flex-col justify-end text-white">
                  <div className="translate-y-4 group-hover/card:translate-y-0 transition-transform duration-700 ease-out">
                    {/* Top Label */}
                    <span className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 mb-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-100">
                      {service.status === 'PRIVATE' ? 'Exclusivo' : 'Promoción'}
                    </span>
                    
                    {/* Title */}
                    <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light mb-3 md:mb-4 text-white">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-serif text-white/80 text-sm md:text-base lg:text-lg line-clamp-2 mb-6 md:mb-8 max-w-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-200 font-light">
                      {service.short_description || service.description}
                    </p>
                    
                    {/* Button & Price Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <span className="inline-flex items-center justify-center border border-white/40 text-white group-hover/card:bg-white group-hover/card:text-black transition-colors duration-500 uppercase tracking-[0.15em] text-[10px] md:text-xs px-6 py-3 md:px-8 md:py-3.5 backdrop-blur-sm w-fit">
                        Descubrir Experiencia
                      </span>
                      
                      {service.show_price && service.price > 0 && (
                        <span className="font-serif text-base md:text-xl tracking-wide opacity-90 text-white/90">
                          ${service.price.toLocaleString()} COP
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          )
        })}
      </div>
    </div>
  );
}
