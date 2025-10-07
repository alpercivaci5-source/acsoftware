import type { Metadata } from "next";
import { Sparkles, Workflow, ShieldCheck, Gauge } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesSection } from "@/components/sections/services";
import { getI18n } from "@/lib/i18n/server";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: t("services.metadata.title"),
    description: t("services.metadata.description"),
  };
}

export default async function ServicesPage() {
  const { t } = await getI18n();

  const approach = [
    {
      icon: Sparkles,
      title: t("services.page.approach.vision.title"),
      description: t("services.page.approach.vision.desc"),
    },
    {
      icon: Workflow,
      title: t("services.page.approach.strategy.title"),
      description: t("services.page.approach.strategy.desc"),
    },
    {
      icon: ShieldCheck,
      title: t("services.page.approach.security.title"),
      description: t("services.page.approach.security.desc"),
    },
    {
      icon: Gauge,
      title: t("services.page.approach.evolution.title"),
      description: t("services.page.approach.evolution.desc"),
    },
  ];

  return (
    <div className="space-y-24 pb-24 pt-28">
      <section className="px-6">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 text-white">
          <SectionHeader
            eyebrow={t("services.page.eyebrow")}
            title={t("services.page.title")}
            description={t("services.page.description")}
            align="left"
          />
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.05] p-10 backdrop-blur-xl sm:grid-cols-2">
            {approach.map((step) => (
              <div key={step.title} className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white/80">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.28em] text-white/45">{step.title}</p>
                  <p className="text-sm text-white/65">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServicesSection />
    </div>
  );
}
