import { createHash } from "node:crypto";

// Meta Conversions API (server tomoni). Pixel brauzerda ishlaydi, bu esa serverdan
// bir xil event_id bilan yuboradi — Meta ikkalasini bitta hodisa deb hisoblaydi.

const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export const metaReady = () => Boolean(process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN);

export type MetaUser = {
  phone?: string; // faqat raqamlar, 998 bilan
  name?: string;
  fbc?: string;
  fbp?: string;
  ip?: string;
  ua?: string;
};

export async function sendMetaEvent(ev: {
  name: "Lead" | "Purchase";
  id: string;
  source: "website" | "system_generated";
  url?: string;
  user: MetaUser;
  custom?: Record<string, unknown>;
}) {
  if (!metaReady()) return { skipped: true };

  const { phone, name, fbc, fbp, ip, ua } = ev.user;
  const first = name?.split(/\s+/)[0];
  const user_data: Record<string, unknown> = { country: [sha("uz")] };
  if (phone) {
    user_data.ph = [sha(phone)];
    user_data.external_id = [sha(phone)];
  }
  if (first) user_data.fn = [sha(first)];
  if (fbc) user_data.fbc = fbc;
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;
  if (ua) user_data.client_user_agent = ua;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: ev.name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: ev.id,
        action_source: ev.source,
        ...(ev.url ? { event_source_url: ev.url } : {}),
        user_data,
        ...(ev.custom ? { custom_data: ev.custom } : {}),
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  const version = process.env.META_API_VERSION || "v23.0";
  const res = await fetch(
    `https://graph.facebook.com/${version}/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_ACCESS_TOKEN}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || `Meta ${res.status}`);
  return json as { events_received: number };
}

// --- Sotuv summasi ---

// "450 000 000", "450mln", "1,2 mlrd", "35000$", "35 ming usd" kabi yozuvlarni tushunadi.
export function parseAmount(raw: string): { amount: number; currency: "UZS" | "USD" } | null {
  const t = raw.toLowerCase().replace(/so['ʻ‘’`]?m/g, "");
  const currency = /\$|usd|dollar/.test(t) ? "USD" : "UZS";
  const m = t.replace(/(\d)[\s'’](?=\d)/g, "$1").match(/(\d+(?:[.,]\d+)*)\s*(mlrd|mln|million|ming|k)?/);
  if (!m) return null;
  const mult = { mlrd: 1e9, mln: 1e6, million: 1e6, ming: 1e3, k: 1e3 }[m[2] as string] ?? 1;
  let n = Number(m[1].replace(",", "."));
  // "450,000,000" kabi minglik ajratgichli yozuv
  if (!m[2] && /^\d{1,3}([.,]\d{3})+$/.test(m[1])) n = Number(m[1].replace(/[.,]/g, ""));
  const amount = Math.round(n * mult * 100) / 100;
  return amount > 0 ? { amount, currency } : null;
}

let rateCache: { rate: number; at: number } | null = null;

// Markaziy bank kursi (1 USD = ? so'm), 6 soat keshlanadi. Bo'lmasa USD_RATE dan.
export async function usdRate(): Promise<number> {
  if (rateCache && Date.now() - rateCache.at < 6 * 3600_000) return rateCache.rate;
  try {
    const res = await fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/", { signal: AbortSignal.timeout(5000) });
    const rate = Number((await res.json())[0]?.Rate);
    if (rate > 0) {
      rateCache = { rate, at: Date.now() };
      return rate;
    }
  } catch {}
  const env = Number(process.env.USD_RATE);
  if (env > 0) return env;
  throw new Error("Dollar kursini olib bo'lmadi (USD_RATE ni kiriting)");
}

export const fmtUzs = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/ /g, " ") + " so'm";
export const fmtUsd = (n: number) => "$" + Math.round(n).toLocaleString("ru-RU").replace(/ /g, " ");

// Sotuvni Meta'ga Purchase sifatida yuboradi. Meta'ga qiymat META_CURRENCY (standart USD) da boradi.
export async function sendPurchase(p: {
  id: string;
  phone: string;
  name?: string;
  amount: number;
  currency: "UZS" | "USD";
  fbc?: string;
  fbp?: string;
  rooms?: string;
}) {
  const target = (process.env.META_CURRENCY || "USD").toUpperCase();
  let value = p.amount;
  let uzs = p.currency === "UZS" ? p.amount : undefined;
  let usd = p.currency === "USD" ? p.amount : undefined;
  if (p.currency !== target) {
    const rate = await usdRate();
    if (target === "USD") value = usd = Math.round((p.amount / rate) * 100) / 100;
    else value = uzs = Math.round(p.amount * rate);
  }
  const result = await sendMetaEvent({
    name: "Purchase",
    id: p.id,
    source: "system_generated",
    user: { phone: p.phone, name: p.name, fbc: p.fbc, fbp: p.fbp },
    custom: {
      value,
      currency: target,
      content_name: p.rooms ? `${p.rooms} xonali` : "Xonadon",
      content_category: "apartment",
    },
  });
  return { result, uzs, usd };
}
