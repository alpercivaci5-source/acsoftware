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

export const runtime = "edge";

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
  metadataBase: new URL("https://www.patientia.com.tr"),
  title: {
    default: "Patientia — Dijital Çözümlerin Geleceği",
    template: "%s | Patientia",
  },
  description:
    "Patientia is a professional software development company that leads digital transformation with custom web applications, mobile solutions, AI integrations, and cloud infrastructure.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/patientia-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/patientia-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    languages: {
      en: "https://www.patientia.com.tr/en",
      tr: "https://www.patientia.com.tr",
    },
  },
  openGraph: {
    title: "Patientia — Dijital Çözümlerin Geleceği",
    description:
      "Patientia is a professional software development company that leads digital transformation with custom web applications, mobile solutions, AI integrations, and cloud infrastructure.",
    url: "https://www.patientia.com.tr",
    siteName: "Patientia",
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Patientia — Dijital Çözümlerin Geleceği",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patientia — Dijital Çözümlerin Geleceği",
    description:
      "Patientia is a professional software development company that leads digital transformation with custom web applications, mobile solutions, AI integrations, and cloud infrastructure.",
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
