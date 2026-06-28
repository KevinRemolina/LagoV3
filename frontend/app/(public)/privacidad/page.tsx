import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Lago Spa",
  description: "Nuestra política de privacidad y tratamiento de datos personales en Lago Spa, cumpliendo con la Ley 1581 de 2012 (Habeas Data).",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Política de Privacidad
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
              <h2 className="text-2xl font-normal text-foreground mb-4">1. Información del Responsable del Tratamiento</h2>
              <p className="mb-4">
                De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, se le informa que los datos personales que usted suministre serán tratados por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Razón Social:</strong> Lago Spa (Lago Spa Estética & Salud)</li>
                <li><strong>Dirección:</strong> Cra. 14 #11-88, Sogamoso, Boyacá</li>
                <li><strong>Correo Electrónico:</strong> contacto@lagospa.com</li>
                <li><strong>Teléfonos:</strong> +57 311 311 8625 / +57 314 341 1955 / +57 313 510 5205</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">2. Finalidad del Tratamiento de los Datos</h2>
              <p className="mb-4">
                Los datos personales que recolectamos (incluyendo, de ser el caso, datos sensibles relacionados con su salud para los tratamientos estéticos y de relajación) serán utilizados para las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestionar la reserva, confirmación y cancelación de citas médicas y estéticas.</li>
                <li>Elaborar y mantener actualizada su historia clínica y registro de tratamientos.</li>
                <li>Proveer los servicios de estética facial, corporal, spa, relajación y salud integral que usted solicite.</li>
                <li>Enviar notificaciones sobre el estado de sus servicios, recordatorios de citas e información relevante sobre su tratamiento.</li>
                <li>Realizar campañas de marketing, envío de promociones, encuestas de satisfacción y fidelización de clientes.</li>
                <li>Dar cumplimiento a las obligaciones legales, contables y tributarias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">3. Derechos de los Titulares (Habeas Data)</h2>
              <p className="mb-4">
                Como titular de sus datos personales, usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conocer, actualizar y rectificar sus datos personales frente a Lago Spa.</li>
                <li>Solicitar prueba de la autorización otorgada para el tratamiento de datos.</li>
                <li>Ser informado, previa solicitud, respecto del uso que se le ha dado a sus datos.</li>
                <li>Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo dispuesto en la Ley 1581 de 2012.</li>
                <li>Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                <li>Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">4. Datos Sensibles</h2>
              <p className="mb-4">
                Para la prestación de ciertos servicios estéticos y de salud, Lago Spa podrá requerir el tratamiento de datos sensibles (por ejemplo, antecedentes médicos, alergias, condiciones físicas). Le informamos que proporcionar este tipo de datos es de carácter facultativo y será tratado bajo las más estrictas medidas de seguridad y confidencialidad, siendo utilizados única y exclusivamente para garantizar la seguridad y eficacia de los tratamientos contratados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">5. Seguridad de la Información</h2>
              <p className="mb-4">
                Lago Spa ha implementado las medidas de seguridad técnicas, humanas y administrativas necesarias para proteger sus datos personales contra acceso, uso, alteración o destrucción no autorizados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">6. Procedimiento para Consultas y Reclamos</h2>
              <p className="mb-4">
                Para ejercer sus derechos a conocer, actualizar, rectificar y suprimir información, así como revocar la autorización, el titular puede enviar una comunicación escrita al correo electrónico <strong>contacto@lagospa.com</strong> o acercarse a nuestras instalaciones en la <strong>Cra. 14 #11-88, Sogamoso, Boyacá</strong>. La solicitud debe incluir: nombre completo, documento de identificación, descripción de los hechos que dan lugar al reclamo, datos de contacto y documentos que quiera hacer valer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-normal text-foreground mb-4">7. Vigencia</h2>
              <p>
                La presente política rige a partir de su publicación. Los datos personales proporcionados se conservarán mientras se mantenga la relación contractual y durante el tiempo adicional exigido por las leyes colombianas (como la conservación de historias clínicas).
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
