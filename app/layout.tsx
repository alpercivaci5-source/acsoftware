import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNavigation } from "@/components/navigation";
import { SiteFooter } from "@/components/footer";
import { CeoBanner } from "@/components/ceo-banner";
import { BackToTop } from "@/components/back-to-top";
import { SkipToContent } from "@/components/skip-to-content";
import { ToastProvider } from "@/components/ui/toast";
import { StructuredData } from "@/components/structured-data";
import { GoogleAnalytics } from "@/components/analytics";
import { cn } from "@/lib/utils";
import { I18nProvider } from "@/lib/i18n/client";
import { resolveLanguage, t as translate } from "@/lib/i18n/config";

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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = resolveLanguage(cookieStore.get("lang")?.value);
  const title = translate(lang, "metadata.site.title");
  const description = translate(lang, "metadata.site.description");

  return {
    metadataBase: new URL("https://www.patientia.com.tr"),
    title: {
      default: title,
      template: "%s | Patientia",
    },
    description,
    keywords: [
      "web development",
      "mobile app development",
      "AI integration",
      "cloud solutions",
      "enterprise software",
      "yazılım geliştirme",
      "web tasarım",
      "mobil uygulama",
      "yapay zeka",
    ],
    authors: [{ name: "Patientia" }],
    creator: "Patientia",
    publisher: "Patientia",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/patientia-logo.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/patientia-logo.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.json",
    alternates: {
      languages: {
        en: "https://www.patientia.com.tr/en",
        tr: "https://www.patientia.com.tr",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://www.patientia.com.tr",
      siteName: "Patientia",
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: lang === "tr" ? ["en_US"] : ["tr_TR"],
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = resolveLanguage(cookieStore.get("lang")?.value);

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body
        className={cn(
          "grid-overlay min-h-screen bg-background text-foreground antialiased selection:bg-white/20 selection:text-white",
          heading.variable,
          body.variable,
        )}
      >
        <I18nProvider initialLang={lang}>
          <ToastProvider>
            <SkipToContent />
            <div className="relative flex min-h-screen flex-col">
              <SiteNavigation />
              <CeoBanner />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
            <BackToTop />
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
