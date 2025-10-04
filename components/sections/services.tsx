"use client";

import { motion } from "framer-motion";
import { Layers, Smartphone, BrainCircuit, Cloud } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { SectionHeader } from "@/components/ui/section-header";
import { useI18n } from "@/lib/i18n/client";

const services = [
  {
    id: "web",
    titleKey: "services.type.web",
    descriptionKey: "services.type.web.desc",
    icon: Layers,
    modalTitleKey: "services.modal.web.title",
    bodyKey: "services.modal.web.body",
    pointKeys: [
      "services.modal.web.point1",
      "services.modal.web.point2",
      "services.modal.web.point3",
    ],
  },
  {
    id: "mobile",
    titleKey: "services.type.mobile",
    descriptionKey: "services.type.mobile.desc",
    icon: Smartphone,
    modalTitleKey: "services.modal.mobile.title",
    bodyKey: "services.modal.mobile.body",
    pointKeys: [
      "services.modal.mobile.point1",
      "services.modal.mobile.point2",
      "services.modal.mobile.point3",
    ],
  },
  {
    id: "ai",
    titleKey: "services.type.ai",
    descriptionKey: "services.type.ai.desc",
    icon: BrainCircuit,
    modalTitleKey: "services.modal.ai.title",
    bodyKey: "services.modal.ai.body",
    pointKeys: [
      "services.modal.ai.point1",
      "services.modal.ai.point2",
      "services.modal.ai.point3",
    ],
  },
  {
    id: "cloud",
    titleKey: "services.type.cloud",
    descriptionKey: "services.type.cloud.desc",
    icon: Cloud,
    modalTitleKey: "services.modal.cloud.title",
    bodyKey: "services.modal.cloud.body",
    pointKeys: [
      "services.modal.cloud.point1",
      "services.modal.cloud.point2",
      "services.modal.cloud.point3",
    ],
  },
];

export function ServicesSection() {
  const { t } = useI18n();

  return (
    <section id="services" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
        <SectionHeader
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          description={t("services.description")}
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Dialog.Root key={service.id}>
                <Dialog.Trigger asChild>
                  <motion.article
                    id={service.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-3xl transition group-hover:bg-white/10" />
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h3 className="font-heading text-2xl text-white">{t(service.titleKey)}</h3>
                    </div>
                    <p className="mt-5 text-base text-white/65">{t(service.descriptionKey)}</p>
                    <p className="mt-6 text-sm uppercase tracking-[0.28em] text-white/45">{t("services.learnMore")}</p>
                  </motion.article>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur" />
                  <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center px-6 py-12">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-gradient-to-br from-white/15 via-black/80 to-black/95 p-6 text-white shadow-2xl sm:p-10"
                    >
                      <Dialog.Close className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:bg-black/70">
                        {t("common.close")}
                      </Dialog.Close>
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.3em] text-white/40">{t("services.eyebrow")}</span>
                          <Dialog.Title className="font-heading text-3xl text-white">{t(service.modalTitleKey)}</Dialog.Title>
                          <p className="text-base text-white/70">{t(service.bodyKey)}</p>
                        </div>
                        <div className="space-y-4">
                          <p className="text-xs uppercase tracking-[0.28em] text-white/45">{t("services.modal.listTitle")}</p>
                          <ul className="space-y-3 text-sm text-white/70">
                            {service.pointKeys.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                              >
                                <span className="mt-1 flex h-2 w-2 flex-shrink-0 rounded-full bg-white/60" />
                                <span>{t(point)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            );
          })}
        </div>
      </div>
    </section>
  );
}
