/* Small shared helpers used across the site. */

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function formatDateParts(iso) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return { day: "", month: "", weekday: "", long: iso };

  return {
    day: new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date),
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date),
    long: new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date),
  };
}

export function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
