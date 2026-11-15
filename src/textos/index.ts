import type { Lang } from "../core/i18n";
import en from "./en";
import fr from "./fr";
import pt, { type Textos } from "./pt";

// The site's text in each language.
const textos: Record<Lang, Textos> = { pt, en, fr };
export const textosDe = (lang: Lang): Textos => textos[lang];
