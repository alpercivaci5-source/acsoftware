"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { resolveLanguage, t as translate, type Language } from "@/lib/i18n/config";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string[]>>;
};

function createContactSchema(lang: Language) {
  return z.object({
    name: z.string().min(2, translate(lang, "contact.form.validation.name")),
    email: z.string().email({ message: translate(lang, "contact.form.validation.email") }),
    message: z
      .string()
      .min(12, translate(lang, "contact.form.validation.message")),
  });
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  lang: Language;
};

async function sendContactNotification({ name, email, message, lang }: ContactPayload) {
  const {
    CONTACT_RECIPIENT = "alpercivaci5@gmail.com",
    FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax",
    FORMSUBMIT_REFERER,
  } = process.env;

  const normalizedEndpoint = FORMSUBMIT_ENDPOINT.replace(/\/$/, "");

  if (!CONTACT_RECIPIENT) {
    console.error("Contact submission failed: missing Formsubmit recipient email.");
    throw new Error("missing-email-config");
  }

  const subject = `${translate(lang, "contact.page.eyebrow")} | ${name}`;

  const response = await fetch(
    `${normalizedEndpoint}/${encodeURIComponent(CONTACT_RECIPIENT)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(FORMSUBMIT_REFERER ? { Referer: FORMSUBMIT_REFERER } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject,
        reply_to: email,
        _template: "table",
      }),
    },
  );

  let responseBody: unknown = null;
  const rawBody = await response.text();
  try {
    responseBody = rawBody ? JSON.parse(rawBody) : null;
  } catch (parseError) {
    responseBody = rawBody;
  }

  if (!response.ok) {
    console.error("Formsubmit API error", response.status, responseBody);
    throw new Error("email-delivery-failed");
  }

  console.info("Formsubmit API success", responseBody);
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const cookieStore = await cookies();
  const lang = resolveLanguage(cookieStore.get("lang")?.value);
  const contactSchema = createContactSchema(lang);

  try {
    const data = contactSchema.parse(raw);

    console.info("📨 Contact submission", data);
    await sendContactNotification({ ...data, lang });

    return {
      status: "success",
      message: translate(lang, "contact.form.success"),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      return {
        status: "error",
        message: translate(lang, "contact.form.error"),
        errors: fieldErrors,
      };
    }

    console.error("Contact form submission failed", error);
    return {
      status: "error",
      message: translate(lang, "contact.form.unexpected"),
    };
  }
}

export async function setLocale(lang: Language) {
  const resolved = resolveLanguage(lang);
  const cookieStore = await cookies();
  cookieStore.set({
    name: "lang",
    value: resolved,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
