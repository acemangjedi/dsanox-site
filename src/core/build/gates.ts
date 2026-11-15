// The parts of the quality gates (pnpm portao) that are plain logic, kept apart so they can
// be tested without a browser.
import type { SiteConfig } from "../config";
import { hiddenPaths } from "../i18n";

// The phrases file: one phrase per line, in [pt], [en] and [fr] parts.
export function parsePhrases(file: string): Record<string, string[]> {
	const out: Record<string, string[]> = {};
	let lang = "";
	for (const raw of file.split("\n")) {
		const line = raw.trim();
		const part = /^\[(\w+)\]$/.exec(line);
		if (part) lang = part[1];
		else if (line && !line.startsWith("#") && lang)
			out[lang] = [...(out[lang] ?? []), line.toLowerCase()];
	}
	return out;
}

// The phrases of a language found in a text, as whole words.
export function findPhrases(text: string, phrases: string[] = []): string[] {
	return phrases.filter((p) =>
		new RegExp(
			`(?<!\\p{L})${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?!\\p{L})`,
			"iu",
		).test(text),
	);
}

// The pages the gates look at, from the files of the built site. Pages the site hides
// (site.hidden) and the panel's preview are left out. A thank-you page is checked, but
// it is kept out of search engines on purpose, so its SEO score does not count.
export function pagesOf(
	files: string[],
	site: SiteConfig,
): { path: string; indexed: boolean }[] {
	const skip = ["/_preview/", "/404/", ...site.hidden];
	const noindex = hiddenPaths(site);
	return files
		.filter((f) => f.endsWith("index.html"))
		.map((f) => `/${f.slice(0, -"index.html".length)}`)
		.filter((p) => !skip.some((s) => p.startsWith(s)))
		.sort()
		.map((path) => ({ path, indexed: !noindex.includes(path) }));
}

// What Lighthouse has to give a page: performance 95, the rest 100.
export function lighthouseFails(
	scores: Record<string, number>,
	indexed: boolean,
): string[] {
	const need: Record<string, number> = {
		performance: 95,
		accessibility: 100,
		"best-practices": 100,
		...(indexed ? { seo: 100 } : {}),
	};
	return Object.keys(need).filter((k) => (scores[k] ?? 0) < need[k]);
}

// A DESIGN.md passes with no errors and no contrast warnings.
export function designFails(
	findings: { severity: string; rule: string; message: string }[],
): string[] {
	return findings
		.filter((f) => f.severity === "error" || f.rule === "contrast-ratio")
		.map((f) => f.message);
}
