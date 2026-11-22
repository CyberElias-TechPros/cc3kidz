/* Accessible accordions for lesson Q&A and parent FAQs. */

export function initAccordions(root = document) {
  const buttons = root.querySelectorAll(".qa-item__q, .faq-item__q");

  buttons.forEach((button) => {
    if (button.dataset.accordionReady === "true") return;
    button.dataset.accordionReady = "true";

    button.addEventListener("click", () => {
      const item = button.closest(".qa-item, .faq-item");
      const panel = item?.querySelector(".qa-item__a, .faq-item__a");
      if (!item || !panel) return;

      const isOpen = item.classList.contains("is-open");

      if (isOpen) {
        item.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "";
      } else {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}
