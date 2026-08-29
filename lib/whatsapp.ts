import { WHATSAPP_URL } from "@/data/site";

export const buildWhatsAppHref = (message: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

export const defaultWhatsAppHref = buildWhatsAppHref(
  "Hi Fit Fuel Kitchen! I’d like help choosing my next meal.",
);
