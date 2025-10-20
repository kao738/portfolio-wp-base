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
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('#site-menu');
  if (!btn || !nav) return;
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = nav.classList.toggle('is-open');
    // btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.classList.toggle("is-open");
  });
  document.addEventListener('click', e => {
    if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) {
      nav.classList.remove('is-open');
      // btn.setAttribute('aria-expanded','false');
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
// ==== Reveal 最小実装：非表示(.js-reveal/.js-inview)を表示にする ====
document.addEventListener('DOMContentLoaded', () => {
  console.log('[main.js] DOM ready');

  const targets = document.querySelectorAll('.js-reveal, .js-inview, [data-reveal]');
  if (!targets.length) {
    console.warn('[reveal] 対象が見つかりません (.js-reveal/.js-inview/[data-reveal])');
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => io.observe(el));
});
