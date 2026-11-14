// Keeps the campaign (utm_*) of the page where the visitor landed, for LeadForm.
const UTM = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
];
const params = new URLSearchParams(location.search);
const found = UTM.filter((k) => params.get(k)).map((k) => [k, params.get(k)]);
try {
	if (found.length) sessionStorage.setItem("lead-utm", JSON.stringify(found));
} catch {}
