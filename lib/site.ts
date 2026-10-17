// Sayt bo'yicha barcha matn va raqamlar shu yerda — tahrirlash uchun bitta joy.

export const site = {
  name: "Yangi Denov",
  by: "by Aksaray",
  phone: "+998 99 247 62 20",
  phoneHref: "tel:+998992476220",
  phone2: "+998 78 113 77 47",
  phone2Href: "tel:+998781137747",
  address: "Denov shahri, X.Murodov ko'chasi, 58-uy («Namozgoh» mahallasi)",
  office: "Sotuv ofisi — Yangi bozor ro'parasi",
  hours: "Har kuni 9:00 dan 19:00 gacha",
  mapUrl: "https://maps.app.goo.gl/XuPp9YyYS18GUs8b6",
  telegram: "https://t.me/YangiDenov_uz",
  instagram: "https://www.instagram.com/khabib__saidov/",
  youtube: "https://www.youtube.com/@Khabib__Saidov",
};

export const nav = [
  { href: "#loyiha", label: "Loyiha" },
  { href: "#xonadonlar", label: "Xonadonlar" },
  { href: "#tolov", label: "To'lov" },
  { href: "#quruvchi", label: "Quruvchi" },
  { href: "#manzil", label: "Manzil" },
];

export const heroStats = [
  { value: 21, suffix: " ga", label: "maydon — shahar ichida yangi shahar" },
  { value: 6800, suffix: "+", label: "zamonaviy xonadon" },
  { value: 12, suffix: " qavat", label: "har podyezdda 2 tadan lift" },
  { value: 2030, prefix: "2027–", label: "bosqichma-bosqich topshirish" },
];

export const perksTicker = [
  "Boshlang'ich to'lovsiz variant",
  "Faqat bitta pasport bilan",
  "Foiz va penyalarsiz",
  "60 oygacha bo'lib to'lash",
  "Istalgan qavat",
  "Mashinaga ayirboshlash",
  "Rasmiy ish joyi shart emas",
];

export type RoomKey = 1 | 2 | 3;

export const apartments: Record<
  RoomKey,
  { title: string; area: string; range: string; monthly: string; image: string; pitch: string; rooms: string[] }
> = {
  1: {
    title: "1 xonali",
    area: "38,85",
    range: "30–56 m²",
    monthly: "2 500 000",
    image: "/media/plans/1x.jpg",
    pitch: "Yosh oila, talaba farzand yoki ijaraga berish uchun — kichik to'lov, katta qulaylik.",
    rooms: ["Oshxona-mehmonxona", "Yotoqxona", "Hammom", "Koridor", "Balkon"],
  },
  2: {
    title: "2 xonali",
    area: "61,61",
    range: "48–81 m²",
    monthly: "3 500 000",
    image: "/media/plans/2x.jpg",
    pitch: "Eng ko'p tanlanadigan format: alohida mehmonxona, yotoqxona va keng oshxona.",
    rooms: ["Mehmonxona", "Yotoqxona", "Oshxona", "Ovqatlanish zonasi", "Hammom", "Balkon"],
  },
  3: {
    title: "3 xonali",
    area: "71,14",
    range: "66–87 m²",
    monthly: "4 500 000",
    image: "/media/plans/3x.jpg",
    pitch: "Katta oila uchun: har bir farzandga o'z xonasi, mehmon kutishga keng zal.",
    rooms: ["Mehmonxona", "2 ta yotoqxona", "Oshxona", "Hammom", "Keng koridor", "Balkon"],
  },
};

export const nearby = [
  { name: "Yangi bozor", time: "1–2 daq", icon: "🛒" },
  { name: "Katta masjid", time: "2–3 daq", icon: "🕌" },
  { name: "Universitet", time: "3–4 daq", icon: "🎓" },
  { name: "Prezident maktabi", time: "5 daq", icon: "🏫" },
  { name: "Davlat idoralari", time: "5 daq", icon: "🏛️" },
  { name: "Shifoxona", time: "5 daq", icon: "🏥" },
  { name: "Savdo majmualari", time: "5 daq", icon: "🛍️" },
  { name: "Maktab va bog'chalar", time: "5 daq", icon: "🧸" },
];

