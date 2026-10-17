"use client";

import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { RoomKey } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </M>
  );
}

export function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  const fmt = value >= 2000 && value < 2100 ? String(n) : n.toLocaleString("ru-RU");
  return (
    <span ref={ref}>
      {prefix}
      {fmt}
      {suffix}
    </span>
  );
}

// Sichqoncha ortidan egiladigan 3D karta (vizualizatsiya rasmlari uchun).
export function Tilt({ children, className, max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(x, [0, 1], ["0%", "100%"]);
  const gy = useTransform(y, [0, 1], ["0%", "100%"]);
  const glare = useTransform([gx, gy], ([a, b]) => `radial-gradient(circle at ${a} ${b}, rgba(255,255,255,.35), transparent 55%)`);
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
      <motion.div className="tilt-glare" style={{ background: glare }} />
    </motion.div>
  );
}

export function openLead(detail: { rooms?: RoomKey; source?: string } = {}) {
  window.dispatchEvent(new CustomEvent("lead:open", { detail }));
}

export function LeadButton({
  children,
  rooms,
  source,
  className = "btn btn--gold",
}: {
  children: ReactNode;
  rooms?: RoomKey;
  source?: string;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => openLead({ rooms, source })}>
      {children}
    </button>
  );
}

export function Countdown({ until }: { until: string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(until).getTime();
    const t = () => setLeft(Math.max(0, end - Date.now()));
    t();
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, [until]);
  const parts =
    left === null
      ? ["--", "--", "--", "--"]
      : [86400000, 3600000, 60000, 1000].map((u, i, arr) =>
          String(Math.floor((i === 0 ? left : left % arr[i - 1]) / u)).padStart(2, "0")
        );
  return (
    <div className="countdown" aria-label="Taklif tugashiga qolgan vaqt">
      {["kun", "soat", "daqiqa", "soniya"].map((l, i) => (
        <div key={l} className="countdown__cell">
          <b>{parts[i]}</b>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

export function YouTube({ id, title, poster }: { id: string; title: string; poster?: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="yt">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt__poster" onClick={() => setOn(true)} aria-label={`Videoni ko'rish: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt__play">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="yt__title">{title}</span>
        </button>
      )}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div key={it.q} className={`faq__item ${open === i ? "is-open" : ""}`}>
          <button type="button" className="faq__q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {it.q}
            <span className="faq__icon" aria-hidden />
          </button>
          <motion.div
            className="faq__a"
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <p>{it.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function Magnetic({ children }: { children: ReactNode }) {
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.span
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
