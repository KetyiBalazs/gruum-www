const isDark = document.documentElement.getAttribute("data-theme") === "dark";

const applyGrain = () => {
  const tile = 160;
  const canvas = document.createElement("canvas");
  canvas.width = tile;
  canvas.height = tile;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const amount = isDark ? 0.08 : 0.03;
  const image = ctx.createImageData(tile, tile);
  const { data } = image;
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.round(255 * (1 - Math.random() * amount));
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  document.body.style.setProperty("--noise-tile", `url("${canvas.toDataURL("image/png")}")`);
};

applyGrain();

if (isDark) {
  document.querySelectorAll(".logo-full").forEach((img) => {
    img.src = "assets/gruum-logo-dark.png";
  });

  document.querySelectorAll("a[href]").forEach((anchor) => {
    const raw = anchor.getAttribute("href");
    if (!raw || /^(https?:|mailto:|tel:|#)/i.test(raw)) return;
    const url = new URL(raw, location.href);
    if (url.origin !== location.origin) return;
    const file = url.pathname.split("/").pop() || "index.html";
    if (!file.endsWith(".html")) return;
    url.searchParams.set("theme", "dark");
    anchor.setAttribute("href", file + url.search + url.hash);
  });
}

const toggle = document.querySelector(".nav-toggle");
const sidebar = document.getElementById("site-sidebar");
const navLinks = sidebar ? [...sidebar.querySelectorAll("[data-nav]")] : [];

const closeNav = () => {
  if (!sidebar || !toggle) return;
  sidebar.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

if (toggle && sidebar) {
  toggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

const sectionIds = [...new Set(navLinks.map((link) => link.dataset.nav).filter(Boolean))];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === id);
  });
};

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.15, 0.4] }
  );

  sections.forEach((section) => observer.observe(section));
}

const billing = document.querySelector("[data-billing]");
if (billing) {
  const buttons = [...billing.querySelectorAll("[data-cycle]")];
  const amounts = [...document.querySelectorAll("[data-price-yearly]")];
  const yearlyNotes = [...document.querySelectorAll("[data-yearly-note]")];

  const setCycle = (cycle) => {
    billing.dataset.cycle = cycle;
    buttons.forEach((btn) => {
      const on = btn.dataset.cycle === cycle;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
    amounts.forEach((el) => {
      const value = cycle === "yearly" ? el.dataset.priceYearly : el.dataset.priceMonthly;
      el.textContent = `$${value}`;
    });
    yearlyNotes.forEach((note) => {
      note.hidden = cycle !== "yearly";
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setCycle(btn.dataset.cycle));
  });
}