export const inside = [
  "Davlat va xususiy maktablar",
  "Davlat va xususiy bog'chalar",
  "Xususiy klinikalar",
  "Ko'ngilochar maskanlar",
  "Bolalar va sport maydonchalari",
  "Yashil xiyobonlar",
];

export const perks = [
  {
    title: "Har podyezdda 2 ta lift",
    text: "12 qavatli uylarda navbat yo'q — yuqori qavatga ham bir zumda.",
    icon: "lift",
  },
  {
    title: "Bepul mehmon kutish xonasi",
    text: "Har podyezdning 1-qavatida. To'y-hasham va oilaviy tadbirlar uchun — bepul.",
    icon: "guests",
  },
  {
    title: "Elektr xarajatining 50% i davlatdan",
    text: "Uy to'liq elektrga moslashtirilgan, shuning uchun to'lovning yarmini davlat qoplaydi.",
    icon: "bolt",
  },
  {
    title: "Premium ekoplit fasad",
    text: "Yozda salqin, qishda iliq. Energiya xarajati keskin kamayadi.",
    icon: "facade",
  },
  { title: "Quyosh panellari", text: "Tejamkor va ekologik toza energiya tizimi.", icon: "sun" },
  { title: "50 tonnalik zahira suv", text: "Issiq va sovuq suv uzilishlarsiz — har doim.", icon: "drop" },
  { title: "VIP internet", text: "Har bir xonadonga yuqori tezlikdagi internet.", icon: "wifi" },
  { title: "Markaziy kanalizatsiya", text: "Shahar tizimiga ulangan zamonaviy kommunikatsiya.", icon: "pipe" },
];

export const payment = [
  "Muddatli to'lov — 60 oygacha",
  "Boshlang'ich to'lovsiz variant",
  "Bitta pasport bilan, rasmiy ish joyisiz",
  "Foiz va penyalarsiz",
  "Mashinaga ayirboshlash mumkin",
  "Kredit tarixi ahamiyatsiz",
];

export const audiences = [
  {
    key: "musofir",
    name: "Chet eldagi yurtdoshlar",
    pain: "Rossiyada yillab mehnat qilib pul yig'asiz, lekin inflyatsiya uni yeydi, ishonchsiz quruvchidan esa qo'rqasiz.",
    solutions: [
      "Faqat pasport bilan — qo'shimcha hujjatlarsiz",
      "Istalgan boshlang'ich to'lov, oylik to'lov sizga moslab",
      "Uy narxi o'sib boradi — yig'gan pulingiz qadr topadi",
    ],
  },
  {
    key: "davlat",
    name: "Davlat xodimlari",
    pain: "Ishga har kuni uzoqdan qatnaysiz, birdaniga katta pul to'lashga maosh yetmaydi.",
    solutions: [
      "Boshlang'ich to'lovsiz, oylik to'lov maoshingizga mos",
      "Davlat idoralari 5 daqiqalik piyoda masofada",
      "Subsidiya bo'lsa — qolgan to'lovni u orqali qoplash mumkin",
    ],
  },
  {
    key: "tadbirkor",
    name: "Tadbirkor va savdogarlar",
    pain: "Aylanmadan ortgan pul inflyatsiyadan qadrsizlanadi, aktiv biznesga yana kuch sarflash charchatadi.",
    solutions: [
      "Yangi O'zbekiston massivida — narx boshqa hududlardan tez o'sadi",
      "Ijaraga berib, passiv daromad olish",
      "Foiz va penyalarsiz, bitta pasport bilan",
    ],
  },
  {
    key: "oila",
    name: "Yosh oilalar",
    pain: "Katta xonadonda sig'ishmaysiz, yangi uyga birdaniga pul to'plash esa yillar oladi.",
    solutions: [
      "Uzoq muddatga foizsiz bo'lib to'lash",
      "Maktab, bog'cha va klinika — majmuaning o'zida",
      "Kadastri tayyor uyga erta ko'chib o'tish imkoni",
    ],
  },
  {
    key: "ayollar",
    name: "Yolg'iz onalar",
    pain: "Ota uyiga sig'maysiz, ijarada yashaysiz, uy olishga esa katta mablag' yo'q.",
    solutions: [
      "Boshlang'ich to'lovsiz va uzoq muddatli variant",
      "Subsidiya bo'yicha bepul maslahat",
      "Farzandlaringiz maktabi va bog'chasi — ko'z oldingizda",
    ],
  },
  {
    key: "hudud",
    name: "Chekka hududdagilar va kelajak uchun",
    pain: "Farzandlar universitetda o'qishi, qulay hayot uchun markazda uy kerak — lekin birdaniga imkon yo'q.",
    solutions: [
      "Denovning eng markaziy nuqtasi — hammasi piyoda masofada",
      "5 yilgacha bo'lib to'lash",
      "Farzand yoki nevaraga kelajak uchun investitsiya",
    ],
  },
];

