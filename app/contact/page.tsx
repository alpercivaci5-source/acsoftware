import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactSection } from "@/components/sections/contact";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();

  return {
    title: t("contact.metadata.title"),
    description: t("contact.metadata.description"),
  };
}

export default async function ContactPage() {
  const { t } = await getI18n();

  return (
    <div className="space-y-12 pb-24 pt-28">
      <section className="px-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 text-white">
          <SectionHeader
            eyebrow={t("contact.page.eyebrow")}
            title={t("contact.page.title")}
            description={t("contact.page.description")}
          />
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
