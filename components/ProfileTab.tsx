"use client";

import { useState } from "react";
import {
  updateCustomerContact,
  verifyCustomerContact,
} from "../lib/api";
import type { UserProfile } from "../lib/types";

export default function ProfileTab({
  profile,
  setProfile,
  lang = "en",
}: {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  lang?: "en" | "ar";
}) {
  const isArabic = lang === "ar";

  const t = {
    title: isArabic ? "الملف الشخصي" : "Profile",
    fullName: isArabic ? "الاسم الكامل" : "Full Name",
    phone: isArabic ? "رقم الهاتف" : "Phone Number",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    address: isArabic ? "العنوان" : "Address",
    update: isArabic ? "تحديث معلومات الاتصال" : "Update Contact",
    sending: isArabic ? "جاري الإرسال..." : "Sending...",
    verification: isArabic ? "رمز التحقق" : "Verification Code",
    placeholder: isArabic ? "أدخلي رمز التحقق" : "Enter OTP code",
    verify: isArabic ? "تحقق من الرمز" : "Verify Code",
    verifying: isArabic ? "جاري التحقق..." : "Verifying...",
    enterContact: isArabic
      ? "أدخلي رقم الهاتف أو البريد الإلكتروني."
      : "Enter a phone number or email address.",
    changeContact: isArabic
      ? "يرجى تغيير رقم الهاتف أو البريد الإلكتروني أولاً."
      : "Please change your phone number or email first.",
    codeSent: isArabic
      ? "تم إرسال رمز التحقق. يرجى التحقق من هاتفك أو بريدك الإلكتروني."
      : "Verification code sent. Please check your phone or email.",
    updated: isArabic
      ? "تم تحديث معلومات الاتصال بنجاح."
      : "Your contact information has been updated successfully.",
    enterCode: isArabic
      ? "يرجى إدخال رمز التحقق."
      : "Please enter the verification code.",
    sendFailed: isArabic
      ? "فشل إرسال رمز التحقق."
      : "Failed to send verification code.",
    verifyFailed: isArabic
      ? "فشل التحقق من الرمز."
      : "Verification failed.",
  };

  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [code, setCode] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function sendCode() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (!phone.trim() && !email.trim()) {
        setError(t.enterContact);
        return;
      }

      if (phone === profile.phone && email === profile.email) {
        setError(t.changeContact);
        return;
      }

      await updateCustomerContact({
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
      });

      setWaitingForCode(true);
      setMessage(t.codeSent);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.sendFailed);
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      if (!code.trim()) {
        setError(t.enterCode);
        return;
      }

      await verifyCustomerContact({ code: code.trim() });

      setProfile({
        ...profile,
        phone,
        email,
        address,
      });

      setWaitingForCode(false);
      setCode("");
      setMessage(t.updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.verifyFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200 max-w-lg"
    >
      <h2 className="text-2xl font-bold text-primary mb-6">
        {t.title}
      </h2>

      <div className="mb-4">
        <label className="text-sm text-slate-500">{t.fullName}</label>
        <input
          value={profile.name}
          readOnly
          className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 bg-slate-100"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-slate-500">{t.phone}</label>
        <input
          type="tel"
          value={phone}
          disabled={waitingForCode || loading}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 disabled:bg-slate-100"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-slate-500">{t.email}</label>
        <input
          type="email"
          value={email}
          disabled={waitingForCode || loading}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1 disabled:bg-slate-100"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-slate-500">{t.address}</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1"
        />
      </div>

      {!waitingForCode ? (
        <button
          onClick={sendCode}
          disabled={loading}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium disabled:opacity-50"
        >
          {loading ? t.sending : t.update}
        </button>
      ) : (
        <div className="mt-4">
          <label className="text-sm text-slate-500">{t.verification}</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t.placeholder}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 mt-1"
          />
          <button
            onClick={verifyCode}
            disabled={loading}
            className="bg-primary text-white px-5 py-2.5 rounded-xl mt-3 font-medium disabled:opacity-50"
          >
            {loading ? t.verifying : t.verify}
          </button>
        </div>
      )}

      {message && (
        <p className="text-green-600 mt-3 text-sm">{message}</p>
      )}

      {error && (
        <p className="text-red-600 mt-3 text-sm">{error}</p>
      )}
    </div>
  );
}