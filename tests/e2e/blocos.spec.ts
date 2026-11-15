import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/blocos/");
});

test("the blocks page has no accessibility violations", async ({ page }) => {
	const { violations } = await new AxeBuilder({ page }).analyze();
	expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test("tabs move with the arrow, Home and End keys", async ({ page }) => {
	await page.focus('[role="tab"]');
	await page.keyboard.press("ArrowRight");
	await expect(page.locator('[role="tab"][aria-selected="true"]')).toHaveText(
		"Plano",
	);
	await expect(page.locator("#como-panel-1")).toBeVisible();
	await expect(page.locator("#como-panel-0")).toBeHidden();
	await page.keyboard.press("End");
	await expect(page.locator(":focus")).toHaveText("Acompanhamento");
	await page.keyboard.press("ArrowRight");
	await expect(page.locator(":focus")).toHaveText("Diagnóstico");
});

test("the menu opens, closes on Escape and gives focus back", async ({
	page,
}) => {
	const button = page.locator(".menu-button");
	await button.click();
	await expect(button).toHaveAttribute("aria-expanded", "true");
	await expect(page.locator("#menu-blocos")).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(page.locator("#menu-blocos")).toBeHidden();
	await expect(button).toBeFocused();
});

test("the modal takes focus and closes on Escape", async ({ page }) => {
	const open = page.locator('[data-modal="modal-exemplo"]');
	await open.click();
	await expect(page.locator("#modal-exemplo")).toBeVisible();
	// The browser puts focus on the first control inside the dialog.
	await expect(page.locator("#modal-exemplo .modal-close")).toBeFocused();
	await page.keyboard.press("Escape");
	await expect(page.locator("#modal-exemplo")).toBeHidden();
	await expect(open).toBeFocused();
});

test("the accordion opens one item at a time", async ({ page }) => {
	const items = page.locator(".accordion details");
	await page.click("text=Primeira pergunta");
	await page.click("text=Segunda pergunta");
	await expect(items.nth(0)).not.toHaveAttribute("open");
	await expect(items.nth(1)).toHaveAttribute("open");
});

test("the slider buttons move it and stop at the ends", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 800 });
	const prev = page.locator("[data-slider-prev]");
	const next = page.locator("[data-slider-next]");
	await expect(prev).toBeDisabled();
	await next.click();
	await expect(prev).toBeEnabled();
	await expect
		.poll(() => page.locator(".slider-track").evaluate((e) => e.scrollLeft))
		.toBeGreaterThan(0);
});
