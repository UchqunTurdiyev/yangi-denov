import type { Metadata } from "next";
import ThanksRedirect from "@/components/ThanksRedirect";

export const metadata: Metadata = { title: "Rahmat! — Yangi Denov", robots: { index: false, follow: false } };

export default async function RahmatPage({ searchParams }: { searchParams: Promise<{ n?: string }> }) {
  const { n } = await searchParams;
  const name = (n || "").replace(/\s+/g, " ").trim().split(" ")[0].slice(0, 30);
  return <ThanksRedirect name={name} />;
}
