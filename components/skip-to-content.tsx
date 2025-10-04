"use client";

import { useI18n } from "@/lib/i18n/client";

export function SkipToContent() {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:border focus:border-white/20 focus:bg-white focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-black focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      {t("nav.skipToContent")}
    </a>
  );
}
