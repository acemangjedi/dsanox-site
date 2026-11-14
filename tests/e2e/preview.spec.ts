import { expect, type Page, test } from "@playwright/test";
import site from "../../site.config";

const article = {
	title: "Como poupar no IRS",
	description: "Cinco deduções que quase toda a gente esquece.",
	pubDate: "2026-03-05",
	updatedDate: "2026-04-10",
	author: "Ana Lopes",
	bodyMd:
		"## Saúde\n\nGuarde as **faturas**.\n\n- farmácia\n- consultas\n\n![Gráfico](/assets/img/blog/grafico.webp)\n",
};

// A page at `origin` that frames the site's preview and, like the panel's editor,
// answers its "ready" message with the article and a new image.
async function openIn(page: Page, origin: string) {
	// The site at its real address, served from the local build.
	await page.route(`${site.url}**`, async (route) => {
		const { pathname } = new URL(route.request().url());
		await route.fulfill({
			response: await route.fetch({ url: `http://127.0.0.1:4321${pathname}` }),
		});
	});
	await page.route(`${origin}/editor`, (route) =>
		route.fulfill({
			contentType: "text/html; charset=utf-8",
			body: `<iframe src="${site.url}_preview/" width="1200" height="900"></iframe>
<script>
addEventListener("message", async (e) => {
	if (e.data?.type !== "preview-ready") return;
	const c = document.createElement("canvas");
	c.width = c.height = 4;
	const blob = await new Promise((r) => c.toBlob(r));
	e.source.postMessage({ type: "preview", article: ${JSON.stringify(article)}, images: { "grafico.webp": blob } }, "*");
});
</script>`,
		}),
	);
	await page.goto(`${origin}/editor`);
	return page.frameLocator("iframe");
}

test("the preview shows the article sent by the panel as the article page does", async ({
	page,
}) => {
	const frame = await openIn(page, new URL(site.panel.url).origin);
	await expect(frame.locator("h1")).toHaveText(article.title);
	await expect(frame.locator(".breadcrumb")).toContainText(article.title);
	await expect(frame.locator(".lead")).toHaveText(article.description);
	await expect(frame.locator(".article-meta")).toContainText(
		"5 de março de 2026",
	);
	await expect(frame.locator(".article-meta")).toContainText(
		"Atualizado em 10 de abril de 2026",
	);
	await expect(frame.locator(".article-meta")).toContainText(article.author);
	await expect(frame.locator("article h2")).toHaveText("Saúde");
	await expect(frame.locator("article strong")).toHaveText("faturas");
	await expect(frame.locator("article li")).toHaveCount(2);
	const img = frame.locator("article img");
	await expect(img).toHaveAttribute("src", /^blob:/);
	await expect
		.poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
		.toBe(4);
});

test("a message from another origin is ignored", async ({ page }) => {
	const frame = await openIn(page, "https://outro.example");
	await page.waitForTimeout(500);
	await expect(frame.locator("h1")).toHaveText("");
	await expect(frame.locator("article")).toBeEmpty();
});
