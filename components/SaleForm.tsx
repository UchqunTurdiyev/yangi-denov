"use client";

import { useState } from "react";

type Currency = "UZS" | "USD";

const group = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 13);
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default function SaleForm({
  d,
  s,
  name,
  phone,
  rooms,
  fromAd,
}: {
  d: string;
  s: string;
  name: string;
  phone: string;
  rooms?: string;
  fromAd: boolean;
}) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("UZS");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [sum, setSum] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount.replace(/\D/g, "")) return setError("Summani kiriting");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/sotuv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ d, s, amount: amount.replace(/\s/g, ""), currency }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Xatolik");
      setSum(json.sum);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    }
  }

  if (status === "done") {
    return (
      <div className="lead lead__done">
        <div className="lead__check">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3>Sotuv Meta'ga yuborildi</h3>
        <p>
          {name} · {phone}
          <br />
          <b>{sum}</b>
        </p>
        <p className="lead__note">Sahifani yopib, Telegram'ga qaytishingiz mumkin.</p>
      </div>
    );
  }

  return (
    <form className="lead" onSubmit={submit} noValidate>
      <h3 className="lead__title">💰 Sotuvni kiritish</h3>
      <p className="lead__sub">
        <b>{name}</b> · {phone}
        {rooms ? ` · ${rooms} xonali` : ""}
        {fromAd ? " · 📣 reklamadan" : ""}
      </p>

      <fieldset className="field">
        <legend>Valyuta</legend>
        <div className="chips" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {(["UZS", "USD"] as Currency[]).map((c) => (
            <button
              type="button"
              key={c}
              className={`chip ${currency === c ? "is-active" : ""}`}
              aria-pressed={currency === c}
              onClick={() => setCurrency(c)}
            >
              {currency === c && <span className="chip__bg" />}
              <span className="chip__label">{c === "UZS" ? "So'm" : "Dollar ($)"}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span>Sotuv summasi</span>
        <input
          value={amount}
          onChange={(e) => setAmount(group(e.target.value))}
          inputMode="numeric"
          autoFocus
          placeholder={currency === "UZS" ? "450 000 000" : "35 000"}
        />
      </label>

      {error && <p className="lead__error">{error}</p>}

      <button className="btn btn--gold btn--block" disabled={status === "sending"}>
        {status === "sending" ? "Yuborilmoqda…" : "Meta'ga yuborish"}
      </button>
      <p className="lead__note">So'm Markaziy bank kursi bo'yicha dollarga aylantirib yuboriladi</p>
    </form>
  );
}
