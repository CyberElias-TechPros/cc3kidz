/* Scroll reveals, counters and the back-to-top button. */

import { prefersReducedMotion } from "./utils.js";

export function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    elements.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  const observe = (el) => {
    if (!el.classList.contains("in-view")) observer.observe(el);
  };

  elements.forEach(observe);

  /* Content rendered later (lessons, events) also gets revealed. */
  if ("MutationObserver" in window) {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.(".reveal")) observe(node);
          node.querySelectorAll?.(".reveal").forEach(observe);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}

export function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (Number.isNaN(target)) return;

    if (prefersReducedMotion()) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1300;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

export function initToTop() {
  const button = document.querySelector("[data-to-top]");
  if (!button) return;

  const onScroll = () => {
    button.classList.toggle("is-visible", window.scrollY > 600);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });
}

export function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}
