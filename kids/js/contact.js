/* Parent enquiry form — client-side validation and a copy-to-send summary. */

import { escapeHtml, getParam } from "./utils.js";
import { icon } from "./components.js";

export function initContact() {
  const form = document.querySelector("[data-contact-form]");
  const success = document.querySelector("[data-form-success]");
  if (!form || !success) return;

  const eventName = getParam("event");
  const messageField = form.querySelector("[name='message']");

  if (eventName && messageField && !messageField.value) {
    const titles = {
      "childrens-praise-sunday": "Children's Praise Sunday",
      "bible-quiz-competition": "Bible Quiz Competition",
      "christmas-family-celebration": "Christmas Family Celebration",
      "end-of-year-thanksgiving": "End-of-Year Thanksgiving & Party",
      "new-year-praise-dedication": "New Year Praise & Dedication",
    };
    const title = titles[eventName] ?? eventName.replaceAll("-", " ");
    messageField.value = `Hello, I would like to enquire about the ${title}.`;
  }

  const showSuccess = () => {
    const data = new FormData(form);
    const name = String(data.get("parentName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const ageGroup = String(data.get("ageGroup") || "Not selected");
    const message = String(data.get("message") || "").trim();

    const summary = [
      `Parent/guardian: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Child's age group: ${ageGroup}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    success.innerHTML = `
      <span class="emoji" aria-hidden="true">🎉</span>
      <h3>Thank you, ${escapeHtml(name.split(" ")[0] || "friend")}!</h3>
      <p>Your enquiry is ready. Copy it below and send it to the children's church office by email or WhatsApp — or simply speak to a teacher on Sunday.</p>
      <pre style="text-align:left;background:var(--cream);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:1rem;font-size:.8rem;white-space:pre-wrap;margin:0 0 1.25rem">${escapeHtml(
        summary
      )}</pre>
      <div class="btn-row">
        <button class="btn btn--primary" type="button" data-copy-enquiry>${icon("copy")} Copy my enquiry</button>
        <button class="btn btn--secondary" type="button" data-reset-form>Send another enquiry</button>
      </div>
    `;

    form.hidden = true;
    success.classList.add("is-show");
    success.scrollIntoView({ behavior: "smooth", block: "center" });

    success.querySelector("[data-copy-enquiry]")?.addEventListener("click", async (event) => {
      const button = event.currentTarget;
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(summary);
          copied = true;
        }
      } catch {
        copied = false;
      }
      if (!copied) {
        try {
          const textarea = document.createElement("textarea");
          textarea.value = summary;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
          copied = true;
        } catch {}
      }
      button.innerHTML = `${icon("check")} ${copied ? "Copied!" : "Ready to copy"}`;
      window.setTimeout(() => {
        button.innerHTML = `${icon("copy")} Copy my enquiry`;
      }, 2200);
    });

    success.querySelector("[data-reset-form]")?.addEventListener("click", () => {
      form.reset();
      form.hidden = false;
      success.classList.remove("is-show");
      form.querySelector("input")?.focus();
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    showSuccess();
  });

  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.value && !field.checkValidity()) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
    });
  });
}
