"use client";

import Link from "next/link";

/* ── Inline SVG payment icons ── */

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M19.5 21h-2.7l1.7-10.5h2.7L19.5 21zm11.2-10.2c-.5-.2-1.4-.4-2.4-.4-2.7 0-4.6 1.4-4.6 3.4 0 1.5 1.3 2.3 2.4 2.8 1 .5 1.4.8 1.4 1.3 0 .7-.8 1-1.6 1-1.1 0-1.6-.2-2.5-.5l-.3-.2-.4 2.2c.6.3 1.8.5 3 .5 2.8 0 4.7-1.4 4.7-3.5 0-1.2-.7-2-2.2-2.8-.9-.5-1.5-.8-1.5-1.2 0-.4.5-.8 1.5-.8.9 0 1.5.2 2 .4l.2.1.3-2.2zm6.8-.3h-2.1c-.6 0-1.1.2-1.4.8L30 21h2.8l.6-1.5h3.5l.3 1.5H40l-2.2-10.5h-0.3zm-2.4 6.8l1.1-3 .3-.8.2.7.6 3.1h-2.2zM16.3 10.5l-2.6 7.2-.3-1.4c-.5-1.7-2-3.5-3.7-4.4l2.4 9.1h2.9l4.3-10.5h-3z" fill="#fff" />
      <path d="M11.5 10.5H7.1l0 .2c3.4.9 5.6 2.9 6.5 5.4l-.9-4.7c-.2-.7-.7-.9-1.2-.9z" fill="#F9A533" />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
      <path d="M24 10.34A7.97 7.97 0 0 1 27 16a7.97 7.97 0 0 1-3 5.66A7.97 7.97 0 0 1 21 16a7.97 7.97 0 0 1 3-5.66z" fill="#FF5F00" />
    </svg>
  );
}

function RuPayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <text x="8" y="20" fontSize="10" fontWeight="700" fill="#0072BC" fontFamily="Arial, sans-serif">Ru</text>
      <text x="22" y="20" fontSize="10" fontWeight="700" fill="#E3650D" fontFamily="Arial, sans-serif">Pay</text>
      <rect x="8" y="22" width="32" height="2" rx="1" fill="url(#rupay-grad)" />
      <defs>
        <linearGradient id="rupay-grad" x1="8" y1="23" x2="40" y2="23">
          <stop stopColor="#0072BC" />
          <stop offset="0.5" stopColor="#6DC24B" />
          <stop offset="1" stopColor="#E3650D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function UpiIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <text x="10" y="21" fontSize="13" fontWeight="700" fill="#3A3A3A" fontFamily="Arial, sans-serif">UPI</text>
      <rect x="6" y="8" width="3" height="16" rx="1" fill="#097939" />
      <rect x="39" y="8" width="3" height="16" rx="1" fill="#ED752E" />
    </svg>
  );
}

function GPayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path d="M24.5 16.5v4h-1.3v-9.9h3.5c.8 0 1.6.3 2.2.9.6.6.9 1.3.9 2.1 0 .8-.3 1.5-.9 2-.6.6-1.3.9-2.2.9h-2.2zm0-4.6v3.3h2.2c.5 0 .9-.2 1.3-.5.3-.4.5-.8.5-1.2 0-.4-.2-.8-.5-1.1-.3-.4-.8-.5-1.3-.5h-2.2z" fill="#4285F4" />
      <circle cx="14" cy="16" r="4" fill="#EA4335" />
      <circle cx="14" cy="16" r="2.5" fill="#fff" />
      <path d="M14 13.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5" fill="#FBBC05" />
      <rect x="34" y="12" width="4" height="8" rx="1" fill="#34A853" />
    </svg>
  );
}

function PhonePeIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#5F259F" />
      <path d="M18 10h3l4 7v-7h2.5v12H25l-4.5-7.5V22H18V10z" fill="#fff" />
      <circle cx="33" cy="12" r="2" fill="#fff" />
      <rect x="31.5" y="15" width="3" height="7" rx="1" fill="#fff" />
    </svg>
  );
}

function PaytmIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#00BAF2" />
      <text x="7" y="20.5" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">Paytm</text>
    </svg>
  );
}

function CodIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
      <rect width="48" height="32" rx="4" fill="#2D6A4F" />
      <text x="8.5" y="20" fontSize="9.5" fontWeight="600" fill="#fff" fontFamily="Arial, sans-serif">COD</text>
      <path d="M38 11h-3a1 1 0 00-1 1v8a1 1 0 001 1h3a1 1 0 001-1v-8a1 1 0 00-1-1zm-.5 7h-2v-5h2v5z" fill="#B7E4C7" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      {/* ── Top Highlights Bar ── */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L21.066 6.87a1.125 1.125 0 0 0-.96-.544H18M2.25 14.25V6.375c0-.621.504-1.125 1.125-1.125h11.25c.621 0 1.125.504 1.125 1.125v8.25M2.25 14.25h15" />
            </svg>
            <span className="text-xs text-white font-medium tracking-wide">Free Shipping 499+</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            <span className="text-xs text-white font-medium tracking-wide">Easy Returns</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <span className="text-xs text-white font-medium tracking-wide">Secure Payments</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span className="text-xs text-white font-medium tracking-wide">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white text-2xl font-light tracking-[0.3em] uppercase mb-4">
              Airweave
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Premium linen clothing engineered for real Indian weather.
              Breathable. Sustainable. Luxurious.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.88a8.24 8.24 0 0 0 4.79 1.53V6.96a4.83 4.83 0 0 1-1.03-.27z" /></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-white hover:text-white transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-sm font-medium tracking-wider uppercase mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products?category=Shirts" className="hover:text-white transition-colors">Shirts</Link></li>
              <li><Link href="/products?category=Trousers" className="hover:text-white transition-colors">Trousers</Link></li>
              <li><Link href="/products?category=Co-ords" className="hover:text-white transition-colors">Co-ord Sets</Link></li>
              <li><Link href="/products?category=Ethnic" className="hover:text-white transition-colors">Ethnic Wear</Link></li>
              <li><Link href="/products?category=Shorts" className="hover:text-white transition-colors">Shorts</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-medium tracking-wider uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Size Guide</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">FAQs</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bulk Orders</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-sm font-medium tracking-wider uppercase mb-5">
              Stay Connected
            </h4>
            <p className="text-sm mb-4">Subscribe for exclusive drops, early access & styling tips.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-neutral-900 border border-neutral-800 px-4 py-2.5 text-sm text-white rounded-l-full w-full focus:outline-none focus:border-neutral-600 placeholder:text-neutral-600"
              />
              <button className="bg-white text-black px-5 py-2.5 text-sm font-medium rounded-r-full hover:bg-neutral-200 transition-colors shrink-0">
                Join
              </button>
            </form>
            <p className="text-[11px] text-neutral-600 mt-3">
              No spam. Unsubscribe anytime.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="hover:text-white transition-colors cursor-pointer">hello@airweave.in</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span className="hover:text-white transition-colors cursor-pointer">+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Payment Methods ── */}
        <div className="border-t border-neutral-800 pt-8 pb-8">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4 text-center">We Accept</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <VisaIcon />
            <MastercardIcon />
            <RuPayIcon />
            <UpiIcon />
            <GPayIcon />
            <PhonePeIcon />
            <PaytmIcon />
            <CodIcon />
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; 2026 Airweave. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white transition-colors">Refund Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
