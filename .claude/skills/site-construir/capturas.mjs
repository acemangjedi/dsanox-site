// Full-page screenshots of the site's pages at 1280 and 390 px, to look at before moving on.
//
//   pnpm preview &                                     (or any running copy of the site)
//   node .claude/skills/site-construir/capturas.mjs / /servicos/ /en/
//
// Options: --base http://127.0.0.1:4321   --out docs/capturas
// Uses the Chromium at $PW_CHROMIUM when set.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	return i < 0 ? fallback : args.splice(i, 2)[1];
};
const base = opt("base", "http://127.0.0.1:4321");
const out = opt("out", "docs/capturas");
const paths = args.length ? args : ["/"];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
	executablePath: process.env.PW_CHROMIUM || undefined,
});
for (const path of paths) {
	const name = path.replace(/^\/|\/$/g, "").replaceAll("/", "_") || "inicio";
	for (const width of [1280, 390]) {
		const page = await browser.newPage({
			viewport: { width, height: 900 },
			deviceScaleFactor: 1,
			reducedMotion: "reduce",
		});
		await page.goto(base + path, { waitUntil: "networkidle" });
		// Go down the page first, so images that load late are there for the picture.
		const height = await page.evaluate(() => document.documentElement.scrollHeight);
		for (let y = 0; y < height; y += 600) {
			await page.mouse.wheel(0, 600);
			await page.waitForTimeout(100);
		}
		await page.evaluate(() => window.scrollTo(0, 0));
		await page.waitForLoadState("networkidle");
		const file = `${out}/${name}-${width}.png`;
		await page.screenshot({ path: file, fullPage: true });
		// A page wider than the screen is the most common fault on a phone.
		const over = await page.evaluate(
			() => document.documentElement.scrollWidth - window.innerWidth,
		);
		console.log(file + (over > 0 ? `  (${over}px wider than the screen)` : ""));
		await page.close();
	}
}
await browser.close();
