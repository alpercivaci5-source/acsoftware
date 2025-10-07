"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { useI18n } from "@/lib/i18n/client";

export function AboutSection() {
  const { t } = useI18n();
  const milestones = [
    {
      year: "2018",
      title: t("about.timeline.2018.title"),
      description: t("about.timeline.2018.desc"),
    },
    {
      year: "2020",
      title: t("about.timeline.2020.title"),
      description: t("about.timeline.2020.desc"),
    },
    {
      year: "2022",
      title: t("about.timeline.2022.title"),
      description: t("about.timeline.2022.desc"),
    },
    {
      year: "2024",
      title: t("about.timeline.2024.title"),
      description: t("about.timeline.2024.desc"),
    },
  ];

  const values = [
    {
      name: t("about.values.precision"),
      description: t("about.values.precision.desc"),
    },
    {
      name: t("about.values.velocity"),
      description: t("about.values.velocity.desc"),
    },
    {
      name: t("about.values.continuity"),
      description: t("about.values.continuity.desc"),
    },
  ];

  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20">
        <SectionHeader
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          description={t("about.description")}
          align="left"
        />
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="relative space-y-12 pl-6">
            <span className="absolute bottom-0 left-[18px] top-0 hidden w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0 lg:block" />
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="absolute -left-6 top-8 hidden h-3 w-3 rounded-full border border-white/40 bg-white/80 shadow-lg shadow-white/30 lg:block" />
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{milestone.year}</p>
                <h3 className="mt-4 font-heading text-2xl text-white">{milestone.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{milestone.description}</p>
              </motion.article>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 backdrop-blur-xl"
          >
            <h3 className="font-heading text-2xl text-white">{t("about.values.heading")}</h3>
            <div className="space-y-8">
              {values.map((value) => (
                <div key={value.name} className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">{value.name}</p>
                  <p className="text-base text-white/70">{value.description}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-white/55">
              {t("about.partnerCopy")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