export const builder = {
  name: "Xabibullo Saidov",
  role: "«Aksaray» qurilish kompaniyasi asoschisi",
  nick: "Surxondaryo bo'ylab — Habib aka, Denovda — Hoji aka",
  stats: [
    { value: 20, suffix: "+ yil", label: "tadbirkorlik tajribasi" },
    { value: 8, suffix: " yil", label: "qurilish tajribasi" },
    { value: 500, suffix: "+", label: "doimiy xodim" },
    { value: 140, suffix: "K", label: "Instagram'da kuzatuvchi" },
  ],
  projects: ["Kislorod House", "Fresh House", "Do'rmon House", "Guliston «Soy bo'yi»", "Ishonch TJM", "Boysun «Yangi O'zbekiston»"],
  values: [
    { title: "Halollik foydadan ustun", text: "Mijoz, hamkor va xodimning haqi har qanday nomaqbul foydadan ustun." },
    { title: "Mijozlar manfaati", text: "Har bir taklif va tashabbus avvalo mijoz manfaati ustiga quriladi." },
    { title: "Mas'uliyat", text: "Berilgan har bir va'da va uning oqibatini jiddiy his qilamiz." },
  ],
};

export const faq = [
  {
    q: "Uy olish uchun qanday hujjatlar kerak?",
    a: "Faqat pasport. Rasmiy ish joyi, ma'lumotnoma yoki kafil talab qilinmaydi, kredit tarixingiz ham ahamiyatsiz.",
  },
  {
    q: "Boshlang'ich to'lovsiz olish mumkinmi?",
    a: "Ha. Boshlang'ich to'lovsiz variant mavjud. Boshlang'ich to'lov qilsangiz, uy narxidan chegirma olasiz: masalan, ta'lim xodimlari uchun 30 mln to'lovga 10 mln, 50 mln to'lovga 20 mln chegirma amal qiladi.",
  },
  {
    q: "To'lovni kechiktirsam foiz yoki penya qo'shiladimi?",
    a: "Yo'q. Hech qanday foiz va penya hisoblanmaydi. Narx shartnomada qat'iy belgilanadi.",
  },
  {
    q: "Uylar qachon topshiriladi?",
    a: "Bloklar 2027–2030 yillar oralig'ida bosqichma-bosqich topshiriladi. Qurilishi yakunlangan, kadastri tayyor bo'sh xonadon bo'lsa, shartnomangizni unga almashtirib, oldinroq ko'chib o'tishingiz mumkin — to'lovlar o'z vaqtida bo'lsa va qarzdorlik bo'lmasa.",
  },
  {
    q: "Loyihaga ishonsa bo'ladimi?",
    a: "Yangi Denov qurilishiga Prezident Shavkat Mirziyoyev rasman start bergan. Viloyat hokimi har hafta qurilishni nazorat qiladi, Denovdagi boshqa loyihalarning umumiy shtabi aynan shu yerda joylashgan.",
  },
  {
    q: "Uyni ko'rish mumkinmi?",
    a: "Albatta. Sotuv ofisimiz Yangi bozor ro'parasida, har kuni 9:00–19:00. Ariza qoldiring — mutaxassis qulay vaqtni kelishib, sizni qurilish maydoniga olib boradi.",
  },
];
