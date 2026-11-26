"use client";

import { useEffect, useState } from "react";
import { getCustomerBills } from "../lib/api";
import type { CustomerBill } from "../lib/types";

export default function BillsTab({
  lang = "en",
}: {
  lang?: "en" | "ar";
}) {
  const isArabic = lang === "ar";

  const t = {
    title: isArabic ? "جميع الفواتير" : "All Bills",
    all: isArabic ? "الكل" : "All",
    unpaid: isArabic ? "غير مدفوعة" : "Unpaid",
    paid: isArabic ? "مدفوعة" : "Paid",
    loading: isArabic ? "جاري تحميل الفواتير..." : "Loading bills...",
    noBills: isArabic ? "لا توجد فواتير." : "No bills found.",
    consumption: isArabic ? "الاستهلاك" : "Consumption",
    dueDate: isArabic ? "تاريخ الاستحقاق" : "Due date",
    failed: isArabic ? "فشل تحميل الفواتير." : "Failed to load bills.",
  };

  const [bills, setBills] = useState<CustomerBill[]>([]);
  const [filter, setFilter] = useState<"ALL" | "PAID" | "UNPAID">("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBills() {
      try {
        setLoading(true);
        setError("");

        const response = await getCustomerBills();
        setBills(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t.failed
        );
      } finally {
        setLoading(false);
      }
    }

    loadBills();
  }, []);

  const filteredBills = bills.filter((bill) => {
    if (filter === "ALL") return true;
    return bill.bill_status === filter;
  });

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-primary">
        {t.title}
      </h2>

      {/* FILTERS */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(["ALL", "UNPAID", "PAID"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === status
                ? "bg-secondary text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {status === "ALL"
              ? t.all
              : status === "UNPAID"
                ? t.unpaid
                : t.paid}
          </button>
        ))}
      </div>

      {/* BILLS */}
      {loading ? (
        <p className="text-sm text-slate-500">{t.loading}</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filteredBills.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">
          {t.noBills}
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold text-primary">
                  {bill.billing_period}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {t.consumption}:{" "}
                  {Number(bill.consumption_kwh).toFixed(2)} kWh
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {t.dueDate}: {bill.due_date}
                </p>
              </div>

              <div className="flex items-center justify-between gap-6 md:justify-end">
                <span className="font-bold text-primary">
                  ${Number(bill.amount).toFixed(2)}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    bill.bill_status === "PAID"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {bill.bill_status === "PAID" ? t.paid : t.unpaid}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}