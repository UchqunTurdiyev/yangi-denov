import type { Metadata } from "next";
import SaleForm from "@/components/SaleForm";
import { readSaleLink } from "@/lib/sale-link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Sotuvni kiritish — Yangi Denov", robots: { index: false, follow: false } };

export default async function SotuvPage({ searchParams }: { searchParams: Promise<{ d?: string; s?: string }> }) {
  const { d, s } = await searchParams;
  const ref = readSaleLink(d, s);

  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "24px 16px" }}>
      <div style={{ width: "min(440px, 100%)" }}>
        {ref?.ph ? (
          <SaleForm d={d!} s={s!} name={ref.n || "Mijoz"} phone={`+${ref.ph}`} rooms={ref.r} fromAd={Boolean(ref.c)} />
        ) : (
          <div className="lead">
            <h3 className="lead__title">Havola noto'g'ri</h3>
            <p className="lead__sub">Telegram'dagi lid ostidagi «💰 Sotildi» tugmasini qaytadan bosing.</p>
          </div>
        )}
      </div>
    </main>
  );
}
