/* Site bootstrap — loads shared components and the features each page needs. */

import { renderHeader, renderFooter } from "./components.js";
import { initNavigation } from "./navigation.js";
import { initReveal, initCounters, initToTop, initYear } from "./animations.js";
import { initSearch } from "./search.js";
import { initAccordions } from "./faq.js";
import { initFeaturedLesson, initLessons, initLessonDetails } from "./lessons.js";
import { initEventsPreview, initEvents } from "./events.js";
import { initGallery } from "./gallery.js";
import { initQuiz } from "./quiz.js";
import { initVerseGame } from "./verse.js";
import { initWhoAmI } from "./whoami.js";
import { initBadges, initColouring, initDailyVerse } from "./kids.js";
import { initContact } from "./contact.js";
import { initResources } from "./resources.js";

function boot() {
  renderHeader();
  renderFooter();

  initNavigation();
  initSearch();
  initReveal();
  initCounters();
  initToTop();
  initYear();
  initAccordions(document);

  const page = document.body.dataset.page;

  if (page === "home") {
    initFeaturedLesson();
    initEventsPreview();
  }

  if (page === "lessons") initLessons();
  if (page === "lesson-details") initLessonDetails();
  if (page === "events") initEvents();
  if (page === "gallery") initGallery();
  if (page === "kids") {
    initBadges();
    initDailyVerse();
    initQuiz();
    initVerseGame();
    initWhoAmI();
    initColouring();
  }
  if (page === "contact") initContact();
  if (page === "resources") initResources();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
