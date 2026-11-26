"use client";

import { useEffect, useState } from "react";
import {
  getCustomerDashboard,
  getCustomerBills,
} from "../lib/api";
import type {
  UserProfile,
  CustomerDashboard,
  CustomerBill,
} from "../lib/types";

export default function OverviewTab({
  profile,
  lang = "en",
}: {
  profile: UserProfile;
  lang?: "en" | "ar";
}) {
  const isArabic = lang === "ar";

  const t = {
    dashboard: isArabic ? "لوحة تحكم المشترك" : "CUSTOMER DASHBOARD",
    overview: isArabic ? "نظرة عامة" : "Your Overview",
    description: isArabic
      ? "إليك ملخص اشتراك الكهرباء واستهلاكك."
      : "Here is a summary of your electricity subscription and usage.",
    unpaid: isArabic ? "الرصيد غير المدفوع" : "Unpaid Balance",
    totalUnpaid: isArabic ? "إجمالي الفواتير غير المدفوعة" : "Total unpaid bills",
    meter: isArabic ? "عداد الكهرباء" : "Electricity Meter",
    plan: isArabic ? "خطة الاشتراك" : "Subscription Plan",
    consumption: isArabic ? "الاستهلاك الشهري" : "Monthly Consumption",
    consumptionDescription: isArabic
      ? "تابع استهلاك الكهرباء مع مرور الوقت."
      : "Track your electricity usage over time.",
    noConsumption: isArabic
      ? "لا توجد بيانات استهلاك متاحة."
      : "No consumption data available.",
    tariff: isArabic ? "معلومات التعرفة" : "Tariff Information",
    tariffDescription: isArabic
      ? "تفاصيل أسعار الكهرباء الحالية."
      : "Details of your current electricity rates.",
    price: isArabic ? "السعر لكل كيلوواط ساعة" : "Price per kWh",
    fixedFee: isArabic ? "الرسوم الشهرية الثابتة" : "Fixed Monthly Fee",
    history: isArabic ? "سجل الفواتير" : "Billing History",
    historyDescription: isArabic
      ? "راجع فواتير الكهرباء الأخيرة."
      : "Review your recent electricity bills.",
    noBills: isArabic ? "لا توجد فواتير متاحة." : "No bills available.",
    billId: isArabic ? "رقم الفاتورة" : "Bill ID",
    paid: isArabic ? "مدفوعة" : "PAID",
    unpaidStatus: isArabic ? "غير مدفوعة" : "UNPAID",
    loading: isArabic ? "جاري تحميل البيانات..." : "Loading your overview...",
    noDashboard: isArabic
      ? "لا توجد معلومات متاحة للوحة التحكم."
      : "No dashboard information available.",
    failed: isArabic ? "فشل تحميل لوحة التحكم." : "Failed to load overview.",
  };

  const [dashboard, setDashboard] =
    useState<CustomerDashboard | null>(null);

  const [bills, setBills] = useState<CustomerBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOverview() {
      try {
        setLoading(true);
        setError("");

        const [dashboardResponse, billsResponse] =
          await Promise.all([
            getCustomerDashboard(),
            getCustomerBills(),
          ]);

        setDashboard(dashboardResponse.data);
        setBills(billsResponse.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t.failed
        );
      } finally {
        setLoading(false);
      }
    }

    loadOverview();
  }, []);

  if (loading) {
    return (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200"
      >
        <p className="text-sm text-slate-500">{t.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="rounded-2xl bg-white p-6 ring-1 ring-red-100"
      >
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
      >
        <p className="text-slate-500">{t.noDashboard}</p>
      </div>
    );
  }

  const maxConsumption = Math.max(
    ...dashboard.consumption.map((item) =>
      Number(item.consumption_kwh)
    ),
    1
  );

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="space-y-7">
      <div>
        <p className="mb-2 text-sm font-medium text-secondary">
          {t.dashboard}
        </p>

        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          {t.overview}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {t.description}
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-secondary">
            <span className="text-xl font-bold">$</span>
          </div>

          <p className="text-sm text-slate-500">{t.unpaid}</p>

          <p className="mt-2 text-2xl font-bold text-primary">
            ${Number(dashboard.unpaid_balance).toFixed(2)}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {t.totalUnpaid}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <span className="text-xl">⚡</span>
          </div>

          <p className="text-sm text-slate-500">{t.meter}</p>

          <p className="mt-2 break-all text-xl font-bold text-primary">
            {dashboard.meter.meter_number}
          </p>

          <p className="mt-1 text-xs font-medium text-green-600">
            {dashboard.meter.meter_status}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <span className="text-xl">✦</span>
          </div>

          <p className="text-sm text-slate-500">{t.plan}</p>

          <p className="mt-2 text-xl font-bold text-primary">
            {dashboard.subscription.tariff_name}
          </p>

          <p className="mt-1 text-xs font-medium text-green-600">
            {dashboard.subscription.subscription_status}
          </p>
        </div>
      </div>

      {/* MONTHLY CONSUMPTION */}
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm md:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary">
            {t.consumption}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {t.consumptionDescription}
          </p>
        </div>

        {dashboard.consumption.length === 0 ? (
          <p className="text-sm text-slate-500">
            {t.noConsumption}
          </p>
        ) : (
          <div className="space-y-5">
            {dashboard.consumption.map((item) => (
              <div key={item.period}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-600">
                    {item.period}
                  </span>

                  <span className="text-sm font-semibold text-primary">
                    {Number(item.consumption_kwh).toFixed(2)} kWh
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-secondary transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (Number(item.consumption_kwh) /
                          maxConsumption) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TARIFF INFORMATION */}
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm md:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary">
            {t.tariff}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {t.tariffDescription}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-b border-slate-100 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500">
            {t.price}
          </span>

          <span className="font-semibold text-primary">
            ${Number(
              dashboard.subscription.price_per_kwh
            ).toFixed(4)}
          </span>
        </div>

        <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-slate-500">
            {t.fixedFee}
          </span>

          <span className="font-semibold text-primary">
            ${Number(
              dashboard.subscription.fixed_fee
            ).toFixed(2)}
          </span>
        </div>
      </section>

      {/* BILLING HISTORY */}
      <section className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm md:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-primary">
            {t.history}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {t.historyDescription}
          </p>
        </div>

        {bills.length === 0 ? (
          <p className="text-sm text-slate-500">{t.noBills}</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-primary">
                    {bill.billing_period}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {t.billId}: {bill.id}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="font-semibold text-primary">
                    ${Number(bill.amount).toFixed(2)}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      bill.bill_status === "PAID"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {bill.bill_status === "PAID"
                      ? t.paid
                      : t.unpaidStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}