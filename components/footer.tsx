"use client";

import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/client";

const socials = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "mailto:hello@patientia.com.tr", label: "Email", icon: Mail },
];

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5">
              <img src="/patientia-logo.png" alt="Patientia" className="h-8 w-8 object-contain" />
            </span>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">Patientia</p>
          </div>
          <p className="max-w-sm text-sm text-white/60">{t("footer.description")}</p>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Patientia. {t("footer.copy")}</p>
        </div>
        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <Link
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
