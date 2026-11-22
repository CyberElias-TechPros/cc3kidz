/* Lesson library, featured lesson and individual lesson pages. */

import { icon } from "./components.js";
import { getLessons } from "./data.js";
import { escapeHtml, getParam } from "./utils.js";
import { initAccordions } from "./faq.js";

const COVER_CLASS = {
  yellow: "cover-yellow",
  pink: "cover-pink",
  blue: "cover-blue",
  purple: "cover-purple",
  green: "cover-green",
};

function lessonCard(lesson) {
  const url = `lesson-details.html?lesson=${encodeURIComponent(lesson.slug)}`;
  return `
    <article class="lesson-card" data-category="${escapeHtml(lesson.category)}">
      <a class="lesson-card__cover ${COVER_CLASS[lesson.cover] ?? "cover-blue"}" href="${url}" aria-label="Read the lesson ${escapeHtml(lesson.title)}">
        <span class="lesson-card__cat">${escapeHtml(lesson.category)}</span>
        <span class="lesson-card__emoji" aria-hidden="true">${lesson.emoji}</span>
      </a>
      <div class="lesson-card__body">
        <span class="lesson-card__ref">${icon("book")} ${escapeHtml(lesson.reference)}</span>
        <h3><a href="${url}">${escapeHtml(lesson.title)}</a></h3>
        <p class="lesson-card__verse">“${escapeHtml(lesson.memoryVerse)}”</p>
        <a class="link-arrow" href="${url}">Read lesson ${icon("arrow-right")}</a>
      </div>
    </article>
  `;
}

export async function initFeaturedLesson() {
  const host = document.querySelector("[data-featured-lesson]");
  if (!host) return;

  try {
    const lessons = await getLessons();
    const lesson = lessons.find((item) => item.featured) ?? lessons[0];
    if (!lesson) return;

    host.innerHTML = `
      <div class="lesson-feature reveal">
        <div class="lesson-feature__media">
          <span class="sticker sticker--yellow lesson-feature__sticker">⭐ Lesson of the week</span>
          <img src="assets/images/lessons/noahs-ark.webp" alt="Illustration of Noah's ark floating on calm water beneath a rainbow" width="1200" height="800" loading="lazy" />
        </div>
        <div class="lesson-feature__content">
          <span class="eyebrow">📖 Bible Lesson of the Week</span>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p class="lesson-feature__ref">${icon("book")} ${escapeHtml(lesson.reference)} · ${escapeHtml(lesson.age)}</p>
          <p class="lesson-feature__key">${escapeHtml(lesson.keyLesson)}</p>
          <div class="memory-card">
            <div class="memory-card__label">${icon("star")} Memory verse</div>
            <blockquote>“${escapeHtml(lesson.memoryVerse)}”</blockquote>
            <cite>— ${escapeHtml(lesson.memoryReference)}</cite>
          </div>
          <div class="btn-row">
            <a class="btn btn--yellow" href="lesson-details.html?lesson=${encodeURIComponent(lesson.slug)}">Read Lesson ${icon("arrow-right")}</a>
            <a class="btn btn--ghost-light" href="lessons.html">All Lessons</a>
          </div>
        </div>
      </div>
    `;
  } catch {
    host.innerHTML = `
      <div class="notice notice--yellow" role="status">
        ${icon("info")} Lesson content could not be loaded right now. Please refresh the page.
      </div>
    `;
  }
}

