"use server";

import { cookies, headers } from "next/headers";
import { z } from "zod";
import { resolveLanguage, t as translate, type Language } from "@/lib/i18n/config";
import { rateLimit, getRateLimitIdentifier } from "@/lib/security/rate-limit";
import { sanitizeContactData } from "@/lib/security/sanitize";

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
  // Security: Get environment variables without defaults
  const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT;
  const FORMSUBMIT_ENDPOINT = process.env.FORMSUBMIT_ENDPOINT;
  const FORMSUBMIT_REFERER = process.env.FORMSUBMIT_REFERER;

  // Security: Validate required environment variables
  if (!CONTACT_RECIPIENT || !FORMSUBMIT_ENDPOINT) {
    console.error("[SECURITY] Missing required environment variables");
    throw new Error("configuration-error");
  }

  // Security: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(CONTACT_RECIPIENT)) {
    console.error("[SECURITY] Invalid recipient email configuration");
    throw new Error("configuration-error");
  }

  const normalizedEndpoint = FORMSUBMIT_ENDPOINT.replace(/\/$/, "");

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
  } catch {
    responseBody = rawBody;
  }

  if (!response.ok) {
    // Security: Don't log sensitive response data
    console.error("[SECURITY] Email delivery failed", response.status);
    throw new Error("email-delivery-failed");
  }

  // Security: Log success without exposing data
  console.info("[SECURITY] Email sent successfully");
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const cookieStore = await cookies();
  const lang = resolveLanguage(cookieStore.get("lang")?.value);

  try {
    // Security: Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0] || realIp || "unknown";

    // Security: Extract and validate raw data
    const rawName = formData.get("name");
    const rawEmail = formData.get("email");
    const rawMessage = formData.get("message");

    // Security: Check if values exist and are strings
    if (
      typeof rawName !== "string" ||
      typeof rawEmail !== "string" ||
      typeof rawMessage !== "string"
    ) {
      return {
        status: "error",
        message: translate(lang, "contact.form.error"),
      };
    }

    // Security: Sanitize input data
    const sanitized = sanitizeContactData({
      name: rawName,
      email: rawEmail,
      message: rawMessage,
    });

    // Security: Validate with Zod
    const contactSchema = createContactSchema(lang);
    const data = contactSchema.parse(sanitized);

    // Security: Rate limiting - 5 submissions per hour per IP+email combination
    const rateLimitId = getRateLimitIdentifier(clientIp, data.email);
    const rateLimitResult = rateLimit(rateLimitId, 5, 60 * 60 * 1000);

    if (!rateLimitResult.success) {
      console.warn("[SECURITY] Rate limit exceeded", { ip: clientIp });
      return {
        status: "error",
        message: translate(lang, "contact.form.rateLimit"),
      };
    }

    // Security: Log submission without sensitive data
    console.info("[SECURITY] Contact form submitted", {
      ip: clientIp,
      hasEmail: !!data.email,
      remaining: rateLimitResult.remaining,
    });

    // Send notification
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

    // Security: Generic error message, don't expose details
    console.error("[SECURITY] Contact form error", {
      error: error instanceof Error ? error.message : "unknown",
    });
    
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
