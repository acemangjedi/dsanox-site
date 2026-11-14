import type { SiteConfig } from "./config";

// The same security and cache headers for every host: .htaccess for Hostinger
// (Apache/LiteSpeed), _headers and _redirects for Cloudflare Pages.

const ANALYTICS = {
	script: ["https://www.googletagmanager.com", "https://*.clarity.ms"],
	connect: [
		"https://*.google-analytics.com",
		"https://*.analytics.google.com",
		"https://*.googletagmanager.com",
		"https://*.clarity.ms",
	],
	img: [
		"https://*.google-analytics.com",
		"https://*.googletagmanager.com",
		"https://*.clarity.ms",
		"https://c.bing.com",
	],
};

function csp(site: SiteConfig, frameAncestors: string): string {
	const panel = new URL(site.panel.url).origin;
	const a = site.analytics.ga || site.analytics.clarity;
	const list = (...v: (string | false | undefined)[]) =>
		v.filter(Boolean).flat().join(" ");
	return [
		"default-src 'self'",
		`script-src ${list("'self'", a && ANALYTICS.script.join(" "))}`,
		"style-src 'self'",
		`img-src ${list("'self'", "data:", a && ANALYTICS.img.join(" "))}`,
		"font-src 'self'",
		`connect-src ${list("'self'", panel, a && ANALYTICS.connect.join(" "))}`,
		`form-action 'self' ${panel}`,
		"base-uri 'none'",
		"object-src 'none'",
		`frame-ancestors ${frameAncestors}`,
	].join("; ");
}

// Path prefix → headers. Later entries add to or replace earlier ones.
export function headerRules(
	site: SiteConfig,
): [string, Record<string, string>][] {
	return [
		[
			"/",
			{
				"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
				"X-Content-Type-Options": "nosniff",
				"Referrer-Policy": "strict-origin-when-cross-origin",
				"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
				"Content-Security-Policy": csp(site, "'none'"),
			},
		],
		// The panel's editor shows this page in a frame.
		[
			"/_preview/",
			{
				"Content-Security-Policy": csp(site, new URL(site.panel.url).origin),
			},
		],
		// Hashed file names: they never change.
		["/_astro/", { "Cache-Control": "public, max-age=31536000, immutable" }],
		["/fonts/", { "Cache-Control": "public, max-age=31536000, immutable" }],
	];
}

// Cloudflare joins a header set by two matching rules, so a later rule first detaches
// ("! Name") a header the first rule already sets.
export function cloudflareHeaders(site: SiteConfig): string {
	const [[, base], ...rest] = headerRules(site);
	const block = (path: string, h: Record<string, string>, detach: boolean) =>
		[
			`${path}*`,
			...Object.entries(h).flatMap(([k, v]) => [
				...(detach && k in base ? [`  ! ${k}`] : []),
				`  ${k}: ${v}`,
			]),
		].join("\n");
	return [
		block("/", base, false),
		...rest.map(([path, h]) => block(path, h, true)),
	]
		.join("\n\n")
		.concat("\n");
}

export function cloudflareRedirects(site: SiteConfig): string {
	return Object.entries(site.redirects)
		.map(([from, to]) => `${from} ${to} 301\n`)
		.join("");
}

const apacheHeaders = (h: Record<string, string>) =>
	Object.entries(h)
		.map(([k, v]) => `  Header always set ${k} "${v}"`)
		.join("\n");

// Files for dist/: path → content. A folder's own .htaccess carries its headers.
export function htaccessFiles(site: SiteConfig): Record<string, string> {
	const [[, base], ...rest] = headerRules(site);
	const redirects = Object.entries(site.redirects).map(
		([from, to]) => `Redirect 301 ${from} ${to}`,
	);
	const files: Record<string, string> = {
		".htaccess": [
			"ErrorDocument 404 /404.html",
			"RewriteEngine On",
			"RewriteCond %{HTTPS} off",
			"RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]",
			...redirects,
			"<IfModule mod_headers.c>",
			apacheHeaders(base),
			"</IfModule>",
			"",
		].join("\n"),
	};
	for (const [path, h] of rest) {
		files[`${path.slice(1)}.htaccess`] = [
			"<IfModule mod_headers.c>",
			apacheHeaders(h),
			"</IfModule>",
			"",
		].join("\n");
	}
	return files;
}
