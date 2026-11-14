import { describe, expect, it } from "vitest";
import site from "../../site.config";
import { defineSite } from "../../src/core/config";
import {
	cloudflareHeaders,
	cloudflareRedirects,
	htaccessFiles,
} from "../../src/core/hosting";

// What a browser gets for a path on each host, read back from the generated files.
function fromCloudflare(text: string, path: string) {
	const out: Record<string, string> = {};
	for (const block of text.trim().split("\n\n")) {
		const [rule, ...lines] = block.split("\n");
		if (!path.startsWith(rule.replace(/\*$/, ""))) continue;
		for (const line of lines) {
			const detach = line.match(/^ {2}! (.+)$/);
			if (detach) {
				delete out[detach[1]];
				continue;
			}
			const [, k, v] = line.match(/^ {2}([^:]+): (.*)$/) ?? [];
			out[k] = out[k] ? `${out[k]}, ${v}` : v;
		}
	}
	return out;
}

function fromApache(files: Record<string, string>, path: string) {
	const out: Record<string, string> = {};
	const dirs = Object.keys(files)
		.map((f) => `/${f.replace(/\.htaccess$/, "")}`)
		.filter((d) => path.startsWith(d))
		.sort((a, b) => a.length - b.length);
	for (const d of dirs) {
		for (const [, k, v] of files[`${d.slice(1)}.htaccess`].matchAll(
			/Header always set (\S+) "([^"]*)"/g,
		)) {
			out[k] = v;
		}
	}
	return out;
}

const PATHS = [
	"/",
	"/blog/um-artigo/",
	"/_preview/",
	"/_astro/a.js",
	"/fonts/b.woff2",
];

describe("hosting files", () => {
	for (const s of [
		site,
		defineSite({ ...site, analytics: { ga: "G-ABC123" } }),
	]) {
		it(`give the same headers on Hostinger and Cloudflare (analytics ${s.analytics.ga ? "on" : "off"})`, () => {
			const apache = htaccessFiles(s);
			const cf = cloudflareHeaders(s);
			for (const path of PATHS) {
				expect(fromCloudflare(cf, path), path).toEqual(
					fromApache(apache, path),
				);
			}
		});
	}

	it("let only the panel frame the preview page", () => {
		const cf = cloudflareHeaders(site);
		expect(fromCloudflare(cf, "/")["Content-Security-Policy"]).toMatch(
			/frame-ancestors 'none'$/,
		);
		expect(fromCloudflare(cf, "/_preview/")["Content-Security-Policy"]).toMatch(
			/frame-ancestors https:\/\/painel\.simplelife\.uno$/,
		);
	});

	it("allow analytics hosts only when the site uses analytics", () => {
		const off = fromCloudflare(cloudflareHeaders(site), "/");
		const on = fromCloudflare(
			cloudflareHeaders(defineSite({ ...site, analytics: { ga: "G-ABC123" } })),
			"/",
		);
		expect(off["Content-Security-Policy"]).not.toContain("googletagmanager");
		expect(on["Content-Security-Policy"]).toContain(
			"https://www.googletagmanager.com",
		);
	});

	it("write the same redirects for both hosts", () => {
		const s = defineSite({ ...site, redirects: { "/antigo/": "/novo/" } });
		expect(cloudflareRedirects(s)).toBe("/antigo/ /novo/ 301\n");
		expect(htaccessFiles(s)[".htaccess"]).toContain(
			"Redirect 301 /antigo/ /novo/",
		);
	});
});
