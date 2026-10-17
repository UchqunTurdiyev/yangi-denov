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
Vercel/Railway'ga deploy qilganda `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` va `SITE_URL` (masalan https://yangidenov.uz) muhit o'zgaruvchilarini qo'shing.

## Tuzilma
- `lib/site.ts` — barcha matnlar, narxlar, telefonlar (tahrir shu yerda)
- `components/Apartment3D.tsx` — 1/2/3 xonali xonadonlarning interaktiv 3D maketi (three.js)
- `components/LeadForm.tsx` — forma (ism, telefon, xonalar soni) + modal
- `app/api/lead/route.ts` — arizani Telegram'ga yuboradi (kalit bo'lmasa server logiga yozadi)
- `public/media` — rasmlar
