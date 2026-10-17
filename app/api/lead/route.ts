import { NextResponse } from "next/server";
import { crmReady, sendToCrm } from "@/lib/crm";
import { metaReady, sendMetaEvent } from "@/lib/meta";
import { esc, refLink, tg, tgChats, tgToken } from "@/lib/telegram";

export const runtime = "nodejs";

const clean = (v: unknown, max = 120) =>
  String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

const cookie = (req: Request, name: string) =>
  req.headers.get("cookie")?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))?.[1];

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
  const eventId = clean(body.eventId, 64) || crypto.randomUUID();
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Ismingizni kiriting" }, { status: 422 });
  if (!/^998\d{9}$/.test(digits))
    return NextResponse.json({ ok: false, error: "Telefon raqamini to'liq kiriting" }, { status: 422 });
  if (!["1", "2", "3"].includes(rooms))
    return NextResponse.json({ ok: false, error: "Xonalar sonini tanlang" }, { status: 422 });

  const fbc = cookie(req, "_fbc");
  const fbp = cookie(req, "_fbp");
  const date = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const text = [
    `🏢 <b>Yangi lid — Yangi Denov</b>${refLink({ e: eventId, c: fbc, p: fbp, n: name, ph: digits, r: rooms })}`,
    ``,
    `👤 Ism: <b>${esc(name)}</b>`,
    `📞 Telefon: +${digits}`,
    `🏠 Xonadon: <b>${rooms} xonali</b>`,
    source ? `📍 Manba: ${esc(source)}` : "",
    fbc ? `📣 Reklamadan (Meta)` : "",
    `🕒 ${date}`,
  ]
    .filter(Boolean)
    .join("\n");

  const chats = tgChats();
  const tgReady = Boolean(tgToken() && chats.length);

  const [tgRes, crmRes, metaRes] = await Promise.allSettled([
    tgReady
      ? Promise.all(
          chats.map((chat_id) =>
            tg("sendMessage", {
              chat_id,
              text,
              parse_mode: "HTML",
              link_preview_options: { is_disabled: true },
              reply_markup: { inline_keyboard: [[{ text: "💰 Sotildi — summani kiritish", callback_data: "sold" }]] },
            })
          )
        )
      : Promise.resolve(null),
    sendToCrm({ name, phone: `+${digits}`, source: "Sayt", extra: `${rooms} xonali${source ? ` · ${source}` : ""}` }),
    sendMetaEvent({
      name: "Lead",
      id: eventId,
      source: "website",
      url: req.headers.get("referer") || undefined,
      user: {
        phone: digits,
        name,
        fbc,
        fbp,
        ip: req.headers.get("x-forwarded-for")?.split(",")[0].trim(),
        ua: req.headers.get("user-agent") || undefined,
      },
      custom: { content_name: `${rooms} xonali`, content_category: "apartment" },
    }),
  ]);

  if (tgRes.status === "rejected") console.error("[lead] telegram", tgRes.reason);
  if (crmRes.status === "rejected") console.error("[lead] crm", crmRes.reason);
  if (metaRes.status === "rejected") console.error("[lead] meta", metaRes.reason);

  if (!tgReady && !crmReady()) {
    // Kalitlar hali kiritilmagan — lid server logida qoladi, foydalanuvchi xato ko'rmaydi.
    console.log("[lead]", { name, phone: `+${digits}`, rooms, source, date, meta: metaReady() });
    return NextResponse.json({ ok: true });
  }

  // Lid kamida bitta joyga (Telegram yoki CRM) yetib borgan bo'lsa — muvaffaqiyat.
  const delivered = (tgReady && tgRes.status === "fulfilled") || (crmReady() && crmRes.status === "fulfilled");
  if (!delivered) {
    return NextResponse.json({ ok: false, error: "Yuborilmadi. Iltimos, Telegram'da yozing: @yangi_denov_admin" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
