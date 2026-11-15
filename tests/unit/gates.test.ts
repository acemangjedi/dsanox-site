import { describe, expect, it } from "vitest";
import {
	designFails,
	findPhrases,
	lighthouseFails,
	pagesOf,
	parsePhrases,
} from "../../src/core/build/gates";
import { defineSite } from "../../src/core/config";

const site = defineSite({
	name: "Empresa",
	url: "https://www.empresa.pt/",
	lang: "pt-PT",
	locales: ["en-GB"],
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
	hidden: ["/direcoes/"],
});

describe("quality gates", () => {
	it("reads the phrases of each language", () => {
		const list = parsePhrases(
			"# note\n[pt]\n# Chavões\nde excelência\nTela\n\n[en]\nseamless\n",
		);
		expect(list).toEqual({ pt: ["de excelência", "tela"], en: ["seamless"] });
	});

	it("finds a phrase as whole words, whatever the case", () => {
		const pt = ["de excelência", "tela", "contato"];
		expect(findPhrases("Uma equipa De Excelência.", pt)).toEqual([
			"de excelência",
		]);
		expect(findPhrases("Veja a tabela de contactos.", pt)).toEqual([]);
		expect(findPhrases("anything", undefined)).toEqual([]);
	});

	it("checks every page except the hidden ones", () => {
		const pages = pagesOf(
			[
				"index.html",
				"servicos/index.html",
				"obrigado/index.html",
				"en/thank-you/index.html",
				"direcoes/a/index.html",
				"_preview/index.html",
				"404.html",
				"sitemap-0.xml",
			],
			site,
		);
		expect(pages).toEqual([
			{ path: "/", indexed: true },
			{ path: "/en/thank-you/", indexed: false },
			{ path: "/obrigado/", indexed: false },
			{ path: "/servicos/", indexed: true },
		]);
	});

	it("asks Lighthouse for 95 in performance and 100 in the rest", () => {
		const ok = {
			performance: 95,
			accessibility: 100,
			"best-practices": 100,
			seo: 100,
		};
		expect(lighthouseFails(ok, true)).toEqual([]);
		expect(lighthouseFails({ ...ok, performance: 94 }, true)).toEqual([
			"performance",
		]);
		expect(lighthouseFails({ ...ok, seo: 69 }, true)).toEqual(["seo"]);
		expect(lighthouseFails({ ...ok, seo: 69 }, false)).toEqual([]);
	});

	it("fails a DESIGN.md on a contrast warning", () => {
		expect(
			designFails([
				{ severity: "warning", rule: "orphaned-tokens", message: "a" },
				{ severity: "warning", rule: "contrast-ratio", message: "b" },
				{ severity: "error", rule: "x", message: "c" },
			]),
		).toEqual(["b", "c"]);
	});
});
