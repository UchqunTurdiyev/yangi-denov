import LeadForm, { LeadModal } from "@/components/LeadForm";
import { Apartments, Header, Hero, Logo, MobileBar } from "@/components/sections";
import { Counter, Reveal, Tilt } from "@/components/ui";
import { builder, perks, perksTicker, site } from "@/lib/site";

const ICONS: Record<string, React.ReactNode> = {
  lift: <path d="M6 3h12v18H6zM12 3v18M9 9l1.5-2L12 9M15 15l-1.5 2L12 15" />,
  guests: <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17 11a3 3 0 1 0 0-6M21 21v-2a4 4 0 0 0-3-3.9" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  facade: <path d="M4 21V5l8-3 8 3v16M4 21h16M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4" />,
  sun: <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />,
  drop: <path d="M12 2.7S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.3-7-12.3z" />,
  wifi: <path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01" />,
  pipe: <path d="M3 7h8v4h10M3 7v4h4v6h4M21 11v6" />,
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Yuguruvchi lenta */}
        <div className="ticker" aria-hidden>
          <div className="ticker__track">
            {[...perksTicker, ...perksTicker, ...perksTicker].map((t, i) => (
              <span key={i}>
                {t} <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        {/* Xonadonlar 3D */}
        <section className="section section--cream" id="xonadonlar">
          <div className="container">
            <div className="section__head">
              <Reveal>
                <span className="eyebrow">Xonadonlar · 3D</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Uyingizni hoziroq <em>ichidan</em> ko'ring
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">
                  1, 2 va 3 xonali xonadonlar. Maketni aylantiring, xonalarni solishtiring va o'zingizga mosini tanlang.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Apartments />
            </Reveal>
          </div>
        </section>

        {/* Qulayliklar */}
        <section className="section" id="qulayliklar">
          <div className="container">
            <div className="section__head">
              <Reveal>
                <span className="eyebrow">Qulayliklar</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Bitta uy olasiz — shuncha qulaylik <em>bepul</em>
                </h2>
              </Reveal>
            </div>
            <div className="perks">
              {perks.map((p, i) => (
                <Reveal key={p.title} delay={(i % 4) * 0.07} className="perk">
                  <span className="perk__icon">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[p.icon]}
                    </svg>
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quruvchi */}
        <section className="section section--dark builder" id="quruvchi">
          <div className="container split split--builder">
            <Reveal className="builder__photo">
              <Tilt className="builder__frame" max={7}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/xabibullo-saidov.jpg" alt="Xabibullo Saidov" loading="lazy" />
              </Tilt>
              <a className="builder__ig" href={site.instagram} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
                @khabib__saidov · 140K
              </a>
            </Reveal>
            <div>
              <Reveal>
                <span className="eyebrow eyebrow--light">Ishonchli quruvchi</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">{builder.name}</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="builder__role">
                  {builder.role} · <span>{builder.nick}</span>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">
                  1984-yilda Denovda tug'ilgan. 20 yildan ortiq tadbirkorlik va 8 yillik qurilish tajribasiga ega. 500 dan
                  ortiq insonni doimiy ish bilan ta'minlaydi. Imkoniyatlari katta bo'lsa-da, sotuv ofisiga o'zi kelib,
                  mijozlar bilan yuzma-yuz gaplashadi — chunki uning uchun har bir oila tarixi muhim.
                </p>
              </Reveal>
              <div className="builder__stats">
                {builder.stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.1 + i * 0.06} className="stat stat--light">
                    <b>
                      <Counter value={s.value} suffix={s.suffix} />
                    </b>
                    <span>{s.label}</span>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <p className="builder__label">Qurilgan loyihalar</p>
                <div className="builder__projects">
                  {builder.projects.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Manzil + yakuniy forma */}
        <section className="section section--dark final" id="manzil">
          <div className="container split split--final">
            <div>
              <Reveal>
                <span className="eyebrow eyebrow--light">Manzil</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Uyni <em>o'z ko'zingiz</em> bilan ko'ring
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="contact">
                  <li>
                    <span>📍 Manzil</span>
                    <b>{site.address}</b>
                  </li>
                  <li>
                    <span>🏢 Sotuv ofisi</span>
                    <b>{site.office}</b>
                  </li>
                  <li>
                    <span>🕘 Ish vaqti</span>
                    <b>{site.hours}</b>
                  </li>
                  <li>
                    <span>✈️ Telegram</span>
                    <b>
                      <a href={site.tg} target="_blank" rel="noreferrer">{site.tgHandle}</a>
                    </b>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={0.15} className="map">
                <iframe
                  title="Yangi Denov xaritada"
                  src="https://maps.google.com/maps?q=Denov%20Yangi%20bozor&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a className="btn btn--gold btn--sm map__btn" href={site.mapUrl} target="_blank" rel="noreferrer">
                  Xaritada ochish ↗
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="final__form">
              <LeadForm
                source="Yakuniy forma"
                title="Batafsil ma'lumot uchun — eng qulay variantni tanlab beramiz"
                subtitle="Narxlar, bo'sh qavatlar va to'lov jadvali — bitta suhbatda."
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__row">
          <Logo />
          <p>
            © {new Date().getFullYear()} Yangi Denov · «Aksaray» qurilish kompaniyasi. Shahar ichida yangi shahar.
          </p>
          <div className="footer__social">
            <a href={site.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </footer>

      <MobileBar />
      <LeadModal />
    </>
  );
}
