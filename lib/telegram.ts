// Telegram Bot API bilan ishlash uchun kichik yordamchilar.

export const tgToken = () => process.env.TELEGRAM_BOT_TOKEN || "";

export const tgChats = () =>
  (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function tg<T = unknown>(method: string, payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://api.telegram.org/bot${tgToken()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`${method}: ${json.description}`);
  return json.result as T;
}

// Lid haqidagi Meta uchun kerakli ma'lumot xabar ichida ko'rinmas havola sifatida saqlanadi —
// bazasiz ishlash uchun: "Sotildi" bosilganda bot uni xabarning o'zidan o'qiydi.
export type LeadRef = {
  e?: string; // Lead event_id
  c?: string; // _fbc
  p?: string; // _fbp
  n?: string; // ism
  ph?: string; // telefon (998XXXXXXXXX)
  r?: string; // xonalar
  m?: number; // lid xabarining message_id
};

const REF_MARK = "#ld=";

export function refLink(ref: LeadRef) {
  const base = (process.env.SITE_URL || "https://yangidenov.uz").replace(/\/$/, "");
  const data = Buffer.from(JSON.stringify(ref)).toString("base64url");
  return `<a href="${base}/${REF_MARK}${data}">​</a>`;
}

type Entity = { type: string; url?: string };

export function readRef(entities?: Entity[]): LeadRef | null {
  const url = entities?.find((e) => e.type === "text_link" && e.url?.includes(REF_MARK))?.url;
  if (!url) return null;
  try {
    return JSON.parse(Buffer.from(url.split(REF_MARK)[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}
