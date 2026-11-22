/* Bible Quiz — multiple choice, scoring, feedback and local badges. */

import { icon } from "./components.js";
import { getQuiz } from "./data.js";
import { escapeHtml } from "./utils.js";
import { storage, awardBadge } from "./storage.js";
import { initBadges } from "./kids.js";

export function initQuiz() {
  const root = document.querySelector("[data-quiz]");
  if (!root) return;

  let questions = [];
  let index = 0;
  let score = 0;
  let answered = false;
  let best = storage.get("quizBest", null);

  const start = () => {
    index = 0;
    score = 0;
    answered = false;
    renderQuestion();
  };

  const renderStart = () => {
    root.innerHTML = `
      <div class="quiz-start">
        <span class="quiz-start__emoji" aria-hidden="true">🎯</span>
        <h3>Ready to play?</h3>
        <p>Ten questions from the Bible. Choose the best answer, learn something new from every question, and see how many you can get right.</p>
        <button class="btn btn--primary" type="button" data-quiz-start>Start the quiz ${icon("arrow-right")}</button>
        ${
          best !== null
            ? `<div class="quiz-best">${icon("trophy")} Your best score: ${best}/${questions.length}</div>`
            : ""
        }
      </div>
    `;
  };

  const renderQuestion = () => {
    const question = questions[index];
    const progress = Math.round(((index + 1) / questions.length) * 100);
    answered = false;

    root.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress__bar" style="width:${progress}%"></div></div>
      <div class="quiz-meta">
        <span>Question ${index + 1} of ${questions.length}</span>
        <span>Score: ${score}</span>
      </div>
      <p class="quiz-question">${escapeHtml(question.question)}</p>
      <div class="quiz-options" role="group" aria-label="Answer choices">
        ${question.options
          .map(
            (option, i) => `
            <button class="quiz-option" type="button" data-option="${i}">
              <span class="quiz-option__letter">${String.fromCharCode(65 + i)}</span>
              <span>${escapeHtml(option)}</span>
            </button>
          `
          )
          .join("")}
      </div>
      <div class="quiz-feedback" data-quiz-feedback role="status"></div>
      <div class="quiz-actions">
        <span class="quiz-score" data-quiz-hint>Choose the best answer</span>
        <button class="btn btn--primary" type="button" data-quiz-next hidden>
          ${index === questions.length - 1 ? "See my results" : "Next question"} ${icon("arrow-right")}
        </button>
      </div>
    `;
  };

  const selectOption = (choice) => {
    if (answered) return;
    answered = true;

    const question = questions[index];
    const correct = choice === question.answer;
    if (correct) score += 1;

    const options = [...root.querySelectorAll("[data-option]")];
    options.forEach((button, i) => {
      button.disabled = true;
      if (i === question.answer) button.classList.add("is-correct");
      if (i === choice && !correct) button.classList.add("is-wrong");
    });

    const feedback = root.querySelector("[data-quiz-feedback]");
    const hint = root.querySelector("[data-quiz-hint]");
    const next = root.querySelector("[data-quiz-next]");

    if (feedback) {
      feedback.className = `quiz-feedback is-show ${
        correct ? "quiz-feedback--correct" : "quiz-feedback--wrong"
      }`;
      feedback.innerHTML = correct
        ? `${icon("check")} <span><strong>Correct!</strong> ${escapeHtml(question.fact)} <em>(${escapeHtml(
            question.reference
          )})</em></span>`
        : `${icon("info")} <span><strong>Not quite.</strong> The answer is <strong>${escapeHtml(
            question.options[question.answer]
          )}</strong>. ${escapeHtml(question.fact)} <em>(${escapeHtml(question.reference)})</em></span>`;
    }

    if (hint) hint.textContent = correct ? "Great job!" : "Keep going — you've got this!";
    if (next) next.hidden = false;
  };

  const renderResults = () => {
    best = Math.max(best ?? 0, score);
    storage.set("quizBest", best);

    const earned = [];
    if (score >= 7) {
      if (awardBadge("bible-explorer")) earned.push("Bible Explorer");
    }
    if (score === questions.length) {
      if (awardBadge("quiz-champion")) earned.push("Quiz Champion");
    }

    const percent = Math.round((score / questions.length) * 100);
    let message;
    if (score === questions.length) {
      message = "Perfect score! You are a true Bible Champion!";
    } else if (score >= 7) {
      message = "Amazing! You really know God's Word. Keep shining!";
    } else if (score >= 4) {
      message = "Good job! Every question you answer helps you grow.";
    } else {
      message = "Great try! Read a lesson or two and come back stronger.";
    }

    initBadges();

    root.innerHTML = `
      <div class="quiz-result">
        ${score >= 7 ? `<div class="confetti" aria-hidden="true">${"<span></span>".repeat(10)}</div>` : ""}
        <div class="result-ring" style="--score:${percent}">
          <div class="result-ring__inner">${score}<small>out of ${questions.length}</small></div>
        </div>
        <h3>${escapeHtml(message)}</h3>
        <p>Best score: ${best}/${questions.length}. You can play again as many times as you like — every round makes you a Bible Explorer.</p>
        ${
          earned.length
            ? `<div class="notice notice--yellow" style="justify-content:center;text-align:center;margin:0 auto 1rem;max-width:420px">
                 ${icon("trophy")} New badge earned: <strong>${escapeHtml(earned.join(", "))}</strong>!
               </div>`
            : ""
        }
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn--primary" type="button" data-quiz-retry>${icon("refresh")} Play again</button>
          <a class="btn btn--secondary" href="kids-corner.html#badges">See my badges</a>
        </div>
      </div>
    `;
  };

  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-quiz-start]")) {
      start();
      return;
    }

    const option = event.target.closest("[data-option]");
    if (option) {
      selectOption(Number(option.dataset.option));
      return;
    }

    if (event.target.closest("[data-quiz-next]")) {
      if (index === questions.length - 1) renderResults();
      else {
        index += 1;
        renderQuestion();
      }
      return;
    }

    if (event.target.closest("[data-quiz-retry]")) start();
  });

  getQuiz()
    .then((data) => {
      questions = data;
      if (!questions.length) throw new Error("No quiz questions");
      renderStart();
    })
    .catch(() => {
      root.innerHTML = `
        <div class="notice notice--yellow" role="status">
          ${icon("info")} The quiz could not be loaded right now. Please refresh the page and try again.
        </div>
      `;
    });
}
