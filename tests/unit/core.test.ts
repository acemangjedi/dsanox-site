import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import site from "../../site.config";

const walk = (d: string): string[] =>
	readdirSync(d, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
	);
const core = walk("src/core").map((f) => ({ f, text: readFileSync(f, "utf8") }));

// src/core/ is copied into every site: it reads the site's details from site.config.ts
// and its colours from the site's CSS variables.
it("src/core/ has no colours of its own", () => {
	const colours = core.filter(({ text }) =>
		/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/.test(text),
	);
	expect(colours.map((c) => c.f)).toEqual([]);
});

it("src/core/ does not name this site", () => {
	const own = [
		site.name,
		new URL(site.url).hostname,
		site.contacts.email,
		site.panel.siteKey,
	];
	const hits = core.filter(({ text }) => own.some((v) => text.includes(v)));
	expect(hits.map((c) => c.f)).toEqual([]);
});