export async function initLessons() {
  const grid = document.querySelector("[data-lesson-grid]");
  const searchInput = document.querySelector("[data-lesson-search]");
  const filters = document.querySelector("[data-lesson-filters]");
  const count = document.querySelector("[data-lesson-count]");
  if (!grid) return;

  let lessons = [];
  let activeCategory = "All";
  let query = "";

  try {
    lessons = await getLessons();
  } catch {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="emoji">📖</span>
        <h3>Lessons are taking a moment</h3>
        <p>We could not load the lesson library. Please refresh the page to try again.</p>
      </div>
    `;
    return;
  }

  const categories = ["All", ...new Set(lessons.map((lesson) => lesson.category))];

  if (filters) {
    filters.innerHTML = categories
      .map(
        (category) =>
          `<button class="chip${category === activeCategory ? " is-active" : ""}" type="button" data-filter="${escapeHtml(
            category
          )}">${escapeHtml(category)}</button>`
      )
      .join("");
  }

  const render = () => {
    const filtered = lessons.filter((lesson) => {
      const matchesCategory = activeCategory === "All" || lesson.category === activeCategory;
      const haystack = `${lesson.title} ${lesson.category} ${lesson.reference} ${lesson.memoryVerse}`.toLowerCase();
      const matchesQuery = query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .every((word) => haystack.includes(word));
      return matchesCategory && matchesQuery;
    });

    if (count) {
      count.textContent = `${filtered.length} ${filtered.length === 1 ? "lesson" : "lessons"}`;
    }

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <span class="emoji">🔎</span>
          <h3>No lessons found</h3>
          <p>Try a different word or choose another category.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(lessonCard).join("");
  };

  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeCategory = button.dataset.filter;
    filters.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("is-active", chip === button);
    });
    render();
  });

  searchInput?.addEventListener("input", () => {
    query = searchInput.value;
    render();
  });

  render();
}

