/* Who Am I? — guess the Bible character from progressive clues. */

import { icon } from "./components.js";
import { getCharacters } from "./data.js";
import { escapeHtml } from "./utils.js";
import { storage, awardBadge } from "./storage.js";
import { initBadges } from "./kids.js";

export function initWhoAmI() {
  const root = document.querySelector("[data-whoami]");
  if (!root) return;

  let characters = [];
  let index = 0;
  let revealed = 1;
  let answered = false;
  let sessionCorrect = 0;
  let totalCorrect = storage.get("whoamiCorrect", 0);
  let feedback = "";

  const render = () => {
    const character = characters[index];

    root.innerHTML = `
      <div class="who-layout">
        <div class="who-avatar ${`accent-${["yellow", "pink", "blue", "purple", "green"][index % 5]}`} aria-hidden="true">${character.emoji}</div>
        <div>
          <div class="quiz-meta">
            <span>Character ${index + 1} of ${characters.length}</span>
            <span>${sessionCorrect} correct this round</span>
          </div>
          <p class="quiz-question" style="margin-bottom:.75rem">Who am I?</p>
          <div class="clue-list">
            ${character.clues
              .map(
                (clue, i) => `
                <div class="clue${i < revealed ? " is-shown" : ""}" ${i < revealed ? "" : 'aria-hidden="true"'}>
                  <span class="clue__num">${i + 1}</span>
                  <span>${escapeHtml(clue)}</span>
                </div>
              `
              )
              .join("")}
          </div>
          <div class="who-options" role="group" aria-label="Character choices">
            ${character.options
              .map(
                (option, i) => `
                <button class="who-option" type="button" data-who="${i}">${escapeHtml(option)}</button>
              `
              )
              .join("")}
          </div>
          <div class="who-feedback" data-who-feedback role="status">${feedback}</div>
          <div class="btn-row" style="margin-top:1rem">
            ${
              revealed < character.clues.length && !answered
                ? `<button class="btn btn--ghost btn--sm" type="button" data-who-clue>${icon("lightbulb")} Reveal another clue</button>`
                : ""
            }
            ${
              answered
                ? `<button class="btn btn--primary btn--sm" type="button" data-who-next>${
                    index === characters.length - 1 ? "See my score" : "Next character"
                  } ${icon("arrow-right")}</button>`
                : ""
            }
          </div>
        </div>
      </div>
    `;
  };

  const renderSummary = () => {
    root.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-start__emoji" aria-hidden="true">🎉</span>
        <h3>You know your Bible characters!</h3>
        <p>You guessed ${sessionCorrect} out of ${characters.length} correctly this round. Across all your games you have guessed ${totalCorrect} characters correctly.</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn--primary" type="button" data-who-retry>${icon("refresh")} Play again</button>
          <a class="btn btn--secondary" href="kids-corner.html#badges">See my badges</a>
        </div>
      </div>
    `;
  };

  const start = () => {
    index = 0;
    revealed = 1;
    answered = false;
    sessionCorrect = 0;
    feedback = "";
    render();
  };

  const choose = (choice) => {
    if (answered) return;
    answered = true;

    const character = characters[index];
    const correct = choice === character.answer;
    if (correct) {
      sessionCorrect += 1;
      totalCorrect += 1;
      storage.set("whoamiCorrect", totalCorrect);
    }

    let badgeMessage = "";
    if (totalCorrect >= 5 && awardBadge("word-champion")) {
      badgeMessage = " You just earned the Word Champion badge!";
    }

    revealed = character.clues.length;
    initBadges();

    root.querySelectorAll("[data-who]").forEach((button, i) => {
      button.disabled = true;
      if (i === character.answer) button.classList.add("is-correct");
      if (i === choice && !correct) button.classList.add("is-wrong");
    });

    feedback = correct
      ? `${icon("check")} <strong>Correct — it's ${escapeHtml(character.name)}!</strong> ${escapeHtml(
          character.funFact
        )} <em>(${escapeHtml(character.reference)})</em>${badgeMessage}`
      : `${icon("info")} <strong>It was ${escapeHtml(character.name)}.</strong> ${escapeHtml(
          character.funFact
        )} <em>(${escapeHtml(character.reference)})</em>`;

    const feedbackEl = root.querySelector("[data-who-feedback]");
    if (feedbackEl) {
      feedbackEl.classList.add("is-show");
      feedbackEl.innerHTML = feedback;
    }

    root.querySelectorAll(".clue").forEach((clue) => clue.classList.add("is-shown"));
    root.querySelector("[data-who-clue]")?.remove();

    const actions = root.querySelector(".btn-row");
    if (actions && !actions.querySelector("[data-who-next]")) {
      actions.insertAdjacentHTML(
        "beforeend",
        `<button class="btn btn--primary btn--sm" type="button" data-who-next>${
          index === characters.length - 1 ? "See my score" : "Next character"
        } ${icon("arrow-right")}</button>`
      );
    }
  };

  root.addEventListener("click", (event) => {
    const option = event.target.closest("[data-who]");
    if (option) {
      choose(Number(option.dataset.who));
      return;
    }

    if (event.target.closest("[data-who-clue]")) {
      revealed = Math.min(revealed + 1, characters[index].clues.length);
      render();
      return;
    }

    if (event.target.closest("[data-who-next]")) {
      if (index === characters.length - 1) renderSummary();
      else {
        index += 1;
        revealed = 1;
        answered = false;
        feedback = "";
        render();
      }
      return;
    }

    if (event.target.closest("[data-who-retry]")) start();
  });

  getCharacters()
    .then((data) => {
      characters = data;
      if (!characters.length) throw new Error("No characters");
      start();
    })
    .catch(() => {
      root.innerHTML = `
        <div class="notice notice--yellow" role="status">
          ${icon("info")} The character game could not be loaded right now. Please refresh the page.
        </div>
      `;
    });
}
