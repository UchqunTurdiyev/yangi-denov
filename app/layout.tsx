import type { Metadata, Viewport } from "next";
import { Montserrat, Lora } from "next/font/google";
import "./globals.css";

const sans = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const serif = Lora({ subsets: ["latin", "cyrillic"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "Yangi Denov — shahar ichida yangi shahar | 1, 2, 3 xonali uylar muddatli to'lovga",
  description:
    "Denov markazida, Yangi bozor ro'parasida 21 gektarlik turar joy majmuasi. Boshlang'ich to'lovsiz, faqat pasport bilan, foiz va penyalarsiz 60 oygacha bo'lib to'lash. Quruvchi — Xabibullo Saidov, «Aksaray».",
  openGraph: {
    title: "Yangi Denov — shahar ichida yangi shahar",
    description: "6 800+ xonadon, boshlang'ich to'lovsiz, faqat pasport bilan. Ishonchli quruvchidan uy oling.",
    type: "website",
    locale: "uz_UZ",
    images: ["/media/gallery/aerial.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#04564c", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
