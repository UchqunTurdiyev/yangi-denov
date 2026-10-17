import { NextResponse } from "next/server";
import { fmtUsd, fmtUzs, metaReady, parseAmount, sendPurchase } from "@/lib/meta";
import { readSaleLink } from "@/lib/sale-link";
import { esc, tg, tgToken } from "@/lib/telegram";

export const runtime = "nodejs";

// /sotuv sahifasidagi forma: imzolangan lid + summa → Meta Purchase, Telegram'dagi tugma yangilanadi.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const ref = readSaleLink(String(b.d ?? ""), String(b.s ?? ""));
  if (!ref?.ph) return NextResponse.json({ ok: false, error: "Havola noto'g'ri yoki eskirgan" }, { status: 401 });
  if (!metaReady()) {
    return NextResponse.json({ ok: false, error: "Meta ulanmagan: META_PIXEL_ID va META_ACCESS_TOKEN kiritilmagan" }, { status: 503 });
  }

  const parsed = parseAmount(`${String(b.amount ?? "")} ${b.currency === "USD" ? "$" : ""}`);
  if (!parsed) return NextResponse.json({ ok: false, error: "Summani to'g'ri kiriting" }, { status: 422 });

  try {
    const { uzs, usd } = await sendPurchase({
      id: ref.e ? `purchase-${ref.e}` : `purchase-${ref.ph}-${Date.now()}`,
      phone: ref.ph,
      name: ref.n,
      amount: parsed.amount,
      currency: parsed.currency,
      fbc: ref.c,
      fbp: ref.p,
      rooms: ref.r,
    });
    const sum = [uzs != null ? fmtUzs(uzs) : "", usd != null ? fmtUsd(usd) : ""].filter(Boolean).join(" ≈ ");

    if (tgToken() && ref.ch && ref.m) {
      await Promise.allSettled([
        tg("editMessageReplyMarkup", {
          chat_id: ref.ch,
          message_id: ref.m,
          reply_markup: { inline_keyboard: [[{ text: `✅ Sotildi: ${sum}`, callback_data: "done" }]] },
        }),
        tg("sendMessage", {
          chat_id: ref.ch,
          text: `✅ <b>Sotuv Meta'ga yuborildi</b>\n👤 ${esc(ref.n || "—")} · +${ref.ph}\n💰 ${sum}${ref.c ? "\n📣 Reklama kliki bilan bog'landi" : ""}`,
          parse_mode: "HTML",
          reply_parameters: { message_id: ref.m, allow_sending_without_reply: true },
        }),
      ]);
    }
    return NextResponse.json({ ok: true, sum });
  } catch (e) {
    console.error("[sotuv]", e);
    return NextResponse.json({ ok: false, error: String((e as Error).message) }, { status: 502 });
  }
}
