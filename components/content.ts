export type Lang = "en" | "ar";

// Contact details: change the number here and it updates everywhere.
export const PHONE = {
  e164: "+96181259629",
  wa: "96181259629",
  display: "+961 81 259 629",
};

// Social links: replace these with your real pages.
export const SOCIAL = [
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { name: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
] as const;

// Footer "Contact" column. These are EXAMPLES: replace them with your real details.
// Leave "" to hide a row.
export const CONTACT_EXTRA = {
  address: { en: "Beirut, Lebanon", ar: "بيروت، لبنان" } as Record<Lang, string>,
  email: "info@ishtirak.com",
};

export const waLink = (text: string) => `https://wa.me/${PHONE.wa}?text=${encodeURIComponent(text)}`;

const en = {
  nav: { features: "Features", how: "How it works", roles: "Roles", bill: "Sample bill" },
  hero: {
    tagline1: "Smarter Electricity Management",
    tagline2: "for a Brighter Lebanon",
    cardTitle: "For Customers",
    cardText: "Track consumption, view bills & balance",
    login: "Login",
    create: "Create Account",
    learn: "Learn More",
    staff: "Admin or collector?",
    staffLink: "Sign in here",
    chipA: { title: "Reading accepted", value: "12,600 kWh" },
    chipB: { title: "Bill issued", value: "8,344,750 LBP" },
  },
  features: {
    title: "Everything a generator needs, in one place",
    text: "Subscriptions, meter readings and monthly bills, managed in one system.",
    items: [
      {
        title: "Automatic billing",
        text: "Each bill is calculated from the meter reading: a fixed fee by amperage plus consumption × kWh price.",
      },
      {
        title: "Checked meter readings",
        text: "Collectors enter the monthly reading, and the system rejects any reading lower than the previous one.",
      },
      {
        title: "Access by role",
        text: "Admins, collectors and subscribers each get their own dashboard and see only what concerns them.",
      },
      {
        title: "Traceable bills",
        text: "Every bill is linked to the tariff and the reading it was based on, and cannot be edited once issued.",
      },
      {
        title: "Balance tracking",
        text: "Cash payments are recorded, and any unpaid amount is carried forward to the next month.",
      },
      {
        title: "Arabic and English",
        text: "Switch language at any time, with full right-to-left support.",
      },
    ],
  },
  how: {
    title: "How it works",
    steps: [
      { title: "Set the tariff", text: "The admin sets the kWh price and the fixed fee for each amperage." },
      { title: "Enter the reading", text: "The collector records each subscriber's meter reading." },
      { title: "Bill automatically", text: "The system checks the reading and calculates the bill." },
      { title: "View the bill", text: "The subscriber sees a clear bill and the balance due." },
    ],
  },
  roles: {
    title: "One platform, three roles",
    items: [
      {
        title: "Admin",
        points: ["Set tariffs", "Manage subscriptions", "Issue corrections", "Follow all bills"],
      },
      {
        title: "Collector",
        points: ["Enter monthly meter readings", "Record cash payments", "Get instant feedback on every reading"],
      },
      {
        title: "Subscriber",
        points: ["View your own bills", "See readings and consumption", "Track your balance"],
      },
    ],
  },
  bill: {
    badge: "Sample bill",
    title: "Bills your subscribers can trust",
    text: "Every bill shows how the amount was reached: previous and current meter, consumption, kWh price and fixed fee.",
    points: [
      "A reading lower than the previous one is rejected",
      "Issued bills can never be edited",
      "Each bill links to its tariff and reading",
    ],
    rows: [
      { label: "Subscriber", value: "Sample Subscriber" },
      { label: "Amperage", value: "5 A" },
      { label: "Previous reading", value: "12,450 kWh" },
      { label: "Current reading", value: "12,600 kWh" },
      { label: "Consumption", value: "150 kWh" },
      { label: "Price per kWh", value: "53,065 LBP" },
      { label: "Fixed fee", value: "385,000 LBP" },
    ],
    totalLabel: "Total",
    totalNumber: 8344750,
    currency: "LBP",
    issued: "Issued",
    note: "Illustrative figures.",
  },
  cta: {
    title: "Ready to simplify your billing?",
    text: "Replace paper notebooks and manual calculations with one clear system.",
  },
  contact: {
    title: "Contact",
    whatsapp: "WhatsApp",
    call: "Call us",
    floatLabel: "Chat with us on WhatsApp",
    message: "Hello Ishtirak, I would like to know more about your service.",
  },
  footer: {
    tagline: "Neighborhood generator billing, made simple.",
    product: "Product",
    account: "Account",
    features: "Features",
    how: "How it works",
    rights: "© 2026 Ishtirak. All rights reserved.",
    made: "Made in Lebanon",
  },
};

export type Content = typeof en;

const ar: Content = {
  nav: { features: "المزايا", how: "كيف يعمل", roles: "الأدوار", bill: "نموذج فاتورة" },
  hero: {
    tagline1: "إدارة أذكى للكهرباء",
    tagline2: "من أجل لبنان أكثر إشراقاً",
    cardTitle: "للمشتركين",
    cardText: "تابع استهلاكك واطّلع على فواتيرك ورصيدك",
    login: "تسجيل الدخول",
    create: "إنشاء حساب",
    learn: "اعرف المزيد",
    staff: "مسؤول أو محصّل؟",
    staffLink: "سجّل دخولك من هنا",
    chipA: { title: "تم قبول القراءة", value: "12,600 kWh" },
    chipB: { title: "صدرت الفاتورة", value: "8,344,750 ل.ل." },
  },
  features: {
    title: "كل ما يحتاجه المولّد في مكان واحد",
    text: "الاشتراكات وقراءات العدادات والفواتير الشهرية في نظام واحد.",
    items: [
      {
        title: "فوترة تلقائية",
        text: "تُحسب كل فاتورة من قراءة العداد: رسم ثابت حسب الأمبير + الاستهلاك × سعر الكيلوواط.",
      },
      {
        title: "قراءات عدادات مُتحقَّق منها",
        text: "يُدخل المحصّل القراءة الشهرية، ويرفض النظام أي قراءة أقل من السابقة.",
      },
      {
        title: "صلاحيات حسب الدور",
        text: "لكل من المسؤول والمحصّل والمشترك لوحته الخاصة، ولا يرى إلا ما يخصّه.",
      },
      {
        title: "فواتير قابلة للتتبّع",
        text: "كل فاتورة مرتبطة بالتعرفة والقراءة التي بُنيت عليها، ولا يمكن تعديلها بعد صدورها.",
      },
      {
        title: "متابعة الرصيد",
        text: "تُسجَّل الدفعات النقدية، ويُرحَّل أي مبلغ غير مدفوع إلى الشهر التالي.",
      },
      {
        title: "العربية والإنجليزية",
        text: "بدّل اللغة في أي وقت، مع دعم كامل للكتابة من اليمين إلى اليسار.",
      },
    ],
  },
  how: {
    title: "كيف يعمل",
    steps: [
      { title: "تحديد التعرفة", text: "يحدّد المسؤول سعر الكيلوواط والرسم الثابت لكل فئة أمبير." },
      { title: "إدخال القراءة", text: "يسجّل المحصّل قراءة عدّاد كل مشترك." },
      { title: "فوترة تلقائية", text: "يتحقّق النظام من القراءة ويحسب الفاتورة." },
      { title: "عرض الفاتورة", text: "يرى المشترك فاتورة واضحة والرصيد المستحق." },
    ],
  },
  roles: {
    title: "منصّة واحدة، ثلاثة أدوار",
    items: [
      {
        title: "المسؤول",
        points: ["تحديد التعرفة", "إدارة الاشتراكات", "إصدار التصحيحات", "متابعة جميع الفواتير"],
      },
      {
        title: "المحصّل",
        points: ["إدخال قراءات العدادات الشهرية", "تسجيل الدفعات النقدية", "ملاحظات فورية على كل قراءة"],
      },
      {
        title: "المشترك",
        points: ["عرض فواتيرك", "الاطّلاع على القراءات والاستهلاك", "متابعة رصيدك"],
      },
    ],
  },
  bill: {
    badge: "نموذج فاتورة",
    title: "فواتير يثق بها مشتركوك",
    text: "تُظهر كل فاتورة كيف وصلنا إلى المبلغ: العداد السابق والحالي، والاستهلاك، وسعر الكيلوواط، والرسم الثابت.",
    points: [
      "تُرفض أي قراءة أقل من السابقة",
      "لا يمكن تعديل الفاتورة بعد صدورها",
      "كل فاتورة مرتبطة بتعرفتها وقراءتها",
    ],
    rows: [
      { label: "المشترك", value: "مشترك تجريبي" },
      { label: "الأمبير", value: "5 A" },
      { label: "القراءة السابقة", value: "12,450 kWh" },
      { label: "القراءة الحالية", value: "12,600 kWh" },
      { label: "الاستهلاك", value: "150 kWh" },
      { label: "سعر الكيلوواط", value: "53,065 ل.ل." },
      { label: "الرسم الثابت", value: "385,000 ل.ل." },
    ],
    totalLabel: "المجموع",
    totalNumber: 8344750,
    currency: "ل.ل.",
    issued: "صادرة",
    note: "أرقام توضيحية.",
  },
  cta: {
    title: "جاهز لتبسيط فوترتك؟",
    text: "استبدل الدفاتر الورقية والحسابات اليدوية بنظام واحد واضح.",
  },
  contact: {
    title: "تواصل معنا",
    whatsapp: "واتساب",
    call: "اتصل بنا",
    floatLabel: "تواصل معنا عبر واتساب",
    message: "مرحباً، بدّي أعرف أكتر عن خدمة اشتراك.",
  },
  footer: {
    tagline: "فوترة مولّدات الحيّ، ببساطة.",
    product: "المنتج",
    account: "الحساب",
    features: "المزايا",
    how: "كيف يعمل",
    rights: "© 2026 اشتراك. جميع الحقوق محفوظة.",
    made: "صُنع في لبنان",
  },
};

export const content: Record<Lang, Content> = { en, ar };
