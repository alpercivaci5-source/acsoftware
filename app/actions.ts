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

    await new Promise((resolve) => setTimeout(resolve, 750));
    console.info("📨 Contact submission", data);

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
