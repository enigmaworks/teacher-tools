try {
	document.fonts.ready.then(function () {
		triggerEvent("fonts_loaded");
	});
} catch (e) {}
!(function () {
	const e = document.querySelector(".Header-search");
	document.body.addEventListener("click", function (t) {
		t.target.closest(".Header") ||
			e.classList.remove("Header-search--expanded");
	}),
		document
			.querySelector(".Header-menu a[href*=search]")
			.addEventListener("click", function (t) {
				e.classList.toggle("Header-search--expanded"),
					e.classList.contains("Header-search--expanded") &&
						e.querySelector("input").focus(),
					t.preventDefault();
			});
})(),
	(function () {
		if (!el_RO) return;
		const e = el_RO.querySelectorAll("textarea");
		for (var t = e.length - 1; t >= 0; t--)
			e[t].addEventListener("change", function () {
				var e = strip(this.value);
				(e = e.replace(/[^\S\r\n]+$/gm, "")), (this.value = e);
			});
	})(),
	(function () {
		const e = document.querySelectorAll("button[data-action=rerun]");
		for (var t = e.length - 1; t >= 0; t--)
			e[t].addEventListener("click", function () {
				runRand();
			});
	})(),
	(function () {
		const e = document.querySelectorAll("[aria-expanded][aria-controls]");
		for (var t = e.length - 1; t >= 0; t--)
			e[t].addEventListener("click", function () {
				const e = "true" == this.getAttribute("aria-expanded"),
					t = document.getElementById(this.getAttribute("aria-controls"));
				e
					? (this.setAttribute("aria-expanded", "false"),
					  t.setAttribute("hidden", "hidden"))
					: (this.setAttribute("aria-expanded", "true"),
					  t.removeAttribute("hidden"));
			});
	})(),
	(function () {
		const e = document.querySelectorAll("[data-share]");
		for (var t = e.length - 1; t >= 0; t--)
			e[t].addEventListener("click", function () {
				const e = this.getAttribute("data-share");
				if ((gtag("event", "share", { method: e }), "c" == e[0])) {
					copyText(window.location), this.classList.add("button--yay");
					var t = this;
					return void setTimeout(function () {
						t.classList.remove("button--yay");
					}, 2e3);
				}
				const n = (function () {
					const t = encodeURIComponent(window.location),
						n = document.querySelector("meta[name='description']"),
						o = encodeURIComponent(n.getAttribute("content"));
					switch (e[0]) {
						case "f":
							return "https://www.facebook.com/sharer/sharer.php?u=" + t;
						case "t":
							return "https://twitter.com/share?url=" + t + "&amp;text=" + o;
						case "r":
							return "http://www.reddit.com/submit?url=" + t + "&title=" + o;
					}
				})();
				window.open(
					n,
					"",
					"menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
				);
			});
	})(),
	(function () {
		if (!el_RO) return;
		const e = el_RO.querySelectorAll("*");
		for (var t = e.length - 1; t >= 0; t--)
			e[t].addEventListener("change", function () {
				const e = getRandOptions(),
					t = new URLSearchParams(Object.entries(e)).toString();
				history.replaceState({}, "", "?" + t);
			});
	})(),
	(function () {
		const e = document.querySelectorAll("button[data-action=options]");
		for (var t = e.length - 1; t >= 0; t--)
			e[t].addEventListener("click", function () {
				const e = document.querySelector(".RandOptions");
				e.scrollIntoView({ behavior: "smooth" }),
					setTimeout(function () {
						e.classList.add("RandOptions--highlight"),
							setTimeout(function () {
								e.classList.remove("RandOptions--highlight"),
									e.querySelector("[name]").focus();
							}, 200);
					}, 300);
			});
	})(),
	(function () {
		const e = document.getElementById("rand_options_show_images");
		if (!e) return;
		const t = function () {
			getRandOptions().show_images
				? el_RS.classList.remove("Rand-stage--no_images")
				: el_RS.classList.add("Rand-stage--no_images");
		};
		e.addEventListener("change", t), window.addEventListener("rand_ran", t);
	})();
