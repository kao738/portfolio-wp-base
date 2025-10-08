// =======================
// 🌟 ハンバーガーメニュー
// =======================
(() => {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.hamburger');
  const nav    = document.getElementById('site-menu');
  if (!header || !button || !nav) return;

  const open = () => {
    header.classList.add('is-open');
    nav.classList.add('is-open');
    document.body.classList.add('scroll-lock');
    button.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    header.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.classList.remove('scroll-lock');
    button.setAttribute('aria-expanded', 'false');
  };

  const toggle = () => header.classList.contains('is-open') ? close() : open();

  button.addEventListener('click', toggle);
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  const bp = 768;
  window.addEventListener('resize', () => {
    if (window.innerWidth > bp) close();
  });
})();

// =======================
// ✨ タイトルアニメーション
// =======================
(() => {
  const title = document.querySelector('.animate-title');
  if (!title) return;

  const text = title.textContent.trim();
  title.textContent = '';

  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${i * 0.05}s`;
    title.appendChild(span);
  });
})();

// =======================
// 🌀 Swiper（v8）
// =======================
(() => {
  const swiper = new Swiper('.swiper.belt', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 6000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    freeMode: true,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 6 }
    }
  });
})();
