"use client";

import { useState } from "react";
import {
  House,
  ChartLine,
  Receipt,
  User,
  LogOut,
  MessageCircle,
  Zap,
} from "lucide-react";
import type { UserProfile } from "../lib/types";

type Tab = "overview" | "consumption" | "bills" | "profile";

type SidebarProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  profile: UserProfile;
  lang?: "en" | "ar";
};

export default function Sidebar({
  activeTab,
  setActiveTab,
  profile,
  lang = "en",
}: SidebarProps) {
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const isArabic = lang === "ar";

  const t = {
    tagline: isArabic ? "الكهرباء أصبحت أسهل" : "Electricity, simplified",
    customer: isArabic ? "مشترك" : "Customer",
    account: isArabic ? "حساب المشترك" : "Customer Account",
    menu: isArabic ? "القائمة" : "MENU",
    overview: isArabic ? "الرئيسية" : "Overview",
    consumption: isArabic ? "الاستهلاك" : "Consumption",
    bills: isArabic ? "الفواتير والمدفوعات" : "Bills & Payments",
    profile: isArabic ? "ملفي الشخصي" : "My Profile",
    chat: isArabic ? "تواصل مع الإدارة" : "Chat with admin",
    help: isArabic
      ? "لديك سؤال حول فاتورتك؟ نحن هنا لمساعدتك."
      : "Questions about your bill? We're here to help.",
    contact: isArabic ? "تواصل مع الإدارة" : "Contact Admin",
    logout: isArabic ? "تسجيل الخروج" : "Log out",
    logoutMessage: isArabic
      ? "خدمة تسجيل الخروج غير متصلة بعد."
      : "Logout API is not connected yet.",
  };

  const links = [
    { id: "overview" as Tab, label: t.overview, icon: House },
    { id: "consumption" as Tab, label: t.consumption, icon: ChartLine },
    { id: "bills" as Tab, label: t.bills, icon: Receipt },
    { id: "profile" as Tab, label: t.profile, icon: User },
  ];

  return (
    <aside
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex min-h-screen w-[260px] shrink-0 flex-col border-slate-200 bg-white p-5 ${
        isArabic ? "border-l" : "border-r"
      }`}
    >
      {/* BRAND */}
      <div className="mb-9 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-white shadow-sm">
          <Zap size={23} fill="currentColor" />
        </div>

        <div>
          <p className="text-lg font-bold leading-none text-primary">
            Ishtirak
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {t.tagline}
          </p>
        </div>
      </div>

      {/* CUSTOMER PROFILE */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tertiary font-bold text-primary">
          {profile.name?.charAt(0).toUpperCase() || "C"}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-primary">
            {profile.name || t.customer}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {t.account}
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <p className="mb-3 px-3 text-[11px] font-semibold tracking-widest text-slate-400">
        {t.menu}
      </p>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = activeTab === link.id;

          return (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setShowLogoutMessage(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-secondary text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              }`}
            >
              <Icon size={19} strokeWidth={2} />
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* CONTACT ADMIN */}
      <div className="mt-auto rounded-2xl bg-primary p-4 text-white">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-tertiary">
          <MessageCircle size={18} />
        </div>

        <p className="text-sm font-bold">
          {t.chat}
        </p>

        <p className="mb-4 mt-1 text-xs leading-relaxed text-blue-100">
          {t.help}
        </p>

        <a
          href="/api/public/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-tertiary py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
        >
          <MessageCircle size={16} />
          {t.contact}
        </a>
      </div>

      {/* LOGOUT */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-medium text-slate-500">
            {profile.name || t.customer}
          </span>

          <button
            onClick={() => setShowLogoutMessage((current) => !current)}
            className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-red-500 transition-colors hover:text-red-700"
          >
            <LogOut size={15} />
            {t.logout}
          </button>
        </div>

        {showLogoutMessage && (
          <p className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-red-600">
            {t.logoutMessage}
          </p>
        )}
      </div>
    </aside>
  );
}