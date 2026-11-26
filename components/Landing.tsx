"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import {
  ArrowRight,
  Calculator,
  ChartLine,
  Check,
  ChevronDown,
  ClipboardList,
  Globe,
  House,
  Lock,
  Mail,
  MapPin,
  Phone,
  Receipt,
  ShieldCheck,
  SlidersVertical,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { content, waLink, PHONE, SOCIAL, CONTACT_EXTRA, type Lang } from "./content";

// icons used by the feature cards and the role cards (same order as in content.ts)
const featureIcons: LucideIcon[] = [Calculator, ClipboardList, ShieldCheck, Receipt, Wallet, Globe];
const roleIcons: LucideIcon[] = [SlidersVertical, ClipboardList, House];

const heroBackground = [
  "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
  "url('/hero.png')",
  "linear-gradient(135deg, #dbeafe, #bfdbfe 55%, #93c5fd)",
].join(", ");

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

// delay helper for the hero entrance animations
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// moves the soft highlight on cards with the mouse
function track(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

// Counts from 0 up to `to` the first time it is visible.
function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (calm) {
          setValue(to);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}

export default function Landing() {
  const [lang, setLang] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const t = content[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  // header state, hero parallax and scroll progress bar
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      if (bgRef.current && !calm && y < 1400) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const navLinks: [string, string][] = [
    ["features", t.nav.features],
    ["how", t.nav.how],
    ["roles", t.nav.roles],
    ["bill", t.nav.bill],
  ];

  return (
    <div id="top" dir={dir} lang={lang} className="bg-white text-primary">
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/75 shadow-sm backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <a href="#top" className={`flex items-center gap-2 ${focus}`}>
            <Logo size={34} animated />
            <div className="leading-none">
              <div className="text-lg font-bold">Ishtirak</div>
              <div className="mt-0.5 text-xs font-semibold">اشتراك</div>
            </div>
          </a>

          <nav
            className={`hidden items-center gap-8 text-sm font-medium transition-all duration-500 md:flex ${
              scrolled ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            {navLinks.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`transition-colors hover:text-secondary ${focus}`}>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex rounded-full bg-white/70 p-1 text-xs font-semibold backdrop-blur">
              {(["en", "ar"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-3 py-1.5 transition-all duration-300 ${focus} ${
                    lang === l ? "bg-secondary text-white shadow" : "text-primary hover:bg-white"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={progressRef}
          className="h-0.5 w-full bg-tertiary"
          style={{ transform: "scaleX(0)", transformOrigin: dir === "rtl" ? "right" : "left" }}
        />
      </header>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div ref={bgRef} className="absolute inset-x-0 bottom-0 top-[-30%] will-change-transform">
          <div
            className="kenburns absolute inset-0"
            style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/60 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pt-24">
          {/* floating chips (large screens) */}
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            <div className="hero-up absolute start-6 top-[24%]" style={d(1200)}>
              <div className="float-a flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs text-slate-600">{t.hero.chipA.title}</div>
                  <div className="text-sm font-bold" dir="ltr">
                    {t.hero.chipA.value}
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-up absolute end-6 top-[40%]" style={d(1400)}>
              <div className="float-b flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary text-primary">
                  <Receipt className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs text-slate-600">{t.hero.chipB.title}</div>
                  <div className="text-sm font-bold" dir="ltr">
                    {t.hero.chipB.value}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center pb-16 text-center">
            <div className="flex items-center gap-4">
              <div className="hero-pop" style={d(100)}>
                <Logo size={72} animated />
              </div>
              <div className="hero-up text-start leading-none" style={d(300)}>
                <div className="text-5xl font-extrabold tracking-tight sm:text-6xl">Ishtirak</div>
                <div className="mt-1 text-3xl font-bold sm:text-4xl">اشتراك</div>
              </div>
            </div>

            <p className="hero-up mt-8 text-lg font-semibold sm:text-xl" style={d(500)}>
              {t.hero.tagline1}
              <br />
              {t.hero.tagline2}
            </p>
            <div className="hero-up mt-5 h-0.5 w-14 bg-secondary" style={d(650)} />

            <div className="hero-blur mt-10 w-full" style={d(750)}>
              <div className="flex flex-col gap-5 rounded-2xl bg-white/70 p-5 text-start shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-white">
                    <ChartLine className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold">{t.hero.cardTitle}</div>
                    <div className="text-sm text-slate-600">{t.hero.cardText}</div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-3">
                  <Link
                    href="/login"
                    className={`btn-shine flex flex-1 items-center justify-center whitespace-nowrap rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 sm:w-36 sm:flex-none ${focus}`}
                  >
                    {t.hero.login}
                  </Link>
                  <Link
                    href="/register"
                    className={`flex flex-1 items-center justify-center whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-lg active:scale-95 sm:w-36 sm:flex-none ${focus}`}
                  >
                    {t.hero.create}
                  </Link>
                </div>
              </div>
            </div>

            <p className="hero-up mt-4 text-sm text-slate-700" style={d(950)}>
              {t.hero.staff}{" "}
              <Link href="/login" className={`font-semibold underline underline-offset-2 ${focus}`}>
                {t.hero.staffLink}
              </Link>
            </p>

            <div className="hero-up" style={d(1100)}>
              <a
                href="#features"
                className={`mt-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-8 py-3 text-sm font-semibold backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg ${focus}`}
              >
                {t.hero.learn}
                <ChevronDown className="bounce-y h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-28">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.features.title}</h2>
          <p className="mt-4 text-lg text-slate-500">{t.features.text}</p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const FeatureIcon = featureIcons[i];
            return (
              <Reveal key={f.title} delay={(i % 3) * 90} className="h-full">
                <div
                  onMouseMove={track}
                  className="spotlight group h-full rounded-2xl bg-white p-7 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-secondary/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-secondary transition duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white">
                    <FeatureIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-500">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="scroll-mt-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">{t.how.title}</h2>
          </Reveal>
          <div className="relative mt-14">
            <Reveal className="pointer-events-none absolute inset-x-[12.5%] top-[2.6rem] hidden h-0.5 bg-slate-200 lg:block">
              <div className="line-fill h-full bg-tertiary" />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.how.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 140} className="relative z-10 h-full">
                  <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <h3 className="mt-5 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-28">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">{t.roles.title}</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.roles.items.map((r, i) => {
            const RoleIcon = roleIcons[i];
            return (
              <Reveal key={r.title} delay={i * 110} className="h-full">
                <div
                  onMouseMove={track}
                  className="spotlight spotlight-dark group h-full rounded-3xl bg-primary p-8 text-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-tertiary transition duration-300 group-hover:scale-110 group-hover:bg-tertiary group-hover:text-primary">
                    <RoleIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{r.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm text-blue-100">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-tertiary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SAMPLE BILL */}
      <section id="bill" className="scroll-mt-16 bg-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-28 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">{t.bill.title}</h2>
            <p className="mt-4 max-w-lg text-lg text-slate-500">{t.bill.text}</p>
            <ul className="mt-8 space-y-4">
              {t.bill.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
              <div className="flex items-center justify-between bg-primary px-6 py-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-white p-1">
                    <Logo size={22} />
                  </span>
                  <span className="font-semibold">Ishtirak</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="stamp flex items-center gap-1 rounded-full border border-tertiary px-3 py-1 text-xs font-semibold text-tertiary">
                    <Lock className="h-3 w-3" />
                    {t.bill.issued}
                  </span>
                  <span className="rounded-full bg-tertiary px-3 py-1 text-xs font-semibold text-primary">
                    {t.bill.badge}
                  </span>
                </div>
              </div>
              <dl className="divide-y divide-slate-100 px-6">
                {t.bill.rows.map((r, i) => (
                  <Reveal
                    key={r.label}
                    delay={300 + i * 80}
                    className="flex items-center justify-between py-3.5 text-sm"
                  >
                    <dt className="text-slate-500">{r.label}</dt>
                    <dd className="font-medium" dir="ltr">
                      {r.value}
                    </dd>
                  </Reveal>
                ))}
              </dl>
              <div className="flex items-center justify-between bg-blue-50 px-6 py-5">
                <span className="font-semibold">{t.bill.totalLabel}</span>
                <span className="text-xl font-bold text-secondary" dir="ltr">
                  <CountUp to={t.bill.totalNumber} /> {t.bill.currency}
                </span>
              </div>
              <p className="px-6 py-3 text-xs text-slate-400">{t.bill.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-20 text-center text-white">
            <div className="blob-a pointer-events-none absolute -start-24 -top-24 h-80 w-80 rounded-full bg-secondary/40 blur-3xl" />
            <div className="blob-b pointer-events-none absolute -bottom-24 -end-16 h-72 w-72 rounded-full bg-tertiary/30 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-xl text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
              <p className="mx-auto mt-4 max-w-lg text-blue-100">{t.cta.text}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className={`btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-tertiary px-8 py-3 font-semibold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 ${focus}`}
                >
                  {t.hero.create}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
                <Link
                  href="/login"
                  className={`rounded-full border border-white/40 px-8 py-3 font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-95 ${focus}`}
                >
                  {t.hero.login}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#0e2038] text-blue-100">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          {/* brand + social */}
          <div>
            <div className="flex items-center gap-3 text-white">
              <span className="rounded-xl bg-white p-1.5">
                <Logo size={34} />
              </span>
              <span className="leading-none">
                <span className="block text-xl font-bold">Ishtirak</span>
                <span className="mt-1 block text-sm font-semibold">اشتراك</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:-translate-y-1 hover:bg-tertiary hover:text-primary ${focus}`}
                >
                  {s.name === "facebook" && <FaFacebookF className="h-5 w-5" />}
                  {s.name === "instagram" && <FaInstagram className="h-5 w-5" />}
                  {s.name === "tiktok" && <FaTiktok className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* product */}
          <div>
            <h4 className="footer-title">{t.footer.product}</h4>
            <ul className="mt-6 space-y-4">
              {[
                ["features", t.footer.features],
                ["how", t.footer.how],
                ["roles", t.nav.roles],
                ["bill", t.nav.bill],
              ].map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`inline-block transition duration-300 hover:translate-x-1 hover:text-white rtl:hover:-translate-x-1 ${focus}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* account */}
          <div>
            <h4 className="footer-title">{t.footer.account}</h4>
            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/login"
                  className={`inline-block transition duration-300 hover:translate-x-1 hover:text-white rtl:hover:-translate-x-1 ${focus}`}
                >
                  {t.hero.login}
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={`inline-block transition duration-300 hover:translate-x-1 hover:text-white rtl:hover:-translate-x-1 ${focus}`}
                >
                  {t.hero.create}
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="footer-title">{t.contact.title}</h4>
            <ul className="contact-list">
              {CONTACT_EXTRA.address[lang] && (
                <li className="contact-item">
                  <MapPin />
                  <span>{CONTACT_EXTRA.address[lang]}</span>
                </li>
              )}
              {CONTACT_EXTRA.email && (
                <li>
                  <a href={`mailto:${CONTACT_EXTRA.email}`} className={`contact-item ${focus}`}>
                    <Mail />
                    <span dir="ltr">{CONTACT_EXTRA.email}</span>
                  </a>
                </li>
              )}
              <li>
                <a href={`tel:${PHONE.e164}`} className={`contact-item ${focus}`}>
                  <Phone />
                  <span dir="ltr">{PHONE.display}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 pb-20 pt-5 text-xs sm:flex-row sm:pb-5">
            <span>{t.footer.rights}</span>
            <span>{t.footer.made}</span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="hero-pop fixed bottom-5 end-5 z-50 sm:bottom-6 sm:end-6" style={d(1500)}>
        <a
          href={waLink(t.contact.message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.floatLabel}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-green-600/40 active:scale-95 ${focus}`}
        >
          <span className="wa-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
          <FaWhatsapp className="relative h-7 w-7" />
          <span
            className="pointer-events-none absolute end-full top-1/2 me-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary opacity-0 shadow-lg ring-1 ring-slate-200 transition duration-300 group-hover:opacity-100 sm:block"
            role="tooltip"
          >
            {t.contact.floatLabel}
          </span>
        </a>
      </div>
    </div>
  );
}