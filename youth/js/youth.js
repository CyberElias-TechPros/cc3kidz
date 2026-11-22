const Y_LINKS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About Us', key: 'about' },
  { href: 'services.html', label: 'Services', key: 'services' },
  { href: 'departments.html', label: 'Departments', key: 'departments' },
  { href: 'events.html', label: 'Events', key: 'events' },
  { href: 'media.html', label: 'Media', key: 'media' },
  { href: 'resources.html', label: 'Resources', key: 'resources' },
  { href: 'give.html', label: 'Give', key: 'give' },
  { href: 'contact.html', label: 'Contact', key: 'contact' }
];

function renderYouthChrome() {
  const pageKey = document.body.dataset.page || '';
  const h = document.querySelector('[data-youth-header]');
  if (h) {
    h.innerHTML = `
      <header class="y-header">
        <div class="container y-header__inner">
          <a class="y-brand" href="index.html">
            <span class="y-brand__mark">CE</span>
            <span>CE Youth PH<small>Christ Embassy • Port Harcourt</small></span>
          </a>
          <nav class="y-nav" aria-label="Youth Church navigation">
            ${Y_LINKS.map(l => `<a href="${l.href}" class="${l.key === pageKey ? 'is-active' : ''}">${l.label}</a>`).join('')}
          </nav>
          <div class="y-actions">
            <a class="btn btn--gold btn--sm" href="services.html#visit">Plan Your Visit</a>
            <button class="y-burger" type="button" aria-label="Menu" aria-expanded="false" data-y-burger>☰</button>
          </div>
        </div>
      </header>
      <div class="y-mobile" data-y-mobile>
        ${Y_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        <a href="../teens/index.html">Teens Church (13–19)</a>
        <a href="../index.html">Children's Church (0–12)</a>
      </div>
    `;
    const burger = h.querySelector('[data-y-burger]');
    const menu = h.querySelector('[data-y-mobile]');
    burger?.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.textContent = open ? '✕' : '☰';
    });
  }

  const f = document.querySelector('[data-youth-footer]');
  if (f) {
    f.innerHTML = `
      <footer class="y-footer">
        <div class="container">
          <div class="y-footer__grid">
            <div>
              <a class="y-brand" href="index.html">
                <span class="y-brand__mark">CE</span>
                <span>CE Youth Church<small>Port Harcourt, Rivers State</small></span>
              </a>
              <p style="margin-top:1rem;max-width:34ch;">30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station, Port Harcourt, Rivers State, Nigeria.</p>
            </div>
            <div>
              <h4>Church</h4>
              <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Our Services</a></li>
                <li><a href="departments.html">Departments</a></li>
                <li><a href="events.html">Events</a></li>
              </ul>
            </div>
            <div>
              <h4>Grow</h4>
              <ul>
                <li><a href="media.html">Media Centre</a></li>
                <li><a href="resources.html">Resources</a></li>
                <li><a href="give.html">Give</a></li>
                <li><a href="contact.html">Connect With Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Church Family</h4>
              <ul>
                <li><a href="../index.html">Children's Church (0–12)</a></li>
                <li><a href="../teens/index.html">Teens Church (13–19)</a></li>
                <li><a href="contact.html">WhatsApp &amp; Directions</a></li>
              </ul>
            </div>
          </div>
          <div class="y-footer__bottom">
            <span>© ${new Date().getFullYear()} Christ Embassy Youth Church — Port Harcourt</span>
            <span>Christ Embassy / LoveWorld • Safeguarding &amp; Privacy Respected</span>
          </div>
        </div>
      </footer>
    `;
  }
}

function initYouthForms() {
  document.querySelectorAll('[data-y-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const box = form.parentElement.querySelector('.form-success');
      if (box) box.classList.add('is-show');
      form.reset();
    });
  });
}

function initYouthFilters() {
  const bar = document.querySelector('[data-y-filters]');
  if (!bar) return;
  const items = document.querySelectorAll('[data-y-cat]');
  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('button').forEach(b => b.classList.toggle('btn--gold', b === btn));
    items.forEach(el => {
      el.style.display = (f === 'all' || el.dataset.yCat === f) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderYouthChrome();
  initYouthForms();
  initYouthFilters();
});
