/* Printable memory verse cards. */

export function initResources() {
  const printButton = document.querySelector("[data-print-verses]");
  if (!printButton) return;

  printButton.addEventListener("click", () => window.print());
}
