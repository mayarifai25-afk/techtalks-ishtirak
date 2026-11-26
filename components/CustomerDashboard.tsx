"use client";

import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import OverviewTab from "./OverviewTab";
import BillsTab from "./BillsTab";
import ConsumptionTab from "./ConsumptionTab";
import ProfileTab from "./ProfileTab";

import {
  getCurrentUser,
  getCustomerDashboard,
  getCustomerBills,
} from "@/lib/api";

import type { UserProfile } from "@/lib/types";

type Tab = "overview" | "consumption" | "bills" | "profile";
type Language = "en" | "ar";

const emptyProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  meter: "",
  plan: "",
  bill: "",
  dueDate: "",
};

const translations = {
  en: {
    portal: "CUSTOMER PORTAL",
    welcome: "Welcome to your Ishtirak account.",
    greeting: ["Good morning", "Good afternoon", "Good evening"],
    customer: "Customer",
    dateLocale: "en-GB",
    language: "العربية",
    loading: "Loading your information...",
    footer: "All rights reserved.",
    overview: "Overview",
    consumption: "Consumption",
    bills: "Bills",
    profile: "My Profile",
    dashboard: "Customer Dashboard",
  },
  ar: {
    portal: "بوابة المشترك",
    welcome: "أهلاً بك في حسابك في اشتراك.",
    greeting: ["صباح الخير", "مساء الخير", "مساء الخير"],
    customer: "المشترك",
    dateLocale: "ar-LB",
    language: "English",
    loading: "جاري تحميل معلوماتك...",
    footer: "جميع الحقوق محفوظة.",
    overview: "نظرة عامة",
    consumption: "الاستهلاك",
    bills: "الفواتير",
    profile: "ملفي الشخصي",
    dashboard: "لوحة تحكم المشترك",
  },
};

export default function CustomerDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [lang, setLang] = useState<Language>("en");
  const [hour, setHour] = useState(12);
  const [today, setToday] = useState("");
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [currentYear, setCurrentYear] = useState<number | null>(null);

  const t = translations[lang];
  const isArabic = lang === "ar";

  useEffect(() => {
    setHour(new Date().getHours());
  }, []);
useEffect(() => {
  setCurrentYear(new Date().getFullYear());
}, []);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(t.dateLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    );
  }, [lang, t.dateLocale]);

  useEffect(() => {
    async function loadCustomerData() {
      try {
        setLoading(true);
        setError("");

        const [userResponse, dashboardResponse, billsResponse] =
          await Promise.all([
            getCurrentUser(),
            getCustomerDashboard(),
            getCustomerBills(),
          ]);

        const user = userResponse.data;
        const dashboard = dashboardResponse.data;

        const currentBill = billsResponse.data.find(
          (bill) => bill.bill_status === "UNPAID"
        );

        setProfile({
          name: user.name,
          email: "",
          phone: "",
          address: "",
          meter: dashboard.meter.meter_number,
          plan: dashboard.subscription.tariff_name,
          bill: `$${Number(
            currentBill?.amount ?? dashboard.unpaid_balance
          ).toFixed(2)}`,
          dueDate: currentBill?.due_date ?? "No due date",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load customer information."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCustomerData();
  }, []);

  const greetingIndex = hour < 12 ? 0 : hour < 18 ? 1 : 2;

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      lang={lang}
      className="min-h-screen bg-slate-50 md:flex"
    >
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen">
        <Sidebar
          activeTab={tab}
          setActiveTab={setTab}
          profile={profile}
          lang={lang}
        />
      </div>

      {/* MOBILE HEADER */}
      <div className="border-b border-slate-200 bg-white p-4 md:hidden">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white">
            <span className="text-xl">⚡</span>
          </div>

          <div>
            <p className="font-bold text-primary">Ishtirak</p>
            <p className="text-xs text-slate-400">
              {t.dashboard}
            </p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {([
            { id: "overview", label: t.overview },
            { id: "consumption", label: t.consumption },
            { id: "bills", label: t.bills },
            { id: "profile", label: t.profile },
          ] as { id: Tab; label: string }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                tab === item.id
                  ? "bg-secondary text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 md:px-8 md:py-8 lg:px-10">
        {/* TOP BAR */}
        <div className="mb-7 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">
              {today || " "}
            </p>

            <p className="mt-1 text-xs font-medium text-secondary">
              {t.portal}
            </p>
          </div>

          <button
            onClick={() =>
              setLang((current) =>
                current === "en" ? "ar" : "en"
              )
            }
            className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-slate-50"
          >
            {t.language}
          </button>
        </div>

        {/* GREETING */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            {t.greeting[greetingIndex]}، {profile.name || t.customer} 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t.welcome}
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">
              {t.loading}
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl bg-white p-5 ring-1 ring-red-100">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="min-w-0">
            {tab === "overview" && (
              <OverviewTab profile={profile} lang={lang} />
            )}

            {tab === "consumption" && (
              <ConsumptionTab lang={lang} />
            )}

            {tab === "bills" && (
              <BillsTab lang={lang} />
            )}

            {tab === "profile" && (
              <ProfileTab
                profile={profile}
                setProfile={setProfile}
                lang={lang}
              />
            )}
          </div>
        )}

        <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400">
         ©️ {currentYear ?? ""} Ishtirak. {t.footer}
        </footer>
      </main>
    </div>
  );
}