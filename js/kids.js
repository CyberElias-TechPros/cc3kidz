/* Achievement badges, printable colouring pages and the daily verse. */

import { icon } from "./components.js";
import { BADGES, getBadges, awardBadge } from "./storage.js";
import { getVerses } from "./data.js";
import { escapeHtml } from "./utils.js";

export function initBadges() {
  const wall = document.querySelector("[data-badge-wall]");
  if (!wall) return;

  const earned = getBadges();

  wall.innerHTML = BADGES.map((badge) => {
    const isEarned = earned.includes(badge.id);
    return `
      <div class="badge ${isEarned ? "is-earned" : "is-locked"}">
        ${isEarned ? `<span class="badge__tick">${icon("check")}</span>` : ""}
        <span class="badge__emoji" aria-hidden="true">${badge.emoji}</span>
        <h3>${badge.name}</h3>
        <p>${isEarned ? "Earned" : badge.description}</p>
      </div>
    `;
  }).join("");

  const summary = document.querySelector("[data-badge-summary]");
  if (summary) {
    summary.textContent =
      earned.length === BADGES.length
        ? "Every badge earned — you are a true champion!"
        : `${earned.length} of ${BADGES.length} badges earned. Keep playing to collect them all!`;
  }
}

function printColouringPage(src, title) {
  const absolute = new URL(src, window.location.href).href;
  const printWindow = window.open("", "_blank", "width=900,height=1000");

  if (!printWindow) {
    window.alert("Please allow pop-ups to print your colouring page.");
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${title} — colouring page</title>
        <style>
          @page { size: A4; margin: 0; }
          html, body { margin: 0; padding: 0; background: #fff; }
          body { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
          img { display: block; width: 100%; max-height: 100vh; object-fit: contain; }
        </style>
      </head>
      <body>
        <img src="${absolute}" alt="${title} colouring page" onload="setTimeout(function(){ window.focus(); window.print(); }, 350)" />
      </body>
    </html>
  `);
  printWindow.document.close();
}

export async function initDailyVerse() {
  const host = document.querySelector("[data-daily-verse]");
  if (!host) return;

  try {
    const verses = await getVerses();
    if (!verses.length) return;

    const start = new Date(new Date().getFullYear(), 0, 0);
    const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000);
    const verse = verses[dayOfYear % verses.length];

    host.innerHTML = `
      <div class="verse-block__label">${icon("star")} Today's Bible verse</div>
      <blockquote>“${escapeHtml(verse.text)}”</blockquote>
      <cite>— ${escapeHtml(verse.reference)}</cite>
    `;
  } catch {
    /* Keep the static fallback verse already in the page. */
  }
}

export function initColouring() {
  const status = document.querySelector("[data-colour-status]");

  document.querySelectorAll("[data-print-src]").forEach((button) => {
    button.addEventListener("click", () => {
      printColouringPage(button.dataset.printSrc, button.dataset.title || "Colouring page");

      if (awardBadge("praise-champion") && status) {
        status.innerHTML = `${icon("trophy")} You just earned the <strong>Praise Champion</strong> badge!`;
      } else if (status) {
        status.innerHTML = `${icon("check")} Your colouring page is ready — happy colouring!`;
      }
      initBadges();
    });
  });

  document.querySelectorAll("[data-download-src]").forEach((button) => {
    button.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = button.dataset.downloadSrc;
      link.download = `${button.dataset.title || "colouring-page"}.svg`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      if (awardBadge("praise-champion") && status) {
        status.innerHTML = `${icon("trophy")} You just earned the <strong>Praise Champion</strong> badge!`;
      }
      initBadges();
    });
  });
}
