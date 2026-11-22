/* Gallery category filters and accessible lightbox. */

import { icon } from "./components.js";
import { escapeHtml } from "./utils.js";

export function initGallery() {
  const grid = document.querySelector("[data-gallery-grid]");
  const filters = document.querySelector("[data-gallery-filters]");
  const count = document.querySelector("[data-gallery-count]");
  if (!grid) return;

  const cards = [...grid.querySelectorAll(".gallery-card")];

  const applyFilter = (category) => {
    let visible = 0;
    cards.forEach((card) => {
      const show = category === "All" || card.dataset.category === category;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) {
      count.textContent = `${visible} ${visible === 1 ? "photo" : "photos"}`;
    }
  };

  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filters.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("is-active", chip === button);
    });
    applyFilter(button.dataset.filter);
  });

  applyFilter("All");

  /* Lightbox ------------------------------------------------------------- */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.id = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image viewer");
  lightbox.innerHTML = `
    <button class="lightbox__btn lightbox__close" type="button" data-lightbox-close aria-label="Close image viewer">${icon("close")}</button>
    <button class="lightbox__btn lightbox__prev" type="button" data-lightbox-prev aria-label="Previous image">${icon("chevron-left")}</button>
    <figure class="lightbox__figure">
      <img src="" alt="" />
      <figcaption class="lightbox__caption">
        <span data-lightbox-title></span>
        <span class="lightbox__counter" data-lightbox-count></span>
      </figcaption>
    </figure>
    <button class="lightbox__btn lightbox__next" type="button" data-lightbox-next aria-label="Next image">${icon("chevron-right")}</button>
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const titleEl = lightbox.querySelector("[data-lightbox-title]");
  const countEl = lightbox.querySelector("[data-lightbox-count]");
  let visibleCards = [];
  let currentIndex = 0;
  let lastFocused = null;
  let previousOverflow = "";

  const showCard = (card) => {
    const img = card.querySelector("img");
    image.src = img.currentSrc || img.src;
    image.alt = img.alt;
    titleEl.textContent = `${card.dataset.category} — ${card.dataset.title}`;
    countEl.textContent = `${currentIndex + 1} / ${visibleCards.length}`;
  };

  const openLightbox = (card) => {
    visibleCards = cards.filter((item) => !item.hidden);
    currentIndex = visibleCards.indexOf(card);
    if (currentIndex < 0) return;

    lastFocused = document.activeElement;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightbox.classList.add("is-open");
    showCard(card);
    window.setTimeout(() => lightbox.querySelector("[data-lightbox-close]")?.focus(), 60);
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = previousOverflow;
    image.src = "";
    if (lastFocused) lastFocused.focus();
  };

  const move = (direction) => {
    if (!visibleCards.length) return;
    currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
    showCard(visibleCards[currentIndex]);
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => openLightbox(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(card);
      }
    });
  });

  lightbox.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  lightbox.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => move(-1));
  lightbox.querySelector("[data-lightbox-next]")?.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });

  /* Image captions are also used as accessible labels. */
  cards.forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Open image: ${escapeHtml(card.dataset.title)}`);
  });
}
