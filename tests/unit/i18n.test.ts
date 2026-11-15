import { describe, expect, it } from "vitest";
import { defineSite } from "../../src/core/config";
import { hiddenPaths, langOf, pathOf, t } from "../../src/core/i18n";

const base = {
	name: "Empresa",
	url: "https://www.empresa.pt/",
	lang: "pt-PT",
	org: {
		type: "Organization",
		description: "D",
		logo: "/logo.svg",
		ogImage: "/og.jpg",
	},
	contacts: { email: "geral@empresa.pt" },
	blog: false,
	panel: { url: "https://painel.exemplo.pt", siteKey: "k" },
	forms: {},
};

describe("languages", () => {
	const three = defineSite({ ...base, locales: ["en-GB", "fr-FR"] });

	it("reads the language from the address", () => {
		expect(langOf("/", three)).toBe("pt");
		expect(langOf("/sobre-nos/", three)).toBe("pt");
		expect(langOf("/en/about/", three)).toBe("en");
		expect(langOf("/fr/", three)).toBe("fr");
	});

	it("does not take a page called /en/ for a language the site does not have", () => {
		expect(langOf("/en/", defineSite(base))).toBe("pt");
	});

	it("puts the core's pages under each language", () => {
		expect(pathOf("privacy", "pt", three)).toBe("/politica-de-privacidade/");
		expect(pathOf("privacy", "en", three)).toBe("/en/privacy-policy/");
		expect(hiddenPaths(three)).toEqual([
			"/obrigado/",
			"/en/thank-you/",
			"/fr/merci/",
		]);
	});

	it("an English-only site keeps its pages at the root", () => {
		const en = defineSite({ ...base, lang: "en-GB" });
		expect(pathOf("thanks", "en", en)).toBe("/thank-you/");
	});

	it("refuses a language the core has no words for", () => {
		expect(() => defineSite({ ...base, locales: ["de-DE"] })).toThrow(
			/locales/,
		);
	});

	it("every language has the same words", () => {
		const keys = (o: object) => Object.keys(o).sort();
		expect(keys(t("en"))).toEqual(keys(t("pt")));
		expect(keys(t("fr"))).toEqual(keys(t("pt")));
	});
});
