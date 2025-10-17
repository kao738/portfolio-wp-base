// (() => {
//   const header = document.querySelector('.site-header');
//   const button = document.querySelector('.hamburger');
//   const nav    = document.getElementById('site-menu');

//   if (!header || !button || !nav) return;

//   const open = () => {
//     header.classList.add('is-open');
//     nav.classList.add('is-open'); // ←追加
//     document.body.classList.add('scroll-lock');
//     button.setAttribute('aria-expanded', 'true');
//   };
//   const close = () => {
//     header.classList.remove('is-open');
//     nav.classList.remove('is-open'); // ←追加
//     document.body.classList.remove('scroll-lock');
//     button.setAttribute('aria-expanded', 'false');
//   };
//   const toggle = () => header.classList.contains('is-open') ? close() : open();

//   button.addEventListener('click', toggle);

//   nav.addEventListener('click', e => {
//     if (e.target.closest('a')) close();
//   });

//   document.addEventListener('keydown', e => {
//     if (e.key === 'Escape') close();
//   });

//   const bp = 768;
//   window.addEventListener('resize', () => {
//     if (window.innerWidth > bp) close();
//   });
// })();

// (() => {
//   // ...既存のヘッダー・メニューのコード...
// })();

// // 

/* =========================
   header: hamburger toggle
   ========================= */
(() => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', e => {
    if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
    }
  });
})();


/* =========================
   Swiper: ベルト（連続スクロール）
   ========================= */
// Swiper@8 を読み込んでいる前提（<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js">）
(() => {
  const belts = document.querySelectorAll('.swiper.belt');
  if (!belts.length || typeof Swiper === 'undefined') return;

  belts.forEach((el) => {
    const s = new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 8,
      loop: true,
      loopAdditionalSlides: 12,
      speed: 7000,
      autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false },
      allowTouchMove: false,
      freeMode: true,
      freeModeMomentum: false,
    });

    // ホバーで一時停止 / 再開（PC向け）
    el.addEventListener('mouseenter', () => s.autoplay.stop());
    el.addEventListener('mouseleave', () => s.autoplay.start());
  });
})();
// 1) ページ準備完了で main フェード（共通）
window.addEventListener('load', () => {
  document.body.classList.add('is-ready'); // ← main用
});

// 2) ハンバーガー開閉（共通）
(() => {
  const btn = document.querySelector('.hamburger');
  const nav = document.getElementById('site-menu');
  if (!btn || !nav) return;

  const openMenu  = () => {
    document.body.classList.add('menu-open');
    btn.setAttribute('aria-expanded', 'true');
    nav.removeAttribute('hidden'); // ← hidden解除が超大事
  };
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    btn.setAttribute('aria-expanded', 'false');
    // スライドアニメ後にhiddenを戻す
    setTimeout(() => nav.setAttribute('hidden', ''), 350);
  };

  btn.addEventListener('click', () => {
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
  });
  nav.addEventListener('click', (e) => { if (e.target.matches('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
})();

