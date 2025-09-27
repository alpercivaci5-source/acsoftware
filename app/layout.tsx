import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNavigation } from "@/components/navigation";
import { SiteFooter } from "@/components/footer";
import { CeoBanner } from "@/components/ceo-banner";
import { cn } from "@/lib/utils";
import { I18nProvider } from "@/lib/i18n/client";
import { resolveLanguage } from "@/lib/i18n/config";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://acsoftware.com"),
  title: {
    default: "AC Software — Dijital Çözümlerin Geleceği",
    template: "%s | AC Software",
  },
  description:
    "AC Software, vizyoner kurumlar için premium dijital ürünler, kurumsal platformlar ve zeki deneyimler tasarlayan bir teknoloji stüdyosudur.",
  alternates: {
    languages: {
      en: "https://acsoftware.com/en",
      tr: "https://acsoftware.com",
    },
  },
  openGraph: {
    title: "AC Software — Dijital Çözümlerin Geleceği",
    description:
      "AC Software, vizyoner kurumlar için premium dijital ürünler, kurumsal platformlar ve zeki deneyimler tasarlayan bir teknoloji stüdyosudur.",
    url: "https://acsoftware.com",
    siteName: "AC Software",
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AC Software — Dijital Çözümlerin Geleceği",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AC Software — Dijital Çözümlerin Geleceği",
    description:
      "AC Software, vizyoner kurumlar için premium dijital ürünler, kurumsal platformlar ve zeki deneyimler tasarlayan bir teknoloji stüdyosudur.",
    images: ["/og-image.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = resolveLanguage(cookieStore.get("lang")?.value);

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={cn(
          "grid-overlay min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white",
          heading.variable,
          body.variable,
        )}
      >
        <I18nProvider initialLang={lang}>
          <div className="relative flex min-h-screen flex-col">
            <SiteNavigation />
            <CeoBanner />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
