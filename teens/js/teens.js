const NAV_LINKS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'our-teens.html', label: 'Our Teens', key: 'our-teens' },
  { href: 'word-growth.html', label: 'Word & Growth', key: 'word-growth' },
  { href: 'events.html', label: 'Events', key: 'events' },
  { href: 'media.html', label: 'Media', key: 'media' },
  { href: 'connect.html', label: 'Teens Connect', key: 'connect' },
  { href: 'contact.html', label: 'Contact', key: 'contact' }
];

function renderChrome() {
  const pageKey = document.body.dataset.page || '';
  const headerEl = document.querySelector('[data-teens-header]');
  if (headerEl) {
    headerEl.innerHTML = `
      <header class="t-header">
        <div class="container t-header__inner">
          <a class="t-brand" href="index.html">
            <span class="t-brand__mark">C3</span>
            <span>CE Central 3 Teens<small>PH Zone 3 • Port Harcourt</small></span>
          </a>
          <nav class="t-nav" aria-label="Teens Church navigation">
            ${NAV_LINKS.map(l => `<a href="${l.href}" class="${l.key === pageKey ? 'is-active' : ''}">${l.label}</a>`).join('')}
          </nav>
          <div class="t-header__actions">
            <a class="btn btn--ghost btn--sm" href="../kids/index.html" title="Switch to Children's Church">Kids Church</a>
            <a class="btn btn--primary btn--sm" href="connect.html">Get Connected</a>
            <button class="t-burger" type="button" aria-label="Toggle menu" aria-expanded="false" data-burger>☰</button>
          </div>
        </div>
      </header>
      <div class="t-mobile-menu" data-mobile-menu>
        ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
        <a href="talents.html">Talent & Creativity</a>
        <a href="life-purpose.html">Life & Purpose</a>
        <a href="devotionals.html">Devotionals</a>
        <a href="parents.html">Parents' Corner</a>
        <a href="../kids/index.html">← Children's Church</a>
      </div>
    `;
    const burger = headerEl.querySelector('[data-burger]');
    const menu = headerEl.querySelector('[data-mobile-menu]');
    burger?.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.textContent = open ? '✕' : '☰';
    });
  }

  const footerEl = document.querySelector('[data-teens-footer]');
  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="t-footer">
        <div class="container">
          <div class="t-footer__grid">
            <div>
              <a class="t-brand" href="index.html">
                <span class="t-brand__mark">C3</span>
                <span>CE Central 3 Teens<small>Unashamed. Unstoppable. Unforgettable.</small></span>
              </a>
              <p style="margin-top:1rem;max-width:34ch;">Christ Embassy Central Church 3 Teens Church, PH Zone 3, Port Harcourt. Raising a generation of champions.</p>
            </div>
            <div>
              <h4>Ministry</h4>
              <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="our-teens.html">Our Teens</a></li>
                <li><a href="word-growth.html">Word & Growth</a></li>
                <li><a href="devotionals.html">Devotionals</a></li>
              </ul>
            </div>
            <div>
              <h4>Community</h4>
              <ul>
                <li><a href="events.html">Events</a></li>
                <li><a href="media.html">Media Hub</a></li>
                <li><a href="talents.html">Talent & Creativity</a></li>
                <li><a href="life-purpose.html">Life & Purpose</a></li>
              </ul>
            </div>
            <div>
              <h4>Family & Info</h4>
              <ul>
                <li><a href="connect.html">Teens Connect</a></li>
                <li><a href="parents.html">Parents' Corner</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="../kids/index.html">Children's Church (0–12)</a></li>
              </ul>
            </div>
          </div>
          <div class="t-footer__bottom">
            <span>© ${new Date().getFullYear()} CE Central 3 Teens • Christ Embassy Central Church 3, PH Zone 3</span>
            <span>Moderated ministry community • Ages 13–19</span>
          </div>
        </div>
      </footer>
    `;
  }
}

function initCountdown() {
  const el = document.querySelector('[data-countdown]');
  if (!el) return;
  const target = new Date(el.dataset.countdown || '2026-12-06T10:00:00').getTime();
  const update = () => {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <div class="countdown__box"><strong>${d}</strong><span>Days</span></div>
      <div class="countdown__box"><strong>${h}</strong><span>Hours</span></div>
      <div class="countdown__box"><strong>${m}</strong><span>Mins</span></div>
      <div class="countdown__box"><strong>${s}</strong><span>Secs</span></div>
    `;
  };
  update();
  setInterval(update, 1000);
}

