/* ==========================================================
   Nasir Electrons — interactions
   ========================================================== */
(() => {
  "use strict";

  const CURRENCY = "Rs ";
  // Photo for each product: assets/products/<slug>.jpg if you add one,
  // otherwise a keyword-matched stock photo, otherwise a styled icon.
  const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const stock = (tags, lock) => `https://loremflickr.com/800/600/${tags}/all?lock=${lock}`;

  const PRODUCTS = [
    // Fans
    { name: "Ceiling Fan", cat: "fans", price: 12999, old: 14999, rating: 4.8, reviews: 1320, tag: "Best Seller", tags: "ceiling,fan", icon: "🌀" },
    { name: "Pedestal Fan", cat: "fans", price: 10499, old: 11999, rating: 4.7, reviews: 860, tags: "electric,fan", icon: "🌀" },
    { name: "Exhaust Fan", cat: "fans", price: 3999, rating: 4.6, reviews: 540, tags: "exhaust,fan", icon: "🌀" },
    { name: "Wall-Mounted Fan", cat: "fans", price: 8499, old: 9499, rating: 4.6, reviews: 410, tags: "wall,fan", icon: "🌀" },
    { name: "Table Fan", cat: "fans", price: 5999, rating: 4.5, reviews: 690, tags: "desk,fan", icon: "🌀" },
    // Air conditioners
    { name: "Air Conditioner (AC) 1.5 Ton Inverter", cat: "ac", price: 164999, old: 219999, rating: 4.9, reviews: 975, tag: "-25%", tags: "air,conditioner", icon: "❄️" },
    { name: "Portable Air Conditioner", cat: "ac", price: 119999, old: 134999, rating: 4.6, reviews: 220, tag: "New", tags: "portable,air,conditioner", icon: "❄️" },
    // Air coolers
    { name: "Room Cooler / Air Cooler", cat: "coolers", price: 32999, old: 37999, rating: 4.7, reviews: 780, tag: "Hot", tags: "air,cooler", icon: "💨" },
    { name: "Air Cooler Fan", cat: "coolers", price: 21999, rating: 4.5, reviews: 365, tags: "evaporative,cooler", icon: "💨" },
    // Refrigeration
    { name: "Refrigerator / Fridge", cat: "fridge", price: 139999, old: 154999, rating: 4.8, reviews: 1104, tag: "Best Seller", tags: "refrigerator", icon: "🧊" },
    { name: "Deep Freezer", cat: "fridge", price: 109999, old: 119999, rating: 4.7, reviews: 430, tags: "freezer", icon: "🧊" },
    // Cooking
    { name: "Microwave Oven", cat: "cooking", price: 29999, old: 34999, rating: 4.7, reviews: 890, tags: "microwave,oven", icon: "🍳" },
    { name: "Electric Oven", cat: "cooking", price: 24999, rating: 4.6, reviews: 315, tags: "electric,oven", icon: "🍳" },
    { name: "Air Fryer", cat: "cooking", price: 18999, old: 24999, rating: 4.9, reviews: 1460, tag: "Hot", tags: "air,fryer", icon: "🍟" },
    { name: "Electric Stove", cat: "cooking", price: 9999, rating: 4.5, reviews: 280, tags: "electric,stove", icon: "🔥" },
    { name: "Induction Cooker", cat: "cooking", price: 11999, old: 13999, rating: 4.6, reviews: 455, tags: "induction,cooktop", icon: "🔥" },
    { name: "Rice Cooker", cat: "cooking", price: 8999, rating: 4.7, reviews: 510, tags: "rice,cooker", icon: "🍚" },
    { name: "Electric Pressure Cooker", cat: "cooking", price: 16999, old: 19999, rating: 4.7, reviews: 390, tags: "pressure,cooker", icon: "🍲" },
    // Kitchen helpers
    { name: "Electric Kettle", cat: "small", price: 4499, old: 5499, rating: 4.8, reviews: 1210, tags: "electric,kettle", icon: "☕" },
    { name: "Toaster", cat: "small", price: 5999, rating: 4.6, reviews: 470, tags: "toaster", icon: "🍞" },
    { name: "Sandwich Maker", cat: "small", price: 4999, rating: 4.5, reviews: 520, tags: "sandwich,maker", icon: "🥪" },
    { name: "Blender", cat: "small", price: 7999, old: 9499, rating: 4.7, reviews: 760, tags: "blender", icon: "🥤" },
    { name: "Juicer", cat: "small", price: 9499, rating: 4.6, reviews: 340, tags: "juicer", icon: "🍊" },
    { name: "Food Processor", cat: "small", price: 19999, old: 22999, rating: 4.7, reviews: 260, tag: "New", tags: "food,processor", icon: "🥕" },
    { name: "Mixer Grinder", cat: "small", price: 11999, rating: 4.6, reviews: 410, tags: "mixer,grinder", icon: "🌶️" },
    // Kitchen care
    { name: "Dishwasher", cat: "care", price: 149999, old: 164999, rating: 4.7, reviews: 180, tags: "dishwasher", icon: "🍽️" },
    { name: "Range Hood / Kitchen Exhaust", cat: "care", price: 39999, old: 44999, rating: 4.6, reviews: 230, tags: "range,hood", icon: "♨️" },
  ].map((p, i) => ({ ...p, img: `assets/products/${slug(p.name)}.jpg`, fallback: stock(p.tags, 100 + i) }));

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = (n) => CURRENCY + n.toLocaleString("en-US");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Image fallback chain ----------
     Tries src, then each URL in data-fallback ("a|b"), then shows the
     parent's data-icon on a styled background so nothing looks broken. */
  const guardImg = (img) => {
    const queue = (img.dataset.fallback || "").split("|").filter(Boolean);
    img.addEventListener("error", function next() {
      if (queue.length) { img.src = queue.shift(); return; }
      img.removeEventListener("error", next);
      img.classList.add("img-fallback");
      img.parentElement.classList.add("icon-fallback");
    });
    // Image already failed before this script ran
    if (img.complete && img.naturalWidth === 0 && img.src) img.dispatchEvent(new Event("error"));
  };
  $$("img").forEach(guardImg);

  /* ---------- Loader ---------- */
  const hideLoader = () => $("#loader")?.classList.add("hide");
  window.addEventListener("load", () => setTimeout(hideLoader, 300));
  setTimeout(hideLoader, 3500); // never block the page on slow media

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Typewriter (live typing) ---------- */
  const typedEl = $("#typed");
  const words = ["Ceiling Fans.", "Air Conditioners.", "Air Coolers.", "Refrigerators.", "Air Fryers.", "Microwave Ovens.", "Home Appliances."];
  if (reducedMotion) {
    typedEl.textContent = words[words.length - 1];
  } else {
    let w = 0, i = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, i);
      let delay = deleting ? 45 : 95;
      if (!deleting && i === word.length) { deleting = true; delay = 1600; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 900);
  }

  /* ---------- Header / progress / to-top / active nav ---------- */
  const header = $("#header");
  const progress = $("#progress");
  const toTop = $("#toTop");
  const navLinks = $$(".nav__link");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 40);
    toTop.classList.toggle("show", y > 700);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

    let current = sections[0];
    for (const s of sections) if (s.offsetTop - 140 <= y) current = s;
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current.id));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const nav = $("#nav");
  const setMenu = (open) => {
    burger.classList.toggle("open", open);
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open);
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  navLinks.forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  const observeReveal = (root = document) => $$(".reveal:not(.visible)", root).forEach((el, idx) => {
    el.style.transitionDelay = (idx % 4) * 90 + "ms";
    revealObserver.observe(el);
  });
  observeReveal();

  /* ---------- Animated counters ---------- */
  const countObserver = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const dur = 1800;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  }), { threshold: 0.5 });
  $$("[data-count]").forEach((el) => countObserver.observe(el));

  /* ---------- Products ---------- */
  const grid = $("#productGrid");
  const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
  const labels = { fans: "Fan", ac: "Air Conditioner", coolers: "Air Cooler", fridge: "Refrigeration", cooking: "Cooking", small: "Kitchen Helper", care: "Kitchen Care" };

  const renderProducts = (filter = "all") => {
    const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
    grid.innerHTML = list.map((p, idx) => `
      <article class="product" style="animation-delay:${idx * 60}ms">
        <div class="product__media" data-icon="${p.icon}">
          <img src="${p.img}" data-fallback="${p.fallback}" alt="${p.name}" loading="lazy" />
          ${p.tag ? `<span class="product__tag">${p.tag}</span>` : ""}
          <button class="product__fav" aria-label="Add ${p.name} to wishlist">♡</button>
        </div>
        <div class="product__body">
          <span class="product__cat">${labels[p.cat]}</span>
          <h3 class="product__name">${p.name}</h3>
          <div class="product__rating">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span></div>
          <div class="product__foot">
            <div class="price">${fmt(p.price)}${p.old ? `<s>${fmt(p.old)}</s>` : ""}</div>
            <button class="add-btn" data-name="${p.name}" aria-label="Add ${p.name} to cart">+</button>
          </div>
        </div>
      </article>`).join("");
    $$("img", grid).forEach(guardImg);
  };
  renderProducts();

  const setFilter = (filter) => {
    $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === filter));
    renderProducts(filter);
  };
  $("#filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) setFilter(chip.dataset.filter);
  });
  // Category tiles jump to products, pre-filtered
  $$(".cat").forEach((c) => c.addEventListener("click", () => setFilter(c.dataset.filter)));

  /* ---------- Cart & wishlist ---------- */
  let cart = 0;
  const cartCount = $("#cartCount");
  const cartBtn = $("#cartBtn");
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  grid.addEventListener("click", (e) => {
    const add = e.target.closest(".add-btn");
    const fav = e.target.closest(".product__fav");
    if (add) {
      cart++;
      cartCount.textContent = cart;
      cartBtn.classList.remove("bump"); void cartBtn.offsetWidth; cartBtn.classList.add("bump");
      add.classList.add("added"); add.textContent = "✓";
      setTimeout(() => { add.classList.remove("added"); add.textContent = "+"; }, 1400);
      showToast(`🛒 ${add.dataset.name} added to cart`);
    }
    if (fav) {
      const on = fav.classList.toggle("on");
      fav.textContent = on ? "♥" : "♡";
      showToast(on ? "❤️ Added to wishlist" : "Removed from wishlist");
    }
  });
  cartBtn.addEventListener("click", () =>
    showToast(cart ? `You have ${cart} item${cart > 1 ? "s" : ""} in your cart` : "Your cart is empty"));

  /* ---------- Videos: play only when on screen ---------- */
  const showcaseVideo = $("#showcaseVideo");
  const playToggle = $("#playToggle");
  const playIcon = $(".play-btn__icon", playToggle);
  let userPaused = false;
  const syncIcon = () => { playIcon.textContent = showcaseVideo.paused ? "▶" : "❚❚"; };
  showcaseVideo.addEventListener("play", syncIcon);
  showcaseVideo.addEventListener("pause", syncIcon);
  syncIcon();

  const vidObserver = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting && !(v === showcaseVideo && userPaused)) v.play().catch(() => {});
    else if (!e.isIntersecting) v.pause();
  }), { threshold: 0.25 });
  $$("video").forEach((v) => vidObserver.observe(v));

  playToggle.addEventListener("click", () => {
    if (showcaseVideo.paused) { userPaused = false; showcaseVideo.play().catch(() => {}); }
    else { userPaused = true; showcaseVideo.pause(); }
  });
  // "Watch Video" hero button scrolls to the showcase and starts it
  $('.hero__cta a[href="#showcase"]').addEventListener("click", () => {
    userPaused = false;
    showcaseVideo.play().catch(() => {});
  });

  /* ---------- Countdown (resets every Sunday midnight) ---------- */
  const nextSunday = () => {
    const d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
    d.setHours(0, 0, 0, 0);
    return d;
  };
  let deadline = nextSunday();
  const pad = (n) => String(n).padStart(2, "0");
  const tickCountdown = () => {
    let diff = deadline - Date.now();
    if (diff <= 0) { deadline = nextSunday(); diff = deadline - Date.now(); }
    const s = Math.floor(diff / 1000);
    $("#cdD").textContent = pad(Math.floor(s / 86400));
    $("#cdH").textContent = pad(Math.floor((s % 86400) / 3600));
    $("#cdM").textContent = pad(Math.floor((s % 3600) / 60));
    $("#cdS").textContent = pad(s % 60);
  };
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((f) => {
      const bad = !f.value.trim();
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    note.className = "form__note " + (ok ? "ok" : "err");
    note.textContent = ok
      ? "✓ Thanks! We'll get back to you shortly."
      : "Please fill in your name, phone and message.";
    if (ok) form.reset();
  });
  form.addEventListener("input", (e) => e.target.classList.remove("invalid"));
})();
