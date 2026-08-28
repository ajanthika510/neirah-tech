/**
 * Centralized utility helpers
 */

export const DEFAULT_WHATSAPP_PHONE = "94760041594";

/**
 * Generate standardized WhatsApp link
 */
export function getWhatsAppUrl(
  message: string,
  phone: string = DEFAULT_WHATSAPP_PHONE
): string {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Format numeric index into 2-digit padded string ("01", "02")
 */
export function formatIndex(value: unknown, fallback: number = 1): string {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0) {
    return String(parsed).padStart(2, "0");
  }
  return String(fallback).padStart(2, "0");
}
