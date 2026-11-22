/* Command-palette style search across pages, lessons and events. */

import { icon } from "./components.js";
import { escapeHtml } from "./utils.js";
import { getLessons, getEvents } from "./data.js";

const PAGES = [
  { title: "Home", url: "index.html", emoji: "🏠", description: "Welcome to Christ Embassy Kids" },
  { title: "About Us", url: "about.html", emoji: "💛", description: "Our vision, mission and leadership" },
  { title: "Our Classes", url: "classes.html", emoji: "🎒", description: "Creche, preschool, primary and pre-teens" },
  { title: "Bible Lessons", url: "lessons.html", emoji: "📖", description: "Stories, memory verses and activities" },
  { title: "Events & Activities", url: "events.html", emoji: "📅", description: "Upcoming programmes and celebrations" },
  { title: "Gallery", url: "gallery.html", emoji: "📸", description: "Moments from our children's church" },
  { title: "Kids Corner", url: "kids-corner.html", emoji: "🎮", description: "Quizzes, verse games and colouring" },
  { title: "Parents' Corner", url: "parents.html", emoji: "🧡", description: "Guidelines, schedules and FAQs" },
  { title: "Resources", url: "resources.html", emoji: "🎧", description: "Memory verse cards and activities" },
  { title: "Contact Us", url: "contact.html", emoji: "✉️", description: "Plan a visit or send an enquiry" },
];

let searchIndex = PAGES.map((page) => ({ ...page, type: "Page" }));
let indexReady = false;
let activeIndex = -1;
let currentResults = [];

function ensureIndex() {
  if (indexReady) return Promise.resolve();
  indexReady = true;

  return Promise.all([
    getLessons().catch(() => []),
    getEvents().catch(() => ({ upcoming: [], past: [] })),
  ]).then(([lessons, events]) => {
    lessons.forEach((lesson) => {
      searchIndex.push({
        type: "Lesson",
        title: lesson.title,
        url: `lesson-details.html?lesson=${encodeURIComponent(lesson.slug)}`,
        emoji: lesson.emoji,
        description: `${lesson.category} · ${lesson.reference}`,
        keywords: `${lesson.title} ${lesson.category} ${lesson.reference} ${lesson.memoryVerse}`.toLowerCase(),
      });
    });

    events.upcoming?.forEach((event) => {
      searchIndex.push({
        type: "Event",
        title: event.title,
        url: `events.html#${event.slug}`,
        emoji: event.emoji,
        description: `${event.date} · ${event.venue}`,
        keywords: `${event.title} ${event.venue} ${event.tag}`.toLowerCase(),
      });
    });
  });
}

function resultMarkup(item, index) {
  return `
    <a class="search-result" href="${escapeHtml(item.url)}" data-result-index="${index}">
      <span class="search-result__emoji">${item.emoji}</span>
      <span class="search-result__text">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.description)}</span>
      </span>
      ${icon("arrow-right")}
    </a>
  `;
}

function renderEmpty(query) {
  return `
    <div class="search-empty">
      <div style="font-size:2rem;margin-bottom:.5rem">🔍</div>
      No results for “${escapeHtml(query)}”.<br />
      Try “Noah”, “quiz” or “parents”.
    </div>
  `;
}

export function initSearch() {
  if (document.getElementById("search-modal")) return;

  const modal = document.createElement("div");
  modal.className = "search-modal";
  modal.id = "search-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Search this website");
  modal.innerHTML = `
    <div class="search-panel">
      <div class="search-bar">
        ${icon("search")}
        <input id="search-input" type="search" placeholder="Search lessons, events, pages…" autocomplete="off" aria-label="Search this website" />
        <kbd>Esc</kbd>
        <button class="icon-btn" type="button" data-search-close aria-label="Close search">${icon("close")}</button>
      </div>
      <div class="search-results" id="search-results" role="listbox" aria-label="Search results"></div>
      <div class="search-hint">
        <span><kbd>↵</kbd> open first result</span>
        <span><kbd>Esc</kbd> close</span>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = modal.querySelector("#search-input");
  const results = modal.querySelector("#search-results");
  const closeBtn = modal.querySelector("[data-search-close]");
  let lastFocused = null;
  let previousOverflow = "";

  const setActive = (index) => {
    const items = results.querySelectorAll(".search-result");
    if (!items.length) return;
    activeIndex = (index + items.length) % items.length;
    items.forEach((el, i) => {
      el.classList.toggle("is-active", i === activeIndex);
      if (i === activeIndex) el.scrollIntoView({ block: "nearest" });
    });
  };

  const render = (query = "") => {
    const q = query.trim().toLowerCase();
    let matches;

    if (!q) {
      matches = searchIndex.filter((item) => item.type === "Page");
    } else {
      matches = searchIndex.filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords ?? ""}`.toLowerCase();
        return q.split(/\s+/).every((word) => haystack.includes(word));
      });
    }

    currentResults = matches;
    activeIndex = -1;

    if (!matches.length) {
      results.innerHTML = renderEmpty(query);
      return;
    }

    const groups = ["Page", "Lesson", "Event"];
    let html = "";
    let counter = 0;

    groups.forEach((group) => {
      const items = matches.filter((item) => item.type === group).slice(0, group === "Page" ? 8 : 5);
      if (!items.length) return;

      html += `<div class="search-group-label">${
        group === "Page" ? "Pages" : group === "Lesson" ? "Bible Lessons" : "Events"
      }</div>`;
      items.forEach((item) => {
        html += resultMarkup(item, counter);
        counter += 1;
      });
    });

    results.innerHTML = html;
  };

  const open = async () => {
    lastFocused = document.activeElement;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.classList.add("is-open");
    input.value = "";
    render("");
    ensureIndex().then(() => {
      if (modal.classList.contains("is-open")) render(input.value);
    });
    window.setTimeout(() => input.focus(), 60);
  };

  const close = () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = previousOverflow;
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", open);
  });

  closeBtn.addEventListener("click", close);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(activeIndex + 1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(activeIndex - 1);
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0 && currentResults[activeIndex]) {
      event.preventDefault();
      window.location.href = currentResults[activeIndex].url;
    }

    if (event.key === "Tab") {
      const focusable = modal.querySelectorAll("input, button, a[href]");
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

  input.addEventListener("input", () => render(input.value));

  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (modal.classList.contains("is-open")) close();
      else open();
    }
  });

  results.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
}
