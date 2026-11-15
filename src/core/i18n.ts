import type { SiteConfig } from "./config";

// The words the core shows to visitors, in each language a site can have.
// The site's first language (site.lang) lives at /, the others under /en/, /fr/, …
const strings = {
	pt: {
		name: "Nome",
		email: "Email",
		phone: "Telefone",
		message: "Mensagem",
		send: "Enviar mensagem",
		consent:
			"Aceito que os meus dados sejam usados para responder a este pedido, como descrito na Política de Privacidade.",
		consentBefore:
			"Aceito que os meus dados sejam usados para responder a este pedido, como descrito na",
		privacyLink: "Política de Privacidade",
		trap: "Não preencher",
		formError:
			"Verifique os campos: o email tem de ser válido e é preciso aceitar a política de privacidade.",
		formFallback:
			"Não foi possível enviar a mensagem agora. Fale connosco diretamente:",
		cookieRegion: "Aviso de cookies",
		cookieText:
			"Utilizamos cookies para melhorar a sua experiência. Pode aceitar todos, rejeitar ou personalizar as suas preferências.",
		cookieLink: "Política de cookies",
		rejectAll: "Rejeitar todos",
		acceptAll: "Aceitar todos",
		customize: "Personalizar definições",
		cookieSettings: "Definições de cookies",
		closeSettings: "Fechar definições de cookies",
		necessary: "Necessários",
		necessaryDesc:
			"Essenciais para o funcionamento do site. Não requerem consentimento.",
		necessaryLabel: "Cookies necessários",
		analytics: "Análise",
		analyticsDesc:
			"Google Analytics e Microsoft Clarity: dados anónimos sobre páginas visitadas e comportamento de navegação.",
		analyticsLabel: "Cookies de análise",
		marketing: "Marketing",
		marketingDesc: "Reservado para uso futuro. Não são utilizados atualmente.",
		marketingLabel: "Cookies de marketing",
		save: "Guardar escolhas",
		previous: "Anterior",
		next: "Seguinte",
		close: "Fechar",
		paths: {
			privacy: "politica-de-privacidade/",
			cookies: "politica-de-cookies/",
			thanks: "obrigado/",
		},
	},
	en: {
		name: "Name",
		email: "Email",
		phone: "Phone",
		message: "Message",
		send: "Send message",
		consent:
			"I agree that my data may be used to answer this request, as described in the Privacy Policy.",
		consentBefore:
			"I agree that my data may be used to answer this request, as described in the",
		privacyLink: "Privacy Policy",
		trap: "Do not fill in",
		formError:
			"Please check the fields: the email must be valid and the privacy policy must be accepted.",
		formFallback:
			"We could not send your message right now. Contact us directly:",
		cookieRegion: "Cookie notice",
		cookieText:
			"We use cookies to improve your experience. You can accept all, reject all or choose your preferences.",
		cookieLink: "Cookie policy",
		rejectAll: "Reject all",
		acceptAll: "Accept all",
		customize: "Cookie settings",
		cookieSettings: "Cookie settings",
		closeSettings: "Close cookie settings",
		necessary: "Necessary",
		necessaryDesc: "Essential for the site to work. They need no consent.",
		necessaryLabel: "Necessary cookies",
		analytics: "Analytics",
		analyticsDesc:
			"Google Analytics and Microsoft Clarity: anonymous data on pages visited and browsing behaviour.",
		analyticsLabel: "Analytics cookies",
		marketing: "Marketing",
		marketingDesc: "Reserved for future use. Not used at present.",
		marketingLabel: "Marketing cookies",
		save: "Save choices",
		previous: "Previous",
		next: "Next",
		close: "Close",
		paths: {
			privacy: "privacy-policy/",
			cookies: "cookie-policy/",
			thanks: "thank-you/",
		},
	},
	fr: {
		name: "Nom",
		email: "E-mail",
		phone: "Téléphone",
		message: "Message",
		send: "Envoyer le message",
		consent:
			"J'accepte que mes données soient utilisées pour répondre à cette demande, comme décrit dans la Politique de confidentialité.",
		consentBefore:
			"J'accepte que mes données soient utilisées pour répondre à cette demande, comme décrit dans la",
		privacyLink: "Politique de confidentialité",
		trap: "Ne pas remplir",
		formError:
			"Vérifiez les champs : l'e-mail doit être valide et la politique de confidentialité doit être acceptée.",
		formFallback:
			"Nous n'avons pas pu envoyer votre message. Contactez-nous directement :",
		cookieRegion: "Avis sur les cookies",
		cookieText:
			"Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez tout accepter, tout refuser ou choisir vos préférences.",
		cookieLink: "Politique de cookies",
		rejectAll: "Tout refuser",
		acceptAll: "Tout accepter",
		customize: "Paramètres des cookies",
		cookieSettings: "Paramètres des cookies",
		closeSettings: "Fermer les paramètres des cookies",
		necessary: "Nécessaires",
		necessaryDesc:
			"Indispensables au fonctionnement du site. Ils ne demandent pas de consentement.",
		necessaryLabel: "Cookies nécessaires",
		analytics: "Mesure d'audience",
		analyticsDesc:
			"Google Analytics et Microsoft Clarity : données anonymes sur les pages visitées et la navigation.",
		analyticsLabel: "Cookies de mesure d'audience",
		marketing: "Marketing",
		marketingDesc: "Réservés à un usage futur. Non utilisés actuellement.",
		marketingLabel: "Cookies marketing",
		save: "Enregistrer mes choix",
		previous: "Précédent",
		next: "Suivant",
		close: "Fermer",
		paths: {
			privacy: "politique-de-confidentialite/",
			cookies: "politique-de-cookies/",
			thanks: "merci/",
		},
	},
};

export type Lang = keyof typeof strings;
export const LANGS = Object.keys(strings) as Lang[];

const short = (locale: string) => locale.slice(0, 2) as Lang;

// Every language of the site, the first one at the root.
export function siteLangs(site: SiteConfig): { lang: Lang; locale: string }[] {
	return [site.lang, ...site.locales].map((locale) => ({
		lang: short(locale),
		locale,
	}));
}

// The language of a page, from its address.
export function langOf(pathname: string, site: SiteConfig): Lang {
	const prefix = pathname.split("/")[1];
	const other = site.locales.map(short).find((l) => l === prefix);
	return other ?? short(site.lang);
}

export function localeOf(lang: Lang, site: SiteConfig): string {
	return siteLangs(site).find((l) => l.lang === lang)?.locale ?? site.lang;
}

export const t = (lang: Lang) => strings[lang];

// Where a language starts: / for the site's first language, /en/ for the others.
export function root(lang: Lang, site: SiteConfig): string {
	return lang === short(site.lang) ? "/" : `/${lang}/`;
}

// The address of one of the core's pages (privacy, cookies, thanks) in a language.
export function pathOf(
	key: keyof (typeof strings)["pt"]["paths"],
	lang: Lang,
	site: SiteConfig,
): string {
	return root(lang, site) + strings[lang].paths[key];
}

// The core's own pages that stay out of search engines, in every language of the site.
export function hiddenPaths(site: SiteConfig): string[] {
	return siteLangs(site).map(({ lang }) => pathOf("thanks", lang, site));
}
