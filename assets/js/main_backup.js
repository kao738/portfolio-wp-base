/* ======================================================
   main.js (unified, 2025-10-17)
   - body.is-ready で main をふわっと
   - ハンバーガー .nav-toggle / #site-nav 統一
   - クリック外/ESC/リサイズでクローズ
   - Swiper 寿司ベルト（等速オート）
   - フクロウ .to-top（近接で持ち上げ）
   ====================================================== */
(() => {
  'use strict';

  /* ===== 1) ページ準備完了で main フェード ===== */
  window.addEventListener('load', () => {
    document.body.classList.add('is-ready');
  });

  /* ===== 2) ハンバーガー開閉：.nav-toggle / #site-nav ===== */
  const header   = document.querySelector('.site-header');
  const btn      = document.querySelector('.nav-toggle');
  const nav      = document.querySelector('#site-nav');
  const BP       = 900; // CSSの@mediaと合わせる

  const openMenu = () => {
    if (!btn || !nav) return;
    nav.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };
  const closeMenu = () => {
    if (!btn || !nav) return;
    nav.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  const toggleMenu = () => {
    if (!btn || !nav) return;
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  };

  if (btn && nav) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // ナビ内リンククリックで閉じる
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    // ヘッダー外をクリックで閉じる
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (!e.target.closest('.site-header')) closeMenu();
    });

    // ESCで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // ブレークポイント超えたら強制クローズ
    window.addEventListener('resize', () => {
      if (window.innerWidth > BP) closeMenu();
    });
  }

  /* ===== 3) Swiper：寿司ベルト（連続スクロール） =====
     使う場合は <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script> を読み込み */
  const initBelts = () => {
    if (typeof Swiper === 'undefined') return;
    const belts = document.querySelectorAll('.swiper.belt');
    if (!belts.length) return;

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

      // ホバーで一時停止 / 再開（PC）
      el.addEventListener('mouseenter', () => s.autoplay.stop());
      el.addEventListener('mouseleave', () => s.autoplay.start());
    });
  };
  // DOM準備後に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBelts);
  } else {
    initBelts();
  }

  /* ===== 4) フクロウ：トップへ戻る ===== */
  const toTopBtn = document.querySelector('.to-top');
  const footer   = document.querySelector('.site-footer');

  if (toTopBtn) {
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      // 表示・非表示のしきい値
      if (y > 300) {
        toTopBtn.classList.add('is-visible');
      } else {
        toTopBtn.classList.remove('is-visible');
        toTopBtn.classList.remove('is-near-footer');
      }

      // フッター近接で持ち上げ（任意）
      if (footer) {
        const docH    = document.documentElement.scrollHeight;
        const winH    = window.innerHeight;
        const footH   = footer.offsetHeight || 0;
        const nearPad = 24; // 余白
        const reached = y + winH > docH - (footH + nearPad);
        toTopBtn.classList.toggle('is-near-footer', reached);
      }
      ticking = false;
    };

    const rAFScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', rAFScroll, { passive: true });
  }
})();
