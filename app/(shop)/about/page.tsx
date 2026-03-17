"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
          alt="Linen field"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <p className="text-sm tracking-[0.4em] uppercase mb-4 text-white/70">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-light">
            Born From <span className="font-semibold">Indian Summers</span>
          </h1>
        </motion.div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-light mb-8">
            We Started With a <span className="font-semibold">Simple Question</span>
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            Why does premium menswear in India ignore the weather? Every summer, we found ourselves
            choosing between looking good and staying comfortable. Polyester blends that trap heat.
            Cotton that wrinkles in minutes. Fast fashion that falls apart after three washes.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            Airweave was built to solve this. We source 100% European flax linen — the same fabric
            used by luxury Italian and French houses — and craft it into designs that make sense for
            Indian weather, Indian bodies, and Indian lifestyles.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Every piece is pre-washed for softness, finished with care, and designed to get
            better with every wear. No synthetic blends. No compromises.
          </p>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            {...fadeUp}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
              alt="Sustainability"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-semibold mb-2">Sustainable by Nature</h3>
              <p className="text-white/80 max-w-sm">
                Linen requires 4x less water than cotton. It&apos;s naturally biodegradable
                and grows without pesticides.
              </p>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-semibold mb-2">Crafted With Intent</h3>
              <p className="text-white/80 max-w-sm">
                Every stitch, button, and seam is considered. We obsess over the details
                so you don&apos;t have to.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Numbers */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10,000+", label: "Happy Customers" },
            { number: "100%", label: "European Flax Linen" },
            { number: "0", label: "Synthetic Blends" },
            { number: "15", label: "Day Easy Returns" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-semibold mb-2">{stat.number}</p>
              <p className="text-neutral-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center py-10">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-light mb-6">
            Ready to <span className="font-semibold">Feel the Difference</span>?
          </h2>
          <Link
            href="/products"
            className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
