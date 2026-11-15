// pnpm portao: the quality gates that can be measured, run over the built site.
// Writes docs/portao.md and ends with an error when a gate fails.
//
//   pnpm portao                       every gate
//   pnpm portao tiques lighthouse     only these (build, tiques, desenho, lighthouse, acessibilidade)
//
// The gates a script cannot measure (facts, remake, critic, the owner's approval) are in the
// site-rever skill. Uses the Chromium at $PW_CHROMIUM when set.
import { execFile, execFileSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "@playwright/test";
import site from "../../../site.config";
import {
	designFails,
	findPhrases,
	lighthouseFails,
	pagesOf,
	parsePhrases,
} from "./gates";

const PORT = 4322;
const CDP = 9333;
const BASE = `http://127.0.0.1:${PORT}`;
const PHRASES = ".claude/skills/site-rever/frases.txt";
const WIDTHS = [1280, 390];
const chrome = process.env.PW_CHROMIUM || chromium.executablePath();

const all = ["build", "tiques", "desenho", "lighthouse", "acessibilidade"];
const asked = process.argv.slice(2);
const unknown = asked.filter((g) => !all.includes(g));
if (unknown.length) {
	console.error(`Unknown gate: ${unknown.join(", ")}. Use: ${all.join(", ")}`);
	process.exit(2);
}
const on = (gate: string) => !asked.length || asked.includes(gate);

type Result = { gate: string; pass: boolean; measure: string; notes: string[] };
const results: Result[] = [];
const done = (gate: string, notes: string[], measure: string) => {
	const r = { gate, pass: notes.length === 0, measure, notes };
	results.push(r);
	console.log(`${r.pass ? "✓" : "✗"} ${gate}: ${measure}`);
	for (const n of notes) console.log(`    ${n}`);
};

// Runs a command and gives what it printed, whatever its exit code. Not blocking, because
// the site is served from this same process.
const run = (cmd: string, args: string[], env: Record<string, string> = {}) =>
	new Promise<{ ok: boolean; stdout: string }>((resolve) =>
		execFile(
			cmd,
			args,
			{ env: { ...process.env, ...env }, maxBuffer: 64 * 1024 * 1024 },
			(error, stdout) => resolve({ ok: !error, stdout }),
		),
	);

// 1. Build and tests.
if (on("build")) {
	const failed: string[][] = [];
	for (const args of [["run", "ci"], ["test:e2e"]])
		if (!(await run("pnpm", args)).ok) failed.push(args);
	done(
		"Build e testes",
		failed.map((a) => `pnpm ${a.join(" ")} falhou`),
		"pnpm run ci e pnpm test:e2e",
	);
}
if (!existsSync("dist/index.html"))
	execFileSync("pnpm", ["build:local"], { stdio: "inherit" });

// 3. The design file.
if (on("desenho")) {
	if (existsSync("DESIGN.md")) {
		const out = await run("design.md", [
			"lint",
			"DESIGN.md",
			"--format",
			"json",
		]);
		const report = JSON.parse(out.stdout);
		done(
			"Desenho",
			designFails(report.findings),
			`DESIGN.md: ${report.summary.errors} erros, ${report.summary.warnings} avisos`,
		);
	} else done("Desenho", [], "não se aplica: o site não tem DESIGN.md");
}

const files = readdirSync("dist", { recursive: true }) as string[];
const pages = pagesOf(
	files.map((f) => f.replaceAll("\\", "/")),
	site,
);
const lighthouseRows: string[] = [];

if (on("tiques") || on("acessibilidade") || on("lighthouse")) {
	// Serves dist/ as a static host does.
	const types: Record<string, string> = {
		".html": "text/html; charset=utf-8",
		".css": "text/css",
		".js": "text/javascript",
		".svg": "image/svg+xml",
		".json": "application/json",
		".xml": "application/xml",
	};
	const server = createServer((req, res) => {
		let file = join("dist", decodeURIComponent((req.url ?? "/").split("?")[0]));
		if (existsSync(file) && statSync(file).isDirectory())
			file = join(file, "index.html");
		const found = existsSync(file) && file.startsWith("dist");
		if (!found) file = "dist/404.html";
		const type = types[extname(file)];
		res.writeHead(found ? 200 : 404, type ? { "Content-Type": type } : {});
		res.end(readFileSync(file));
	}).listen(PORT, "127.0.0.1");
	try {
		// 2 and 7. Signs of a site made in a hurry, and accessibility, page by page.
		if (on("tiques") || on("acessibilidade")) {
			const phrases = parsePhrases(readFileSync(PHRASES, "utf8"));
			const tics: string[] = [];
			const a11y: string[] = [];
			const browser = await chromium.launch({
				executablePath: chrome,
				args: [`--remote-debugging-port=${CDP}`],
			});
			const page = await (await browser.newContext()).newPage();
			for (const { path } of pages) {
				for (const width of WIDTHS) {
					await page.setViewportSize({ width, height: 900 });
					await page.goto(BASE + path, { waitUntil: "networkidle" });
					const where = `${path} (${width} px)`;
					if (on("acessibilidade")) {
						const { violations } = await new AxeBuilder({ page }).analyze();
						for (const v of violations)
							a11y.push(`${where}: ${v.id}, ${v.nodes.length} elemento(s)`);
					}
					if (on("tiques")) {
						const out = await run(
							"impeccable",
							[
								"detect",
								"--cdp",
								`${CDP}`,
								"--target",
								BASE + path,
								"--json",
								"--no-advisory",
							],
							{ DO_NOT_TRACK: "1" },
						);
						for (const f of JSON.parse(out.stdout || "[]"))
							tics.push(`${where}: ${f.name} (${f.snippet})`);
					}
				}
				if (on("tiques")) {
					const { lang, text } = await page.evaluate(() => ({
						lang: document.documentElement.lang.slice(0, 2),
						text: [
							document.title,
							document
								.querySelector('meta[name="description"]')
								?.getAttribute("content"),
							// The text people see, not what is hidden or in scripts.
							// biome-ignore lint/performance/useDomNodeTextContent: see above
							document.body.innerText,
						].join("\n"),
					}));
					for (const p of findPhrases(text, phrases[lang]))
						tics.push(`${path}: «${p}»`);
				}
			}
			await browser.close();
			const n = `${pages.length} páginas a ${WIDTHS.join(" e ")} px`;
			if (on("tiques")) done("Tiques de IA", tics, n);
			if (on("acessibilidade")) done("Acessibilidade", a11y, n);
		}

		// 6. Lighthouse, as a phone, on every page.
		if (on("lighthouse")) {
			const fails: string[] = [];
			for (const { path, indexed } of pages) {
				const out = await run(
					"lighthouse",
					[
						BASE + path,
						"--quiet",
						"--chrome-flags=--headless=new --no-sandbox",
						"--output=json",
						"--output-path=stdout",
					],
					{ CHROME_PATH: chrome },
				);
				const lhr = JSON.parse(out.stdout);
				const scores = Object.fromEntries(
					Object.entries<{ score: number }>(lhr.categories).map(([k, c]) => [
						k,
						Math.round(c.score * 100),
					]),
				);
				const audit = (id: string) => lhr.audits[id].numericValue;
				lighthouseRows.push(
					`| ${path} | ${scores.performance} | ${scores.accessibility} | ${scores["best-practices"]} | ${indexed ? scores.seo : "oculta"} | ${Math.round(audit("largest-contentful-paint"))} ms | ${audit("cumulative-layout-shift").toFixed(3)} | ${Math.round(audit("total-byte-weight") / 1024)} kB |`,
				);
				for (const k of lighthouseFails(scores, indexed))
					fails.push(`${path}: ${k} ${scores[k]}`);
			}
			done("Lighthouse", fails, `${pages.length} páginas, em telemóvel`);
		}
	} finally {
		server.close();
	}
}

const pass = results.every((r) => r.pass);
const report = [
	`# Portões medidos: ${site.name}`,
	"",
	`Corrido a ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC com \`pnpm portao${asked.length ? ` ${asked.join(" ")}` : ""}\`.`,
	"",
	pass
		? "**Passam todos os portões corridos.**"
		: "**Há portões que não passam.**",
	"",
	"| Portão | Resultado | Medida |",
	"|---|---|---|",
	...results.map(
		(r) => `| ${r.gate} | ${r.pass ? "passa" : "não passa"} | ${r.measure} |`,
	),
	...results
		.filter((r) => !r.pass)
		.flatMap((r) => ["", `## ${r.gate}`, "", ...r.notes.map((n) => `- ${n}`)]),
	...(lighthouseRows.length
		? [
				"",
				"## Lighthouse",
				"",
				"| Página | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | Peso |",
				"|---|---|---|---|---|---|---|---|",
				...lighthouseRows,
			]
		: []),
	"",
	"Os portões dos factos, do remake e do crítico, e a aprovação, fazem-se com a skill site-rever.",
	"",
].join("\n");
mkdirSync("docs", { recursive: true });
writeFileSync("docs/portao.md", report);
// The repository's formatter also checks Markdown.
await run("biome", ["format", "--write", "docs/portao.md"]);
console.log(`\ndocs/portao.md  ${pass ? "passa" : "não passa"}`);
process.exit(pass ? 0 : 1);
