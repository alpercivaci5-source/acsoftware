import { getI18n } from "@/lib/i18n/server";

export const runtime = "edge";

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/40">404</p>
      <h1 className="text-3xl font-semibold text-white">{t("notfound.title")}</h1>
      <p className="max-w-md text-sm text-white/70">
        {t("notfound.description")}
      </p>
    </main>
  );
}
