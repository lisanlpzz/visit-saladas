/** Número de WhatsApp de Visit Saladas (formato internacional, sin "+"). */
export const numeroWhatsApp = "541124653402";

/** Genera el enlace directo al chat de WhatsApp con un mensaje opcional. */
export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${numeroWhatsApp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
