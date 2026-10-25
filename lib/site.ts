// Sayt bo'yicha barcha matn va raqamlar shu yerda — tahrirlash uchun bitta joy.

export const site = {
  name: "Yangi Denov",
  by: "by Aksaray",
  phone: "+998 99 247 62 20",
  phoneHref: "tel:+998992476220",
  // Bog'lanish uchun asosiy kanal — Telegram admin
  tg: "https://t.me/yangi_denov_admin",
  tgHandle: "@yangi_denov_admin",
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
  { href: "#xonadonlar", label: "Xonadonlar" },
  { href: "#qulayliklar", label: "Qulayliklar" },
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
};
