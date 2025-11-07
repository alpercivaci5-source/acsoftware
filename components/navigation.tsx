"use client";

import { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/client";

const navLinks = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/about" },
  { labelKey: "nav.portfolio", href: "/portfolio" },
  { labelKey: "nav.contact", href: "/contact" },
];

const serviceLinks = [
  {
    labelKey: "services.type.web",
    descriptionKey: "services.type.web.desc",
    href: "/services#web",
  },
  {
    labelKey: "services.type.mobile",
    descriptionKey: "services.type.mobile.desc",
    href: "/services#mobile",
  },
  {
    labelKey: "services.type.ai",
    descriptionKey: "services.type.ai.desc",
    href: "/services#ai",
  },
  {
    labelKey: "services.type.cloud",
    descriptionKey: "services.type.cloud.desc",
    href: "/services#cloud",
  },
];

export function SiteNavigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, toggleLanguage, isPending } = useI18n();

  const isActive = (href: string) => pathname === href;
  const isServices = pathname.startsWith("/services");

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-4 z-50 flex w-full justify-center px-4 sm:px-6"
    >
      <div className="group/nav relative flex w-full max-w-6xl items-center justify-between rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-[20px] backdrop-saturate-[180%] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-[0_12px_48px_rgba(0,0,0,0.3)]">
        <Link
          href="/"
          className={cn(
            "group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-white/60",
            mobileOpen && "invisible",
          )}
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/[0.12] group-hover:bg-white/[0.05] group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)]">
            <Image 
              src="/patientia-logo.png" 
              alt="Patientia" 
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </span>
          <motion.span 
            className="relative inline-block whitespace-nowrap text-white font-medium"
            whileHover={{ 
              color: "#D4AF37",
              scale: 1.05,
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            Patientia
          </motion.span>
        </Link>

        <NavigationMenu.Root className="relative hidden items-center md:flex">
          <NavigationMenu.List className="flex items-center gap-2">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(
                  "group relative flex items-center gap-1 rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-white",
                  isServices && "border-white/[0.1] bg-white/[0.04] text-white",
                )}
              >
                {t("nav.services")}
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative grid w-[520px] gap-3 rounded-3xl border border-white/[0.08] bg-black/40 p-6 text-left shadow-[0_16px_64px_rgba(0,0,0,0.4)] backdrop-blur-[28px] backdrop-saturate-[180%]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40">{t("nav.capabilities")}</p>
                      <p className="mt-2 text-sm text-white/65">
                        {t("services.description")}
                      </p>
                    </div>
                    <Link
                      href="/services"
                      className="relative whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                    >
                      {t("nav.viewAll")}
                    </Link>
                  </div>
                  <div className="grid gap-3">
                    {serviceLinks.map((service) => (
                      <NavigationMenu.Link asChild key={service.href}>
                        <Link
                          href={service.href}
                          className="group/item relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent before:transition-transform before:duration-500 hover:before:translate-x-[100%]"
                        >
                          <p className="text-sm font-semibold text-white">{t(service.labelKey)}</p>
                          <p className="mt-2 text-xs text-white/60">{t(service.descriptionKey)}</p>
                        </Link>
                      </NavigationMenu.Link>
                    ))}
                  </div>
                </motion.div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {navLinks.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03] hover:text-white",
                      isActive(item.href) && "border-white/[0.1] bg-white/[0.04] text-white",
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <NavigationMenu.Indicator className="pointer-events-none absolute -bottom-2 flex h-2 items-end justify-center overflow-hidden">
            <span className="h-2 w-2 rotate-45 rounded-tl-sm bg-white/30" />
          </NavigationMenu.Indicator>
          <div className="absolute left-0 top-full flex w-full justify-center">
            <NavigationMenu.Viewport className="relative mt-3 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-2xl backdrop-blur" />
          </div>
        </NavigationMenu.Root>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            disabled={isPending}
            className="relative overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white disabled:opacity-60"
            aria-label={t("nav.languageTooltip")}
          >
            {lang === "en" ? t("nav.lang.tr") : t("nav.lang.en")}
          </button>
          <Link
            href="/contact"
            className="relative overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
          >
            {t("nav.contactCta")}
          </Link>
          <Link
            href="/services"
            className="relative overflow-hidden rounded-full border border-white/30 bg-white/95 px-4 py-2 text-sm font-semibold text-black shadow-[0_4px_16px_rgba(255,255,255,0.25)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/40 hover:bg-white hover:shadow-[0_6px_24px_rgba(255,255,255,0.35)] active:scale-[0.98]"
          >
            {t("nav.cta")}
          </Link>
        </div>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger
            className={cn(
              "inline-flex touch-manipulation items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] p-2 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] md:hidden",
              mobileOpen && "invisible",
            )}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("nav.open")}</span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[16px] backdrop-saturate-[180%]" />
            <Dialog.Content className="fixed inset-0 z-50 flex flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5">
                    <Image src="/patientia-logo.png" alt="Patientia" width={28} height={28} className="h-7 w-7 object-contain" />
                  </span>
                  Patientia
                </Link>
                <Dialog.Close className="rounded-full border border-white/[0.08] bg-white/[0.02] p-2 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t("nav.close")}</span>
                </Dialog.Close>
              </div>
              <div className="mt-10 flex-1 overflow-y-auto">
                <nav className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">{t("nav.capabilities")}</p>
                    <ul className="mt-4 space-y-4">
                      {serviceLinks.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-white backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                          >
                            <p className="text-sm font-semibold">{t(service.labelKey)}</p>
                            <p className="mt-2 text-xs text-white/60">{t(service.descriptionKey)}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">{t("nav.explore")}</p>
                    <ul className="mt-4 space-y-3 text-sm text-white/70">
                      {[{ labelKey: "nav.services", href: "/services" }, ...navLinks].map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between rounded-full border border-white/[0.06] bg-white/[0.01] px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]"
                          >
                            <span>{t(item.labelKey)}</span>
                            {isActive(item.href) ? (
                              <span className="text-xs uppercase tracking-[0.2em] text-white/50">{t("nav.current")}</span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="mt-10 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    toggleLanguage();
                  }}
                  disabled={isPending}
                  className="block w-full rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] disabled:opacity-60"
                  aria-label={t("nav.languageTooltip")}
                >
                  {t("nav.language")}: {lang === "en" ? t("nav.lang.tr") : t("nav.lang.en")}
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
                >
                  {t("nav.contactCta")}
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full border border-white/30 bg-white/95 px-6 py-3 text-center text-sm font-semibold text-black shadow-[0_4px_16px_rgba(255,255,255,0.25)] backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white hover:shadow-[0_6px_24px_rgba(255,255,255,0.35)] active:scale-[0.98]"
                >
                  {t("nav.cta")}
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </motion.header>
  );
}
