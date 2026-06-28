import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio | Lago Spa",
  description: "Términos y condiciones de uso de los servicios de Lago Spa.",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Términos de Servicio
          </h1>
          <p className="text-lg text-foreground/60 font-light">
            Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-12 text-foreground/80 font-light leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">1. Aceptación de los Términos</h2>
              <p className="mb-4">
                Al acceder y utilizar los servicios de Lago Spa (en adelante "la Clínica", "nosotros", "nuestro"), ubicados en la Cra. 14 #11-88, Sogamoso, Boyacá, o al utilizar nuestra plataforma web, usted acepta cumplir y estar sujeto a los siguientes Términos y Condiciones. Si no está de acuerdo con estos términos, le rogamos que no utilice nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">2. Servicios Ofrecidos</h2>
              <p className="mb-4">
                Lago Spa ofrece servicios de estética facial, estética corporal, spa, relajación y salud integral. Todos los servicios están sujetos a disponibilidad y a la evaluación previa por parte de nuestros especialistas para garantizar que son adecuados para el cliente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">3. Reservas, Cancelaciones y Retrasos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Reservas:</strong> Las citas pueden programarse a través de nuestra página web, vía telefónica o presencialmente. Recomendamos reservar con antelación para asegurar disponibilidad.</li>
                <li><strong>Puntualidad:</strong> Solicitamos llegar con 10-15 minutos de anticipación a su cita. Si llega tarde, el tiempo de su tratamiento puede acortarse para no retrasar al siguiente cliente, debiendo abonar el valor total del servicio.</li>
                <li><strong>Cancelaciones y Modificaciones:</strong> Le pedimos amablemente que nos notifique con al menos 24 horas de anticipación si necesita cancelar o reprogramar su cita. Las cancelaciones con menor tiempo de antelación o la inasistencia ("No-Show") podrán generar el cobro del 50% al 100% del valor del servicio, o la pérdida de la sesión si forma parte de un paquete.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">4. Condiciones Médicas y de Salud</h2>
              <p className="mb-4">
                Es responsabilidad del cliente informar al personal de Lago Spa sobre cualquier condición médica, alergia, embarazo, lesiones recientes, cirugías o medicamentos que esté tomando, antes de recibir cualquier tratamiento. 
                <br /><br />
                Nos reservamos el derecho de negarnos a realizar un tratamiento si nuestro personal profesional determina que podría ser perjudicial para la salud del cliente en base a la información proporcionada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">5. Resultados de los Tratamientos</h2>
              <p className="mb-4">
                Los resultados de los tratamientos estéticos y de salud corporal pueden variar de persona a persona. Lago Spa aplica los protocolos y utiliza la tecnología adecuada para cada servicio, sin embargo, no podemos garantizar resultados exactos o idénticos para todos los clientes, ya que dependen de factores genéticos, hábitos de vida, metabolismo, entre otros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">6. Pagos y Devoluciones</h2>
              <p className="mb-4">
                Los pagos deben realizarse al finalizar el tratamiento o al momento de adquirir un paquete o membresía, salvo que se haya acordado lo contrario. Aceptamos efectivo y los principales medios de pago electrónicos.
              </p>
              <p className="mb-4">
                <strong>Devoluciones:</strong> Los paquetes de tratamientos y tarjetas de regalo no son reembolsables ni transferibles. En caso de que un cliente no pueda finalizar un paquete por razones médicas comprobables (con certificado), se evaluará el caso para otorgar un crédito interno en la clínica por el saldo restante, que no podrá ser canjeado por dinero en efectivo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">7. Comportamiento en las Instalaciones</h2>
              <p className="mb-4">
                Para mantener el ambiente de paz, relajación y respeto que caracteriza a nuestro Spa, solicitamos a los clientes silenciar sus teléfonos móviles y mantener un tono de voz moderado. Nos reservamos el derecho de admisión o de interrumpir un servicio si un cliente presenta un comportamiento inapropiado, irrespetuoso o que altere el orden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">8. Propiedad Intelectual</h2>
              <p className="mb-4">
                Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de Lago Spa y está protegido por las leyes de propiedad intelectual de Colombia y tratados internacionales. Su uso no autorizado está estrictamente prohibido.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">9. Ley Aplicable y Jurisdicción</h2>
              <p className="mb-4">
                Estos Términos y Condiciones se rigen e interpretan de acuerdo con las leyes de la República de Colombia, y en especial, el Estatuto del Consumidor (Ley 1480 de 2011). Cualquier controversia que surja en relación con estos términos será sometida a la jurisdicción de los tribunales competentes en Colombia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">10. Contacto</h2>
              <p className="mb-4">
                Si tiene alguna pregunta sobre estos Términos de Servicio, puede contactarnos en:
                <br /><strong>Email:</strong> contacto@lagospa.com
                <br /><strong>Teléfono:</strong> +57 311 311 8625
                <br /><strong>Dirección:</strong> Cra. 14 #11-88, Sogamoso, Boyacá
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
