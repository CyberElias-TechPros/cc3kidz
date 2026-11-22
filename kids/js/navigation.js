/* Sticky navigation state, mobile drawer and focus handling. */

export function initNavigation() {
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-menu");

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (!toggle || !menu) return;

  let lastFocused = null;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);

    if (open) {
      lastFocused = document.activeElement;
      const firstLink = menu.querySelector("a");
      if (firstLink) window.setTimeout(() => firstLink.focus(), 180);
    } else if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  };

  toggle.addEventListener("click", () => {
    setOpen(!menu.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (!menu.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "Tab") {
      const focusable = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
