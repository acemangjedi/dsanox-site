// After the build: turns style="..." attributes in dist/ HTML into classes in an
// external CSS file, so the CSP needs no 'unsafe-inline' in style-src.
// Declarations get !important to keep the precedence of an inline style.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 8);

export function externalizeInlineStyles(DIST) {
	const htmlFiles = readdirSync(DIST, { recursive: true })
		.filter((f) => f.endsWith(".html"))
		.map((f) => join(DIST, f));

	const rules = new Map();
	const pages = htmlFiles.map((file) => {
		const html = readFileSync(file, "utf8").replace(
			/<[a-zA-Z][^>]*\sstyle="[^"]*"[^>]*>/g,
			(tag) => {
				const css = tag.match(/\sstyle="([^"]*)"/)[1].replaceAll("&quot;", '"');
				const cls = `s-${hash(css)}`;
				rules.set(cls, css);
				const noStyle = tag.replace(/\sstyle="[^"]*"/, "");
				return /\sclass="/.test(noStyle)
					? noStyle.replace(/\sclass="/, ` class="${cls} `)
					: noStyle.replace(/^<[a-zA-Z][\w-]*/, `$& class="${cls}"`);
			},
		);
		return { file, html };
	});

	const css = [...rules]
		.map(([cls, decls]) => {
			const important = decls
				.split(";")
				.map((d) => d.trim())
				.filter(Boolean)
				.map((d) => `${d} !important`)
				.join(";");
			return `.${cls}{${important}}`;
		})
		.join("\n");
	const cssHref = `/_astro/inline-styles.${hash(css)}.css`;
	writeFileSync(join(DIST, cssHref), css);

	for (const { file, html } of pages) {
		writeFileSync(
			file,
			html.replace(
				"</head>",
				`<link rel="stylesheet" href="${cssHref}"></head>`,
			),
		);
	}
	return rules.size;
}
