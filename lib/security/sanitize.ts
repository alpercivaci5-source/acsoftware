/**
 * Input sanitization utilities to prevent XSS and injection attacks
 */

/**
 * Sanitize string input - remove dangerous characters
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>'"]/g, "") // Remove HTML/JS injection chars
    .replace(/\0/g, ""); // Remove null bytes
}

/**
 * Sanitize email - strict validation and normalization
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Sanitize message - allow basic text but remove scripts
 */
export function sanitizeMessage(message: string): string {
  return message
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ""); // Remove event handlers
}

/**
 * Validate and sanitize contact form data
 */
export function sanitizeContactData(data: {
  name: string;
  email: string;
  message: string;
}) {
  return {
    name: sanitizeString(data.name),
    email: sanitizeEmail(data.email),
    message: sanitizeMessage(data.message),
  };
}
