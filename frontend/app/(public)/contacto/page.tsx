import { createClient } from "@/utils/supabase/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('id, title')
    .eq('status', 'PUBLIC')
    .order('title', { ascending: true });

  return (
    <div className="bg-background min-h-screen pt-8 pb-20 relative overflow-hidden">
      {/* Subtle Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none">
        <Image 
          src="/assets/MainBackgroundLight.webp" 
          alt="Texture" 
          fill 
          className="object-cover" 
          priority
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-secondary rounded-full text-primary">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Estamos aquí para escucharte
          </h1>
          <p className="text-lg text-muted-foreground">
            Ya sea que desees agendar una cita de valoración o tengas dudas sobre nuestros tratamientos, nuestro equipo está listo para atenderte.
          </p>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Contact Form */}
          <div>
            <h2 className="font-heading text-3xl font-bold mb-10">Envíanos un mensaje</h2>
            <div className="p-8 sm:p-10 border border-border/30 bg-background/50 backdrop-blur-sm rounded-none">
              <ContactForm services={services || []} />
            </div>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h2 className="font-heading text-3xl font-bold mb-10">Información de Contacto</h2>
            
            <div className="flex flex-col gap-10 mb-12">
              <div className="flex items-start gap-6 border-b border-border/30 pb-8">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Ubicación</h3>
                  <p className="text-lg text-foreground font-serif">
                    Sogamoso, Boyacá<br />Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-b border-border/30 pb-8">
                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Llámanos</h3>
                  <p className="text-lg text-foreground font-serif">
                    <a href="tel:+573113118625" className="hover:text-primary transition-colors">+57 311 311 8625</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-b border-border/30 pb-8">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Horario</h3>
                  <p className="text-lg text-foreground font-serif">
                    Lun - Vie: 8:00 AM - 7:00 PM<br />
                    Sábados: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 border-b border-border/30 pb-8">
                <Mail className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-2">Correo</h3>
                  <p className="text-lg text-foreground font-serif">
                    <a href="mailto:contacto@lagospa.com" className="hover:text-primary transition-colors">contacto@lagospa.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full aspect-[4/3] bg-muted overflow-hidden relative border border-border/30">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31759.712927909404!2d-72.96544075012207!3d5.718308397228267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a4500776773d7%3A0x242e49dec7478756!2sLAGO%3A%20spa%2C%20est%C3%A9tica%20y%20salid!5e0!3m2!1ses!2sco!4v1782000594808!5m2!1ses!2sco" 
                className="absolute inset-0 w-full h-full border-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
