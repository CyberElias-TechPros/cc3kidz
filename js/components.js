/* Shared header, footer and small injected UI. */

const NAV_ITEMS = [
  { label: "Home", href: "index.html", page: "home" },
  { label: "About Us", href: "about.html", page: "about" },
  { label: "Bible Lessons", href: "lessons.html", page: "lessons" },
  { label: "Events", href: "events.html", page: "events" },
  { label: "Gallery", href: "gallery.html", page: "gallery" },
  { label: "Kids Corner", href: "kids-corner.html", page: "kids" },
  { label: "Contact", href: "contact.html", page: "contact" },
];

const MOBILE_ITEMS = [
  { label: "Home", href: "index.html", page: "home" },
  { label: "About Us", href: "about.html", page: "about" },
  { label: "Our Classes", href: "classes.html", page: "classes" },
  { label: "Bible Lessons", href: "lessons.html", page: "lessons" },
  { label: "Events & Activities", href: "events.html", page: "events" },
  { label: "Gallery", href: "gallery.html", page: "gallery" },
  { label: "Kids Corner", href: "kids-corner.html", page: "kids" },
  { label: "Parents' Corner", href: "parents.html", page: "parents" },
  { label: "Resources", href: "resources.html", page: "resources" },
  { label: "Contact Us", href: "contact.html", page: "contact" },
];

export function icon(name, extraClass = "") {
  return `<svg class="icon ${extraClass}" aria-hidden="true" focusable="false"><use href="assets/icons/sprite.svg#i-${name}"></use></svg>`;
}

function navLinks() {
  return NAV_ITEMS.map(
    (item) =>
      `<a href="${item.href}" data-nav="${item.page}">${item.label}</a>`
  ).join("");
}

function mobileLinks() {
  return MOBILE_ITEMS.map(
    (item, index) =>
      `<a href="${item.href}" data-nav="${item.page}"><span>${item.label}</span><span class="num">${String(
        index + 1
      ).padStart(2, "0")}</span></a>`
  ).join("");
}

export function renderHeader() {
  const host = document.querySelector("[data-header]");
  if (!host) return;

  host.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" id="site-header">
      <div class="container">
        <div class="nav-shell">
          <a class="brand" href="index.html" aria-label="Christ Embassy Kids — home">
            <img class="brand__mark" src="assets/images/logo.svg" alt="" width="46" height="46" />
            <span class="brand__text">
              <span class="brand__name">Christ Embassy Kids</span>
              <span class="brand__sub">Central Church 3 · PH Zone 3</span>
            </span>
          </a>
          <nav class="nav-links" aria-label="Main navigation">
            ${navLinks()}
          </nav>
          <div class="nav-actions">
            <button class="icon-btn" type="button" data-search-open aria-label="Search the website">
              ${icon("search")}
            </button>
            <a class="btn btn--primary btn--sm nav-cta" href="contact.html">
              Join Us ${icon("arrow-right")}
            </a>
            <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
              ${icon("menu", "i-menu")}
              ${icon("close", "i-close")}
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu__links" aria-label="Mobile navigation">
        ${mobileLinks()}
      </nav>
      <div class="mobile-menu__foot">
        <a class="btn btn--primary btn--lg" href="contact.html">Plan Your Visit ${icon("arrow-right")}</a>
        <p class="mobile-menu__note">Sundays · during the main service · Port Harcourt</p>
      </div>
    </div>
  `;

  const page = document.body.dataset.page;
  if (page) {
    host.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    });
  }
}

export function renderFooter() {
  const host = document.querySelector("[data-footer]");
  if (!host) return;

  host.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html" aria-label="Christ Embassy Kids — home">
              <img class="brand__mark" src="assets/images/logo.svg" alt="" width="46" height="46" />
              <span class="brand__text">
                <span class="brand__name">Christ Embassy Kids</span>
                <span class="brand__sub">Central Church 3 · PH Zone 3</span>
              </span>
            </a>
            <p>Raising champions for Christ in Port Harcourt — a place where children discover God's Word, grow in faith and shine.</p>
            <div class="social-row" aria-label="Social media (coming soon)">
              <span title="Instagram — coming soon" aria-label="Instagram, coming soon">${icon("instagram")}</span>
              <span title="Facebook — coming soon" aria-label="Facebook, coming soon">${icon("facebook")}</span>
              <span title="YouTube — coming soon" aria-label="YouTube, coming soon">${icon("youtube")}</span>
              <span title="WhatsApp — coming soon" aria-label="WhatsApp, coming soon">${icon("whatsapp")}</span>
            </div>
          </div>

          <div class="footer-col">
            <h3>Explore</h3>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="classes.html">Our Classes</a></li>
              <li><a href="lessons.html">Bible Lessons</a></li>
              <li><a href="events.html">Events</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="kids-corner.html">Kids Corner</a></li>
              <li><a href="teens/index.html">Teens Church (13–19)</a></li>
              <li><a href="youth/index.html">Youth Church</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>For Parents</h3>
            <ul>
              <li><a href="parents.html">Parents' Corner</a></li>
              <li><a href="resources.html">Resources</a></li>
              <li><a href="parents.html#faq">FAQs</a></li>
              <li><a href="parents.html#safety">Child Safety</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Visit Us</h3>
            <ul class="footer-contact">
              <li>${icon("map-pin")}<span>Christ Embassy Central Church 3 Group<br />PH Zone 3, Port Harcourt<br />Rivers State, Nigeria</span></li>
              <li>${icon("clock")}<span>Children's Church holds on Sundays<br />during the main service</span></li>
              <li>${icon("mail")}<span>Enquiries: use the <a href="contact.html">contact form</a></span></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© <span data-year>2026</span> Christ Embassy Kids, Central Church 3. All rights reserved.</span>
          <span class="footer-safety">${icon("shield")} We never collect children's personal information.</span>
          <span><a href="parents.html#safety">Child safety &amp; privacy</a></span>
        </div>
      </div>
    </footer>
    <button class="to-top" type="button" data-to-top aria-label="Back to top">
      ${icon("arrow-up")}
    </button>
  `;
}
