// Runs before every build: fetches the site's published articles and images from the
// panel. With the blog off it does nothing. If the panel cannot be reached the build
// fails, rather than publishing an empty blog.
import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import type { SiteConfig } from "../config";

type Content = {
	contentVersion: number;
	// lang: on a site with languages, the one this article is in.
	articles: { slug: string; lang?: string; markdown: string }[];
	media: { filename: string; sha256: string }[];
};

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const IMAGE = /^[a-z0-9-]+\.webp$/;

export async function sync(opts: {
	site: SiteConfig;
	token: string | undefined;
	root?: string;
	fetch?: typeof fetch;
}): Promise<string> {
	const { site, token, root = ".", fetch: get = fetch } = opts;
	if (!site.blog) return "blog off: nothing to sync";
	if (!token) throw new Error("PANEL_BUILD_TOKEN is not set");
	const base = `${site.panel.url}/api/v1/sites/${site.panel.siteKey}`;
	const headers = { authorization: `Bearer ${token}` };

	const res = await get(`${base}/content`, { headers });
	if (!res.ok) throw new Error(`panel answered ${res.status} for the content`);
	const content = (await res.json()) as Content;

	const posts = join(root, "src/content/blog");
	mkdirSync(posts, { recursive: true });
	// Articles of a site with languages go in a folder for each: blog/en/<slug>.md.
	for (const f of readdirSync(posts, { recursive: true, encoding: "utf8" })) {
		if (f.endsWith(".md")) rmSync(join(posts, f));
	}
	for (const a of content.articles) {
		if (!SLUG.test(a.slug)) throw new Error(`bad article slug: ${a.slug}`);
		if (a.lang && !/^[a-z]{2}$/.test(a.lang))
			throw new Error(`bad article language: ${a.lang}`);
		mkdirSync(join(posts, a.lang ?? ""), { recursive: true });
		writeFileSync(join(posts, a.lang ?? "", `${a.slug}.md`), a.markdown);
	}

	const images = join(root, "public/assets/img/blog");
	mkdirSync(images, { recursive: true });
	for (const m of content.media) {
		if (!IMAGE.test(m.filename)) throw new Error(`bad image: ${m.filename}`);
		const file = join(images, m.filename);
		const same =
			existsSync(file) &&
			createHash("sha256").update(readFileSync(file)).digest("hex") ===
				m.sha256;
		if (same) continue;
		const img = await get(`${base}/media/${m.filename}`, { headers });
		if (!img.ok)
			throw new Error(`panel answered ${img.status} for ${m.filename}`);
		writeFileSync(file, Buffer.from(await img.arrayBuffer()));
	}

	// The panel reads this after a publish to know the new version is live.
	writeFileSync(
		join(root, "public/build.json"),
		JSON.stringify({ contentVersion: content.contentVersion }),
	);
	return `${content.articles.length} articles, ${content.media.length} images, version ${content.contentVersion}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const { default: site } = await import("../../../site.config");
	console.log(
		`sync: ${await sync({ site, token: process.env.PANEL_BUILD_TOKEN })}`,
	);
}
