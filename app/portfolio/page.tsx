import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { PortfolioSection } from "@/components/sections/portfolio";
import { getI18n } from "@/lib/i18n/server";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: t("portfolio.metadata.title"),
    description: t("portfolio.metadata.description"),
  };
}

export default async function PortfolioPage() {
  const { t } = await getI18n();

  const highlights = [
    {
      title: t("portfolio.page.highlights.clients.title"),
      detail: t("portfolio.page.highlights.clients.detail"),
    },
    {
      title: t("portfolio.page.highlights.platforms.title"),
      detail: t("portfolio.page.highlights.platforms.detail"),
    },
    {
      title: t("portfolio.page.highlights.engagements.title"),
      detail: t("portfolio.page.highlights.engagements.detail"),
    },
  ];

  return (
    <div className="space-y-20 pb-24 pt-28">
      <section className="px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 text-white">
          <SectionHeader
            eyebrow={t("portfolio.page.eyebrow")}
            title={t("portfolio.page.title")}
            description={t("portfolio.page.description")}
            align="left"
          />
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.05] p-10 backdrop-blur-xl sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.title}</p>
                <p className="text-sm text-white/65">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PortfolioSection />
    </div>
  );
}