export async function initLessonDetails() {
  const page = document.querySelector("[data-lesson-page]");
  if (!page) return;

  let lessons = [];
  try {
    lessons = await getLessons();
  } catch {
    page.innerHTML = `
      <div class="notice notice--yellow" role="alert">
        ${icon("info")} This lesson could not be loaded. Please go back to the <a href="lessons.html">lesson library</a>.
      </div>
    `;
    return;
  }

  const slug = getParam("lesson");
  const lesson = lessons.find((item) => item.slug === slug) ?? lessons[0];
  if (!lesson) return;

  const index = lessons.indexOf(lesson);
  const previous = lessons[(index - 1 + lessons.length) % lessons.length];
  const next = lessons[(index + 1) % lessons.length];
  const related = lessons
    .filter((item) => item.slug !== lesson.slug && item.category === lesson.category)
    .concat(lessons.filter((item) => item.slug !== lesson.slug && item.category !== lesson.category))
    .slice(0, 3);

  document.title = `${lesson.title} | Christ Embassy Kids`;
  const heroTitle = document.querySelector("[data-lesson-title]");
  const heroIntro = document.querySelector("[data-lesson-intro]");
  if (heroTitle) heroTitle.textContent = lesson.title;
  if (heroIntro) heroIntro.textContent = lesson.keyLesson;

  const storyText = lesson.story.join(" ");

  page.innerHTML = `
    <div class="lesson-layout">
      <article class="lesson-article">
        <div class="lesson-article__head">
          <span class="pill pill--purple">${escapeHtml(lesson.category)}</span>
          <span class="pill pill--yellow">${escapeHtml(lesson.reference)}</span>
          <span class="pill pill--blue">${escapeHtml(lesson.age)}</span>
        </div>

        ${
          "speechSynthesis" in window
            ? `<button class="read-aloud" type="button" data-read-aloud>
                 ${icon("volume", "read-aloud__icon")} <span data-read-aloud-label>Read this lesson to me</span>
               </button>`
            : ""
        }

        <p class="lead">${escapeHtml(lesson.intro)}</p>

        <h2><span class="ico" aria-hidden="true">📖</span> The Story</h2>
        <div class="prose">
          ${lesson.story.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </div>

        <div class="verse-block">
          <div class="verse-block__label">${icon("star")} Memory verse</div>
          <blockquote>“${escapeHtml(lesson.memoryVerse)}”</blockquote>
          <cite>— ${escapeHtml(lesson.memoryReference)}</cite>
        </div>

        <h2><span class="ico" aria-hidden="true">💡</span> What We Learn</h2>
        <div class="prose">
          <ul>
            ${lesson.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
          </ul>
        </div>

        <h2><span class="ico" aria-hidden="true">💬</span> Talk About It</h2>
        <div class="prose">
          ${lesson.questions
            .map(
              (item, i) => `
              <div class="qa-item">
                <button class="qa-item__q" type="button" aria-expanded="false" aria-controls="answer-${i}">
                  <span>${escapeHtml(item.q)}</span>
                  ${icon("chevron-down")}
                </button>
                <div class="qa-item__a" id="answer-${i}">
                  <div class="qa-item__a-inner">${escapeHtml(item.a)}</div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>

        <h2><span class="ico" aria-hidden="true">🎨</span> Try This</h2>
        <div class="parents-note" style="transform:none">
          <p style="margin:0">${escapeHtml(lesson.activity)}</p>
        </div>

        <h2><span class="ico" aria-hidden="true">🙏</span> Closing Prayer</h2>
        <blockquote class="verse-block" style="background:linear-gradient(135deg,var(--purple-soft),#fff);box-shadow:5px 5px 0 var(--purple-soft)">
          <blockquote style="font-family:var(--font-display);font-size:1.08rem;line-height:1.5">${escapeHtml(
            lesson.prayer
          )}</blockquote>
        </blockquote>
      </article>

      <aside class="lesson-sidebar">
        <div class="side-card">
          <h3>Lesson details</h3>
          <ul class="fact-list">
            <li><span>Bible reference</span><strong>${escapeHtml(lesson.reference)}</strong></li>
            <li><span>Category</span><strong>${escapeHtml(lesson.category)}</strong></li>
            <li><span>Ages</span><strong>${escapeHtml(lesson.age)}</strong></li>
            <li><span>Reading time</span><strong>${escapeHtml(lesson.duration)}</strong></li>
          </ul>
          <button class="btn btn--secondary btn--sm btn--block" type="button" data-print-lesson style="margin-top:.9rem">
            ${icon("printer")} Print this lesson
          </button>
        </div>

        <div class="side-card side-card--verse">
          <h3>Memory verse</h3>
          <blockquote>“${escapeHtml(lesson.memoryVerse)}”</blockquote>
          <cite>— ${escapeHtml(lesson.memoryReference)}</cite>
        </div>

        <div class="side-card">
          <h3>More lessons</h3>
          <div class="related-list">
            ${related
              .map(
                (item) => `
                <a href="lesson-details.html?lesson=${encodeURIComponent(item.slug)}">
                  <span class="emoji" aria-hidden="true">${item.emoji}</span>
                  <span>${escapeHtml(item.title)}</span>
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      </aside>
    </div>

    <nav class="lesson-nav" aria-label="Lesson navigation">
      <a href="lesson-details.html?lesson=${encodeURIComponent(previous.slug)}">
        <span class="dir">${icon("arrow-left")} Previous</span>
        <span class="title">${escapeHtml(previous.title)}</span>
      </a>
      <a href="lesson-details.html?lesson=${encodeURIComponent(next.slug)}">
        <span class="dir">Next ${icon("arrow-right")}</span>
        <span class="title">${escapeHtml(next.title)}</span>
      </a>
    </nav>
  `;

  initAccordions(page);

  const printButton = page.querySelector("[data-print-lesson]");
  printButton?.addEventListener("click", () => window.print());

  const readButton = page.querySelector("[data-read-aloud]");
  if (readButton) {
    const label = readButton.querySelector("[data-read-aloud-label]");
    let speaking = false;

    const reset = () => {
      speaking = false;
      if (label) label.textContent = "Read this lesson to me";
      readButton.querySelector("use")?.setAttribute("href", "assets/icons/sprite.svg#i-volume");
    };

    readButton.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) return;

      if (speaking) {
        window.speechSynthesis.cancel();
        reset();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(
        `${lesson.title}. ${storyText} ${lesson.points.join(" ")} Memory verse: ${lesson.memoryVerse}.`
      );
      utterance.rate = 0.92;
      utterance.pitch = 1.04;
      utterance.onend = reset;
      utterance.onerror = reset;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      speaking = true;
      if (label) label.textContent = "Stop reading";
      readButton.querySelector("use")?.setAttribute("href", "assets/icons/sprite.svg#i-pause");
    });

    window.addEventListener("beforeunload", () => window.speechSynthesis.cancel());
  }
}
