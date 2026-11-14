import { defineConfig } from "astro/config";
import site from "./site.config";
import core from "./src/core/integration";

export default defineConfig({
	site: site.url,
	trailingSlash: "always",
	build: {
		format: "directory",
		inlineStylesheets: "never",
	},
	vite: {
		build: {
			assetsInlineLimit: 0,
		},
	},
	integrations: [core(site)],
});
