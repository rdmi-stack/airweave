"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProductCard from "@/app/components/ProductCard";
import { useProductStore } from "@/lib/product-store";

/* ── animation variants ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

export default function Home() {
  const products = useProductStore((s) => s.products);
  const categories = useProductStore((s) => s.categories);
  const bestSellers = products.filter((p) => p.badge === "Best Seller");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO — CINEMATIC FULL-SCREEN
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920&q=85"
            alt="Airweave hero"
            fill
            className="object-cover scale-110"
            priority
            quality={90}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-6 max-w-4xl"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeIn}>
              <span className="inline-block text-[11px] tracking-[0.5em] uppercase border border-white/30 px-5 py-2 rounded-full text-white/80">
                Summer &apos;26 Collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.8rem,8vw,7rem)] font-extralight leading-[0.95] tracking-tight"
            >
              Stay Cool.
              <br />
              <span className="font-semibold italic">Look Premium.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/70 max-w-xl mx-auto font-light leading-relaxed"
            >
              Handcrafted linen clothing engineered for the Indian climate.
              European fabric. Conscious craft. Effortless style.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4 justify-center flex-wrap pt-4">
              <Link
                href="/products"
                className="group relative bg-white text-black px-10 py-4 rounded-full text-sm font-medium tracking-wide overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Shop Collection
                </span>
                <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              </Link>
              <Link
                href="/about"
                className="group border border-white/30 text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white/10 transition-all duration-500"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE BAR
      ══════════════════════════════════════ */}
      <div className="bg-neutral-950 text-white py-3.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs tracking-[0.25em] uppercase">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <span key={i} className="flex items-center gap-16">
                <span className="text-white/80">Free Shipping Over ₹2,999</span>
                <span className="text-neutral-700">✦</span>
                <span className="text-white/80">100% European Flax Linen</span>
                <span className="text-neutral-700">✦</span>
                <span className="text-white/80">Easy 15-Day Returns</span>
                <span className="text-neutral-700">✦</span>
                <span className="text-white/80">COD Available</span>
                <span className="text-neutral-700">✦</span>
                <span className="text-white/80">Handcrafted in India</span>
                <span className="text-neutral-700">✦</span>
              </span>
            ))}
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 40s linear infinite; display: flex; width: max-content; }
        `}</style>
      </div>

      {/* ══════════════════════════════════════
          AS FEATURED IN — PRESS BAR
      ══════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-14 border-b border-neutral-100"
      >
        <motion.p
          variants={fadeIn}
          className="text-center text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-8"
        >
          As Featured In
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-6 opacity-30"
        >
          {["VOGUE", "GQ", "ELLE", "GRAZIA", "COSMOPOLITAN", "HARPER'S BAZAAR"].map(
            (name) => (
              <span
                key={name}
                className="text-lg md:text-xl font-serif tracking-wider"
              >
                {name}
              </span>
            )
          )}
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════
          EDITORIAL — SPLIT FEATURE
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-4 h-[85vh] md:h-[80vh]">
          {/* Left — tall image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            <Link
              href="/products?category=Shirts"
              className="group relative block h-full rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=85"
                alt="Shirts collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase">The Essentials</span>
                <h3 className="text-white text-3xl md:text-4xl font-light mt-2">
                  Linen <span className="font-semibold italic">Shirts</span>
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-white text-sm group-hover:gap-3 transition-all">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right — two stacked */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="flex-1"
            >
              <Link
                href="/products?category=Co-ords"
                className="group relative block h-full rounded-3xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=900&q=85"
                  alt="Co-ord sets"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase">Summer Staple</span>
                  <h3 className="text-white text-2xl font-light mt-2">
                    Co-ord <span className="font-semibold italic">Sets</span>
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-2 text-white text-sm group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="flex-1"
            >
              <Link
                href="/products?category=Ethnic"
                className="group relative block h-full rounded-3xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85"
                  alt="Ethnic wear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase">Festive Edit</span>
                  <h3 className="text-white text-2xl font-light mt-2">
                    Linen <span className="font-semibold italic">Kurtas</span>
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-2 text-white text-sm group-hover:gap-3 transition-all">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BEST SELLERS
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
            >
              Most Loved
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extralight leading-tight"
            >
              Best <span className="font-semibold italic">Sellers</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/products"
              className="group hidden md:inline-flex items-center gap-2 text-sm border-b border-neutral-300 pb-1 hover:border-neutral-900 transition-colors"
            >
              View All Products
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL-BLEED BANNER — PARALLAX
      ══════════════════════════════════════ */}
      <ParallaxBanner />

      {/* ══════════════════════════════════════
          CATEGORIES HORIZONTAL SCROLL
      ══════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
            >
              Curated For You
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extralight"
            >
              Shop by <span className="font-semibold italic">Category</span>
            </motion.h2>
          </motion.div>
        </div>
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x snap-mandatory">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="shrink-0 snap-start"
            >
              <Link
                href={`/products?category=${cat.name}`}
                className="group relative block w-[260px] md:w-[300px] aspect-[3/4] rounded-3xl overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-medium text-xl">{cat.name}</h3>
                  <p className="text-white/60 text-sm mt-1">
                    {cat.count} product{cat.count !== 1 ? "s" : ""}
                  </p>
                  <div className="mt-3 w-0 group-hover:w-full h-[1px] bg-white/50 transition-all duration-700" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      </section>

      {/* ══════════════════════════════════════
          NEW ARRIVALS — FULL WIDTH 4-COL
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
          >
            Just Landed
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extralight"
          >
            New <span className="font-semibold italic">Arrivals</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.slice(3, 7).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 bg-neutral-900 text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide overflow-hidden relative"
          >
            <span className="relative z-10">View All Products</span>
            <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          LINEN vs COTTON — WHY LINEN
      ══════════════════════════════════════ */}
      <section className="bg-[#f8f6f3] py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
            >
              The Science
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extralight"
            >
              Why <span className="font-semibold italic">Linen</span>?
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Comparison */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {[
                { label: "Breathability", linen: 95, cotton: 60, polyester: 20 },
                { label: "Moisture Wicking", linen: 90, cotton: 55, polyester: 30 },
                { label: "Sustainability", linen: 95, cotton: 50, polyester: 15 },
                { label: "Durability", linen: 85, cotton: 65, polyester: 70 },
                { label: "Temperature Regulation", linen: 92, cotton: 50, polyester: 10 },
              ].map((item) => (
                <motion.div key={item.label} variants={fadeUp}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] w-16 text-neutral-500">Linen</span>
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.linen}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-neutral-900 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] w-8 text-right font-medium">{item.linen}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] w-16 text-neutral-400">Cotton</span>
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.cotton}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                          className="h-full bg-neutral-400 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] w-8 text-right text-neutral-400">{item.cotton}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] w-16 text-neutral-300">Polyester</span>
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.polyester}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                          className="h-full bg-neutral-300 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] w-8 text-right text-neutral-300">{item.polyester}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
                  title: "3-4°C Cooler",
                  desc: "Linen keeps you noticeably cooler than cotton in Indian summers",
                },
                {
                  icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
                  title: "Gets Softer",
                  desc: "Unlike synthetic fabrics, linen improves with every wash",
                },
                {
                  icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z",
                  title: "Zero Plastic",
                  desc: "100% natural fiber — no polyester, no microplastics",
                },
                {
                  icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                  title: "4× Less Water",
                  desc: "Linen uses a fraction of the water cotton farming requires",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS — EDITORIAL
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
          >
            10,000+ Happy Customers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extralight"
          >
            What People <span className="font-semibold italic">Say</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Arjun Mehta",
              location: "Mumbai",
              text: "I've been wearing Airweave shirts through Mumbai summers and they're a game-changer. The linen breathes unlike anything I've tried before. Even my tailor was impressed by the fabric quality.",
              rating: 5,
              product: "Beige Linen Shirt",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
              verified: true,
            },
            {
              name: "Priya Sharma",
              location: "Delhi",
              text: "Got the co-ord set for my husband's birthday. The quality is insane for this price — better than brands charging 3x more. He won't wear anything else now. Ordering two more colors.",
              rating: 5,
              product: "Sand Linen Co-ord Set",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
              verified: true,
            },
            {
              name: "Rahul Verma",
              location: "Bangalore",
              text: "The olive overshirt is perfect for Bangalore weather — cool enough for afternoon sun, warm enough for evening rides. The texture is exactly what you'd expect from premium European linen.",
              rating: 5,
              product: "Charcoal Linen Overshirt",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
              verified: true,
            },
          ].map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-neutral-50 rounded-3xl p-8 flex flex-col justify-between"
            >
              {/* Stars */}
              <div>
                <div className="flex gap-1 mb-5">
                  {Array(review.rating)
                    .fill(null)
                    .map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <p className="text-neutral-600 leading-relaxed text-[15px]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-xs text-neutral-400 mt-3">
                  Purchased: {review.product}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-neutral-200">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src={review.image} alt={review.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="font-medium text-sm flex items-center gap-2">
                    {review.name}
                    {review.verified && (
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    )}
                  </p>
                  <p className="text-neutral-400 text-xs">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          INSTAGRAM LOOKBOOK
      ══════════════════════════════════════ */}
      <section className="py-24 bg-neutral-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-14 px-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-3"
          >
            @airweave.in
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extralight"
          >
            The <span className="font-semibold italic">Lookbook</span>
          </motion.h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 px-2">
          {[
            { src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80", span: "md:col-span-2 md:row-span-2" },
            { src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80", span: "" },
            { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80", span: "" },
            { src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", span: "" },
            { src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80", span: "" },
            { src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80", span: "md:col-span-2 md:row-span-2" },
            { src: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80", span: "" },
            { src: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80", span: "" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative aspect-square overflow-hidden rounded-xl group cursor-pointer ${item.span}`}
            >
              <Image
                src={item.src}
                alt={`Lookbook ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50 transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWSLETTER — PREMIUM CTA
      ══════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920&q=80"
          alt="Newsletter background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-2xl mx-auto text-center px-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4"
          >
            Exclusive Access
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extralight text-white mb-4"
          >
            Join the <span className="font-semibold italic">Airweave</span> Club
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 mb-10 text-lg">
            Get 10% off your first order. Plus early access to new drops and exclusive style guides.
          </motion.p>
          <motion.form
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 rounded-full text-sm text-white focus:outline-none focus:border-white/50 placeholder:text-white/30 backdrop-blur-sm"
            />
            <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors shrink-0 cursor-pointer">
              Get 10% Off
            </button>
          </motion.form>
          <motion.p variants={fadeIn} className="text-white/30 text-xs mt-5">
            No spam. Unsubscribe anytime. Join 10,000+ members.
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}

/* ── Parallax Banner Component ── */
function ParallaxBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden my-10">
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=85"
          alt="Summer collection"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-[1400px] mx-auto px-6 w-full">
          <div className="max-w-lg">
            <motion.span
              variants={fadeUp}
              className="inline-block text-[10px] tracking-[0.4em] uppercase text-white/60 mb-4"
            >
              Limited Drop
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl font-extralight text-white leading-[1.1] mb-4"
            >
              Summer &apos;26
              <br />
              <span className="font-semibold italic">Collection</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-8 text-lg max-w-md">
              Eight new styles. Engineered for April heat through monsoon humidity. Dropping March 28.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-medium"
              >
                <span>Shop the Drop</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
