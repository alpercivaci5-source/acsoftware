"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";

export function HeroSection() {
  const { t } = useI18n();
  const features = [
    {
      title: t("hero.feature.enterprise"),
      description: t("hero.feature.enterprise.desc"),
    },
    {
      title: t("hero.feature.design"),
      description: t("hero.feature.design.desc"),
    },
    {
      title: t("hero.feature.ai"),
      description: t("hero.feature.ai.desc"),
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(95,111,255,0.35),transparent_55%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(95,111,255,0.15),rgba(46,231,198,0.08),transparent_65%)] blur-3xl" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
        >
          {t("hero.badge")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl text-balance font-heading text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
        >
          {t("hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          className="mt-8 max-w-3xl text-lg text-white/70 sm:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <span className="relative">{t("hero.ctaPrimary")}</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
          className="mt-20 grid w-full grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-left transition hover:border-white/20 hover:bg-white/10"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-white/40">{feature.title}</p>
              <p className="text-base text-white/70">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
