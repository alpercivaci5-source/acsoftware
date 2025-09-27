export const runtime = "edge";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-white/40">404</p>
      <h1 className="text-3xl font-semibold text-white">Sayfa bulunamadı</h1>
      <p className="max-w-md text-sm text-white/70">
        Aradığınız sayfa taşınmış veya artık mevcut olmayabilir. Lütfen ana sayfaya
        dönerek devam edin ya da menüden farklı bir sayfa seçin.
      </p>
    </main>
  );
}
