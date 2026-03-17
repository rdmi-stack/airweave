"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-light">
            We&apos;d Love to <span className="font-semibold">Hear From You</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-700 block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Subject
                </label>
                <select className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors">
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Returns & Exchange</option>
                  <option>Size Help</option>
                  <option>Bulk Orders</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-neutral-900 text-white py-4 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-sm font-medium tracking-wider uppercase mb-4">
                Quick Support
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Most queries are resolved within 4 hours during business hours.
                For urgent order issues, WhatsApp us for the fastest response.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
                  label: "Email",
                  value: "hello@airweave.in",
                },
                {
                  icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
                  label: "WhatsApp",
                  value: "+91 98765 43210",
                },
                {
                  icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                  label: "Hours",
                  value: "Mon–Sat, 10am–7pm IST",
                },
                {
                  icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
                  label: "Office",
                  value: "Bandra West, Mumbai 400050",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="bg-neutral-50 rounded-2xl p-6">
              <h3 className="font-medium mb-4">Common Questions</h3>
              <div className="space-y-4 text-sm">
                {[
                  { q: "How long does delivery take?", a: "3-5 business days across India. Same-day in Mumbai." },
                  { q: "What's your return policy?", a: "15-day easy returns. No questions asked. We cover return shipping." },
                  { q: "Do you ship internationally?", a: "Coming soon! Join our newsletter for updates." },
                ].map((faq) => (
                  <div key={faq.q}>
                    <p className="font-medium text-neutral-900">{faq.q}</p>
                    <p className="text-neutral-500 mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
