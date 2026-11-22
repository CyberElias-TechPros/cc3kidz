/* Memory Verse Challenge — fill in the missing words. */

import { icon } from "./components.js";
import { getVerses } from "./data.js";
import { escapeHtml, shuffle } from "./utils.js";
import { storage, awardBadge } from "./storage.js";
import { initBadges } from "./kids.js";

export function initVerseGame() {
  const root = document.querySelector("[data-verse-game]");
  if (!root) return;

  let verses = [];
  let index = 0;
  let answers = [];
  let wordPool = [];
  let status = { type: "", text: "" };
  let completed = new Set(storage.get("verseDone", []));

  const render = () => {
    const verse = verses[index];
    const blanks = verse.blanks;
    const done = [...completed];

    let text = verse.text;
    blanks.forEach((word, i) => {
      text = text.replace(word, `[[${i}]]`);
    });

    const parts = text.split(/(\[\[\d+\]\])/g).map((part) => {
      const match = part.match(/^\[\[(\d+)\]\]$/);
      if (!match) return escapeHtml(part);
      const i = Number(match[1]);
      const value = answers[i] || "";
      return `<button class="verse-blank${value ? " is-filled" : ""}" type="button" data-blank="${i}" aria-label="Blank ${
        i + 1
      }${value ? `, filled with ${value}` : ", empty"}">${value ? escapeHtml(value) : "&nbsp;"}</button>`;
    });

    root.innerHTML = `
      <div class="progress-dots" aria-hidden="true">
        ${verses
          .map(
            (item, i) =>
              `<span class="${completed.has(item.reference) ? "is-done" : i === index ? "is-current" : ""}"></span>`
          )
          .join("")}
      </div>
      <div class="quiz-meta">
        <span>Verse ${index + 1} of ${verses.length}</span>
        <span>${completed.size} completed</span>
      </div>
      <p class="verse-display">${parts.join(" ")}</p>
      <div class="verse-status ${
        status.type === "ok" ? "verse-status--ok" : status.type === "no" ? "verse-status--no" : ""
      }" data-verse-status role="status">
        ${status.type ? (status.type === "ok" ? icon("check") : icon("info")) : ""}
        <span>${escapeHtml(status.text)}</span>
      </div>
      <div class="word-bank" aria-label="Word bank">
        ${wordPool
          .map((word) => {
            const used = answers.includes(word);
            return `<button class="word-chip${used ? " is-used" : ""}" type="button" data-word="${escapeHtml(
              word
            )}" ${used ? "disabled" : ""}>${escapeHtml(word)}</button>`;
          })
          .join("")}
      </div>
      <div class="btn-row">
        <button class="btn btn--primary" type="button" data-verse-check>Check my answer ${icon("check")}</button>
        <button class="btn btn--ghost" type="button" data-verse-reveal>Reveal verse</button>
        <button class="btn btn--secondary" type="button" data-verse-next>Next verse ${icon("arrow-right")}</button>
      </div>
    `;
  };

  const loadVerse = (nextIndex) => {
    index = nextIndex;
    answers = verses[nextIndex].blanks.map(() => "");
    status = { type: "", text: "" };
    const verse = verses[index];
    wordPool = shuffle([...verse.blanks, ...verse.distractors]);
    render();
  };

  const check = () => {
    const verse = verses[index];
    if (answers.some((answer) => !answer)) {
      status = { type: "no", text: "Fill in all the blanks first — tap a word from the word bank." };
      render();
      return;
    }

    const correct = verse.blanks.every((word, i) => answers[i] === word);
    if (!correct) {
      status = { type: "no", text: "Some words are not quite right yet. Tap a blank to clear it and try again — or reveal the verse." };
      render();
      return;
    }

    completed.add(verse.reference);
    storage.set("verseDone", [...completed]);

    let badgeMessage = "";
    if (completed.size >= 3 && awardBadge("memory-verse-star")) {
      badgeMessage = " You just earned the Memory Verse Star badge!";
    }
    status = {
      type: "ok",
      text: `Perfect! ${verse.reference} is complete.${badgeMessage}`,
    };
    initBadges();
    render();
  };

  const reveal = () => {
    answers = [...verses[index].blanks];
    status = {
      type: "ok",
      text: `Here is the complete verse — ${verses[index].reference}. Read it out loud twice, then try the next one from memory.`,
    };
    render();
  };

  root.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-word]");
    if (chip) {
      const emptyIndex = answers.findIndex((answer) => !answer);
      if (emptyIndex === -1) {
        status = { type: "no", text: "All the blanks are filled. Tap a blank if you want to change a word." };
        render();
        return;
      }
      answers[emptyIndex] = chip.dataset.word;
      status = { type: "", text: "" };
      render();
      return;
    }

    const blank = event.target.closest("[data-blank]");
    if (blank) {
      const i = Number(blank.dataset.blank);
      answers[i] = "";
      status = { type: "", text: "" };
      render();
      return;
    }

    if (event.target.closest("[data-verse-check]")) check();
    if (event.target.closest("[data-verse-reveal]")) reveal();
    if (event.target.closest("[data-verse-next]")) {
      loadVerse((index + 1) % verses.length);
    }
  });

  getVerses()
    .then((data) => {
      verses = data;
      if (!verses.length) throw new Error("No verses");
      loadVerse(0);
    })
    .catch(() => {
      root.innerHTML = `
        <div class="notice notice--yellow" role="status">
          ${icon("info")} The verse game could not be loaded right now. Please refresh the page.
        </div>
      `;
    });
}
