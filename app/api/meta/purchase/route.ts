import { NextResponse } from "next/server";
import { fmtUsd, fmtUzs, metaReady, parseAmount, sendPurchase } from "@/lib/meta";
import { esc, tg, tgChats, tgToken } from "@/lib/telegram";

export const runtime = "nodejs";

// CRM uchun: lid "Sotildi" bosqichiga o'tganda CRM shu manzilga yuboradi.
// POST /api/meta/purchase?key=META_PURCHASE_KEY
// { "phone": "+998901234567", "name": "Ism", "amount": 450000000, "currency": "UZS", "id": "crm-lid-id" }
export async function POST(req: Request) {
  const key = new URL(req.url).searchParams.get("key") || req.headers.get("x-key");
  if (!process.env.META_PURCHASE_KEY || key !== process.env.META_PURCHASE_KEY) {
    return NextResponse.json({ ok: false, error: "key noto'g'ri" }, { status: 401 });
  }
  if (!metaReady()) return NextResponse.json({ ok: false, error: "Meta ulanmagan" }, { status: 503 });

  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  let digits = String(b.phone ?? "").replace(/\D/g, "");
  if (digits.length === 9) digits = "998" + digits;
  if (!/^998\d{9}$/.test(digits)) return NextResponse.json({ ok: false, error: "telefon noto'g'ri" }, { status: 422 });
  const parsed = parseAmount(`${b.amount ?? ""} ${String(b.currency ?? "").toUpperCase() === "USD" ? "$" : ""}`);
  if (!parsed) return NextResponse.json({ ok: false, error: "summa noto'g'ri" }, { status: 422 });
  const name = String(b.name ?? "").slice(0, 60) || undefined;

  try {
    const { uzs, usd } = await sendPurchase({
      id: b.id ? `purchase-crm-${String(b.id).slice(0, 40)}` : `purchase-${digits}-${Date.now()}`,
      phone: digits,
      name,
      amount: parsed.amount,
      currency: parsed.currency,
    });
    const sum = [uzs != null ? fmtUzs(uzs) : "", usd != null ? fmtUsd(usd) : ""].filter(Boolean).join(" ≈ ");
    if (tgToken()) {
      const text = `✅ <b>CRM'dan sotuv Meta'ga yuborildi</b>\n👤 ${esc(name || "—")} · +${digits}\n💰 ${sum}`;
      await Promise.allSettled(tgChats().map((chat_id) => tg("sendMessage", { chat_id, text, parse_mode: "HTML" })));
    }
    return NextResponse.json({ ok: true, uzs, usd });
  } catch (e) {
    console.error("[meta purchase]", e);
    return NextResponse.json({ ok: false, error: String((e as Error).message) }, { status: 502 });
  }
}
