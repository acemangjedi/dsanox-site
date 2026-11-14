/* Site behaviour: menu, dropdowns, reveal on scroll. */

(() => {
	function observeOnce(els, callback, options) {
		if (!("IntersectionObserver" in window)) {
			els.forEach((el) => {
				callback(el);
			});
			return;
		}
		const io = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					callback(entry.target);
					io.unobserve(entry.target);
				}
			});
		}, options);
		els.forEach((el) => {
			io.observe(el);
		});
	}

	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* --- Mobile menu (critical) --- */
	const toggle = document.querySelector(".menu-toggle");
	const menu = document.getElementById("mobile-menu");
	if (toggle && menu) {
		function closeMenu() {
			menu.classList.remove("is-open");
			menu.setAttribute("aria-hidden", "true");
			menu.setAttribute("inert", "");
			toggle.setAttribute("aria-expanded", "false");
			toggle.setAttribute("aria-label", "Abrir menu");
			document.body.style.overflow = "";
		}
		toggle.addEventListener("click", (e) => {
			e.stopPropagation();
			const open = menu.classList.toggle("is-open");
			if (open) {
				menu.removeAttribute("inert");
				menu.setAttribute("aria-hidden", "false");
				toggle.setAttribute("aria-expanded", "true");
				toggle.setAttribute("aria-label", "Fechar menu");
				document.body.style.overflow = "hidden";
			} else {
				closeMenu();
			}
		});
		menu.addEventListener("click", (e) => {
			if (!e.target.closest("a")) return;
			closeMenu();
		});
		document.addEventListener("click", (e) => {
			if (
				menu.classList.contains("is-open") &&
				!menu.contains(e.target) &&
				!toggle.contains(e.target) &&
				!e.target.closest(".menu-toggle")
			) {
				closeMenu();
			}
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
		});
		window.matchMedia("(min-width: 961px)").addEventListener("change", (mq) => {
			if (mq.matches && menu.classList.contains("is-open")) closeMenu();
		});
	}

	/* --- Dropdown keyboard navigation (critical) --- */
	document.querySelectorAll(".has-dropdown > button").forEach((btn) => {
		const parent = btn.parentElement;
		if (!parent) return;
		const dropdown = parent.querySelector(".dropdown");
		const items = dropdown
			? Array.from(dropdown.querySelectorAll('[role="menuitem"]'))
			: [];

		btn.addEventListener("keydown", (e) => {
			if (e.key === "ArrowDown" || e.key === "Down") {
				e.preventDefault();
				btn.setAttribute("aria-expanded", "true");
				items[0]?.focus();
			}
		});

		items.forEach((item, i) => {
			item.addEventListener("keydown", (e) => {
				if (e.key === "ArrowDown" || e.key === "Down") {
					e.preventDefault();
					(items[(i + 1) % items.length] || items[0]).focus();
				} else if (e.key === "ArrowUp" || e.key === "Up") {
					e.preventDefault();
					if (i === 0) {
						btn.setAttribute("aria-expanded", "false");
						btn.focus();
					} else {
						items[i - 1].focus();
					}
				} else if (e.key === "Escape") {
					e.preventDefault();
					btn.setAttribute("aria-expanded", "false");
					btn.focus();
				}
			});
		});
	});

	/* --- Scroll reveal (critical — hero usa .reveal e é LCP) --- */
	/* reveal-ready activa as transições CSS; antes disso, todos os elementos ficam visíveis */
	document.documentElement.classList.add("reveal-ready");
	if (!prefersReducedMotion) {
		observeOnce(
			document.querySelectorAll(".reveal"),
			(el) => el.classList.add("is-visible"),
			{
				threshold: 0.1,
				rootMargin: "0px 0px -40px 0px",
			},
		);
	} else {
		document.querySelectorAll(".reveal").forEach((el) => {
			el.classList.add("is-visible");
		});
	}

	/* --- Active nav link (critical — efeito visual imediato na nav) --- */
	const path = window.location.pathname.replace(/\/$/, "") || "/";
	document.querySelectorAll(".nav-link, .mobile-menu a").forEach((link) => {
		const href = link.getAttribute("href");
		if (
			!href ||
			href.startsWith("#") ||
			href.startsWith("http") ||
			href.startsWith("//") ||
			href.startsWith("mailto") ||
			href.startsWith("tel")
		)
			return;
		const linkPath = href.replace(/\/$/, "") || "/";
		if (linkPath === path) link.classList.add("is-active");
	});

	/* --- Não-crítico: yield ao browser antes de inicializar --- */
	const whenIdle = window.requestIdleCallback
		? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
		: (cb) => setTimeout(cb, 100);

	whenIdle(() => {
		/* --- Animated stat counters --- */
		const counterEls = document.querySelectorAll(".stat-cell .num");
		if (counterEls.length && !prefersReducedMotion) {
			// Batch reads first, then batch writes — evita forced reflows intercalados
			const counterData = Array.from(counterEls)
				.map((el) => {
					const text = el.textContent;
					const match = text.match(/^(\d+)/);
					return match
						? { el, target: match[1], suffix: text.slice(match[1].length) }
						: null;
				})
				.filter(Boolean);

			counterData.forEach(({ el, target, suffix }) => {
				el.dataset.target = target;
				el.dataset.suffix = suffix;
				el.textContent = `0${suffix}`;
			});

			function runCounter(el) {
				const target = parseInt(el.dataset.target, 10);
				if (Number.isNaN(target)) return;
				const duration = 1400;
				const start = performance.now();
				function tick(now) {
					const t = Math.min((now - start) / duration, 1);
					const eased = 1 - (1 - t) ** 3;
					el.textContent =
						Math.round(eased * target) + (el.dataset.suffix || "");
					if (t < 1) requestAnimationFrame(tick);
				}
				requestAnimationFrame(tick);
			}

			observeOnce(
				counterData.map(({ el }) => el),
				runCounter,
				{ threshold: 0.5 },
			);
		} else if (counterEls.length) {
			counterEls.forEach((el) => {
				const text = el.textContent;
				const match = text.match(/^(\d+)/);
				if (match) el.dataset.target = match[1];
			});
		}

		/* --- FAQ smooth close animation ---
		     Adds .closing to drive grid + toggle + border transitions simultaneously,
		     then removes [open] once the grid transition ends. */
		document.querySelectorAll(".faq-item").forEach((details) => {
			const summary = details.querySelector("summary");
			const answer = details.querySelector(".faq-answer");
			if (!summary || !answer) return;
			let animating = false;
			summary.addEventListener("click", (e) => {
				if (!details.open || animating) return;
				e.preventDefault();
				const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)")
					.matches;
				if (!motionOk) {
					details.open = false;
					return;
				}
				animating = true;
				details.classList.add("closing");
				const cleanup = () => {
					clearTimeout(timer);
					answer.removeEventListener("transitionend", cleanup);
					details.open = false;
					details.classList.remove("closing");
					animating = false;
				};
				const timer = setTimeout(cleanup, 350);
				answer.addEventListener("transitionend", cleanup, { once: true });
			});
		});

		/* --- Form: graceful enhancement --- */
		document.querySelectorAll("form[data-form]").forEach((form) => {
			const required = Array.from(form.querySelectorAll("[required]"));
			form.addEventListener("submit", (e) => {
				let firstInvalid = null;
				required.forEach((field) => {
					const invalid =
						field.type === "checkbox" ? !field.checked : !field.value.trim();
					if (invalid) {
						field.style.borderColor = "var(--error)";
						if (!firstInvalid) firstInvalid = field;
					} else {
						field.style.borderColor = "";
					}
				});
				if (firstInvalid) {
					e.preventDefault();
					firstInvalid.focus();
				}
			});
		});
	});
})();
