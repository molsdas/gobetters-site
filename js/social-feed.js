/*
  Карточки Instagram / Telegram в hero-блоке.

  Без автообновления и без стороннего прокси — сознательно: Instagram и Telegram
  сами по себе могут быть заблокированы у части посетителей без VPN, и любая
  попытка что-то у них подгружать (даже через прокси) заставляла бы ждать/ломаться
  ещё до того, как человек решит туда переходить.

  Вместо этого фото и текст поста лежат на самом сайте (config.js), грузятся мгновенно
  для всех. Клик по карточке уводит на настоящий пост — и уже там, при необходимости,
  посетитель сам включит VPN.

  Обновление: правьте telegramPosts / instagramPosts в js/config.js.
*/
window.SocialFeed = (function () {
  const TILE_COUNT = 1;

  const PAW_SVG = '<svg class="paw" viewBox="0 0 64 64" fill="currentColor"><circle cx="20" cy="18" r="7"/><circle cx="38" cy="14" r="7"/><circle cx="50" cy="27" r="6.5"/><circle cx="10" cy="31" r="6.5"/><path d="M32 30c11 0 18 8 18 16 0 7-5 11-12 11-4 0-6-2-10-2s-6 2-10 2c-7 0-11-4-11-11 0-8 7-16 18-16z"/></svg>';

  function tileHtml({ href, tone, caption, photo }) {
    const imgStyle = photo ? ` style="background-image:url('${photo}');background-size:cover;background-position:center;"` : '';
    return `
      <a class="hero-feed-tile" href="${href}" target="_blank" rel="noopener">
        <div class="ph-image" data-tone="${tone}"${imgStyle}>
          ${photo ? '' : PAW_SVG}
        </div>
        <div class="hero-feed-tile-overlay"><span>${caption}</span></div>
      </a>
    `;
  }

  function renderTiles(gridId, posts, fallbackUrl, toneOffset) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = posts.slice(0, TILE_COUNT).map((post, i) => tileHtml({
      href: post.url && post.url.trim() ? post.url.trim() : fallbackUrl,
      tone: (i * 2 + toneOffset) % 6,
      caption: post.caption,
      photo: post.photo,
    })).join('');
  }

  function init(cfg) {
    const tgUrl = cfg.social.telegramChannel ? `https://t.me/${cfg.social.telegramChannel}` : '#';
    renderTiles('heroTelegramTiles', cfg.telegramPosts, tgUrl, 1);

    const igUrl = cfg.social.instagramHandle ? `https://instagram.com/${cfg.social.instagramHandle}` : '#';
    renderTiles('heroInstagramTiles', cfg.instagramPosts, igUrl, 2);
  }

  return { init };
})();
