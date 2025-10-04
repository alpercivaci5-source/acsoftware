"use client";

import { useActionState, useEffect, type ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";
import { Loader2, Send } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { submitContactForm, type ContactFormState } from "@/app/actions";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/client";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

export function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const { t } = useI18n();
  const { showToast } = useToast();

  useEffect(() => {
    if (state.status === "success") {
      showToast(state.message, "success");
    } else if (state.status === "error" && state.message) {
      showToast(state.message, "error");
    }
  }, [state, showToast]);

  return (
    <section id="contact" className="px-6 py-24 sm:py-32">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
        <SectionHeader
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          description={t("contact.description")}
        />
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl text-white">{t("contact.commitment.title")}</h3>
              <p className="text-sm text-white/65">{t("contact.commitment.copy")}</p>
            </div>
            <Separator.Root className="h-px w-full bg-white/10" />
            <ul className="space-y-5 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white/50" />
                <span>{t("contact.commitment.p1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white/50" />
                <span>{t("contact.commitment.p2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white/50" />
                <span>{t("contact.commitment.p3")}</span>
              </li>
            </ul>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            action={formAction}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-6">
              <Field
                id="name"
                label={t("contact.form.name")}
                placeholder={t("contact.form.placeholder.name")}
                error={state.errors?.name?.[0]}
                autoComplete="name"
                disabled={pending}
              />
              <Field
                id="email"
                label={t("contact.form.email")}
                placeholder={t("contact.form.placeholder.email")}
                error={state.errors?.email?.[0]}
                type="email"
                autoComplete="email"
                disabled={pending}
              />
              <Field
                id="message"
                label={t("contact.form.message")}
                placeholder={t("contact.form.placeholder.message")}
                error={state.errors?.message?.[0]}
                textarea
                rows={5}
                disabled={pending}
              />
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("contact.form.sending")}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t("contact.form.submit")}
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

type BaseFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
};

type InputFieldProps = BaseFieldProps & {
  textarea?: false;
} & ComponentPropsWithoutRef<"input">;

type TextareaFieldProps = BaseFieldProps & {
  textarea: true;
} & ComponentPropsWithoutRef<"textarea">;

type FieldProps = InputFieldProps | TextareaFieldProps;

function Field({ id, label, error, textarea, className, ...props }: FieldProps) {
  const inputClass = cn(
    "w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white/80 placeholder:text-white/30 transition focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20",
    className,
  );

  return (
    <Label.Root className="space-y-2" htmlFor={id}>
      <span className="text-xs uppercase tracking-[0.28em] text-white/50">{label}</span>
      {textarea ? (
        <textarea id={id} name={id} className={inputClass} {...(props as ComponentPropsWithoutRef<"textarea">)} />
      ) : (
        <input id={id} name={id} className={inputClass} {...(props as ComponentPropsWithoutRef<"input">)} />
      )}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </Label.Root>
  );
}
