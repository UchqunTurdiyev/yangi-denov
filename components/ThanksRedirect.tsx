"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const SECONDS = 10;
const R = 54;
const C = 2 * Math.PI * R;

// Ariza yuborilgandan keyingi sahifa: 10 soniya animatsiyali kutish, so'ng Telegram'dagi adminga o'tish.
export default function ThanksRedirect({ name }: { name: string }) {
  const [left, setLeft] = useState(SECONDS);

  useEffect(() => {
    const started = Date.now();
    const t = setInterval(() => {
      const rest = Math.max(0, SECONDS - Math.floor((Date.now() - started) / 1000));
      setLeft(rest);
      if (rest === 0) {
        clearInterval(t);
        window.location.href = site.tg;
      }
    }, 250);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="thanks">
      <div className="thanks__glow" aria-hidden />
      <motion.div
        className="thanks__card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        <motion.div
          className="lead__check"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="3">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.45 }} />
          </svg>
        </motion.div>

        <h1 className="thanks__title">Rahmat{name ? `, ${name}` : ""}!</h1>
        <p className="thanks__text">
          Arizangiz qabul qilindi. Hozir sizni Telegram'dagi mutaxassisimizga yo'naltiramiz — u sizga narxlar, to'lov
          rejasi va bo'sh xonadonlar haqida batafsil ma'lumot beradi.
        </p>

        <div className="thanks__timer" role="timer" aria-live="polite">
          <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden>
            <circle cx="60" cy="60" r={R} className="thanks__track" />
            <circle
              cx="60"
              cy="60"
              r={R}
              className="thanks__ring"
              strokeDasharray={C}
              style={{ ["--c" as string]: C, animationDuration: `${SECONDS}s` }}
            />
          </svg>
          <motion.span key={left} className="thanks__num" initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {left}
          </motion.span>
        </div>
        <p className="thanks__hint">soniyadan so'ng Telegram ochiladi</p>

        <a className="btn btn--gold btn--block btn--shine" href={site.tg}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden>
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          Hoziroq Telegram'ga o'tish
        </a>
        <a className="thanks__back" href="/">
          ← Saytga qaytish
        </a>
      </motion.div>
    </main>
  );
}
