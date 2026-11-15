import type { Lang } from "../core/i18n";

// The address of each page in each language.
export const rotas = {
	home: { pt: "/", en: "/en/", fr: "/fr/" },
	about: { pt: "/sobre-nos/", en: "/en/about/", fr: "/fr/a-propos/" },
	services: { pt: "/servicos/", en: "/en/services/", fr: "/fr/services/" },
	team: { pt: "/equipa/", en: "/en/team/", fr: "/fr/equipe/" },
	contact: { pt: "/contactos/", en: "/en/contact/", fr: "/fr/contact/" },
	privacy: {
		pt: "/politica-de-privacidade/",
		en: "/en/privacy-policy/",
		fr: "/fr/politique-de-confidentialite/",
	},
	cookies: {
		pt: "/politica-de-cookies/",
		en: "/en/cookie-policy/",
		fr: "/fr/politique-de-cookies/",
	},
	terms: {
		pt: "/termos-e-condicoes/",
		en: "/en/terms/",
		fr: "/fr/conditions-generales/",
	},
	thanks: { pt: "/obrigado/", en: "/en/thank-you/", fr: "/fr/merci/" },
} satisfies Record<string, Record<Lang, string>>;

export type Pagina = keyof typeof rotas;
