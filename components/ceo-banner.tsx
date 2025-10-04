"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function CeoBanner() {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative mx-auto mt-6 w-[clamp(280px,90vw,900px)]">
      {/* Arrow Button - Always Visible */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 flex justify-center"
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="group cursor-pointer touch-manipulation"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Expand banner"
          aria-expanded={isExpanded}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-white/60 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Expandable Box */}
      <AnimatePresence>
        {isExpanded && (
          <motion.section
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.1, 0.25, 1],
              opacity: { duration: 0.4 }
            }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] text-white shadow-[0_20px_60px_rgba(18,24,58,0.35)] backdrop-blur-xl"
            aria-labelledby="ceo-banner-title"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
      <motion.div
        className="pointer-events-none absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,111,255,0.35),transparent_65%)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,231,198,0.28),transparent_60%)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
      />
      <div className="relative px-6 py-5">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70"
            >
              {t("ceo.banner.title")}
            </motion.span>
            <motion.p
              id="ceo-banner-title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl text-sm text-white/75 sm:text-base"
            >
              {t("ceo.banner.subtitle")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white/40 hover:bg-white/15"
            >
              <span className="relative flex items-center gap-2">
                {t("ceo.banner.cta")}
                <motion.span
                  className="flex h-1 w-8 overflow-hidden rounded-full bg-white/30"
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                >
                  <span className="block h-full w-full translate-x-[-100%] bg-white/70" />
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="border-t border-white/10 px-6 py-5">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-3"
        >
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("ceo.banner.expand.expertise")}
            </div>
            <p className="text-sm text-white/70">
              {t("ceo.banner.expand.expertise.desc")}
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("ceo.banner.expand.approach")}
            </div>
            <p className="text-sm text-white/70">
              {t("ceo.banner.expand.approach.desc")}
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
              {t("ceo.banner.expand.commitment")}
            </div>
            <p className="text-sm text-white/70">
              {t("ceo.banner.expand.commitment.desc")}
            </p>
          </div>
        </motion.div>
      </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
