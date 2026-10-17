"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { site, type RoomKey } from "@/lib/site";

function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  const p = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return "+998" + (p.length ? " " + p.join(" ") : " ");
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Status = "idle" | "sending" | "done" | "error";

export default function LeadForm({
  source,
  initialRooms,
  dark = false,
  title = "Bepul maslahat oling",
  subtitle = "Ma'lumotlaringizni qoldiring — mutaxassisimiz 15 daqiqa ichida siz bilan bog'lanadi.",
}: {
  source: string;
  initialRooms?: RoomKey;
  dark?: boolean;
  title?: string;
  subtitle?: string;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [rooms, setRooms] = useState<RoomKey | null>(initialRooms ?? null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialRooms) setRooms(initialRooms);
  }, [initialRooms]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Ismingizni kiriting");
    if (digits.length !== 12) return setError("Telefon raqamini to'liq kiriting");
    if (!rooms) return setError("Necha xonali uy kerakligini tanlang");
    setError("");
    setStatus("sending");
    try {
      const website = (new FormData(e.currentTarget).get("website") as string) || "";
      // Pixel va server (Conversions API) bir xil eventId yuboradi — Meta ularni bitta lid deb sanaydi.
      const eventId = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, rooms: String(rooms), source, website, eventId }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Xatolik");
      window.fbq?.("track", "Lead", { content_name: `${rooms} xonali`, content_category: "apartment" }, { eventID: eventId });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    }
  }

  return (
    <div className={`lead ${dark ? "lead--dark" : ""}`}>
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="ok"
            className="lead__done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <div className="lead__check">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
              </svg>
            </div>
            <h3>Rahmat, {name.split(" ")[0]}!</h3>
            <p>Arizangiz qabul qilindi. Mutaxassisimiz tez orada siz bilan bog'lanadi.</p>
            <a className="btn btn--ghost" href={site.tg} target="_blank" rel="noreferrer">
              Telegram'da hoziroq yozish
            </a>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
            <h3 className="lead__title">{title}</h3>
            <p className="lead__sub">{subtitle}</p>

            <label className="field">
              <span>Ismingiz</span>
              <input
                id={`${uid}-name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Dilshod"
                autoComplete="given-name"
                maxLength={60}
              />
            </label>

            <label className="field">
              <span>Telefon raqamingiz</span>
              <input
                id={`${uid}-phone`}
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                inputMode="tel"
                autoComplete="tel"
                placeholder="+998 90 123 45 67"
              />
            </label>

            <fieldset className="field">
              <legend>Necha xonali uy kerak?</legend>
              <div className="chips" role="radiogroup">
                {([1, 2, 3] as RoomKey[]).map((r) => (
                  <button
                    type="button"
                    key={r}
                    role="radio"
                    aria-checked={rooms === r}
                    className={`chip ${rooms === r ? "is-active" : ""}`}
                    onClick={() => setRooms(r)}
                  >
                    {rooms === r && <motion.span layoutId={`${uid}-chip`} className="chip__bg" />}
                    <span className="chip__label">
                      <b>{r}</b> xonali
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />

            <AnimatePresence>
              {error && (
                <motion.p className="lead__error" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button className="btn btn--gold btn--block btn--shine" disabled={status === "sending"}>
              {status === "sending" ? "Yuborilmoqda…" : "Batafsil ma'lumot uchun"}
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <p className="lead__note">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z" />
              </svg>
              Ma'lumotlaringiz uchinchi shaxslarga berilmaydi
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LeadModal() {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomKey | undefined>();
  const [source, setSource] = useState("Modal");
  const [key, setKey] = useState(0);

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ rooms?: RoomKey; source?: string }>).detail || {};
      setRooms(d.rooms);
      setSource(d.source || "Tugma");
      setKey((k) => k + 1);
      setOpen(true);
    };
    window.addEventListener("lead:open", on);
    return () => window.removeEventListener("lead:open", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            className="modal__box"
            role="dialog"
            aria-modal="true"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal__close" onClick={() => setOpen(false)} aria-label="Yopish">
              ×
            </button>
            <LeadForm key={key} source={source} initialRooms={rooms} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
