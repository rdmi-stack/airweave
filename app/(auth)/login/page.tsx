"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithPhone, loginWithEmailOtp } = useAuthStore();
  const [mode, setMode] = useState<"email" | "phone" | "emailOtp">("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  const switchMode = (m: typeof mode) => { setMode(m); setOtpSent(false); setOtp(["", "", "", "", "", ""]); setError(""); setLoading(false); };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setTimeout(() => { login(email, password); router.push("/account"); }, 800);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "phone" && (!phone || phone.length < 10)) { setError("Please enter a valid 10-digit phone number"); return; }
    if (mode === "emailOtp" && (!otpEmail || !otpEmail.includes("@"))) { setError("Please enter a valid email address"); return; }
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setOtpTimer(30); setLoading(false); setTimeout(() => otpRefs.current[0]?.focus(), 100); }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.join("").length < 6) { setError("Please enter the full 6-digit OTP"); return; }
    setLoading(true);
    setTimeout(() => {
      if (mode === "phone") loginWithPhone(phone);
      else loginWithEmailOtp(otpEmail);
      router.push("/account");
    }, 800);
  };

  const otpTarget = mode === "phone" ? `+91 ${phone}` : otpEmail;

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <Image src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=85" alt="Airweave" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl font-extralight leading-tight mb-3">
            Welcome back to <span className="font-semibold italic">Airweave</span>
          </h2>
          <p className="text-white/60">Premium linen, effortless style.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="text-2xl font-light tracking-[0.3em] uppercase block mb-10">Airweave</Link>

          <h1 className="text-3xl font-extralight mb-2">
            Sign <span className="font-semibold italic">In</span>
          </h1>
          <p className="text-neutral-500 mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-neutral-900 underline underline-offset-4">Create one</Link>
          </p>

          <AnimatePresence mode="wait">
            {/* ── Email + Password (default) ── */}
            {mode === "email" && (
              <motion.div key="email" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium block mb-2">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Password</label>
                      <Link href="/forgot-password" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">Forgot password?</Link>
                    </div>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors pr-12" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</span>
                    ) : "Sign In"}
                  </button>
                </form>

                {/* Alternative sign-in methods */}
                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                  <button onClick={() => switchMode("emailOtp")} className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors cursor-pointer">
                    Sign in with Email OTP
                  </button>
                  <span className="text-neutral-300">|</span>
                  <button onClick={() => switchMode("phone")} className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors cursor-pointer">
                    Sign in with Phone
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Phone OTP ── */}
            {mode === "phone" && (
              <motion.div key="phone" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium block mb-2">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-xl px-3 text-sm text-neutral-600 shrink-0"><span className="text-base">🇮🇳</span>+91</div>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98765 43210" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors" maxLength={10} />
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60">
                      {loading ? (
                        <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending OTP...</span>
                      ) : "Send OTP"}
                    </button>
                    <p className="text-xs text-neutral-400 text-center">We&apos;ll send a 6-digit code to your phone</p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">OTP sent to <span className="font-medium text-neutral-900">{otpTarget}</span></p>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]); setError(""); }} className="text-xs text-neutral-500 underline underline-offset-2 cursor-pointer">Change number</button>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-3">Enter OTP</label>
                      <div className="flex gap-2.5 justify-center">
                        {otp.map((digit, i) => (
                          <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} className="w-12 h-14 bg-neutral-50 border border-neutral-200 rounded-xl text-center text-lg font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all" maxLength={1} />
                        ))}
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60">
                      {loading ? (
                        <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying...</span>
                      ) : "Verify & Sign In"}
                    </button>
                    <p className="text-center text-sm">
                      {otpTimer > 0 ? <span className="text-neutral-400">Resend OTP in {otpTimer}s</span> : (
                        <button type="button" onClick={() => { setOtpTimer(30); setOtp(["", "", "", "", "", ""]); otpRefs.current[0]?.focus(); }} className="text-neutral-900 underline underline-offset-4 cursor-pointer">Resend OTP</button>
                      )}
                    </p>
                  </form>
                )}

                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                  <button onClick={() => switchMode("email")} className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors cursor-pointer">
                    Sign in with Password
                  </button>
                  <span className="text-neutral-300">|</span>
                  <button onClick={() => switchMode("emailOtp")} className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors cursor-pointer">
                    Sign in with Email OTP
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Email OTP ── */}
            {mode === "emailOtp" && (
              <motion.div key="emailOtp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium block mb-2">Email Address</label>
                      <input type="email" value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors" />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60">
                      {loading ? (
                        <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending OTP...</span>
                      ) : "Send OTP"}
                    </button>
                    <p className="text-xs text-neutral-400 text-center">We&apos;ll send a 6-digit code to your email</p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">OTP sent to <span className="font-medium text-neutral-900">{otpTarget}</span></p>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]); setError(""); }} className="text-xs text-neutral-500 underline underline-offset-2 cursor-pointer">Change email</button>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-3">Enter OTP</label>
                      <div className="flex gap-2.5 justify-center">
                        {otp.map((digit, i) => (
                          <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)} className="w-12 h-14 bg-neutral-50 border border-neutral-200 rounded-xl text-center text-lg font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all" maxLength={1} />
                        ))}
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60">
                      {loading ? (
                        <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying...</span>
                      ) : "Verify & Sign In"}
                    </button>
                    <p className="text-center text-sm">
                      {otpTimer > 0 ? <span className="text-neutral-400">Resend OTP in {otpTimer}s</span> : (
                        <button type="button" onClick={() => { setOtpTimer(30); setOtp(["", "", "", "", "", ""]); otpRefs.current[0]?.focus(); }} className="text-neutral-900 underline underline-offset-4 cursor-pointer">Resend OTP</button>
                      )}
                    </p>
                  </form>
                )}

                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                  <button onClick={() => switchMode("email")} className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors cursor-pointer">
                    Sign in with Password
                  </button>
                  <span className="text-neutral-300">|</span>
                  <button onClick={() => switchMode("phone")} className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors cursor-pointer">
                    Sign in with Phone
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-4 text-neutral-400">or continue with</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-3 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-neutral-200 rounded-xl py-3 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
