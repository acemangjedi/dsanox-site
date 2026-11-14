// Serves dist/ like a static host: /path/ → /path/index.html, unknown → 404.html.
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css",
	".js": "text/javascript",
	".json": "application/json",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".webp": "image/webp",
	".woff2": "font/woff2",
	".xml": "application/xml",
	".txt": "text/plain",
};
const root = "dist";

createServer((req, res) => {
	let path = normalize(
		decodeURIComponent(new URL(req.url, "http://x").pathname),
	);
	if (path.includes("..")) path = "/";
	let file = join(root, path);
	if (existsSync(file) && statSync(file).isDirectory())
		file = join(file, "index.html");
	const found = existsSync(file);
	res.writeHead(found ? 200 : 404, {
		"Content-Type":
			TYPES[extname(found ? file : ".html")] ?? "application/octet-stream",
	});
	res.end(readFileSync(found ? file : join(root, "404.html")));
}).listen(Number(process.env.PORT ?? 4321), "127.0.0.1");
