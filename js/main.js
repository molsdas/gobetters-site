(function () {
  const cfg = window.SITE_CONFIG;

  const PAW_SVG = '<svg class="paw" viewBox="0 0 64 64" fill="currentColor"><circle cx="20" cy="18" r="7"/><circle cx="38" cy="14" r="7"/><circle cx="50" cy="27" r="6.5"/><circle cx="10" cy="31" r="6.5"/><path d="M32 30c11 0 18 8 18 16 0 7-5 11-12 11-4 0-6-2-10-2s-6 2-10 2c-7 0-11-4-11-11 0-8 7-16 18-16z"/></svg>';

  const TELEGRAM_ICON = '<svg viewBox="0 0 240 240" fill="#229ED9"><circle cx="120" cy="120" r="120"/><path fill="#fff" d="M178 72l-24 113c-2 8-7 10-14 6l-38-28-18 17c-2 2-4 4-8 4l3-40 73-66c3-3-1-4-5-2l-90 57-39-12c-8-3-8-8 2-12l153-59c7-3 13 2 5 22z"/></svg>';
  const INSTAGRAM_ICON = '<svg viewBox="0 0 24 24"><defs><linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#feda75"/><stop offset="50%" stop-color="#d62976"/><stop offset="100%" stop-color="#4f5bd5"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#igGrad)"/><rect x="6" y="6" width="12" height="12" rx="4" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" stroke-width="1.6"/><circle cx="16.2" cy="7.8" r="1" fill="#fff"/></svg>';
  const STAR_SVG = '<svg viewBox="0 0 20 20" fill="#e3a53c"><path d="M10 1.2l2.7 5.6 6.1.7-4.5 4.3 1.2 6.1L10 14.9l-5.5 3 1.2-6.1-4.5-4.3 6.1-.7z"/></svg>';

  function fillText() {
    document.getElementById('logoSub').textContent = cfg.shopSubName;
    document.getElementById('footerLogoSub').textContent = cfg.shopSubName;
    document.getElementById('footerYearName').textContent = cfg.shopName;
    document.getElementById('footerTagline').textContent = cfg.tagline;
    document.getElementById('year').textContent = new Date().getFullYear();

    document.getElementById('heroTitle').innerHTML = `${cfg.hero.titleLine1}<br>${cfg.hero.titleLine2}`;
    document.getElementById('heroLead').textContent = cfg.hero.lead;


    document.getElementById('processEyebrow').textContent = cfg.process.eyebrow;
    document.getElementById('processTitle').textContent = cfg.process.title;
    document.getElementById('processLead').textContent = cfg.process.lead;
    document.getElementById('processClosing').textContent = cfg.process.closing;

    document.getElementById('legalEntity').textContent = cfg.legal.entity;
    document.getElementById('legalInn').textContent = cfg.legal.inn;

    document.getElementById('footerContact').textContent = `${cfg.contacts.country} · ${cfg.contacts.email}`;

    const igAll = document.getElementById('heroInstagramAll');
    if (cfg.social.instagramHandle) igAll.href = `https://instagram.com/${cfg.social.instagramHandle}`;
    const tgAll = document.getElementById('heroTelegramAll');
    if (cfg.social.telegramChannel) tgAll.href = `https://t.me/${cfg.social.telegramChannel}`;
  }

  function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    grid.innerHTML = cfg.catalog.map((item, i) => `
      <article class="catalog-card" data-index="${i}">
        <div class="catalog-card-media">
          ${item.photo
            ? `<img class="catalog-card-photo" src="${item.photo}" alt="${item.title}">`
            : `<div class="ph-image" data-tone="${item.accent}">${PAW_SVG}<span class="ph-caption">${item.title}</span></div>`}
          ${item.comingSoon ? `<div class="coming-soon-badge"><span>Скоро</span></div>` : ''}
        </div>
        <div class="catalog-card-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.catalog-card').forEach(card => {
      card.addEventListener('click', () => {
        const item = cfg.catalog[card.dataset.index];
        openLightbox(item.title, item.description, item.accent, item.photo);
      });
    });
  }

  function renderPainPoints() {
    const grid = document.getElementById('painGrid');
    grid.innerHTML = cfg.painPoints.map((text, i, arr) => `
      <div class="pain-card${i === arr.length - 1 ? ' is-solution' : ''}">${text}</div>
    `).join('');
  }

  function renderProcessSteps() {
    const grid = document.getElementById('stepsGrid');
    grid.innerHTML = cfg.process.steps.map((step, i) => `
      <div class="step-card">
        <div class="step-head">
          <span class="step-num">${i + 1}</span>
          <span class="step-label">${step.label}</span>
        </div>
        <h3>${step.title}</h3>
        <p>${step.text}</p>
      </div>
    `).join('');
  }

  function renderSizeGuide() {
    const measuresWrap = document.getElementById('sizeMeasures');
    measuresWrap.innerHTML = cfg.sizeGuide.measures.map((m, i) => `
      <div class="size-measure">
        <span class="size-measure-num">${i + 1}</span>
        <div>
          <h3>${m.title}</h3>
          <p>${m.text}</p>
        </div>
      </div>
    `).join('');

    const table = document.getElementById('sizeTable');
    const rows = cfg.sizeGuide.sizes.map(s => `
      <tr>
        <td class="size-table-label">${s.label}</td>
        <td>${s.back}</td>
        <td>${s.chest}</td>
      </tr>
    `).join('');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Размер</th>
          <th>Длина спины, см</th>
          <th>Обхват груди, см</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;
  }

  function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    grid.innerHTML = cfg.reviews.map((review, i) => `
      <article class="review-card">
        <div class="review-card-photo">
          ${review.photo
            ? `<img src="${review.photo}" alt="${review.author}">`
            : `<div class="ph-image" data-tone="${i % 6}">${PAW_SVG}<span class="ph-caption">Фото питомца</span></div>`}
        </div>
        <div class="review-card-body">
          <div class="review-card-stars">${STAR_SVG.repeat(review.rating || 5)}</div>
          <p class="review-card-text">${review.text}</p>
          <span class="review-card-author">${review.author}</span>
        </div>
      </article>
    `).join('');
  }

  function renderSocialIcons() {
    const wrap = document.getElementById('socialIcons');
    let html = '';
    if (cfg.social.telegramChannel) {
      html += `<a href="https://t.me/${cfg.social.telegramChannel}" target="_blank" rel="noopener" aria-label="Telegram">${TELEGRAM_ICON}</a>`;
    }
    if (cfg.social.instagramHandle) {
      html += `<a href="https://instagram.com/${cfg.social.instagramHandle}" target="_blank" rel="noopener" aria-label="Instagram">${INSTAGRAM_ICON}</a>`;
    }
    if (cfg.social.maxUrl) {
      html += `<a href="${cfg.social.maxUrl}" target="_blank" rel="noopener" aria-label="MAX" class="social-icon-text">MAX</a>`;
    }
    wrap.innerHTML = html;
  }

  function openLightbox(title, text, tone, photo) {
    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('lightboxText').textContent = text;
    const img = document.getElementById('lightboxImage');
    img.setAttribute('data-tone', tone);
    if (photo) {
      img.style.backgroundImage = `url('${photo}')`;
      img.style.backgroundSize = 'cover';
      img.style.backgroundPosition = 'center';
      img.querySelector('.paw').style.display = 'none';
    } else {
      img.style.backgroundImage = '';
      img.querySelector('.paw').style.display = '';
    }
    document.getElementById('lightbox').classList.add('open');
  }

  function initLightbox() {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
  }

  function initNav() {
    const burger = document.getElementById('burgerBtn');
    const header = document.getElementById('siteHeader');
    burger.addEventListener('click', () => header.classList.toggle('menu-open'));
    document.querySelectorAll('.nav-list a').forEach(a => {
      a.addEventListener('click', () => header.classList.remove('menu-open'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    fillText();
    renderCatalog();
    renderPainPoints();
    renderProcessSteps();
    renderSizeGuide();
    renderReviews();
    renderSocialIcons();
    initLightbox();
    initNav();
    window.SocialFeed.init(cfg);
  });
})();
