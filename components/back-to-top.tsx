"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur-xl transition hover:border-white/40 hover:bg-black/80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 sm:bottom-8 sm:right-8"
          aria-label={t("backToTop.label")}
          title={t("backToTop")}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
