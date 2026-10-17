"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { apartments, audiences, heroStats, nav, site, type RoomKey } from "@/lib/site";
import LeadForm from "./LeadForm";
import { Counter, LeadButton, Magnetic, Tilt } from "./ui";

const Apartment3D = dynamic(() => import("./Apartment3D"), {
  ssr: false,
  loading: () => <div className="viewer3d viewer3d--skeleton">3D maket yuklanmoqda…</div>,
});

const ease = [0.22, 1, 0.36, 1] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/media/logo-h.png" alt="Yangi Denov by Aksaray" className={`logo ${light ? "logo--light" : ""}`} width={741} height={120} />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__row">
        <a href="#top" aria-label="Bosh sahifa" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <nav className="header__nav">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="header__phone" href={site.phoneHref}>
          <span className="pulse-dot" />
          {site.phone}
        </a>
        <LeadButton className="btn btn--green btn--sm header__cta" source="Header">
          Ariza qoldirish
        </LeadButton>
        <button className="burger" aria-label="Menyu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mnav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease }}
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                {n.label}
              </motion.a>
            ))}
            <a className="btn btn--green btn--block" href={site.phoneHref}>
              {site.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const heroWords = ["Shahar", "ichida", "yangi", "shahar"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__bg" style={{ y: imgY, scale: imgScale }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/genplan.jpg" alt="Yangi Denov majmuasi — umumiy ko'rinish" />
      </motion.div>
      <div className="hero__shade" />
      <div className="hero__leaf" aria-hidden />

      <div className="container hero__grid">
        <motion.div className="hero__copy" style={{ opacity: fade }}>
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="pulse-dot" /> Denov markazi · Yangi bozor ro'parasi
          </motion.span>
          <h1 className="hero__title">
            {heroWords.map((w, i) => (
              <span key={i} className="word-mask">
                <motion.span
                  className={i >= 2 ? "accent" : undefined}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.09, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Surxondaryoning yuragi — Denov. Denovning yuragi — <b>Yangi Denov</b>. 21 gektarda maktab, bog'cha,
            klinika va bozor qadamingiz ostida. Uyni <b>boshlang'ich to'lovsiz</b>, faqat pasport bilan oling.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <Magnetic>
              <a href="#xonadonlar" className="btn btn--gold btn--lg btn--shine">
                Xonadonlarni 3D ko'rish
              </a>
            </Magnetic>
            <a href={site.phoneHref} className="btn btn--glass btn--lg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
              </svg>
              Qo'ng'iroq
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__form"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          <div className="hero__badge">
            <span>Oktabr aksiyasi</span>
            <b>60 oygacha</b> bo'lib to'lash
          </div>
          <LeadForm source="Hero forma" title="Uy narxi va to'lov jadvalini bilib oling" subtitle="3 ta savol — va mutaxassis siz uchun eng qulay variantni hisoblab beradi." />
        </motion.div>
      </div>

      <div className="container hero__stats">
        {heroStats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.7, ease }}
          >
            <b>
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </b>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>

      <a href="#loyiha" className="scroll-cue" aria-label="Pastga">
        <span />
      </a>
    </section>
  );
}

export function Apartments() {
  const [rooms, setRooms] = useState<RoomKey>(2);
  const [view, setView] = useState<"3d" | "render">("3d");
  const a = apartments[rooms];

  return (
    <div className="apt">
      <div className="apt__tabs" role="tablist">
        {([1, 2, 3] as RoomKey[]).map((r) => (
          <button key={r} role="tab" aria-selected={rooms === r} className={`apt__tab ${rooms === r ? "is-active" : ""}`} onClick={() => setRooms(r)}>
            {rooms === r && <motion.span layoutId="apt-tab" className="apt__tab-bg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span>{apartments[r].title}</span>
          </button>
        ))}
      </div>

      <div className="apt__grid">
        <div className="apt__stage">
          <div className="apt__switch">
            <button className={view === "3d" ? "is-active" : ""} onClick={() => setView("3d")}>
              3D maket
            </button>
            <button className={view === "render" ? "is-active" : ""} onClick={() => setView("render")}>
              Vizualizatsiya
            </button>
          </div>
          <div className="apt__canvas">
            <div className={`apt__layer ${view === "3d" ? "is-on" : ""}`}>
              <Apartment3D rooms={rooms} />
            </div>
            <div className={`apt__layer ${view === "render" ? "is-on" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={rooms}
                  className="apt__render-wrap"
                  initial={{ opacity: 0, rotateY: -25, scale: 0.9 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 25, scale: 0.9 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <Tilt className="apt__render" max={12}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={`${a.title} xonadon vizualizatsiyasi`} />
                  </Tilt>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="apt__caption">
            {view === "3d"
              ? "Interaktiv maket: sichqoncha yoki barmoq bilan aylantiring. Xona o'lchamlari taxminiy — aniq chizma sotuv ofisida."
              : "Mebel bilan jihozlangan vizualizatsiya. Kursorni rasm ustida yurgizing."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={rooms}
            className="apt__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="tag tag--gold">Ta'lim xodimlari uchun maxsus narx</span>
            <h3>
              {a.title} <small>· {a.area} m²</small>
            </h3>
            <p className="apt__pitch">{a.pitch}</p>
            <div className="apt__price">
              <span>Boshlang'ich to'lovsiz · oylik to'lov</span>
              <b>{a.monthly}</b>
              <em>so'mdan</em>
            </div>
            <ul className="apt__facts">
              <li>
                <span>Maydonlar</span>
                <b>{a.range}</b>
              </li>
              <li>
                <span>Muddat</span>
                <b>36–60 oy</b>
              </li>
              <li>
                <span>Hujjat</span>
                <b>Faqat pasport</b>
              </li>
            </ul>
            <div className="apt__rooms">
              {a.rooms.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
            <LeadButton rooms={rooms} source={`Xonadonlar: ${a.title}`} className="btn btn--green btn--block btn--shine">
              {a.title} uy narxini bilish
            </LeadButton>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Audience() {
  const [i, setI] = useState(0);
  const a = audiences[i];
  return (
    <div className="aud">
      <div className="aud__list">
        {audiences.map((x, k) => (
          <button key={x.key} className={`aud__btn ${k === i ? "is-active" : ""}`} onClick={() => setI(k)}>
            {k === i && <motion.span layoutId="aud-bg" className="aud__btn-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span>{x.name}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={a.key}
          className="aud__card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease }}
        >
          <div className="aud__pain">
            <span className="tag tag--red">Muammo</span>
            <p>{a.pain}</p>
          </div>
          <div className="aud__sol">
            <span className="tag tag--green">Yangi Denov yechimi</span>
            <ul>
              {a.solutions.map((s, k) => (
                <motion.li key={s} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.08 }}>
                  <i aria-hidden>✓</i>
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="mbar" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <a className="btn btn--glass-dark" href={site.phoneHref}>
            Qo'ng'iroq
          </a>
          <LeadButton className="btn btn--gold" source="Mobil panel">
            Ariza qoldirish
          </LeadButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Parallax({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className={`parallax ${className || ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img src={src} alt={alt} style={{ y, scale: 1.2 }} loading="lazy" />
    </div>
  );
}
