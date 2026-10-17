import LeadForm, { LeadModal } from "@/components/LeadForm";
import { Apartments, Audience, Header, Hero, Logo, MobileBar, Parallax } from "@/components/sections";
import { Countdown, Counter, Faq, LeadButton, Reveal, Tilt, YouTube } from "@/components/ui";
import { builder, faq, inside, nearby, payment, perks, perksTicker, site } from "@/lib/site";

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

        {/* Loyiha haqida */}
        <section className="section" id="loyiha">
          <div className="container split">
            <div>
              <Reveal>
                <span className="eyebrow">Loyiha haqida</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Denovning yuragida <em>yangi hayot</em> boshlanmoqda
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">
                  Yangi Denov — Surxondaryo viloyatining eng yirik turar joy majmuasi. 21 gektar maydonda 6 800 dan ortiq
                  xonadon, o'z maktabi, bog'chasi, klinikasi, sport maydonlari va yashil xiyobonlari bo'lgan to'laqonli
                  shaharcha 2025–2030 yillarda bosqichma-bosqich qad rostlaydi.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="lead-text">
                  Biz shunchaki uy qurmayapmiz. Biz Denovga yangi turmush tarzini olib kelyapmiz — bolangiz maktabga piyoda
                  boradigan, ota-onangiz masjidga 2 daqiqada yetadigan, siz esa bozor, ish va shifoxonani bir qadamda
                  topadigan hayotni.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="inside">
                  {inside.map((x) => (
                    <li key={x}>
                      <i aria-hidden>✓</i>
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="stack-img">
              <Tilt className="stack-img__main" max={6}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/gallery/aerial.jpg" alt="Yangi Denov — qushparvoz ko'rinish" loading="lazy" />
              </Tilt>
              <div className="stack-img__sub">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/gallery/facade.jpg" alt="Yangi Denov uylari fasadi" loading="lazy" />
              </div>
              <div className="stack-img__chip">
                <b>
                  <Counter value={6800} suffix="+" />
                </b>
                <span>xonadon</span>
              </div>
            </Reveal>
          </div>
        </section>

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

        {/* Joylashuv afzalliklari */}
        <section className="section section--dark" id="joylashuv">
          <div className="container">
            <div className="section__head section__head--light">
              <Reveal>
                <span className="eyebrow eyebrow--light">Joylashuv</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Hammasi — <em>5 daqiqalik</em> piyoda masofada
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">
                  Mashina shart emas. Bozor, masjid, universitet, Prezident maktabi va davlat idoralari — barchasi
                  uyingizdan bir necha qadamda.
                </p>
              </Reveal>
            </div>
            <div className="near">
              {nearby.map((n, i) => (
                <Reveal key={n.name} delay={i * 0.05} className="near__item">
                  <span className="near__icon">{n.icon}</span>
                  <span className="near__name">{n.name}</span>
                  <span className="near__time">{n.time}</span>
                  <span className="near__bar" style={{ ["--w" as string]: `${30 + i * 8}%` }} />
                </Reveal>
              ))}
            </div>
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

        {/* Genplan */}
        <section className="genplan">
          <Parallax src="/media/genplan.jpg" alt="Yangi Denov bosh rejasi" className="genplan__img" />
          <div className="genplan__overlay">
            <div className="container">
              <Reveal>
                <p className="genplan__quote">
                  «Surxondaryoning yuragi Denov bo'lsa, shu shaharning yuragi — <em>Yangi Denov</em>»
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* To'lov */}
        <section className="section section--cream" id="tolov">
          <div className="container">
            <div className="section__head">
              <Reveal>
                <span className="eyebrow">To'lov shartlari</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Uy olish hech qachon <em>bunchalik oson</em> bo'lmagan
                </h2>
              </Reveal>
            </div>
            <div className="pay">
              <Reveal className="pay__card pay__card--main">
                <span className="tag tag--gold">Oktabr aksiyasi</span>
                <p>Boshlang'ich to'lov</p>
                <b className="big-num">
                  <Counter value={29000000} />
                </b>
                <em>so'm</em>
                <div className="pay__pills">
                  <span>Istalgan qavat</span>
                  <span>60 oygacha to'lov</span>
                </div>
                <LeadButton source="Oktabr aksiyasi" className="btn btn--gold btn--block btn--shine">
                  Aksiyadan foydalanish
                </LeadButton>
              </Reveal>

              <Reveal delay={0.1} className="pay__card pay__card--teacher">
                <span className="tag tag--green">Ta'lim xodimlari uchun</span>
                <h3>Qadrli ustoz, bu taklif — siz uchun</h3>
                <ul className="offer">
                  <li>
                    Istalgan qavatdan <b>boshlang'ich to'lovsiz</b>
                  </li>
                  <li>
                    1 xonali — oyiga <b>2,5 mln</b> · 2 xonali — <b>3,5 mln</b> · 3 xonali — <b>4,5 mln</b>
                  </li>
                  <li>
                    30 mln boshlang'ich to'lovga — <b>10 mln chegirma</b>
                  </li>
                  <li>
                    50 mln — <b>20 mln</b>, 70 mln — <b>30 mln chegirma</b>
                  </li>
                </ul>
                <p className="muted small">Maktab kesimida cheklangan «imtiyoz qog'ozi» bilan amal qiladi. Tugashiga:</p>
                <Countdown until="2026-11-05T23:59:00+05:00" />
              </Reveal>

              <Reveal delay={0.2} className="pay__card pay__card--list">
                <h3>Hamma uchun</h3>
                <ul className="checks">
                  {payment.map((p) => (
                    <li key={p}>
                      <i aria-hidden>✓</i>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="muted small">
                  Kadastri tayyor bo'sh xonadon bo'lsa — shartnomani almashtirib, oldinroq ko'chib o'tish mumkin.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Kimlar uchun */}
        <section className="section" id="kimlar">
          <div className="container">
            <div className="section__head">
              <Reveal>
                <span className="eyebrow">Siz uchun</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Har bir orzu ortida <em>bitta sabab</em> bor
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">O'zingizni toping — Yangi Denov aynan sizning muammongizga yechim tayyorlagan.</p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Audience />
            </Reveal>
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
          <div className="container values">
            {builder.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="value">
                <span className="value__n">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="container builder__video">
            <Reveal>
              <YouTube id="fjA_p16R--U" title="Xabibullo Saidov kim?" />
            </Reveal>
          </div>
        </section>

        {/* Ishonch */}
        <section className="section" id="ishonch">
          <div className="container">
            <div className="section__head">
              <Reveal>
                <span className="eyebrow">Ishonch</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Uy olishda eng muhimi — <em>ishonch</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">
                  Bugun ijtimoiy tarmoqlarda tovlamachi va tajribasiz quruvchilar ko'p, xalq pulidan ayrilmoqda. Shuning
                  uchun shubhalanishingiz tabiiy. Mana, nega bizga ishonsa bo'ladi:
                </p>
              </Reveal>
            </div>
            <div className="trust">
              <Reveal className="trust__card trust__card--wide">
                <div className="trust__gallery">
                  {["01", "03", "05", "08", "12"].map((n) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={n} src={`/media/prezident_${n}.jpg`} alt="Prezident tashrifi" loading="lazy" />
                  ))}
                </div>
                <div className="trust__text">
                  <span className="tag tag--gold">Davlat loyihasi</span>
                  <h3>Qurilishga Prezident start bergan</h3>
                  <p>
                    Muhtaram Prezidentimiz Shavkat Mirziyoyev Surxondaryoga tashrifi chog'ida Yangi O'zbekiston massivi
                    doirasidagi loyihalar, xususan Yangi Denov qurilishiga rasman start berdilar va yakunlanish bosqichida
                    yana tashrif buyurishlarini ta'kidladilar.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08} className="trust__card">
                <span className="trust__num">Har hafta</span>
                <h3>Qurilish davlat nazorati ostida</h3>
                <p>
                  Viloyat hokimi Ulug'bek Qosimov har hafta qurilishni shaxsan nazorat qiladi. Denovdagi barcha loyihalar
                  shtabi aynan Yangi Denovda joylashgan.
                </p>
              </Reveal>
              <Reveal delay={0.16} className="trust__card trust__card--img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/hokim_nishon.jpg" alt="Davlat ko'krak nishoni topshirilishi" loading="lazy" />
                <p>
                  Loyiha ijrochi direktori Jonrid Rahmonov qurilishdagi yetakchilik uchun <b>davlat ko'krak nishoni</b>{" "}
                  bilan taqdirlandi.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Mijozlar */}
        <section className="section section--cream" id="mijozlar">
          <div className="container">
            <div className="section__head">
              <Reveal>
                <span className="eyebrow">Mijozlarimiz</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Xalq suygan insonlar <em>bizni tanladi</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">
                  San'atkorlar va ulamolar yetti o'lchab bir kesib, bizga ishonch bildirdi. Ular qatorida minglab
                  tadbirkorlar, davlat xodimlari va musofir yurtdoshlarimiz bor.
                </p>
              </Reveal>
            </div>
            <div className="clients">
              {[
                { img: "mijoz_mahmud_nomozov", name: "Mahmud Nomozov", role: "O'zbekiston xalq artisti" },
                { img: "mijoz_xosila_raximova", name: "Xosila Raximova", role: "O'zbekistonda xizmat ko'rsatgan artist" },
                { img: "mijoz_muhammadloyiq_qori", name: "Muhammadloyiq qori", role: "Mashhur ulamo" },
              ].map((c, i) => (
                <Reveal key={c.name} delay={i * 0.1} className="client">
                  <Tilt className="client__img" max={8}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/media/${c.img}.jpg`} alt={c.name} loading="lazy" />
                  </Tilt>
                  <h3>{c.name}</h3>
                  <p>{c.role}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="video-row">
              <YouTube id="-gOk_X4Jyh0" title="Yangi Denov — Surxondaryo yuragi" />
              <YouTube id="gTK16jkF724" title="Yangi Denov — Denovning yuragidagi maskan" />
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="savollar">
          <div className="container split split--faq">
            <div>
              <Reveal>
                <span className="eyebrow">Savol-javob</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h2">
                  Ko'p beriladigan <em>savollar</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead-text">Javob topmadingizmi? Telegram'da yozing — batafsil tushuntiramiz.</p>
                <a className="btn btn--green" href={site.tg} target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden><path d="M21.9 4.3 18.7 19.4c-.2 1.1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.1 1.4 11.6c-1-.3-1.1-1 .2-1.5L20.5 2.8c.9-.3 1.6.2 1.4 1.5z"/></svg>
                  {site.tgHandle}
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Faq items={faq} />
            </Reveal>
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
