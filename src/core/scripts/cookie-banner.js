(() => {
	var STORAGE_KEY = "cookie-consent";
	var EXPIRY_DAYS = 180;
	var POLICY_VERSION =
		document.getElementById("cookie-banner").dataset.policyVersion;

	function getSaved() {
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY));
		} catch (_e) {
			return null;
		}
	}

	function showBanner() {
		var banner = document.getElementById("cookie-banner");
		banner.removeAttribute("hidden");
		requestAnimationFrame(() => {
			var btn = banner.querySelector("button");
			if (btn) btn.focus();
		});
	}

	function hideAll() {
		document.getElementById("cookie-banner").setAttribute("hidden", "");
		document.getElementById("cookie-modal").setAttribute("hidden", "");
	}

	function saveConsent(prefs) {
		var now = Date.now();
		var obj = {
			necessary: true,
			analytics: prefs.analytics,
			marketing: prefs.marketing,
			consentDate: new Date(now).toISOString(),
			expiresDate: new Date(now + EXPIRY_DAYS * 86400000).toISOString(),
			policyVersion: POLICY_VERSION,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
		document.dispatchEvent(new CustomEvent("consent-updated", { detail: obj }));
		hideAll();
	}

	function applyConsent(prefs) {
		document.dispatchEvent(
			new CustomEvent("consent-updated", { detail: prefs }),
		);
	}

	function syncToggles(analytics, marketing) {
		var ta = document.getElementById("toggle-analytics");
		var tm = document.getElementById("toggle-marketing");
		ta.setAttribute("aria-checked", String(analytics));
		ta.classList.toggle("cm-switch--on", analytics);
		tm.setAttribute("aria-checked", String(marketing));
		tm.classList.toggle("cm-switch--on", marketing);
	}

	var lastFocus = null;

	function openModal() {
		lastFocus = document.activeElement;
		var saved = getSaved();
		syncToggles(
			saved ? saved.analytics : false,
			saved ? saved.marketing : false,
		);
		var modal = document.getElementById("cookie-modal");
		modal.removeAttribute("hidden");
		document.getElementById("toggle-analytics").focus();
	}

	function trapFocus(e) {
		var modal = document.getElementById("cookie-modal");
		if (modal.hasAttribute("hidden")) return;
		var focusable = Array.prototype.slice.call(
			modal.querySelectorAll("button:not([disabled])"),
		);
		if (!focusable.length) return;
		var first = focusable[0];
		var last = focusable[focusable.length - 1];
		if (e.key === "Tab") {
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
		if (e.key === "Escape") {
			document.getElementById("cookie-modal").setAttribute("hidden", "");
			if (lastFocus) lastFocus.focus();
			return;
		}
	}

	function init() {
		var saved = getSaved();
		var now = Date.now();
		var needsBanner =
			!saved ||
			new Date(saved.expiresDate).getTime() < now ||
			saved.policyVersion !== POLICY_VERSION;

		if (needsBanner) {
			showBanner();
		} else {
			applyConsent(saved);
		}

		document.getElementById("cb-accept").addEventListener("click", () => {
			saveConsent({ analytics: true, marketing: true });
		});
		document.getElementById("cb-reject").addEventListener("click", () => {
			saveConsent({ analytics: false, marketing: false });
		});
		document.getElementById("cb-customize").addEventListener("click", () => {
			hideAll();
			openModal();
		});
		document.getElementById("cm-accept-all").addEventListener("click", () => {
			saveConsent({ analytics: true, marketing: true });
		});
		document.getElementById("cm-reject-all").addEventListener("click", () => {
			saveConsent({ analytics: false, marketing: false });
		});
		document.getElementById("cm-save").addEventListener("click", () => {
			var ta = document.getElementById("toggle-analytics");
			var tm = document.getElementById("toggle-marketing");
			saveConsent({
				analytics: ta.getAttribute("aria-checked") === "true",
				marketing: tm.getAttribute("aria-checked") === "true",
			});
		});

		["toggle-analytics", "toggle-marketing"].forEach((id) => {
			document.getElementById(id).addEventListener("click", function () {
				var cur = this.getAttribute("aria-checked") === "true";
				this.setAttribute("aria-checked", String(!cur));
				this.classList.toggle("cm-switch--on", !cur);
			});
		});

		document.querySelector(".cm-overlay").addEventListener("click", () => {
			document.getElementById("cookie-modal").setAttribute("hidden", "");
			if (lastFocus) lastFocus.focus();
		});

		document.getElementById("cm-close").addEventListener("click", () => {
			document.getElementById("cookie-modal").setAttribute("hidden", "");
			if (lastFocus) lastFocus.focus();
		});

		document.addEventListener("keydown", trapFocus);

		document.querySelectorAll(".cookie-settings-btn").forEach((btn) => {
			btn.addEventListener("click", openModal);
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}

	window.__openCookieSettings = () => {
		var saved = getSaved();
		var expired = saved && new Date(saved.expiresDate).getTime() < Date.now();
		var stale = saved && saved.policyVersion !== POLICY_VERSION;
		if (!saved || expired || stale) {
			showBanner();
		} else {
			openModal();
		}
	};
})();
