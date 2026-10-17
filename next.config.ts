import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  // Tekshiruv buildlari `NEXT_DIST_DIR=.next-check` bilan alohida papkaga yoziladi,
  // shunda ishlab turgan `next dev` ning `.next` papkasi buzilmaydi.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
};

export default nextConfig;
