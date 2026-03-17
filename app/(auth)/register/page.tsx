"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const { register, registerWithPhone, registerWithEmailOtp } = useAuthStore();

  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"email" | "phone" | "emailOtp">("email");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const goNext = () => {
    setError("");
    if (step === 1) {
      if (!name.trim()) { setError("Please enter your name"); return; }
      setStep(2);
    } else if (step === 2) {
      if (mode === "email" || mode === "emailOtp") {
        if (!email || !email.includes("@")) { setError("Please enter a valid email"); return; }
      }
      if (mode === "phone") {
        if (!phone || phone.length < 10) { setError("Please enter a valid number"); return; }
      }
      if (mode === "email") { setStep(3); return; }
      // Send OTP for phone / emailOtp
      setLoading(true);
      setTimeout(() => {
        setOtpTimer(30);
        setLoading(false);
        setStep(3);
        setTimeout(() => otpRefs.current[0]?.focus(), 150);
      }, 800);
    }
  };

  const goBack = () => { setError(""); setOtp(["", "", "", "", "", ""]); setStep(step - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "email") {
      if (password.length < 6) { setError("At least 6 characters"); return; }
      setLoading(true);
      setTimeout(() => { register(name, email, phone, password); router.push("/account"); }, 800);
    } else {
      if (otp.join("").length < 6) { setError("Enter the full 6-digit code"); return; }
      setLoading(true);
      setTimeout(() => {
        if (mode === "phone") registerWithPhone(name, phone);
        else registerWithEmailOtp(name, email);
        router.push("/account");
      }, 800);
    }
  };

  const handleOtpChange = (i: number, v: string) => {
    if (v.length > 1) v = v.slice(-1);
    if (v && !/^\d$/.test(v)) return;
    const n = [...otp]; n[i] = v; setOtp(n);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const inputCls = "w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors";
  const btnPrimary = "w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60";
  const slide = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: 0.2 } };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <Image src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=85" alt="Airweave" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl font-extralight leading-tight mb-3">
            Join the <span className="font-semibold italic">Airweave</span> family
          </h2>
          <p className="text-white/60">Get 10% off your first order when you sign up.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link href="/" className="text-2xl font-light tracking-[0.3em] uppercase block mb-10">Airweave</Link>

          <AnimatePresence mode="wait">
            {/* ── What's your name? ── */}
            {step === 1 && (
              <motion.div key="s1" {...slide}>
                <h1 className="text-3xl font-extralight mb-2">
                  Let&apos;s get <span className="font-semibold italic">started</span>
                </h1>
                <p className="text-neutral-500 mb-8">
                  Already have an account?{" "}
                  <Link href="/login" className="text-neutral-900 underline underline-offset-4">Sign in</Link>
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium block mb-2">What&apos;s your name?</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" autoFocus className={inputCls} onKeyDown={(e) => e.key === "Enter" && goNext()} />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-3">How would you like to sign up?</label>
                    <div className="space-y-2">
                      {([
                        ["email", "Email & Password"],
                        ["emailOtp", "Email — passwordless"],
                        ["phone", "Phone number"],
                      ] as const).map(([key, title]) => (
                        <button key={key} type="button" onClick={() => setMode(key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all cursor-pointer ${mode === key ? "border-neutral-900 bg-neutral-50 font-medium" : "border-neutral-200 text-neutral-600 hover:border-neutral-300"}`}>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${mode === key ? "border-neutral-900" : "border-neutral-300"}`}>
                            {mode === key && <span className="w-2 h-2 rounded-full bg-neutral-900" />}
                          </span>
                          {title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="button" onClick={goNext} className={btnPrimary}>Continue</button>
                </div>
              </motion.div>
            )}

            {/* ── Contact details ── */}
            {step === 2 && (
              <motion.div key="s2" {...slide}>
                <h1 className="text-3xl font-extralight mb-2">
                  Hi, <span className="font-semibold italic">{name.split(" ")[0]}</span>
                </h1>
                <p className="text-neutral-500 mb-8">
                  {mode === "phone" ? "Enter your phone number to receive a verification code." : "Enter your email address to continue."}
                </p>

                <div className="space-y-5">
                  {(mode === "email" || mode === "emailOtp") && (
                    <div>
                      <label className="text-sm font-medium block mb-2">Email address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoFocus className={inputCls} onKeyDown={(e) => e.key === "Enter" && goNext()} />
                    </div>
                  )}

                  {mode === "phone" && (
                    <div>
                      <label className="text-sm font-medium block mb-2">Phone number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-xl px-3 text-sm text-neutral-600 shrink-0"><span className="text-base">🇮🇳</span>+91</div>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98765 43210" autoFocus className={inputCls} maxLength={10} onKeyDown={(e) => e.key === "Enter" && goNext()} />
                      </div>
                    </div>
                  )}

                  {mode === "email" && (
                    <div>
                      <label className="text-sm font-medium block mb-2">Phone <span className="text-neutral-400 font-normal">(optional)</span></label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-xl px-3 text-sm text-neutral-600 shrink-0"><span className="text-base">🇮🇳</span>+91</div>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98765 43210" className={inputCls} maxLength={10} />
                      </div>
                    </div>
                  )}

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="button" onClick={goNext} disabled={loading} className={btnPrimary}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending code...</span>
                    ) : mode === "email" ? "Continue" : "Send verification code"}
                  </button>

                  <button type="button" onClick={goBack} className="w-full text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer py-2">
                    Go back
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Password or OTP ── */}
            {step === 3 && (
              <motion.div key="s3" {...slide}>
                <h1 className="text-3xl font-extralight mb-2">
                  {mode === "email" ? <>Almost <span className="font-semibold italic">there</span></> : <>Enter your <span className="font-semibold italic">code</span></>}
                </h1>
                <p className="text-neutral-500 mb-8">
                  {mode === "email"
                    ? "Choose a password to secure your account."
                    : <>We sent a 6-digit code to <span className="font-medium text-neutral-700">{mode === "phone" ? `+91 ${phone}` : email}</span></>}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === "email" ? (
                    <div>
                      <label className="text-sm font-medium block mb-2">Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" autoFocus className={`${inputCls} pr-12`} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer">
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                          )}
                        </button>
                      </div>
                      {password && (
                        <div className="mt-2 flex gap-1">
                          {[1, 2, 3, 4].map((l) => (
                            <div key={l} className={`h-1 flex-1 rounded-full transition-colors ${password.length >= l * 3 ? password.length >= 12 ? "bg-emerald-500" : password.length >= 8 ? "bg-amber-500" : "bg-red-400" : "bg-neutral-200"}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2.5 justify-center">
                        {otp.map((d, i) => (
                          <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" value={d} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKey(i, e)} className="w-12 h-14 bg-neutral-50 border border-neutral-200 rounded-xl text-center text-lg font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all" maxLength={1} />
                        ))}
                      </div>
                      <p className="text-center text-sm">
                        {otpTimer > 0 ? (
                          <span className="text-neutral-400">Resend in {otpTimer}s</span>
                        ) : (
                          <button type="button" onClick={() => { setOtpTimer(30); setOtp(["", "", "", "", "", ""]); otpRefs.current[0]?.focus(); }} className="text-neutral-900 underline underline-offset-4 cursor-pointer">Resend code</button>
                        )}
                      </p>
                    </>
                  )}

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit" disabled={loading} className={btnPrimary}>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</span>
                    ) : "Create Account"}
                  </button>

                  <p className="text-xs text-neutral-400 text-center">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="underline">Terms</Link> &{" "}
                    <Link href="/privacy" className="underline">Privacy Policy</Link>.
                  </p>

                  <button type="button" onClick={goBack} className="w-full text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer py-2">
                    Go back
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 1 && (
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-4 text-neutral-400">or sign up with</span></div>
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
          )}
        </motion.div>
      </div>
    </main>
  );
}
