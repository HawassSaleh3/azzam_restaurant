/* =====================================================================
   Azzam Restaurant — App Logic
   لغة (ع/إن) • قائمة • سلة تسوق • طلب عبر واتساب • خريطة Google
   ===================================================================== */

(function () {
  "use strict";

  const CFG = window.APP_CONFIG;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------- state ---------------- */
  const state = {
    lang: localStorage.getItem("azzam_lang") || "ar",
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

  const fmtEuro = (n) => {
    return n.toFixed(2).replace(".", ",") + " €";
  };

  /* ---------------- language ---------------- */
  function renderStaticTexts() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = I18N[state.lang].dir;
    document.body.classList.toggle("rtl", state.lang === "ar");
  }

  function bindStaticTexts() {
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = t(key);
      if (typeof value === "string") el.textContent = value;
    });
    $$("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      const value = t(key);
      if (typeof value === "string") el.setAttribute("placeholder", value);
    });
    const lb = $("#lang-btn-label");
    if (lb) lb.textContent = t("langBtn");

    // brand mark letter responds to language
    $$(".brand-mark").forEach((el) => (el.textContent = state.lang === "ar" ? "ع" : "A"));

    // category tabs re-labeled (names come from menu data)
    buildCatTabs();
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function setLanguage(lang) {
    state.lang = lang;
    persistLang();
    buildCatTabs();
    buildFeatures();
    buildMenu();
    renderCart();
    renderStaticTexts();
    bindStaticTexts();
    fillConfig();
  }

  /* ---------------- menu rendering ---------------- */
  function buildMenu() {
    const catsWrap = $("#menu-categories");
    catsWrap.innerHTML = "";

    MENU_CATEGORIES.forEach((cat) => {
      const items = MENU_ITEMS.filter((i) => i.cat === cat.id);
      const visible = items.filter((i) => matchFilter(i));
      const block = document.createElement("section");
      block.className = "category-block";
      block.dataset.cat = cat.id;
      if (visible.length === 0) block.classList.add("category-hidden");

      const title = state.lang === "ar" ? cat.ar : cat.de;
      block.innerHTML = `
        <div class="cat-head">
          <h3>${title}</h3>
          <span class="cat-tagline">${items.length} ${t("menu.items")}</span>
        </div>
        <div class="menu-grid">
          ${items.map((item) => dishCard(item)).join("")}
        </div>
      `;
      catsWrap.appendChild(block);

      // toggle visibility per item on re-render fades handled in applyFilter
    });

    applyFilter();
  }

  function dishCard(item) {
    const isAr = state.lang === "ar";
    const name = isAr ? item.ar : item.de;
    const sub = isAr ? item.de : item.ar;
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
          <div class="dish-name">${name}<span class="de">${sub}</span></div>
          <div class="price">${fmtEuro(item.price)}</div>
        </div>
        <div class="dish-badges">
          <span class="diet ${item.diet}">${dietLabel}</span>
        </div>
        <div class="dish-actions">
          <div class="qty" data-qty="${item.id}">
            <button data-dec="minus" aria-label="-">−</button>
            <span data-count>${qty}</span>
            <button data-inc="plus" aria-label="+">+</button>
          </div>
          <button class="add-btn" data-add="${item.id}">${qty > 0 ? t("menu.added") : t("menu.add")}</button>
        </div>
      </article>
    `;
  }

  function matchFilter(item) {
    const catOk = state.activeCat === "all" || item.cat === state.activeCat;
    if (!catOk) return false;
    if (state.veganOnly && item.diet !== "vegan") return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${item.de} ${item.ar}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function applyFilter() {
    $$(".category-block").forEach((block) => {
      const catId = block.dataset.cat;
      const items = MENU_ITEMS.filter((i) => i.cat === catId);
      const anyVisible = items.some(matchFilter);

      const catHidden = state.activeCat !== "all" && state.activeCat !== catId;
      block.classList.toggle("category-hidden", !anyVisible || catHidden);

      items.forEach((item) => {
        const card = $(`.dish[data-id="${item.id}"]`, block);
        if (card) {
          const show = state.activeCat === "all" || catId === state.activeCat;
          card.style.display = show && matchFilter(item) ? "" : "none";
        }
      });
    });
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
    }
    state.cart = state.cart.filter((c) => c.qty > 0);
    persistCart();
    refreshMenuCard(id);
    renderCart();
    cartBadge();
    toast(t("toast.cartAdded"), "ok");
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
    const item = MENU_ITEMS.find((i) => i.id === id);
    if (!item) return;
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
    const lines = state.cart.map((c) => {
      const item = MENU_ITEMS.find((i) => i.id === c.id);
      const name = state.lang === "ar" ? item.ar : item.de;
      const sub = state.lang === "ar" ? item.de : item.ar;
      return `
        <div class="cart-line" data-id="${c.id}">
          <div class="cl-info">
            <div class="cl-name">${name}</div>
            <div class="cl-meta">${sub} × ${c.qty}</div>
          </div>
          <div class="cl-qty">
            <button data-cart-dec aria-label="-">−</button>
            <span>${c.qty}</span>
            <button data-cart-inc aria-label="+">+</button>
          </div>
          <div class="cl-price">${fmtEuro(c.qty * c.price)}</div>
          <button class="cl-remove" data-cart-remove aria-label="${t("cart.remove")}">🗑</button>
        </div>
      `;
    }).join("");

    const summary = $("#cart-summary");
    const foot = $("#drawer-foot");

    if (state.cart.length === 0) {
      body.innerHTML = `<div class="cart-empty"><div class="big">🛒</div>${t("cart.empty")}</div>`;
      summary.style.display = "none";
      foot.style.display = "none";
      return;
    }

    body.innerHTML = lines;
    summary.style.display = "block";
    foot.style.display = "block";

    const subtotal = cartTotal();
    const sumSubtotal = $("#sum-subtotal");
    const sumTotal = $("#sum-total");
    if (sumSubtotal) sumSubtotal.textContent = fmtEuro(subtotal);
    if (sumTotal) sumTotal.textContent = fmtEuro(subtotal);

    // order type buttons
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
    $("#co-summary").textContent = buildOrderLinesText();

    // show / hide district & address for pickup
    const isPickup = state.orderType === "pickup";
    $("#co-district-field").style.display = isPickup ? "none" : "";
    $("#co-address-field").style.display = isPickup ? "none" : "";

    const submit = $("#co-submit");
    const submitLabel = submit.querySelector("[data-i18n]");
    if (submitLabel) submitLabel.textContent = isPickup ? t("checkout.submitPickup") : t("checkout.submitDelivery");

    openModal("checkout-modal");
  }

  function buildOrderLinesText() {
    const lines = state.cart.map((c) => {
      const item = MENU_ITEMS.find((i) => i.id === c.id);
      const name = state.lang === "ar" ? item.ar : `${item.de} (${item.ar})`;
      return `• ${name} x${c.qty} — ${fmtEuro(c.qty * c.price)}`;
    });
    const orderTypeLabel = state.orderType === "pickup" ? t("cart.orderTypePickup") : t("cart.orderTypeDelivery");
    let txt = lines.join("\n");
    txt += `\n${state.lang === "ar" ? "النوع" : "Type"}: ${orderTypeLabel}`;
    txt += `\n${state.lang === "ar" ? "الإجمالي" : "Total"}: ${fmtEuro(cartTotal())}`;
    return txt;
  }

  function buildWhatsAppMessage(form) {
    const isPickup = state.orderType === "pickup";
    const L = state.lang === "ar"
      ? {
          order: "🛒 طلب جديد من موقع مطعم عزّام",
          type: "نوع الطلب",
          delivery: "توصيل",
          pickup: "استلام من المطعم",
          name: "الاسم الكامل",
          phone: "رقم الهاتف",
          city: "المدينة",
          district: "المنطقة",
          address: "العنوان بالتفاصيل",
          notes: "ملاحظات",
          total: "الإجمالي"
        }
      : {
          order: "🛒 New order from the Azzam Restaurant website",
          type: "Order type",
          delivery: "Delivery",
          pickup: "Pickup",
          name: "Full name",
          phone: "Phone",
          city: "City",
          district: "District",
          address: "Address details",
          notes: "Notes",
          total: "Total"
        };

    const lines = state.cart.map((c) => {
      const item = MENU_ITEMS.find((i) => i.id === c.id);
      return `• ${item.de} (${item.ar}) x${c.qty} — ${fmtEuro(c.qty * c.price)}`;
    });

    const msg = [
      `${L.order} 🍽`,
      "------------------------------",
      ...lines,
      `\n${state.lang === "ar" ? "الإجمالي" : "Total"}: ${fmtEuro(cartTotal())}`,
      "------------------------------",
      `📍 ${L.type}: ${isPickup ? L.pickup : L.delivery}`,
      `🧑 ${L.name}: ${form.fullName}`,
      `📞 ${L.phone}: ${form.phone}`,
    ];

    if (!isPickup) {
      msg.push(`🏙 ${L.city}: ${form.city}`);
      msg.push(`🗺 ${L.district}: ${form.district}`);
      msg.push(`🏠 ${L.address}: ${form.address}`);
    }
    if (form.notes) msg.push(`📝 ${L.notes}: ${form.notes}`);
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
    window.open(url, "_blank");

    closeModal("checkout-modal");
    state.cart = [];
    persistCart();
    cartBadge();
    buildMenu();
    renderCart();
    closeDrawer();
    toast("✓ " + (state.lang === "ar" ? "تم فتح واتساب لإتمام طلبك" : "WhatsApp opened to complete your order"), "ok");
  }

  /* ---------------- drawers & modals ---------------- */
  function openDrawer() { renderCart(); $("#cart-drawer").classList.add("open"); $("#drawer-backdrop").classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeDrawer() { $("#cart-drawer").classList.remove("open"); $("#drawer-backdrop").classList.remove("open"); document.body.style.overflow = ""; }

  function openModal(id) { $("#" + id).classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal(id) { $("#" + id).classList.remove("open"); document.body.style.overflow = ""; }

  /* ---------------- toast ---------------- */
  function toast(msg, type = "") {
    const wrap = $("#toast-wrap");
    const el = document.createElement("div");
    el.className = "toast " + type;
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  /* ---------------- open/closed badge ---------------- */
  function renderOpenStatus() {
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const open = h >= 8 || h < 0; // opens 08:00 → 00:00 daily
    const el = $("#open-status");
    if (!el) return;
    el.innerHTML = `
      <span class="open-dot${open ? "" : " closed"}"></span>
      <span>${open ? t("badges.openNow") : t("badges.closedNow")}</span>`;
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveal() {
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
      b.className = "cat-tab";
      b.dataset.cat = cat.id;
      b.textContent = state.lang === "ar" ? cat.ar : cat.de;
      wrap.appendChild(b);
    });
  }

  function buildFeatures() {
    const wrap = $("#features");
    if (!wrap) return;
    const feats = I18N[state.lang] ? I18N[state.lang].about.features : [];
    if (!feats) return;
    wrap.innerHTML = feats
      .map(
        (f) => `
      <div class="feature">
        <div class="f-ico">${f.icon}</div>
        <h4>${f.title}</h4>
        <p>${f.desc}</p>
      </div>`
      )
      .join("");
  }

  /* ---------------- config-driven values ---------------- */
  function fillConfig() {
    const loc = CFG.location;
    const addr = `${loc.street}, ${loc.zip} ${loc.city}`;
    const set = (sel, fn) => { const el = $(sel); if (el) fn(el); };

    set("#loc-address", (el) => (el.textContent = addr));
    set("#loc-phone", (el) => { el.href = "tel:" + CFG.phone.tel; el.textContent = CFG.phone.display; });
    set("#strip-location", (el) => (el.textContent = `${loc.district} • ${loc.street}, ${loc.zip}`));

    const waBase = `https://wa.me/${CFG.phone.whatsapp}?text=`;
    const waFloat = (el) => (el.href = waBase + encodeURIComponent(defaultWaText()));
    set("#wa-float", waFloat);
    set("#hero-wa-btn", waFloat);
    set("#cta-wa-btn", waFloat);
    set("#contact-wa-btn", waFloat);
    set("#footer-wa-link", (el) => { el.href = waBase + encodeURIComponent(defaultWaText()); el.target = "_blank"; });
    set("#social-wa-2", (el) => { el.href = waBase + encodeURIComponent(defaultWaText()); el.target = "_blank"; });

    set("#social-instagram", (el) => (el.href = CFG.social.instagram));
    set("#social-instagram-2", (el) => (el.href = CFG.social.instagram));
    set("#map-iframe", (el) => (el.src = CFG.maps.embed));
    set("#co-summary", (el) => { if (!el.textContent.trim()) el.textContent = buildOrderLinesText(); });
    set("#directions-link", (el) => (el.href = CFG.maps.directions));
    set("#maps-open-link", (el) => (el.href = CFG.maps.place));
  }

  function defaultWaText() {
    return state.lang === "ar"
      ? "مرحباً مطعم عزّام، لدي استفسار 🌟"
      : "Hello Azzam Restaurant, I have a question 🌟";
  }
  function bindEvents() {
    // nav scroll
    window.addEventListener("scroll", () => {
      $("#site-nav").classList.toggle("scrolled", window.scrollY > 20);
    });

    // burger
    $("#burger").addEventListener("click", () => $("#nav-links").classList.toggle("open"));
    $$("#nav-links a").forEach((a) => a.addEventListener("click", () => $("#nav-links").classList.remove("open")));

    // language
    $("#lang-btn").addEventListener("click", () => setLanguage(state.lang === "ar" ? "en" : "ar"));

    // category tabs
    $(".cat-tabs").addEventListener("click", (e) => {
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
        const inc = e.target.closest("[data-inc]");
        const dec = e.target.closest("[data-dec]");
        if (inc) addToCart(id, 1);
        if (dec) addToCart(id, -1);
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
      }
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    renderStaticTexts();
    bindStaticTexts();
    buildFeatures();
    fillConfig();
    buildMenu();
    renderCart();
    cartBadge();
    renderOpenStatus();
    bindEvents();
    initReveal();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
