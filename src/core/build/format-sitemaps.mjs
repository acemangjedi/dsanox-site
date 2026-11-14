// Formats the sitemaps from @astrojs/sitemap: one tag per line, indented.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

export function formatSitemaps(dist) {
	for (const file of readdirSync(dist).filter((f) =>
		/^sitemap-(index|\d+)\.xml$/.test(f),
	)) {
		let depth = 0;
		const lines = readFileSync(`${dist}/${file}`, "utf8")
			.replace(/></g, ">\n<")
			.split("\n")
			.map((line) => {
				if (line.startsWith("</")) depth--;
				const out = "\t".repeat(depth) + line;
				if (
					!/^<[?/]/.test(line) &&
					!line.includes("</") &&
					!line.endsWith("/>")
				)
					depth++;
				return out;
			});
		writeFileSync(`${dist}/${file}`, `${lines.join("\n")}\n`);
	}
}
