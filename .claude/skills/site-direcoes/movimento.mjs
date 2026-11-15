// Records how a page moves: a sequence of frames of it being scrolled and hovered, and a list
// of the animations, transitions and motion libraries it uses. For reference sites and our own.
//
//   node .claude/skills/site-direcoes/movimento.mjs https://exemplo.pt/ [--out docs/referencias]
//
// Uses the Chromium at $PW_CHROMIUM when set. Look at the frames in order: the list only says
// where to look.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const i = args.indexOf("--out");
const out = i < 0 ? "docs/referencias" : args.splice(i, 2)[1];
const url = args[0];
const name = new URL(url).hostname.replace(/^www\./, "");

const dir = `${out}/${name}`;
mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({
	executablePath: process.env.PW_CHROMIUM || undefined,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
let n = 0;
const frame = () =>
	page.screenshot({
		path: `${dir}/${String(++n).padStart(3, "0")}.jpg`,
		quality: 60,
	});
await page.goto(url, { waitUntil: "networkidle" });
// The entrance: four frames in the first two seconds.
for (let k = 0; k < 4; k++) {
	await frame();
	await page.waitForTimeout(500);
}

// Sweep the mouse over the first screen, for effects that follow the cursor.
for (let x = 100; x <= 1180; x += 60) {
	await page.mouse.move(x, 200 + (x % 400));
	await page.waitForTimeout(40);
	if (x % 360 === 100) await frame();
}

// Scroll to the end, slowly, hovering what can be clicked on the way.
const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 200) {
	await page.mouse.wheel(0, 200);
	// One frame in the middle of the movement and one after it settles.
	await page.waitForTimeout(120);
	await frame();
	await page.waitForTimeout(400);
	await frame();
	if (y % 800 === 0) {
		const targets = await page
			.locator("a:visible, button:visible, img:visible")
			.all();
		let hovered = 0;
		for (const target of targets) {
			if (hovered === 4) break;
			const box = await target.boundingBox();
			if (!box || box.y < 0 || box.y > 800) continue;
			await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
				steps: 5,
			});
			await page.waitForTimeout(350);
			await frame();
			hovered++;
		}
	}
}

const found = await page.evaluate(() => {
	const count = (test) =>
		[...document.querySelectorAll("*")].filter((el) => test(getComputedStyle(el)))
			.length;
	const libraries = {
		GSAP: "gsap" in window,
		ScrollTrigger: "ScrollTrigger" in window,
		Lenis: "lenis" in window || document.documentElement.classList.contains("lenis"),
		"Locomotive Scroll": !!document.querySelector("[data-scroll-container]"),
		AOS: !!document.querySelector("[data-aos]"),
		"Framer Motion": !!document.querySelector("[data-framer-name]"),
		Swiper: !!document.querySelector(".swiper"),
		Lottie: !!document.querySelector("lottie-player, dotlottie-player"),
		"Three.js / WebGL": !!document.querySelector("canvas"),
		Barba: "barba" in window,
	};
	return {
		libraries: Object.keys(libraries).filter((k) => libraries[k]),
		withTransition: count((s) => s.transitionDuration !== "0s"),
		withAnimation: count((s) => s.animationName !== "none"),
		running: document.getAnimations().length,
		customCursor: count((s) => s.cursor === "none") > 0,
		stickyOrFixed: count((s) => s.position === "sticky" || s.position === "fixed"),
		video: document.querySelectorAll("video").length,
	};
});

await browser.close();
console.log(`${dir}/  (${n} frames)`);
console.log(JSON.stringify(found, null, 2));
