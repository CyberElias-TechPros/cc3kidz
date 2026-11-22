const M_LINKS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'services.html', label: 'Services', key: 'services' },
  { href: 'ministries.html', label: 'Ministries', key: 'ministries' },
  { href: 'events.html', label: 'Events', key: 'events' },
  { href: 'media.html', label: 'Media', key: 'media' },
  { href: 'growth.html', label: 'Growth', key: 'growth' },
  { href: 'new-here.html', label: 'New Here?', key: 'new-here' },
  { href: 'give.html', label: 'Give', key: 'give' },
  { href: 'contact.html', label: 'Contact', key: 'contact' }
];

function renderMainChrome() {
  const pageKey = document.body.dataset.page || '';
  const h = document.querySelector('[data-main-header]');
  if (h) {
    h.innerHTML = `
      <header class="m-header">
        <div class="container m-header__inner">
          <a class="m-brand" href="index.html">
            <span class="m-brand__mark">CE</span>
            <span>Christ Embassy<small>Port Harcourt, Rivers State</small></span>
          </a>
          <nav class="m-nav" aria-label="Main Church navigation">
            ${M_LINKS.map(l => `<a href="${l.href}" class="${l.key === pageKey ? 'is-active' : ''}">${l.label}</a>`).join('')}
          </nav>
          <div class="m-actions">
            <a class="btn btn--gold btn--sm" href="new-here.html">Plan Your Visit</a>
            <button class="m-burger" type="button" aria-label="Menu" aria-expanded="false" data-m-burger>☰</button>
          </div>
        </div>
      </header>
      <div class="m-mobile" data-m-mobile>
        ${M_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        <a href="outreach.html">Outreach &amp; Impact</a>
        <a href="../youth/index.html">Youth Church</a>
        <a href="../teens/index.html">Teens Church (13–19)</a>
        <a href="../index.html">Children's Church (0–12)</a>
      </div>
    `;
    const burger = h.querySelector('[data-m-burger]');
    const menu = h.querySelector('[data-m-mobile]');
    burger?.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.textContent = open ? '✕' : '☰';
    });
  }

  const f = document.querySelector('[data-main-footer]');
  if (f) {
    f.innerHTML = `
      <footer class="m-footer">
        <div class="container">
          <div class="m-footer__grid">
            <div>
              <a class="m-brand" href="index.html">
                <span class="m-brand__mark">CE</span>
                <span>Christ Embassy<small>Port Harcourt, Rivers State</small></span>
              </a>
              <p style="margin-top:1rem;max-width:34ch;">30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station, Port Harcourt, Rivers State, Nigeria.</p>
            </div>
            <div>
              <h4>Church</h4>
              <ul>
                <li><a href="about.html">About Christ Embassy</a></li>
                <li><a href="services.html">Our Services</a></li>
                <li><a href="ministries.html">Ministries &amp; Departments</a></li>
                <li><a href="events.html">Events &amp; Programmes</a></li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li><a href="media.html">Media Centre</a></li>
                <li><a href="growth.html">Spiritual Growth</a></li>
                <li><a href="outreach.html">Outreach &amp; Impact</a></li>
                <li><a href="give.html">Give</a></li>
              </ul>
            </div>
            <div>
              <h4>Church Ecosystem</h4>
              <ul>
                <li><a href="../index.html">Children's Church (0–12)</a></li>
                <li><a href="../teens/index.html">Teens Church (13–19)</a></li>
                <li><a href="../youth/index.html">Youth Church</a></li>
                <li><a href="new-here.html">New Here? Plan Your Visit</a></li>
              </ul>
            </div>
          </div>
          <div class="m-footer__bottom">
            <span>© ${new Date().getFullYear()} Christ Embassy Port Harcourt • LoveWorld</span>
            <span>Taking God's divine presence to the nations</span>
          </div>
        </div>
      </footer>
    `;
  }
}

function initMainForms() {
  document.querySelectorAll('[data-m-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const box = form.parentElement.querySelector('.form-success');
      if (box) box.classList.add('is-show');
      form.reset();
    });
  });
}

function initMainFilters() {
  const bar = document.querySelector('[data-m-filters]');
  if (!bar) return;
  const items = document.querySelectorAll('[data-m-cat]');
  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('button').forEach(b => b.classList.toggle('btn--gold', b === btn));
    items.forEach(el => {
      el.style.display = (f === 'all' || el.dataset.mCat === f) ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderMainChrome();
  initMainForms();
  initMainFilters();
});
