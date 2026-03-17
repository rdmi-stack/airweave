"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithPhone } = useAuthStore();
  const [mode, setMode] = useState<"email" | "phone">("email");

  // Email state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Phone state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      router.push("/account");
    }, 800);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpTimer(30);
      setLoading(false);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit OTP");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      loginWithPhone(phone);
      router.push("/account");
    }, 800);
  };

  const handleResendOtp = () => {
    setOtpTimer(30);
    setOtp(["", "", "", "", "", ""]);
    otpRefs.current[0]?.focus();
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=85"
          alt="Airweave"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl font-extralight leading-tight mb-3">
            Welcome back to <span className="font-semibold italic">Airweave</span>
          </h2>
          <p className="text-white/60">Premium linen, effortless style.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="text-2xl font-light tracking-[0.3em] uppercase block mb-10">
            Airweave
          </Link>

          <h1 className="text-3xl font-extralight mb-2">
            Sign <span className="font-semibold italic">In</span>
          </h1>
          <p className="text-neutral-500 mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-neutral-900 underline underline-offset-4">
              Create one
            </Link>
          </p>

          {/* Tab Switcher */}
          <div className="flex bg-neutral-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => { setMode("email"); setError(""); setOtpSent(false); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                mode === "email" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => { setMode("phone"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                mode === "phone" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500"
              }`}
            >
              Phone
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === "email" ? (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleEmailSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="text-sm font-medium block mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium block mb-2">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-3 text-sm text-neutral-600 shrink-0">
                          +91
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="98765 43210"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending OTP...
                        </span>
                      ) : (
                        "Send OTP"
                      )}
                    </button>

                    <p className="text-xs text-neutral-400 text-center">
                      We&apos;ll send a 6-digit verification code to your phone
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">
                        OTP sent to <span className="font-medium text-neutral-900">+91 {phone}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setOtp(["", "", "", "", "", ""]); setError(""); }}
                        className="text-xs text-neutral-500 underline underline-offset-2 cursor-pointer"
                      >
                        Change number
                      </button>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-3">Enter OTP</label>
                      <div className="flex gap-2.5 justify-center">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className="w-12 h-14 bg-neutral-50 border border-neutral-200 rounded-xl text-center text-lg font-medium focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                            maxLength={1}
                          />
                        ))}
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </button>

                    <p className="text-center text-sm">
                      {otpTimer > 0 ? (
                        <span className="text-neutral-400">Resend OTP in {otpTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-neutral-900 underline underline-offset-4 cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </p>
                  </form>
                )}
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
