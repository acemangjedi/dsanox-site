const meta = document.querySelector('meta[name="analytics"]');
const gaId = meta?.dataset.ga;
const clarityId = meta?.dataset.clarity;

(() => {
	if (!gaId) return;

	window.dataLayer = window.dataLayer || [];
	window.gtag =
		window.gtag ||
		function () {
			// biome-ignore lint/complexity/noArguments: Google Analytics requires the arguments object
			dataLayer.push(arguments);
		};
	var gtag = window.gtag;

	// Consent Mode v2: everything denied BEFORE gtag.js loads.
	// wait_for_update gives cookie-banner.js time to apply saved consent.
	gtag("consent", "default", {
		analytics_storage: "denied",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
		wait_for_update: 500,
	});

	gtag("js", new Date());
	gtag("config", gaId); // GA4 sends a cookieless ping even while consent is denied.

	// gtag.js always loads (Consent Mode v2 + Tag Assistant).
	var s = document.createElement("script");
	s.id = "ga-script";
	s.async = true;
	s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
	document.head.appendChild(s);

	document.addEventListener("consent-updated", (e) => {
		var prefs = e.detail;
		if (prefs.analytics) {
			gtag("consent", "update", { analytics_storage: "granted" });
			gtag("event", "page_view"); // full hit with cookies after consent
		} else {
			gtag("consent", "update", { analytics_storage: "denied" });
		}
		gtag("consent", "update", {
			ad_storage: prefs.marketing ? "granted" : "denied",
			ad_user_data: prefs.marketing ? "granted" : "denied",
			ad_personalization: prefs.marketing ? "granted" : "denied",
		});
	});
})();

// Microsoft Clarity: loads only after consent to analytics cookies.
(() => {
	if (!clarityId) return;
	var loaded = false;
	document.addEventListener("consent-updated", (e) => {
		var granted = e.detail.analytics;
		if (granted && !loaded) {
			loaded = true;
			window.clarity =
				window.clarity ||
				function () {
					window.clarity.q = window.clarity.q || [];
					// biome-ignore lint/complexity/noArguments: Clarity requires the arguments object
					window.clarity.q.push(arguments);
				};
			const s = document.createElement("script");
			s.async = true;
			s.src = `https://www.clarity.ms/tag/${clarityId}`;
			document.head.appendChild(s);
		}
		if (loaded) {
			window.clarity("consentv2", {
				ad_Storage: "denied",
				analytics_Storage: granted ? "granted" : "denied",
			});
		}
	});
})();
