import { NextResponse } from "next/server";
import { fmtUsd, fmtUzs, metaReady, parseAmount, sendPurchase } from "@/lib/meta";
import { esc, readRef, refLink, tg, tgChats, type LeadRef } from "@/lib/telegram";

export const runtime = "nodejs";

type Entity = { type: string; url?: string };
type Msg = {
  message_id: number;
  chat: { id: number };
  from?: { id: number; is_bot?: boolean };
  text?: string;
  entities?: Entity[];
  reply_to_message?: Msg;
};
type Update = {
  message?: Msg;
  callback_query?: { id: string; from: { id: number }; message?: Msg; data?: string };
};

const HELP = [
  "🤖 <b>Yangi Denov — lidlar boti</b>",
  "",
  "• Saytdan kelgan har bir lid shu yerga tushadi.",
  "• Mijoz uy sotib olsa — lid ostidagi <b>💰 Sotildi</b> tugmasini bosing va summani yozing. Sotuv Meta (Facebook/Instagram reklama) ga yuboriladi.",
  "",
  "Saytdan kelmagan mijozni qo'lda kiritish:",
  "<code>/sotuv 901234567 450mln Ism Familiya</code>",
  "Summa: <code>450000000</code>, <code>450mln</code>, <code>1.2mlrd</code> yoki <code>35000$</code>",
  "",
  "<code>/id</code> — shu chat ID raqami",
].join("\n");

// Faqat TELEGRAM_CHAT_ID dagi chatlar yoki TELEGRAM_ADMIN_IDS dagi foydalanuvchilar sotuv kirita oladi.
function allowed(chatId: number, userId?: number) {
  const admins = (process.env.TELEGRAM_ADMIN_IDS || "").split(",").map((s) => s.trim());
  return tgChats().includes(String(chatId)) || (userId != null && admins.includes(String(userId)));
}

const reply = (m: Msg, text: string, extra: Record<string, unknown> = {}) =>
  tg("sendMessage", {
    chat_id: m.chat.id,
    text,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
    reply_parameters: { message_id: m.message_id, allow_sending_without_reply: true },
    ...extra,
  });

async function recordSale(m: Msg, ref: LeadRef, amountText: string) {
  const parsed = parseAmount(amountText);
  if (!parsed) {
    await reply(m, "❗ Summani tushunmadim. Masalan: <code>450000000</code>, <code>450mln</code> yoki <code>35000$</code>");
    return;
  }
  if (!metaReady()) {
    await reply(m, "⚠️ Meta ulanmagan: serverga META_PIXEL_ID va META_ACCESS_TOKEN kiritilishi kerak.");
    return;
  }
  const { uzs, usd } = await sendPurchase({
    id: ref.e ? `purchase-${ref.e}` : `purchase-${ref.ph}-${Date.now()}`,
    phone: ref.ph!,
    name: ref.n,
    amount: parsed.amount,
    currency: parsed.currency,
    fbc: ref.c,
    fbp: ref.p,
    rooms: ref.r,
  });
  const sum = [uzs != null ? fmtUzs(uzs) : "", usd != null ? fmtUsd(usd) : ""].filter(Boolean).join(" ≈ ");
  await reply(
    m,
    `✅ <b>Sotuv Meta'ga yuborildi</b>\n👤 ${esc(ref.n || "—")} · +${ref.ph}\n💰 ${sum}${ref.c ? "\n📣 Reklama kliki bilan bog'landi" : ""}`
  );
  if (ref.m) {
    await tg("editMessageReplyMarkup", {
      chat_id: m.chat.id,
      message_id: ref.m,
      reply_markup: { inline_keyboard: [[{ text: `✅ Sotildi: ${sum}`, callback_data: "done" }]] },
    }).catch(() => {});
  }
}

async function handle(u: Update) {
  const cb = u.callback_query;
  if (cb?.message) {
    const m = cb.message;
    if (!allowed(m.chat.id, cb.from.id)) {
      await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Ruxsat yo'q", show_alert: true });
      return;
    }
    if (cb.data === "done") {
      await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Bu sotuv Meta'ga allaqachon yuborilgan" });
      return;
    }
    const ref = readRef(m.entities);
    if (cb.data !== "sold" || !ref?.ph) {
      await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Lid ma'lumoti topilmadi" });
      return;
    }
    await tg("answerCallbackQuery", { callback_query_id: cb.id });
    await reply(
      m,
      `💰 <b>${esc(ref.n || "Mijoz")}</b> (+${ref.ph}) — sotuv summasini <b>shu xabarga javob</b> qilib yozing.\n` +
        `Masalan: <code>450000000</code>, <code>450mln</code> yoki <code>35000$</code>` +
        refLink({ ...ref, m: m.message_id }),
      { reply_markup: { force_reply: true, input_field_placeholder: "450mln yoki 35000$" } }
    );
    return;
  }

  const m = u.message;
  if (!m?.text) return;
  const text = m.text.trim();
  const cmd = text.startsWith("/") ? text.split(/\s+/)[0].split("@")[0].toLowerCase() : "";

  if (cmd === "/id") return void (await reply(m, `Chat ID: <code>${m.chat.id}</code>\nSizning ID: <code>${m.from?.id}</code>`));
  if (!allowed(m.chat.id, m.from?.id)) return;
  if (cmd === "/start" || cmd === "/help") return void (await reply(m, HELP));

  if (cmd === "/sotuv") {
    const [, phoneRaw = "", amountRaw = "", ...nameParts] = text.split(/\s+/);
    let digits = phoneRaw.replace(/\D/g, "");
    if (digits.length === 9) digits = "998" + digits;
    if (!/^998\d{9}$/.test(digits) || !amountRaw) return void (await reply(m, HELP));
    await recordSale(m, { ph: digits, n: nameParts.join(" ") || undefined }, amountRaw);
    return;
  }

  // "Sotildi" so'rog'iga javob sifatida yozilgan summa
  const asked = m.reply_to_message;
  const ref = asked?.from?.is_bot ? readRef(asked.entities) : null;
  if (ref?.ph && ref.m) await recordSale(m, ref, text);
}

export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const u = (await req.json().catch(() => ({}))) as Update;
  try {
    await handle(u);
  } catch (e) {
    console.error("[telegram]", e);
    const chat = u.message?.chat.id ?? u.callback_query?.message?.chat.id;
    if (chat) {
      await tg("sendMessage", { chat_id: chat, text: `⚠️ Xatolik: ${esc(String((e as Error).message || e))}`, parse_mode: "HTML" }).catch(
        () => {}
      );
    }
  }
  // Telegram qayta yubormasligi uchun har doim 200
  return NextResponse.json({ ok: true });
}
