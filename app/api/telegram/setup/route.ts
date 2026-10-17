import { NextResponse } from "next/server";
import { tg } from "@/lib/telegram";

export const runtime = "nodejs";

// Deploydan keyin bir marta oching: https://SAYT/api/telegram/setup?key=TELEGRAM_WEBHOOK_SECRET
// Botni shu saytning /api/telegram/webhook manziliga ulaydi.
export async function GET(req: Request) {
  const key = new URL(req.url).searchParams.get("key");
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || key !== secret) return NextResponse.json({ ok: false, error: "key noto'g'ri" }, { status: 401 });

  const site = (process.env.SITE_URL || "").replace(/\/$/, "");
  if (!site.startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "SITE_URL https:// bilan boshlanishi kerak" }, { status: 400 });
  }
  try {
    await tg("setWebhook", {
      url: `${site}/api/telegram/webhook`,
      secret_token: secret,
      allowed_updates: ["message", "callback_query"],
    });
    await tg("setMyCommands", {
      commands: [
        { command: "sotuv", description: "Sotuvni qo'lda kiritish: /sotuv 901234567 450mln Ism" },
        { command: "help", description: "Yordam" },
        { command: "id", description: "Chat ID" },
      ],
    });
    return NextResponse.json({ ok: true, webhook: `${site}/api/telegram/webhook`, info: await tg("getWebhookInfo", {}) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String((e as Error).message) }, { status: 502 });
  }
}