async function initTeachings() {
  const grid = document.querySelector('[data-teachings-grid]');
  if (!grid) return;
  const res = await fetch('data/teachings.json');
  const { teachings } = await res.json();
  const searchEl = document.querySelector('[data-teaching-search]');
  const filterWrap = document.querySelector('[data-teaching-filters]');
  let activeCat = 'All';
  let query = '';

  if (filterWrap) {
    const cats = ['All', ...new Set(teachings.map(t => t.category))];
    filterWrap.innerHTML = cats.map(c => `<button class="chip ${c === 'All' ? 'is-active' : ''}" type="button" data-cat="${c}">${c}</button>`).join('');
    filterWrap.addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      activeCat = btn.dataset.cat;
      filterWrap.querySelectorAll('.chip').forEach(b => b.classList.toggle('is-active', b === btn));
      render();
    });
  }
  searchEl?.addEventListener('input', () => {
    query = searchEl.value.trim().toLowerCase();
    render();
  });

  function render() {
    const list = teachings.filter(t =>
      (activeCat === 'All' || t.category === activeCat) &&
      (!query || t.title.toLowerCase().includes(query) || t.intro.toLowerCase().includes(query) || t.scripture.toLowerCase().includes(query))
    );
    grid.innerHTML = list.map(t => `
      <article class="card">
        <span class="card__tag">${t.category}</span>
        <h3>${t.title}</h3>
        <p style="color:var(--blue);font-size:0.85rem;font-weight:600;">${t.scripture}</p>
        <p>${t.intro}</p>
        <details style="margin-top:0.75rem;">
          <summary style="cursor:pointer;color:var(--lime);font-weight:600;font-size:0.9rem;">Read Full Study →</summary>
          <div style="margin-top:0.85rem;padding-top:0.85rem;border-top:1px solid var(--border);font-size:0.92rem;">
            <p>${t.teaching}</p>
            <strong style="color:var(--white);">Key Takeaways:</strong>
            <ul style="margin:0.4rem 0 0.75rem;padding-left:1.2rem;color:var(--muted);">
              ${t.takeaways.map(k => `<li>${k}</li>`).join('')}
            </ul>
            <p><strong style="color:var(--white);">Discussion:</strong> ${t.discussion}</p>
            <p><strong style="color:var(--white);">Reflection:</strong> ${t.reflection}</p>
            <p><strong style="color:var(--blue);">Prayer:</strong> ${t.prayer}</p>
          </div>
        </details>
      </article>
    `).join('') || '<p>No teachings match your search.</p>';
  }
  render();
}

async function initEvents() {
  const upEl = document.querySelector('[data-teens-events]');
  const pastEl = document.querySelector('[data-teens-past]');
  if (!upEl && !pastEl) return;
  const res = await fetch('data/events.json');
  const data = await res.json();
  if (upEl) {
    upEl.innerHTML = data.upcoming.map(ev => `
      <article class="card">
        <span class="card__tag card__tag--pink">${ev.type}</span>
        <h3>${ev.title}</h3>
        <p style="color:var(--blue);font-size:0.88rem;font-weight:600;">${ev.displayDate} • ${ev.time}</p>
        <p style="font-size:0.86rem;">📍 ${ev.venue}</p>
        <p>${ev.description}</p>
      </article>
    `).join('');
  }
  if (pastEl) {
    pastEl.innerHTML = data.past.map(ev => `
      <article class="card">
        <span class="card__tag card__tag--lime">Recap</span>
        <h3>${ev.title}</h3>
        <p style="color:var(--blue);font-size:0.85rem;">${ev.displayDate}</p>
        <p>${ev.summary}</p>
        <p style="font-size:0.85rem;color:var(--lime);">${ev.highlights}</p>
      </article>
    `).join('');
  }
}

