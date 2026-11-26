"use client";

import { useEffect, useState } from "react";
import { getCustomerDashboard } from "../lib/api";
import type { ConsumptionItem } from "../lib/types";

export default function ConsumptionTab({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  const [data, setData] = useState<ConsumptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isArabic = lang === "ar";

  const t = {
    title: isArabic ? "الاستهلاك الشهري" : "Monthly Consumption",
    subtitle: isArabic
      ? "استهلاكك للكهرباء حسب الشهر"
      : "Your electricity consumption by month",
    loading: isArabic ? "جاري تحميل بيانات الاستهلاك..." : "Loading consumption...",
    empty: isArabic
      ? "لا توجد بيانات استهلاك متاحة حالياً."
      : "No consumption data available yet.",
    unit: isArabic
      ? "يُقاس الاستهلاك بوحدة الكيلوواط ساعة (kWh)."
      : "Consumption is measured in kWh.",
  };

  useEffect(() => {
    async function loadConsumption() {
      try {
        setLoading(true);
        setError("");

        const response = await getCustomerDashboard();
        setData(response.data.consumption);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load consumption."
        );
      } finally {
        setLoading(false);
      }
    }

    loadConsumption();
  }, []);

  const maxConsumption = Math.max(
    ...data.map((item) => Number(item.consumption_kwh)),
    1
  );

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="space-y-6"
    >
      <div>
        <p className="mb-2 text-sm font-medium text-secondary">
          {isArabic ? "استهلاك الكهرباء" : "ELECTRICITY USAGE"}
        </p>

        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          {t.title}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {t.subtitle}
        </p>
      </div>

      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-7">
        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">
            {t.loading}
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-600">
            {error}
          </p>
        ) : data.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            {t.empty}
          </p>
        ) : (
          <>
            <div className="flex h-56 items-end gap-3 overflow-x-auto pb-2 sm:gap-5">
              {data.map((item) => {
                const value = Number(item.consumption_kwh);

                const height = Math.max(
                  (value / maxConsumption) * 150,
                  4
                );

                return (
                  <div
                    key={item.period}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                  >
                    <span className="text-xs font-semibold text-primary">
                      {value.toFixed(0)}
                    </span>

                    <div
                      className="w-full max-w-16 rounded-t-xl bg-secondary transition-all duration-500"
                      style={{ height: `${height}px` }}
                    />

                    <span className="whitespace-nowrap text-xs text-slate-500">
                      {item.period}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-400">
                {t.unit}
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}