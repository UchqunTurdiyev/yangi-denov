import { createHmac, timingSafeEqual } from "node:crypto";
import type { LeadRef } from "@/lib/telegram";

// "Sotildi" tugmasi ochadigan sahifa havolasi. Lid ma'lumoti havolaning o'zida,
// imzo bilan — begona odam havolani o'zgartira yoki soxtalashtira olmaydi.
export type SaleRef = LeadRef & { ch?: string };

function key() {
  const secret = process.env.SALE_LINK_SECRET || process.env.TELEGRAM_BOT_TOKEN;
  if (!secret) throw new Error("SALE_LINK_SECRET yoki TELEGRAM_BOT_TOKEN kerak");
  return `sale-link:${secret}`;
}

const sign = (d: string) => createHmac("sha256", key()).update(d).digest("base64url").slice(0, 22);

export function saleUrl(origin: string, ref: SaleRef) {
  const d = Buffer.from(JSON.stringify(ref)).toString("base64url");
  return `${origin.replace(/\/$/, "")}/sotuv?d=${d}&s=${sign(d)}`;
}

export function readSaleLink(d?: string, s?: string): SaleRef | null {
  if (!d || !s) return null;
  const a = Buffer.from(sign(d));
  const b = Buffer.from(s);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(d, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}