var rand_ran_cnt = 0;
window.addEventListener("rand_ran", function () {
	rand_ran_cnt++;
	const e = document.querySelector("article");
	if (window.scrollY > e.offsetTop) {
		e.scrollIntoView({ behavior: "smooth" });
		const t = "Rand-stage--highlight";
		setTimeout(function () {
			el_RS.classList.add(t),
				setTimeout(function () {
					el_RS.classList.remove(t);
				}, 150);
		}, 300);
	}
	2 == rand_ran_cnt && gtag("event", "rerun");
}),
	(function () {
		var e = document.createElement("script");
		(e.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"),
			(e.onerror = function () {
				gtag("event", "adblocker", { non_interaction: !0 });
				const e = document.querySelector(".adsbygoogle--top");
				var t = document.createElement("aside");
				t.setAttribute("class", "whine"),
					(t.innerHTML =
						'<div class="whine-fore"><div class="whine-headline">You\'re using an AdBlocker.</div><div>Ad revenue keeps this dumb site alive. Would you considering supporting the site in another way?</div><ul><li><button class="button" data-support="like">1-Click Thank You</button></li><li><button class="button" data-support="share">Share with Friends</button></li><li><a href="https://help.getadblock.com/support/solutions/articles/6000055743-how-do-i-tell-adblock-not-to-block-ads-#whitelist-site" target="_blank" class="button" data-support="unblock">Unblock our ads only</button></li></ul></div>'),
					e.parentNode.appendChild(t),
					getJSON("/data/gifs.json", function (e) {
						const n = e.RandL.items.length,
							o = Math.floor(Math.random() * n),
							r = e.RandL.items[o].img;
						var a = document.createElement("div");
						a.setAttribute("class", "whine-gif"),
							(a.style.backgroundImage = 'url("' + r + '")'),
							t.appendChild(a);
					}),
					document
						.querySelector("[data-support=unblock]")
						.addEventListener("click", function () {
							gtag("event", "support", {
								event_label: "unblock",
							});
						}),
					document
						.querySelector("[data-support=like]")
						.addEventListener("click", function () {
							gtag("event", "support", { event_label: "like" }),
								this.setAttribute("disabled", "disabled"),
								(this.textContent = "Thanks.");
						}),
					document
						.querySelector("[data-support=share]")
						.addEventListener("click", function () {
							gtag("event", "support", { event_label: "share" });
							const e = document.querySelector("[data-action='share']");
							e.scrollIntoView({ behavior: "smooth" }),
								setTimeout(function () {
									triggerEvent("click", e);
									const t = document.querySelectorAll("[data-share]");
									setTimeout(function () {
										e.classList.add("button--yo");
										for (var n = t.length - 1; n >= 0; n--)
											t[n].classList.add("button--yo");
										setTimeout(function () {
											e.classList.remove("button--yo");
											for (var n = t.length - 1; n >= 0; n--)
												t[n].classList.remove("button--yo");
										}, 300);
									}, 300);
								}, 300);
						});
			}),
			document.head.appendChild(e);
	})(),
	(function () {
		if (!el_RO) return;
		const e = el_RO.querySelector("[name]:not([name=qty]):not([name=dup])");
		if (!e) return;
		const t = function (e) {
			const t = e.getBoundingClientRect();
			return (
				t.top >= 0 &&
				t.left >= 0 &&
				t.bottom <=
					(window.innerHeight || document.documentElement.clientHeight) &&
				t.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		};
		if (t(e)) return;
		const n = document.querySelectorAll("[data-action=options]");
		setTimeout(function () {
			for (var e = n.length - 1; e >= 0; e--)
				if (0 == e || t(n[e])) return void n[e].setAttribute("data-help", 1);
		}, 1200);
		const o = el_RO.querySelectorAll("[name]");
		for (var r = o.length - 1; r >= 0; r--)
			o[r].addEventListener("focus", function () {
				for (var e = n.length - 1; e >= 0; e--)
					n[e].removeAttribute("data-help");
			});
	})(),
	(function () {
		var e = rand + "-remember",
			t = document.getElementById("rand_options_items_save");
		if (t) {
			var n,
				o = ((n = t.id.replace("_save", "")), document.getElementById(n)),
				r = function () {
					var n = t.checked ? o.value : "";
					localStorage.setItem(e, n);
				};
			t.addEventListener("change", r), o.addEventListener("change", r);
			var a = localStorage.getItem(e);
			a && ((o.value = a), runRand());
		}
	})(),
	el_RO &&
		el_RO.addEventListener("submit", function (e) {
			"function" == typeof runRand && (e.preventDefault(), runRand());
		}),
	(function () {
		const e = document.getElementById("rand_jumper");
		if (!e) return;
		const t = function (t, n) {
				const o = t.textContent,
					r = t.getAttribute("href");
				var a = document.createElement("option");
				a.setAttribute("value", r),
					(a.innerHTML = (n ? "&nbsp;&nbsp;" : "") + o),
					e.appendChild(a);
			},
			n = document.querySelectorAll("nav.select-nav > a");
		for (var o = 0; o < n.length; o++) {
			t(n[o], !1);
			const e = n[o].parentNode.querySelectorAll("ul a");
			for (var r = 0; r < e.length; r++) t(e[r], !0);
		}
		const a = document
				.querySelector("link[rel=canonical]")
				.getAttribute("href"),
			i = e.querySelector("option[value='" + a + "']");
		i && i.setAttribute("selected", "selected"),
			e.addEventListener("change", function () {
				gtag("event", "change dataset"), (window.location = this.value);
			});
	})(),
	"serviceWorker" in navigator && navigator.serviceWorker.register("/sw.js");
