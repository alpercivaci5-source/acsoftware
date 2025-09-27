import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: t("about.metadata.title"),
    description: t("about.metadata.description"),
  };
}

export default async function AboutPage() {
  const { t } = await getI18n();

  const principles = [
    {
      title: t("about.page.principles.1.title"),
      description: t("about.page.principles.1.desc"),
    },
    {
      title: t("about.page.principles.2.title"),
      description: t("about.page.principles.2.desc"),
    },
    {
      title: t("about.page.principles.3.title"),
      description: t("about.page.principles.3.desc"),
    },
  ];

  return (
    <div className="space-y-20 pb-20 pt-28">
      <section className="px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 text-white">
          <SectionHeader
            eyebrow={t("about.page.eyebrow")}
            title={t("about.page.title")}
            description={t("about.page.description")}
            align="left"
          />
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.05] p-10 backdrop-blur-xl sm:grid-cols-3">
            {principles.map((principle) => (
              <div key={principle.title} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{principle.title}</p>
                <p className="text-sm text-white/65">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AboutSection />
      <ServicesSection />
    </div>
  );
}