async function initDevotionals() {
  const wrap = document.querySelector('[data-devotionals-list]');
  if (!wrap) return;
  const res = await fetch('data/devotionals.json');
  const { devotionals } = await res.json();
  const key = 'ce_teens_devotionals';
  const done = new Set(JSON.parse(localStorage.getItem(key) || '[]'));

  const render = () => {
    const countEl = document.querySelector('[data-devotional-count]');
    if (countEl) countEl.textContent = `${done.size} of ${devotionals.length} completed`;
    wrap.innerHTML = devotionals.map(d => {
      const isDone = done.has(d.id);
      return `
        <article class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;">
            <span class="card__tag">${d.date} • ${d.scripture}</span>
            <button class="btn btn--sm ${isDone ? 'btn--neon' : 'btn--ghost'}" type="button" data-toggle-dev="${d.id}">
              ${isDone ? '✓ Completed' : 'Mark Complete'}
            </button>
          </div>
          <h3>${d.topic}</h3>
          <p>${d.message}</p>
          <p><strong style="color:var(--white);">Application:</strong> ${d.application}</p>
          <p><strong style="color:var(--white);">Think about it:</strong> ${d.reflection}</p>
          <p><strong style="color:var(--blue);">Prayer:</strong> ${d.prayer}</p>
          <p style="font-size:0.82rem;">Related: ${d.related}</p>
        </article>
      `;
    }).join('');
  };
  wrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-toggle-dev]');
    if (!btn) return;
    const id = btn.dataset.toggleDev;
    if (done.has(id)) done.delete(id); else done.add(id);
    localStorage.setItem(key, JSON.stringify([...done]));
    render();
  });
  render();
}

async function initQuiz() {
  const root = document.querySelector('[data-teens-quiz]');
  if (!root) return;
  const res = await fetch('data/quizzes.json');
  const { questions } = await res.json();
  let idx = 0;
  let score = 0;

  const render = () => {
    if (idx >= questions.length) {
      root.innerHTML = `
        <div class="card" style="text-align:center;">
          <span class="card__tag card__tag--lime">Challenge Complete</span>
          <h3>You scored ${score} / ${questions.length}!</h3>
          <p>${score >= 6 ? 'Unashamed Champion! Keep growing in God’s Word.' : 'Great effort! Explore Word & Growth and try again.'}</p>
          <button class="btn btn--primary" type="button" data-quiz-restart>Play Again</button>
        </div>
      `;
      return;
    }
    const q = questions[idx];
    root.innerHTML = `
      <div class="card">
        <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;font-size:0.85rem;color:var(--blue);">
          <span>Question ${idx + 1} of ${questions.length}</span>
          <span>Difficulty: ${q.difficulty}</span>
        </div>
        <h3>${q.q}</h3>
        <div style="margin-top:1rem;">
          ${q.options.map((opt, i) => `<button class="quiz-option" type="button" data-opt="${i}">${opt}</button>`).join('')}
        </div>
        <p data-quiz-msg style="margin-top:0.75rem;font-weight:600;"></p>
      </div>
    `;
  };

  root.addEventListener('click', e => {
    if (e.target.closest('[data-quiz-restart]')) {
      idx = 0; score = 0; render(); return;
    }
    const btn = e.target.closest('[data-opt]');
    if (!btn || root.dataset.locked === '1') return;
    root.dataset.locked = '1';
    const choice = Number(btn.dataset.opt);
    const q = questions[idx];
    const opts = root.querySelectorAll('[data-opt]');
    opts[q.answer].classList.add('is-correct');
    if (choice === q.answer) {
      score++;
      root.querySelector('[data-quiz-msg]').textContent = `Correct! (${q.ref})`;
    } else {
      btn.classList.add('is-wrong');
      root.querySelector('[data-quiz-msg]').textContent = `Not quite — see ${q.ref}.`;
    }
    setTimeout(() => {
      delete root.dataset.locked;
      idx++;
      render();
    }, 900);
  });
  render();
}

function initMediaFilter() {
  const bar = document.querySelector('[data-media-filters]');
  if (!bar) return;
  const items = document.querySelectorAll('[data-media-cat]');
  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('.chip').forEach(c => c.classList.toggle('is-active', c === btn));
    items.forEach(item => {
      item.style.display = (f === 'all' || item.dataset.mediaCat === f) ? '' : 'none';
    });
  });
}

function initFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item')?.classList.toggle('is-open');
    });
  });
}

function initForms() {
  document.querySelectorAll('[data-teens-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const box = form.parentElement.querySelector('.form-success');
      if (box) box.classList.add('is-show');
      form.reset();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderChrome();
  initCountdown();
  initTeachings();
  initEvents();
  initDevotionals();
  initQuiz();
  initMediaFilter();
  initFaq();
  initForms();
});
