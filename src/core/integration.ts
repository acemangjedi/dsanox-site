import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import type { AstroIntegration } from "astro";
import { externalizeInlineStyles } from "./build/externalize-inline-styles.mjs";
import { formatSitemaps } from "./build/format-sitemaps.mjs";

// Pages that are not for search engines.
const HIDDEN = ["/obrigado/", "/404/", "/_preview/"];

// lastmod: for an article, its updatedDate or pubDate (the files come from the panel,
// not from git); for a page, the date of the last commit of its source file.
function lastmodFor(url: string) {
	const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
	if (path.startsWith("blog/")) {
		const file = `src/content/blog/${path.slice(5)}.md`;
		if (!existsSync(file)) return undefined;
		const fm = readFileSync(file, "utf8");
		const date = (fm.match(/^updatedDate: ['"]?([\d-]+)/m) ??
			fm.match(/^pubDate: ['"]?([\d-]+)/m))?.[1];
		return date ? new Date(date).toISOString() : undefined;
	}
	const candidates = [
		`src/pages/${path || "index"}.astro`,
		`src/pages/${path}/index.astro`,
	];
	const file = candidates.find((f) => existsSync(f));
	if (!file) return undefined;
	const date = execSync(`git log -1 --format=%cI -- "${file}"`)
		.toString()
		.trim();
	return date || undefined;
}

// Everything every site does at build time: sitemap, robots.txt and the post-build steps.
export default function core(siteUrl: string): AstroIntegration[] {
	return [
		sitemap({
			filter: (page) => !HIDDEN.some((p) => new URL(page).pathname === p),
			serialize: (item) => ({ ...item, lastmod: lastmodFor(item.url) }),
		}),
		{
			name: "site-core",
			hooks: {
				"astro:build:done": ({ dir }) => {
					const dist = fileURLToPath(dir);
					externalizeInlineStyles(dist);
					formatSitemaps(dist);
					writeFileSync(
						`${dist}/robots.txt`,
						`User-agent: *\nAllow: /\n${HIDDEN.map((p) => `Disallow: ${p}`).join("\n")}\n\nSitemap: ${siteUrl}sitemap-index.xml\n`,
					);
				},
			},
		},
	];
}
