import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import site from "../../site.config";
import { sync } from "../../src/core/build/sync";

let root = "";
beforeEach(() => {
	root = mkdtempSync(join(tmpdir(), "sync-"));
});

const image = Buffer.from("webp-bytes");
const sha = createHash("sha256").update(image).digest("hex");
const base = `${site.panel.url}/api/v1/sites/${site.panel.siteKey}`;

// A fake panel: answers the content and the image, and records what was asked.
function panel(status = 200) {
	const asked: string[] = [];
	const fake = (async (url: string, init?: RequestInit) => {
		asked.push(url);
		expect(new Headers(init?.headers).get("authorization")).toBe("Bearer t");
		if (status !== 200) return new Response("no", { status });
		if (url === `${base}/content`) {
			return Response.json({
				contentVersion: 7,
				articles: [
					{ slug: "um-artigo", markdown: "---\ntitle: Um\n---\nTexto" },
				],
				media: [{ filename: "foto-1a2b3c4d.webp", sha256: sha }],
			});
		}
		if (url === `${base}/media/foto-1a2b3c4d.webp`) return new Response(image);
		return new Response("not found", { status: 404 });
	}) as typeof fetch;
	return { fake, asked };
}

// With the blog off there is nothing to bring from the panel.
describe.runIf(site.blog)("sync", () => {
	it("writes the articles, the images and build.json, and drops old articles", async () => {
		mkdirSync(join(root, "src/content/blog"), { recursive: true });
		writeFileSync(join(root, "src/content/blog/antigo.md"), "x");
		const { fake } = panel();
		await sync({ site, token: "t", root, fetch: fake });
		expect(readdirSync(join(root, "src/content/blog"))).toEqual([
			"um-artigo.md",
		]);
		expect(
			readFileSync(join(root, "public/assets/img/blog/foto-1a2b3c4d.webp")),
		).toEqual(image);
		expect(
			JSON.parse(readFileSync(join(root, "public/build.json"), "utf8")),
		).toEqual({
			contentVersion: 7,
		});
	});

	it("does not download an image it already has", async () => {
		mkdirSync(join(root, "public/assets/img/blog"), { recursive: true });
		writeFileSync(
			join(root, "public/assets/img/blog/foto-1a2b3c4d.webp"),
			image,
		);
		const { fake, asked } = panel();
		await sync({ site, token: "t", root, fetch: fake });
		expect(asked).toEqual([`${base}/content`]);
	});

	it("does nothing with the blog off", async () => {
		const { fake, asked } = panel();
		await sync({
			site: { ...site, blog: false },
			token: undefined,
			root,
			fetch: fake,
		});
		expect(asked).toEqual([]);
		expect(existsSync(join(root, "public"))).toBe(false);
	});

	it("fails when the panel cannot be reached or refuses, or the token is missing", async () => {
		await expect(
			sync({ site, token: "t", root, fetch: panel(503).fake }),
		).rejects.toThrow(/503/);
		await expect(
			sync({
				site,
				token: "t",
				root,
				fetch: (async () => {
					throw new TypeError("fetch failed");
				}) as typeof fetch,
			}),
		).rejects.toThrow(/fetch failed/);
		await expect(sync({ site, token: undefined, root })).rejects.toThrow(
			/PANEL_BUILD_TOKEN/,
		);
	});

	it("refuses a slug or file name that could leave its folder", async () => {
		const fake = (async () =>
			Response.json({
				contentVersion: 1,
				articles: [{ slug: "../../x", markdown: "" }],
				media: [],
			})) as unknown as typeof fetch;
		await expect(sync({ site, token: "t", root, fetch: fake })).rejects.toThrow(
			/bad article slug/,
		);
	});
});
