/* ==========================================================
   Nasir Electrons — interactions
   ========================================================== */
(() => {
  "use strict";

  const CURRENCY = "Rs ";
  const IMG = (id, w = 700) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const PRODUCTS = [
    { name: "iPhone Pro Max 256GB", cat: "phones", price: 389999, old: 419999, rating: 4.9, reviews: 812, tag: "Best Seller", img: IMG("photo-1592750475338-74b7b21085ab") },
    { name: "Galaxy S Ultra 5G", cat: "phones", price: 329999, old: 359999, rating: 4.8, reviews: 640, tag: "New", img: IMG("photo-1610945265064-0e34e5519bbf") },
    { name: "MacBook Air M-Series 13\"", cat: "laptops", price: 344999, old: 369999, rating: 4.9, reviews: 455, tag: "Hot", img: IMG("photo-1517336714731-489689fd1ca8") },
    { name: "Ultrabook Pro 14\" i7", cat: "laptops", price: 249999, old: 279999, rating: 4.7, reviews: 298, img: IMG("photo-1496181133206-80ce9b88a853") },
    { name: "Wireless ANC Headphones", cat: "audio", price: 54999, old: 79999, rating: 4.8, reviews: 1204, tag: "-30%", img: IMG("photo-1505740420928-5e560c06d30e") },
    { name: "Portable Bluetooth Speaker", cat: "audio", price: 18999, old: 22999, rating: 4.6, reviews: 530, img: IMG("photo-1608043152269-423dbba4e7e1") },
    { name: "55\" 4K UHD Smart TV", cat: "tv", price: 149999, old: 174999, rating: 4.7, reviews: 342, tag: "Deal", img: IMG("photo-1593359677879-a4bb92f829d1") },
    { name: "Mirrorless Camera Kit", cat: "cameras", price: 219999, old: 239999, rating: 4.8, reviews: 187, img: IMG("photo-1516035069371-29a1b244cc32") },
    { name: "Instant Film Camera", cat: "cameras", price: 24999, rating: 4.5, reviews: 260, img: IMG("photo-1526170375885-4d8ecf77b99f") },
    { name: "Wireless Game Controller", cat: "gaming", price: 15999, old: 18999, rating: 4.7, reviews: 690, img: IMG("photo-1606144042614-b2417e99c4e3") },
    { name: "Next-Gen Gaming Console", cat: "gaming", price: 164999, rating: 4.9, reviews: 920, tag: "Hot", img: IMG("photo-1486401899868-0e435ed85128") },
    { name: "Smartwatch Series GPS", cat: "wearables", price: 89999, old: 99999, rating: 4.8, reviews: 733, tag: "New", img: IMG("photo-1546868871-7041f2a55e12") },
  ];

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = (n) => CURRENCY + n.toLocaleString("en-US");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Image fallback (so a missing photo never looks broken) ---------- */
  const guardImg = (img) => {
    img.addEventListener("error", () => img.classList.add("img-fallback"), { once: true });
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
  const words = ["Smartphones.", "Laptops.", "Smart TVs.", "Headphones.", "Gaming.", "Electronics."];
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
  const labels = { phones: "Smartphone", laptops: "Laptop", audio: "Audio", tv: "Smart TV", cameras: "Camera", gaming: "Gaming", wearables: "Wearable" };

  const renderProducts = (filter = "all") => {
    const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);
    grid.innerHTML = list.map((p, idx) => `
      <article class="product" style="animation-delay:${idx * 60}ms">
        <div class="product__media">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
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
