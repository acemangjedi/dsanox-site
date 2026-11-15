import type { Lang } from "../core/i18n";
import pt, { type Textos } from "./pt";

// The site's text in each language.
const textos: Partial<Record<Lang, Textos>> = { pt };
export const textosDe = (lang: Lang): Textos => textos[lang] ?? pt;
