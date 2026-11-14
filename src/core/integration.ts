import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import type { AstroIntegration } from "astro";
import { externalizeInlineStyles } from "./build/externalize-inline-styles.mjs";
import { formatSitemaps } from "./build/format-sitemaps.mjs";
import type { SiteConfig } from "./config";
import {
	cloudflareHeaders,
	cloudflareRedirects,
	htaccessFiles,
} from "./hosting";

// Pages that are not for search engines (plus the site's own, in site.config.ts).
const HIDDEN = ["/obrigado/", "/404/", "/_preview/"];

// Writes the build's files, except those the site ships itself in public/ (already in
// dist/): a site moved to this template keeps its own .htaccess or robots.txt.
export function writeMissing(dist: string, files: Record<string, string>) {
	for (const [path, text] of Object.entries(files)) {
		const file = join(dist, path);
		if (existsSync(file)) continue;
		mkdirSync(dirname(file), { recursive: true });
		writeFileSync(file, text);
	}
}

// lastmod: for an article, its updatedDate or pubDate (the files come from the panel,
// not from git); for a page, the date of the last commit of its source file.
// Hosts that build from the repo (Hostinger, Cloudflare) clone only the last commit,
// which would give every page the date of the last publish: then pages get none.
const shallow =
	execSync("git rev-parse --is-shallow-repository").toString().trim() ===
	"true";

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
	if (!file || shallow) return undefined;
	const date = execSync(`git log -1 --format=%cI -- "${file}"`)
		.toString()
		.trim();
	return date || undefined;
}

// An article the client asked to keep out of Google stays out of the sitemap too.
export function noindexed(pathname: string): boolean {
	const m = pathname.match(/^\/blog\/([^/]+)\/?$/);
	const file = m && `src/content/blog/${m[1]}.md`;
	return Boolean(
		file &&
			existsSync(file) &&
			/^noindex: true$/m.test(readFileSync(file, "utf8")),
	);
}

// Everything every site does at build time: sitemap, robots.txt and the post-build steps.
export default function core(site: SiteConfig): AstroIntegration[] {
	const hidden = [...HIDDEN, ...site.hidden];
	return [
		sitemap({
			filter: (page) =>
				!hidden.some((p) => new URL(page).pathname === p) &&
				!noindexed(new URL(page).pathname),
			serialize: (item) => ({ ...item, lastmod: lastmodFor(item.url) }),
		}),
		{
			name: "site-core",
			hooks: {
				// The site's own src/preview.astro: the article page that the panel's editor fills.
				"astro:config:setup": ({ injectRoute }) => {
					injectRoute({
						pattern: "/_preview",
						entrypoint: "./src/preview.astro",
					});
				},
				"astro:build:done": ({ dir }) => {
					const dist = fileURLToPath(dir);
					externalizeInlineStyles(dist);
					formatSitemaps(dist);
					writeMissing(dist, {
						"robots.txt": `User-agent: *\nAllow: /\n${hidden.map((p) => `Disallow: ${p}`).join("\n")}\n\nSitemap: ${site.url}sitemap-index.xml\n`,
						_headers: cloudflareHeaders(site),
						_redirects: cloudflareRedirects(site),
						...htaccessFiles(site),
					});
				},
			},
		},
	];
}
