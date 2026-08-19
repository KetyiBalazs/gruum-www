const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

const setScrolled = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

setScrolled();
window.addEventListener("scroll", setScrolled, { passive: true });

const closeNav = () => {
  links.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
});

links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});
