// Sends LeadForm to the panel without leaving the page. Success goes to /obrigado/;
// a field the panel refuses shows a message; anything else shows the business contacts.
const UTM = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
];
const STORE = "lead-utm";

// Keep the campaign of the landing page while the visitor moves through the site.
const params = new URLSearchParams(location.search);
const found = UTM.filter((k) => params.get(k)).map((k) => [k, params.get(k)]);
try {
	if (found.length) sessionStorage.setItem(STORE, JSON.stringify(found));
} catch {}
let utm = found;
try {
	utm = found.length
		? found
		: JSON.parse(sessionStorage.getItem(STORE) ?? "[]");
} catch {}

for (const form of document.querySelectorAll("form[data-lead-form]")) {
	form.elements.form_ts.value = String(Date.now());
	for (const [k, v] of utm) {
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = k;
		input.value = v;
		form.append(input);
	}

	const error = form.querySelector(".lead-form-error");
	const fallback = form.querySelector(".lead-form-fallback");
	const button = form.querySelector("button[type=submit]");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		error.hidden = true;
		fallback.hidden = true;
		button.disabled = true;
		let res;
		try {
			res = await fetch(form.action, {
				method: "POST",
				headers: { Accept: "application/json" },
				body: new URLSearchParams(new FormData(form)),
			});
		} catch {
			res = null;
		}
		button.disabled = false;
		if (res?.ok) {
			location.assign("/obrigado/");
		} else if (res?.status === 400) {
			error.textContent =
				"Verifique os campos: o email tem de ser válido e é preciso aceitar a política de privacidade.";
			error.hidden = false;
		} else {
			fallback.hidden = false;
		}
	});
}
