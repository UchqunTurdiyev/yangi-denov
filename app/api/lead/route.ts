import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (v: unknown, max = 120) =>
  String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  // Botlar uchun yashirin maydon: to'ldirilgan bo'lsa, jim qabul qilamiz.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 60);
  const phone = clean(body.phone, 30);
  const rooms = clean(body.rooms, 10);
  const source = clean(body.source, 60);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Ismingizni kiriting" }, { status: 422 });
  if (!/^998\d{9}$/.test(digits))
    return NextResponse.json({ ok: false, error: "Telefon raqamini to'liq kiriting" }, { status: 422 });
  if (!["1", "2", "3"].includes(rooms))
    return NextResponse.json({ ok: false, error: "Xonalar sonini tanlang" }, { status: 422 });

  const date = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const text = [
    `🏢 <b>Yangi lid — Yangi Denov</b>`,
    ``,
    `👤 Ism: <b>${esc(name)}</b>`,
    `📞 Telefon: +${digits}`,
    `🏠 Xonadon: <b>${rooms} xonali</b>`,
    source ? `📍 Manba: ${esc(source)}` : "",
    `🕒 ${date}`,
  ]
    .filter(Boolean)
    .join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_CHAT_ID || "").split(",").map((s) => s.trim()).filter(Boolean);

  if (!token || chats.length === 0) {
    // Kalitlar hali kiritilmagan — lid server logida qoladi, foydalanuvchi xato ko'rmaydi.
    console.log("[lead]", { name, phone: `+${digits}`, rooms, source, date });
    return NextResponse.json({ ok: true });
  }

  try {
    await Promise.all(
      chats.map(async (chat_id) => {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.description);
      })
    );
  } catch (e) {
    console.error("[lead] telegram", e);
    return NextResponse.json({ ok: false, error: "Yuborilmadi. Iltimos, qo'ng'iroq qiling." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
