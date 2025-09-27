import { cookies } from "next/headers";
import { resolveLanguage, t as translate, type Language } from "./config";

type ServerTranslator = {
  lang: Language;
  t: (key: string) => string;
};

export async function getI18n(): Promise<ServerTranslator> {
  const cookieStore = await cookies();
  const lang = resolveLanguage(cookieStore.get("lang")?.value);

  return {
    lang,
    t: (key: string) => translate(lang, key),
  };
}
