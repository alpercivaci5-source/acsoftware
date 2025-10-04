"use client";

import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { SectionHeader } from "@/components/ui/section-header";
import { useI18n } from "@/lib/i18n/client";

const projects = [
  {
    id: "nova",
    titleKey: "portfolio.case.nova.title",
    taglineKey: "portfolio.case.nova.tagline",
    overviewKey: "portfolio.case.nova.overview",
    challengeKey: "portfolio.case.nova.challenge",
    outcomeKey: "portfolio.case.nova.outcome",
    metricKeys: [
      "portfolio.case.nova.metric1",
      "portfolio.case.nova.metric2",
      "portfolio.case.nova.metric3",
    ],
    processKeys: [
      "portfolio.case.nova.process1",
      "portfolio.case.nova.process2",
      "portfolio.case.nova.process3",
    ],
  },
  {
    id: "orbit",
    titleKey: "portfolio.case.orbit.title",
    taglineKey: "portfolio.case.orbit.tagline",
    overviewKey: "portfolio.case.orbit.overview",
    challengeKey: "portfolio.case.orbit.challenge",
    outcomeKey: "portfolio.case.orbit.outcome",
    metricKeys: [
      "portfolio.case.orbit.metric1",
      "portfolio.case.orbit.metric2",
      "portfolio.case.orbit.metric3",
    ],
    processKeys: [
      "portfolio.case.orbit.process1",
      "portfolio.case.orbit.process2",
      "portfolio.case.orbit.process3",
    ],
  },
  {
    id: "helix",
    titleKey: "portfolio.case.helix.title",
    taglineKey: "portfolio.case.helix.tagline",
    overviewKey: "portfolio.case.helix.overview",
    challengeKey: "portfolio.case.helix.challenge",
    outcomeKey: "portfolio.case.helix.outcome",
    metricKeys: [
      "portfolio.case.helix.metric1",
      "portfolio.case.helix.metric2",
      "portfolio.case.helix.metric3",
    ],
    processKeys: [
      "portfolio.case.helix.process1",
      "portfolio.case.helix.process2",
      "portfolio.case.helix.process3",
    ],
  },
];

export function PortfolioSection() {
  const { t } = useI18n();

  return (
    <section id="portfolio" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <SectionHeader
          eyebrow={t("portfolio.eyebrow")}
          title={t("portfolio.title")}
          description={t("portfolio.description")}
          align="left"
        />
        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Dialog.Root key={project.id}>
              <Dialog.Trigger asChild>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                    <div className="flex h-40 items-center justify-center">
                      <span className="rounded-full border border-white/15 bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.28em] text-white/60">
                        {t("portfolio.viewCase")}
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,111,255,0.35),transparent_65%)] opacity-0 transition group-hover:opacity-100" />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-[0.28em] text-white/40">{t(project.taglineKey)}</p>
                  <h3 className="mt-3 font-heading text-2xl text-white">{t(project.titleKey)}</h3>
                  <p className="mt-4 text-sm text-white/65">{t(project.outcomeKey)}</p>
                </motion.button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur" />
                <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-black/85 to-black/95 p-6 text-white shadow-2xl sm:p-10"
                  >
                    <Dialog.Close className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:bg-black/80">
                      {t("common.close")}
                    </Dialog.Close>
                    <div className="space-y-8 overflow-y-auto pr-2">
                      <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.28em] text-white/40">{t(project.taglineKey)}</p>
                        <Dialog.Title className="font-heading text-3xl">{t(project.titleKey)}</Dialog.Title>
                        <p className="text-sm text-white/70">{t(project.overviewKey)}</p>
                      </div>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                          <h4 className="text-sm uppercase tracking-[0.28em] text-white/50">{t("portfolio.modal.challengeTitle")}</h4>
                          <p className="mt-3 text-sm text-white/70">{t(project.challengeKey)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm uppercase tracking-[0.28em] text-white/50">{t("portfolio.modal.outcomeTitle")}</h4>
                          <p className="mt-3 text-sm text-white/70">{t(project.outcomeKey)}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-[0.28em] text-white/50">{t("portfolio.modal.metricsTitle")}</h4>
                        <ul className="flex flex-wrap gap-3">
                          {project.metricKeys.map((metric) => (
                            <li
                              key={metric}
                              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/70"
                            >
                              {t(metric)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-[0.28em] text-white/50">{t("portfolio.modal.processTitle")}</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                          {project.processKeys.map((process) => (
                            <li
                              key={process}
                              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                            >
                              <span className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-white/60" />
                              <span>{t(process)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
