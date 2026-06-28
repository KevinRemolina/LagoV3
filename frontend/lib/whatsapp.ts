/**
 * Construye un enlace de WhatsApp (wa.me) a partir de un número de teléfono
 * en formato libre (con espacios, guiones, +, paréntesis, etc.) y un mensaje
 * precargado. Asume Colombia (código de país 57) cuando el número no lo incluye.
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const digitsOnly = phone.replace(/\D/g, "");

  const withCountryCode = digitsOnly.startsWith("57")
    ? digitsOnly
    : `57${digitsOnly.replace(/^0+/, "")}`;

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${withCountryCode}?text=${encodedMessage}`;
}