/* Upcoming event cards and the full events page. */

import { icon } from "./components.js";
import { getEvents } from "./data.js";
import { escapeHtml, formatDateParts } from "./utils.js";

function accent(color) {
  return ["pink", "blue", "purple", "green", "yellow"].includes(color) ? `accent-${color}` : "accent-blue";
}

function metaBits(event) {
  const time = event.endTime ? `${event.time} – ${event.endTime}` : event.time;
  return `
    <span>${icon("clock")} ${escapeHtml(time)}</span>
    <span>${icon("map-pin")} ${escapeHtml(event.venue)}</span>
    <span>${icon("calendar")} ${escapeHtml(event.tag ?? "Event")}</span>
  `;
}

export async function initEventsPreview() {
  const host = document.querySelector("[data-events-preview]");
  if (!host) return;

  try {
    const { upcoming } = await getEvents();
    const events = [...(upcoming ?? [])]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    host.innerHTML = events
      .map((event, index) => {
        const date = formatDateParts(event.date);
        return `
          <article class="event-card ${accent(event.color)} reveal" style="--reveal-delay:${index * 90}ms">
            <div class="event-card__banner">
              <span class="event-card__date">
                <span class="event-card__day">${escapeHtml(date.day)}</span>
                <span class="event-card__month">${escapeHtml(date.month)}</span>
              </span>
              <span class="event-card__emoji" aria-hidden="true">${event.emoji}</span>
            </div>
            <div class="event-card__body">
              <h3>${escapeHtml(event.title)}</h3>
              <div class="event-card__meta">
                <span>${icon("clock")} ${escapeHtml(event.time)}${event.endTime ? ` – ${escapeHtml(event.endTime)}` : ""}</span>
                <span>${icon("map-pin")} ${escapeHtml(event.venue)}</span>
              </div>
              <p>${escapeHtml(event.description)}</p>
              <a class="link-arrow" href="events.html#${encodeURIComponent(event.slug)}">Event details ${icon("arrow-right")}</a>
            </div>
          </article>
        `;
      })
      .join("");
  } catch {
    host.innerHTML = `
      <div class="notice notice--yellow" style="grid-column:1/-1" role="status">
        ${icon("info")} Events could not be loaded just now. Please refresh the page.
      </div>
    `;
  }
}

export async function initEvents() {
  const upcomingHost = document.querySelector("[data-upcoming-events]");
  const pastHost = document.querySelector("[data-past-events]");
  if (!upcomingHost && !pastHost) return;

  try {
    const { upcoming = [], past = [] } = await getEvents();

    if (upcomingHost) {
      const sorted = [...upcoming].sort((a, b) => new Date(a.date) - new Date(b.date));
      upcomingHost.innerHTML = sorted
        .map((event) => {
          const date = formatDateParts(event.date);
          return `
            <article class="event-row ${accent(event.color)}" id="${escapeHtml(event.slug)}">
              <div class="event-row__date">
                <span class="event-row__day">${escapeHtml(date.day)}</span>
                <span class="event-row__month">${escapeHtml(date.month)}</span>
              </div>
              <div class="event-row__body">
                <h3>${escapeHtml(event.title)}</h3>
                <div class="event-row__meta">${metaBits(event)}</div>
                <p>${escapeHtml(event.description)}</p>
              </div>
              <div class="event-row__action">
                <a class="btn btn--secondary btn--sm" href="contact.html?event=${encodeURIComponent(event.slug)}">
                  Enquire ${icon("arrow-right")}
                </a>
              </div>
            </article>
          `;
        })
        .join("");
    }

    if (pastHost) {
      const sorted = [...past].sort((a, b) => new Date(b.date) - new Date(a.date));
      pastHost.innerHTML = sorted
        .map(
          (event) => `
          <article class="past-card">
            <img src="${escapeHtml(event.image)}" alt="${escapeHtml(event.title)}" loading="lazy" width="900" height="563" />
            <div class="past-card__body">
              <span class="past-card__date">${escapeHtml(formatDateParts(event.date).long)}</span>
              <h3>${escapeHtml(event.title)}</h3>
              <p>${escapeHtml(event.summary)}</p>
            </div>
          </article>
        `
        )
        .join("");
    }
  } catch {
    const message = `
      <div class="notice notice--yellow" role="status" style="grid-column:1/-1">
        ${icon("info")} Events could not be loaded just now. Please refresh the page.
      </div>
    `;
    if (upcomingHost) upcomingHost.innerHTML = message;
    if (pastHost) pastHost.innerHTML = message;
  }
}
