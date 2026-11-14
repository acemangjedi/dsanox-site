import { describe, expect, it } from "vitest";
import site from "../../site.config";
import { defineSite } from "../../src/core/config";

const valid = {
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

describe("site.config.ts", () => {
	it("the template's own config is valid", () => {
		expect(site.name).toBeTruthy();
	});

	it("accepts a minimal config and fills the defaults", () => {
		const s = defineSite(valid);
		expect(s.analytics).toEqual({});
		expect(s.org.sameAs).toEqual([]);
	});

	it("names each missing or wrong field in the error", () => {
		const { name: _, ...noName } = valid;
		// @ts-expect-error name is required
		expect(() => defineSite(noName)).toThrow(/- name: /);
		expect(() =>
			defineSite({ ...valid, url: "http://www.empresa.pt" }),
		).toThrow(/- url: must start with https:\/\/ and end with \//);
		expect(() =>
			defineSite({ ...valid, contacts: { email: "x" } }),
		).toThrow(/- contacts\.email: /);
		expect(() =>
			defineSite({
				...valid,
				panel: { url: "http://painel.exemplo.pt", siteKey: "k" },
			}),
		).toThrow(/- panel\.url: must be https:\/\//);
	});
});
