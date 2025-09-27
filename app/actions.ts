"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { resolveLanguage, t as translate, type Language } from "@/lib/i18n/config";
import nodemailer from "nodemailer";

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
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_RECIPIENT = "alpercivaci5@gmail.com",
    CONTACT_FROM,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact submission failed: missing SMTP configuration environment variables.");
    throw new Error("missing-email-config");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject = `${translate(lang, "contact.page.eyebrow")} | ${name}`;
  const plainBody = `Yeni bir iletişim başvurusu alındı.\n\nAd: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`;
  const htmlBody = `
    <p><strong>Ad:</strong> ${name}</p>
    <p><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Mesaj:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
  `;

  await transporter.sendMail({
    from: CONTACT_FROM ?? `"AC Software" <${SMTP_USER}>`,
    to: CONTACT_RECIPIENT,
    replyTo: email,
    subject,
    text: plainBody,
    html: htmlBody,
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
