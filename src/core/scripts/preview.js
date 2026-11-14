// Fills the [data-article] parts of the preview page with the article that the panel's
// editor sends. Messages from any other origin or window are ignored.
import { marked } from "marked";

const panel = document.querySelector("[data-preview-panel]")?.dataset
	.previewPanel;
const IMAGES = "/assets/img/blog/";
const parts = (name) => document.querySelectorAll(`[data-article="${name}"]`);
const day = (iso) =>
	new Date(iso).toLocaleDateString(document.documentElement.lang, {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	});
let urls = [];

window.addEventListener("message", (e) => {
	if (e.origin !== panel || e.source !== window.parent) return;
	if (e.data?.type !== "preview") return;
	const { article: a, images = {} } = e.data;
	for (const name of ["title", "description", "author"]) {
		for (const el of parts(name)) el.textContent = a[name];
	}
	for (const el of parts("pubDate")) {
		el.textContent = day(a.pubDate);
		el.setAttribute("datetime", new Date(a.pubDate).toISOString());
	}
	for (const el of parts("updated")) el.hidden = !a.updatedDate;
	if (a.updatedDate) {
		for (const el of parts("updatedDate")) el.textContent = day(a.updatedDate);
	}
	document.title = a.title;

	for (const u of urls) URL.revokeObjectURL(u);
	urls = [];
	const body = parts("body")[0];
	body.innerHTML = marked.parse(a.bodyMd ?? "");
	for (const img of body.querySelectorAll("img")) {
		const src = img.getAttribute("src") ?? "";
		const blob = src.startsWith(IMAGES) && images[src.slice(IMAGES.length)];
		if (blob instanceof Blob) {
			const url = URL.createObjectURL(blob);
			urls.push(url);
			img.src = url;
		}
	}
});

if (panel && window.parent !== window) {
	window.parent.postMessage({ type: "preview-ready" }, panel);
}
