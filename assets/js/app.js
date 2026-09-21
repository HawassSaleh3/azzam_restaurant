/* =====================================================================
   Azzam Restaurant — App Logic
   لغة (عربي / English / Deutsch) • قائمة • سلة تسوق • طلب عبر واتساب • خريطة
   ===================================================================== */

(function () {
  "use strict";

  const CFG = window.APP_CONFIG;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------- icons (SVG sprite in index.html) ---------------- */
  const icon = (name, cls = "") =>
    `<svg class="ico${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

  // أيقونة كل نوع طبق + كل ميزة في قسم «من نحن» (مستقلة عن اللغة)
  const DIET_ICONS = { vegan: "sprout", veg: "leaf", meat: "drumstick" };
  const FEATURE_ICONS = ["cooking-pot", "sun", "users", "euro"];

  /* ---------------- state ---------------- */
  const savedLang = localStorage.getItem("azzam_lang");
  const state = {
    lang: LANG_ORDER.includes(savedLang) ? savedLang : "ar",
    cart: JSON.parse(localStorage.getItem("azzam_cart") || "[]"),
    orderType: localStorage.getItem("azzam_orderType") || "delivery",
    activeCat: "all",
    search: "",
    veganOnly: false
  };

  const persistCart = () => localStorage.setItem("azzam_cart", JSON.stringify(state.cart));
  const persistLang = () => localStorage.setItem("azzam_lang", state.lang);

  const t = (key) => {
    const dict = I18N[state.lang] || I18N.ar;
    return key.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : key), dict);
  };

  // صيغ الجمع: menu.items = { one, two, few, many, other }
  const plural = (key, n) => {
    const forms = t(key);
    if (typeof forms === "string") return `${n} ${forms}`;
    let cat = "other";
    try { cat = new Intl.PluralRules(state.lang).select(n); } catch (e) { /* fallback */ }
    if (n === 0 && forms.zero) cat = "zero";
    const tpl = forms[cat] || forms.other || "";
    return tpl.replace("{n}", n);
  };

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const itemName = (item, lang = state.lang) => item[lang] || item.de || item.ar;

  // الاسم الثانوي تحت اسم الطبق: ألماني في الواجهة العربية، وعربي في الإنجليزية/الألمانية
  const itemSub = (item) => (state.lang === "ar" ? item.de : item.ar);

  const fmtEuro = (n) => n.toFixed(2).replace(".", ",") + " €";

  // في النص العربي الخام (مثل رسالة واتساب) تُحاط الأرقام اللاتينية بعلامة LRM
  // حتى لا يعكس تطبيق واتساب ترتيب مقاطع الرقم أو السعر.
  const LRM = "\u200E";
  const ltrText = (s) => (I18N[state.lang].dir === "rtl" ? `${LRM}${s}${LRM}` : s);

  /* ---------------- language ---------------- */
  function applyDocumentLang() {
    const dict = I18N[state.lang];
    document.documentElement.lang = state.lang;
    document.documentElement.dir = dict.dir;
    document.body.classList.toggle("rtl", dict.dir === "rtl");
    document.title = t("meta.title");
    const md = $('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));
  }

  function bindStaticTexts() {
    $$("[data-i18n]").forEach((el) => {
      const value = t(el.getAttribute("data-i18n"));
      if (typeof value === "string") el.textContent = value;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      const value = t(el.getAttribute("data-i18n-ph"));
      if (typeof value === "string") el.setAttribute("placeholder", value);
    });

    // مبدّل اللغة
    const lb = $("#lang-btn-label");
    if (lb) lb.textContent = LANG_CODES[state.lang];
    const langBtn = $("#lang-btn");
    if (langBtn) langBtn.setAttribute("aria-label", t("langLabel"));
    $$(".lang-opt").forEach((b) => {
      const active = b.dataset.lang === state.lang;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    state.lang = lang;
    persistLang();
    applyDocumentLang();
    bindStaticTexts();
    buildCatTabs();
    buildFeatures();
    buildMenu();
    renderCart();
    renderOpenStatus();
    fillConfig();
    closeLangMenu();
  }

  /* ---------------- language dropdown ---------------- */
  function openLangMenu() {
    $("#lang-menu").classList.add("open");
    $("#lang-btn").setAttribute("aria-expanded", "true");
  }
  function closeLangMenu() {
    const m = $("#lang-menu");
    if (!m) return;
    m.classList.remove("open");
    $("#lang-btn").setAttribute("aria-expanded", "false");
  }
  function toggleLangMenu() {
    $("#lang-menu").classList.contains("open") ? closeLangMenu() : openLangMenu();
  }

  /* ---------------- menu rendering ---------------- */
  function buildMenu() {
    const catsWrap = $("#menu-categories");
    catsWrap.innerHTML = "";

    MENU_CATEGORIES.forEach((cat) => {
      const items = MENU_ITEMS.filter((i) => i.cat === cat.id);
      const block = document.createElement("section");
      block.className = "category-block";
      block.dataset.cat = cat.id;

      const title = escapeHtml(itemName(cat));
      block.innerHTML = `
        <div class="cat-head">
          <div class="cat-head-img"><img src="${cat.img}" alt="${title}" loading="lazy" /></div>
          <div class="cat-head-txt">
            <h3>${title}</h3>
            <span class="cat-tagline">${plural("menu.items", items.length)}</span>
          </div>
        </div>
        <div class="menu-grid">
          ${items.map((item) => dishCard(item)).join("")}
        </div>
      `;
      catsWrap.appendChild(block);
    });

    applyFilter();
  }

  function dishCard(item) {
    const name = escapeHtml(itemName(item));
    const sub = escapeHtml(itemSub(item));
    const inCart = state.cart.find((c) => c.id === item.id);
    const qty = inCart ? inCart.qty : 0;
    const dietLabel = t(`badges.${item.diet}`);
    const cat = MENU_CATEGORIES.find((c) => c.id === item.cat);
    const catImg = cat ? cat.img : "assets/img/hero.jpg";
    const imgPath = `assets/img/dishes/${item.id}.jpg`;

    return `
      <article class="dish" data-id="${item.id}">
        <div class="dish-img">
          <img src="${imgPath}" alt="${name}" loading="lazy"
            onerror="this.onerror=null; this.src='${catImg}';" />
        </div>
        <div class="dish-top">
          <div class="dish-name">${name}<bdi class="de">${sub}</bdi></div>
          <div class="price">${fmtEuro(item.price)}</div>
        </div>
        <div class="dish-badges">
          <span class="diet ${item.diet}">${icon(DIET_ICONS[item.diet] || "leaf")}<span>${dietLabel}</span></span>
        </div>
        <div class="dish-actions">
          <div class="qty" data-qty="${item.id}">
            <button type="button" data-dec aria-label="-">−</button>
            <span data-count>${qty}</span>
            <button type="button" data-inc aria-label="+">+</button>
          </div>
          <button type="button" class="add-btn${qty > 0 ? " in-cart" : ""}" data-add="${item.id}">${qty > 0 ? t("menu.added") : t("menu.add")}</button>
        </div>
      </article>
    `;
  }

  function matchFilter(item) {
    const catOk = state.activeCat === "all" || item.cat === state.activeCat;
    if (!catOk) return false;
    if (state.veganOnly && item.diet !== "vegan") return false;
    if (state.search) {
      const q = state.search.trim().toLowerCase();
      const hay = `${item.de} ${item.ar} ${item.en || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function applyFilter() {
    let anyShown = false;
    $$(".category-block").forEach((block) => {
      const catId = block.dataset.cat;
      const items = MENU_ITEMS.filter((i) => i.cat === catId);
      let visibleInCat = 0;

      items.forEach((item) => {
        const card = $(`.dish[data-id="${item.id}"]`, block);
        if (!card) return;
        const show = matchFilter(item);
        card.style.display = show ? "" : "none";
        if (show) visibleInCat++;
      });

      block.classList.toggle("category-hidden", visibleInCat === 0);
      if (visibleInCat > 0) anyShown = true;
    });
    const empty = $("#menu-empty");
    if (empty) empty.hidden = anyShown;
  }

  function setCategory(catId) {
    state.activeCat = catId;
    $$(".cat-tab").forEach((b) => b.classList.toggle("active", b.dataset.cat === catId));
    applyFilter();
  }

  /* ---------------- cart ---------------- */
  function cartBadge() {
    const total = state.cart.reduce((s, c) => s + c.qty, 0);
    const el = $("#cart-count");
    el.textContent = total;
    el.style.display = total > 0 ? "grid" : "none";
  }

  function cartTotal() {
    return state.cart.reduce((s, c) => s + c.qty * c.price, 0);
  }

  function addToCart(id, delta) {
    const item = MENU_ITEMS.find((i) => i.id === id);
    if (!item) return;
    const line = state.cart.find((c) => c.id === id);
    if (line) {
      line.qty = Math.max(0, line.qty + delta);
    } else if (delta > 0) {
      state.cart.push({ id, qty: delta, price: item.price });
    } else {
      return; // nothing to decrement
    }
    const stillIn = state.cart.some((c) => c.id === id && c.qty > 0);
    state.cart = state.cart.filter((c) => c.qty > 0);
    persistCart();
    refreshMenuCard(id);
    renderCart();
    cartBadge();
    if (delta > 0) toast(t("toast.cartAdded"), "ok");
    else toast(stillIn ? t("toast.cartUpdated") : t("toast.cartRemoved"));
  }

  function setQty(id, qty) {
    const line = state.cart.find((c) => c.id === id);
    if (line) {
      line.qty = Math.max(1, qty);
      persistCart();
      refreshMenuCard(id);
      renderCart();
      cartBadge();
    }
  }

  function removeLine(id) {
    state.cart = state.cart.filter((c) => c.id !== id);
    persistCart();
    refreshMenuCard(id);
    renderCart();
    cartBadge();
    toast(t("toast.cartRemoved"));
  }

  function refreshMenuCard(id) {
    const card = $(`.dish[data-id="${id}"]`);
    if (!card) return;
    const line = state.cart.find((c) => c.id === id);
    const qty = line ? line.qty : 0;
    const count = $("[data-count]", card);
    const btn = $("[data-add]", card);
    if (count) count.textContent = qty;
    if (btn) {
      btn.textContent = qty > 0 ? t("menu.added") : t("menu.add");
      btn.classList.toggle("in-cart", qty > 0);
    }
  }

  function renderCart() {
    const body = $("#cart-body");
    const summary = $("#cart-summary");
    const foot = $("#drawer-foot");

    // تنظيف أي سطر لصنف لم يعد موجوداً في القائمة
    state.cart = state.cart.filter((c) => MENU_ITEMS.some((i) => i.id === c.id));

    if (state.cart.length === 0) {
      body.innerHTML = `<div class="cart-empty"><div class="big">${icon("bag")}</div>${t("cart.empty")}</div>`;
      summary.style.display = "none";
      foot.style.display = "none";
      return;
    }

    body.innerHTML = state.cart.map((c) => {
      const item = MENU_ITEMS.find((i) => i.id === c.id);
      return `
        <div class="cart-line" data-id="${c.id}">
          <div class="cl-info">
            <div class="cl-name">${escapeHtml(itemName(item))}</div>
            <div class="cl-meta"><bdi>${escapeHtml(itemSub(item))}</bdi> × ${c.qty}</div>
          </div>
          <div class="cl-qty">
            <button type="button" data-cart-dec aria-label="-">−</button>
            <span>${c.qty}</span>
            <button type="button" data-cart-inc aria-label="+">+</button>
          </div>
          <div class="cl-price ltr">${fmtEuro(c.qty * c.price)}</div>
          <button type="button" class="cl-remove" data-cart-remove aria-label="${t("cart.remove")}" title="${t("cart.remove")}">${icon("trash")}</button>
        </div>
      `;
    }).join("");

    summary.style.display = "block";
    foot.style.display = "block";

    const subtotal = cartTotal();
    const sumSubtotal = $("#sum-subtotal");
    const sumTotal = $("#sum-total");
    if (sumSubtotal) sumSubtotal.textContent = fmtEuro(subtotal);
    if (sumTotal) sumTotal.textContent = fmtEuro(subtotal);

    $$(".ot-btn").forEach((b) => b.classList.toggle("active", b.dataset.type === state.orderType));
  }

  function setOrderType(type) {
    state.orderType = type;
    localStorage.setItem("azzam_orderType", type);
    $$(".ot-btn").forEach((b) => b.classList.toggle("active", b.dataset.type === type));
  }

  /* ---------------- checkout (WhatsApp) ---------------- */
  function openCheckout() {
    if (state.cart.length === 0) {
      toast(t("toast.cartEmpty"), "err");
      return;
    }
    $("#co-summary").innerHTML = buildOrderLinesHtml();

    const isPickup = state.orderType === "pickup";
    $("#co-district-field").style.display = isPickup ? "none" : "";
    $("#co-address-field").style.display = isPickup ? "none" : "";

    const submitLabel = $("#co-submit-label");
    if (submitLabel) submitLabel.textContent = isPickup ? t("checkout.submitPickup") : t("checkout.submitDelivery");

    openModal("checkout-modal");
    setTimeout(() => { const f = $("#co-fullname"); if (f) f.focus(); }, 150);
  }

  // ملخص الطلب داخل نافذة إتمام الطلب (HTML — الأسعار معزولة LTR)
  function buildOrderLinesHtml() {
    const price = (n) => `<bdi class="ltr">${fmtEuro(n)}</bdi>`;
    const lines = state.cart.map((c) => {
      const item = MENU_ITEMS.find((i) => i.id === c.id);
      return `• ${escapeHtml(itemName(item))} ×${c.qty} — ${price(c.qty * c.price)}`;
    });
    const orderTypeLabel = state.orderType === "pickup" ? t("cart.pickup") : t("cart.delivery");
    lines.push(`${t("checkout.orderType")}: ${orderTypeLabel}`);
    lines.push(`<strong>${t("checkout.total")}: ${price(cartTotal())}</strong>`);
    return lines.join("\n");
  }

  function buildWhatsAppMessage(form) {
    const isPickup = state.orderType === "pickup";
    const L = I18N[state.lang].wa;
    const sep = "------------------------------";

    const lines = state.cart.map((c) => {
      const item = MENU_ITEMS.find((i) => i.id === c.id);
      // الاسم بالألمانية + العربية ليفهمه المطبخ دائماً
      return `• ${item.de} (${item.ar}) ×${c.qty} — ${ltrText(fmtEuro(c.qty * c.price))}`;
    });

    const msg = [
      L.orderTitle,
      sep,
      ...lines,
      sep,
      `${L.total}: ${ltrText(fmtEuro(cartTotal()))}`,
      `${L.type}: ${isPickup ? L.pickup : L.delivery}`,
      `${L.name}: ${form.fullName}`,
      `${L.phone}: ${ltrText(form.phone)}`
    ];

    if (!isPickup) {
      msg.push(`${L.city}: ${form.city}`);
      msg.push(`${L.district}: ${form.district}`);
      msg.push(`${L.address}: ${form.address}`);
    }
    if (form.notes) msg.push(`${L.notes}: ${form.notes}`);
    return msg.join("\n");
  }

  function submitCheckout(e) {
    e.preventDefault();
    const get = (id) => $(id).value.trim();
    const fullName = get("#co-fullname");
    const phone = get("#co-phone");
    const city = get("#co-city");
    const district = get("#co-district");
    const address = get("#co-address");
    const notes = get("#co-notes");
    const isPickup = state.orderType === "pickup";

    if (!fullName || !phone || (!isPickup && (!city || !district || !address))) {
      toast(t("toast.fillRequired"), "err");
      return;
    }
    if (!/^\+?[0-9\s\-()]{6,18}$/.test(phone)) {
      toast(t("toast.phoneInvalid"), "err");
      return;
    }

    const message = buildWhatsAppMessage({ fullName, phone, city, district, address, notes });
    const url = `https://wa.me/${CFG.phone.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");

    closeModal("checkout-modal");
    state.cart = [];
    persistCart();
    cartBadge();
    buildMenu();
    renderCart();
    closeDrawer();
    toast(t("toast.orderSent"), "ok");
  }

  /* ---------------- drawers & modals ---------------- */
  function openDrawer() { renderCart(); $("#cart-drawer").classList.add("open"); $("#drawer-backdrop").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeDrawer() { $("#cart-drawer").classList.remove("open"); $("#drawer-backdrop").classList.remove("open"); document.body.style.overflow = ""; }

  function openModal(id) { $("#" + id).classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal(id) { $("#" + id).classList.remove("open"); document.body.style.overflow = ""; }

  /* ---------------- toast ---------------- */
  const TOAST_ICONS = { ok: "check-circle", err: "alert-circle", "": "info" };
  function toast(msg, type = "") {
    const wrap = $("#toast-wrap");
    const el = document.createElement("div");
    el.className = "toast " + type;
    el.innerHTML = `${icon(TOAST_ICONS[type] || "info", "toast-ico")}<span></span>`;
    el.lastElementChild.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  /* ---------------- open/closed badge (Berlin time) ---------------- */
  function berlinHourNow() {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin", hour: "numeric", minute: "numeric", hourCycle: "h23"
      }).formatToParts(new Date());
      const h = +parts.find((p) => p.type === "hour").value;
      const m = +parts.find((p) => p.type === "minute").value;
      return (h % 24) + m / 60;
    } catch (e) {
      const d = new Date();
      return d.getHours() + d.getMinutes() / 60;
    }
  }

  function isOpenNow() {
    const toH = (s) => { const [h, m] = String(s).split(":").map(Number); return h + (m || 0) / 60; };
    const open = toH(CFG.hours.open || "08:00");
    let close = toH(CFG.hours.close || "00:00");
    if (close <= open) close += 24; // يغلق بعد منتصف الليل
    const now = berlinHourNow();
    return (now >= open && now < close) || (now + 24 >= open && now + 24 < close);
  }

  function renderOpenStatus() {
    const dot = $("#open-dot");
    const label = $("#open-label");
    if (!dot || !label) return;
    const open = isOpenNow();
    dot.classList.toggle("closed", !open);
    label.setAttribute("data-i18n", open ? "badges.openNow" : "badges.closedNow");
    label.textContent = open ? t("badges.openNow") : t("badges.closedNow");
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("visible")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } }),
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------------- static blocks ---------------- */
  function buildCatTabs() {
    const wrap = $("#cat-tabs");
    if (!wrap) return;
    const allBtn = wrap.querySelector('[data-cat="all"]');
    wrap.innerHTML = "";
    wrap.appendChild(allBtn);
    MENU_CATEGORIES.forEach((cat) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cat-tab";
      b.dataset.cat = cat.id;
      b.textContent = itemName(cat);
      wrap.appendChild(b);
    });
    $$(".cat-tab", wrap).forEach((b) => b.classList.toggle("active", b.dataset.cat === state.activeCat));
  }

  function buildFeatures() {
    const wrap = $("#features");
    if (!wrap) return;
    const feats = (I18N[state.lang] && I18N[state.lang].about.features) || [];
    wrap.innerHTML = feats
      .map(
        (f, i) => `
      <div class="feature">
        <div class="f-ico">${icon(FEATURE_ICONS[i] || "utensils")}</div>
        <h4>${escapeHtml(f.title)}</h4>
        <p>${escapeHtml(f.desc)}</p>
      </div>`
      )
      .join("");
  }

  /* ---------------- config-driven values ---------------- */
  function fillConfig() {
    const loc = CFG.location;
    const addr = `${loc.street}, ${loc.zip} ${loc.city}`;

    // العناوين
    $$(".js-address").forEach((el) => (el.textContent = addr));
    $$(".js-address-sub").forEach((el) => (el.textContent = `${loc.district} · ${loc.country}`));
    $$(".js-address-short").forEach((el) => (el.textContent = `${loc.city} · ${loc.district} — ${loc.street}`));
    $$(".js-address-strip").forEach((el) => (el.textContent = `${loc.district} · ${loc.street}, ${loc.zip} ${loc.city}`));

    // الهاتف: الرابط دائماً، والنص فقط حيث يوجد data-phone-text (مع dir=ltr حتى لا ينقلب الرقم في العربية)
    $$(".js-phone").forEach((el) => {
      el.href = "tel:" + CFG.phone.tel;
      if (el.hasAttribute("data-phone-text")) {
        el.textContent = CFG.phone.display;
        el.setAttribute("dir", "ltr");
      }
    });

    // واتساب / إنستغرام
    const waUrl = `https://wa.me/${CFG.phone.whatsapp}?text=${encodeURIComponent(t("wa.greeting"))}`;
    $$(".js-wa").forEach((el) => { el.href = waUrl; el.target = "_blank"; el.rel = "noopener"; });
    $$(".js-ig").forEach((el) => (el.href = CFG.social.instagram));

    // الخريطة
    const map = $("#map-iframe");
    if (map && map.src !== CFG.maps.embed) map.src = CFG.maps.embed;
    const dir = $("#directions-link");
    if (dir) dir.href = CFG.maps.directions;
    const place = $("#maps-open-link");
    if (place) place.href = CFG.maps.place;
  }

  /* ---------------- events ---------------- */
  function bindEvents() {
    // nav scroll
    const nav = $("#site-nav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // burger
    const burger = $("#burger");
    const links = $("#nav-links");
    const setMenu = (open) => {
      links.classList.toggle("open", open);
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };
    burger.addEventListener("click", () => setMenu(!links.classList.contains("open")));
    $$("#nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

    // language dropdown
    $("#lang-btn").addEventListener("click", (e) => { e.stopPropagation(); toggleLangMenu(); });
    $$(".lang-opt").forEach((b) => b.addEventListener("click", () => setLanguage(b.dataset.lang)));
    document.addEventListener("click", (e) => { if (!e.target.closest("#lang-menu")) closeLangMenu(); });

    // category tabs
    $("#cat-tabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".cat-tab");
      if (tab) setCategory(tab.dataset.cat);
    });

    // search
    $("#menu-search").addEventListener("input", (e) => {
      state.search = e.target.value;
      applyFilter();
    });

    // vegan filter
    $("#vegan-toggle").addEventListener("change", (e) => {
      state.veganOnly = e.target.checked;
      applyFilter();
    });

    // menu interactions (qty + add)
    $("#menu-categories").addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) { addToCart(add.dataset.add, 1); return; }
      const qty = e.target.closest(".qty");
      if (qty) {
        const id = qty.dataset.qty;
        if (e.target.closest("[data-inc]")) addToCart(id, 1);
        if (e.target.closest("[data-dec]")) addToCart(id, -1);
      }
    });

    // cart buttons
    $("#cart-btn").addEventListener("click", openDrawer);
    $("#close-drawer").addEventListener("click", closeDrawer);
    $("#drawer-backdrop").addEventListener("click", closeDrawer);
    $("#clear-cart").addEventListener("click", () => {
      state.cart = [];
      persistCart();
      buildMenu();
      renderCart();
      cartBadge();
      toast(t("toast.cartCleared"));
    });

    $("#cart-body").addEventListener("click", (e) => {
      const line = e.target.closest(".cart-line");
      if (!line) return;
      const id = line.dataset.id;
      const c = state.cart.find((x) => x.id === id);
      if (!c) return;
      if (e.target.closest("[data-cart-inc]")) setQty(id, c.qty + 1);
      else if (e.target.closest("[data-cart-dec]")) { if (c.qty > 1) setQty(id, c.qty - 1); else removeLine(id); }
      else if (e.target.closest("[data-cart-remove]")) removeLine(id);
    });

    $$(".ot-btn").forEach((b) => b.addEventListener("click", () => setOrderType(b.dataset.type)));

    $("#checkout-btn").addEventListener("click", openCheckout);

    // modal close
    $$("[data-close]").forEach((b) => b.addEventListener("click", () => closeModal(b.dataset.close)));
    $$(".modal-backdrop").forEach((m) => m.addEventListener("click", (e) => { if (e.target === m) closeModal(m.id); }));

    $("#checkout-form").addEventListener("submit", submitCheckout);

    // keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if ($("#checkout-modal").classList.contains("open")) closeModal("checkout-modal");
        else if ($("#cart-drawer").classList.contains("open")) closeDrawer();
        else if ($("#lang-menu").classList.contains("open")) closeLangMenu();
        else if (links.classList.contains("open")) setMenu(false);
      }
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    applyDocumentLang();
    bindStaticTexts();
    buildCatTabs();
    buildFeatures();
    fillConfig();
    buildMenu();
    renderCart();
    cartBadge();
    renderOpenStatus();
    setInterval(renderOpenStatus, 60 * 1000);
    bindEvents();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
