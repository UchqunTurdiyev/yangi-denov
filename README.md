# Yangi Denov — landing sayt (Next.js App Router)

## Ishga tushirish
```bash
npm install
cp .env.example .env.local   # Telegram bot token va chat ID ni kiriting
npm run dev                  # http://localhost:3000
```

## Production
```bash
npm run build && npm start
```
Vercel/Railway'ga deploy qilganda `.env.example` dagi o'zgaruvchilarni qo'shing (`META_PIXEL_ID` build paytida ham bo'lishi kerak).

## Lid oqimi
Saytdagi forma → `/api/lead` bir vaqtda:
1. **Telegram** — lid xabari + «💰 Sotildi» tugmasi
2. **CRM** — `CRM_LEAD_URL` ga (manba: «Sayt», izohda xonalar soni va tugma)
3. **Meta** — Pixel (brauzer) va Conversions API (server) `Lead` hodisasi, bir xil `eventID` bilan

## Sotuvni Meta'ga yuborish
- **Telegram bot:** lid ostidagi «💰 Sotildi» → bot so'raydi → summani javob qilib yozing (`450000000`, `450mln`, `35000$`). Meta'ga `Purchase` boradi (so'm Markaziy bank kursi bo'yicha USD ga aylantiriladi).
- **Qo'lda:** `/sotuv 901234567 450mln Ism Familiya`
- **CRM'dan:** `POST /api/meta/purchase?key=META_PURCHASE_KEY` — `{"phone":"+998901234567","name":"Ism","amount":450000000,"currency":"UZS","id":"crm-lid-id"}`

Botni ulash (deploydan keyin bir marta): `https://SAYT/api/telegram/setup?key=TELEGRAM_WEBHOOK_SECRET` ni brauzerda oching.

## Tuzilma
- `lib/site.ts` — barcha matnlar, narxlar, telefonlar (tahrir shu yerda)
- `components/Apartment3D.tsx` — 1/2/3 xonali xonadonlarning interaktiv 3D maketi (three.js)
- `components/LeadForm.tsx` — forma (ism, telefon, xonalar soni) + modal
- `app/api/lead/route.ts` — arizani Telegram'ga yuboradi (kalit bo'lmasa server logiga yozadi)
- `public/media` — rasmlar
