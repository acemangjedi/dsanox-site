import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "tests/e2e",
	workers: 1,
	use: {
		baseURL: "http://127.0.0.1:4321",
		// Lets a machine with its own Chromium skip "playwright install".
		launchOptions: { executablePath: process.env.PW_CHROMIUM || undefined },
	},
	webServer: {
		command: "pnpm build:local && node tests/e2e/serve.mjs",
		url: "http://127.0.0.1:4321/",
		reuseExistingServer: false,
		timeout: 120_000,
	},
});
