import { expect, type Page, test } from "@playwright/test";
import site from "../../site.config";

const action = `${site.panel.url}/api/v1/forms/${site.forms.contactos}`;

const fill = async (page: Page) => {
	await page.fill("#contactos-name", "Rita");
	await page.fill("#contactos-email", "rita@example.com");
	await page.fill("#contactos-message", "Quero uma proposta.");
	await page.check("input[name=consent]");
};

test("a message the panel accepts goes to the thank-you page, with its campaign", async ({
	page,
}) => {
	let sent = new URLSearchParams();
	await page.route(action, async (route) => {
		sent = new URLSearchParams(route.request().postData() ?? "");
		await route.fulfill({ json: { ok: true } });
	});
	// The campaign is kept from the page where the visitor landed.
	await page.goto("/?utm_source=jornal&utm_campaign=outono");
	await page.goto("/contactos/");
	await fill(page);
	await page.click("text=Enviar mensagem");
	await expect(page).toHaveURL(/\/obrigado\/$/);
	expect(Object.fromEntries(sent)).toMatchObject({
		name: "Rita",
		email: "rita@example.com",
		message: "Quero uma proposta.",
		consent: "on",
		website: "",
		utm_source: "jornal",
		utm_campaign: "outono",
	});
	expect(Number(sent.get("form_ts"))).toBeGreaterThan(0);
	expect(sent.get("consent_text")).toContain("Política de Privacidade");
});

test("a visitor who lands on the contact page keeps its campaign too", async ({
	page,
}) => {
	let sent = new URLSearchParams();
	await page.route(action, async (route) => {
		sent = new URLSearchParams(route.request().postData() ?? "");
		await route.fulfill({ json: { ok: true } });
	});
	await page.goto("/contactos/?utm_source=google");
	await fill(page);
	await page.click("text=Enviar mensagem");
	await expect(page).toHaveURL(/\/obrigado\/$/);
	expect(sent.get("utm_source")).toBe("google");
});

test("a field the panel refuses shows what to fix and stays on the page", async ({
	page,
}) => {
	await page.route(action, (route) =>
		route.fulfill({ status: 400, json: { ok: false, error: "invalid" } }),
	);
	await page.goto("/contactos/");
	await fill(page);
	await page.click("text=Enviar mensagem");
	await expect(page.locator(".lead-form-error")).toContainText(
		"Verifique os campos",
	);
	await expect(page.locator(".lead-form-fallback")).toBeHidden();
	await expect(page).toHaveURL(/\/contactos\/$/);
});

test("with the panel down the visitor sees the business contacts", async ({
	page,
}) => {
	await page.route(action, (route) => route.abort("connectionrefused"));
	await page.goto("/contactos/");
	await fill(page);
	await page.click("text=Enviar mensagem");
	const fallback = page.locator(".lead-form-fallback");
	await expect(fallback).toBeVisible();
	await expect(fallback).toContainText(site.contacts.email);
});

test("without JavaScript the form posts straight to the panel", async ({
	browser,
}) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	let method = "";
	await page.route(action, async (route) => {
		method = route.request().method();
		await route.fulfill({
			status: 303,
			headers: { location: "http://127.0.0.1:4321/obrigado/" },
		});
	});
	await page.goto("/contactos/");
	await fill(page);
	await page.click("text=Enviar mensagem");
	await expect(page).toHaveURL(/\/obrigado\/$/);
	expect(method).toBe("POST");
	await context.close();
});
