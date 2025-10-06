(() => {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.hamburger');
  const nav    = document.getElementById('site-menu');

  if (!header || !button || !nav) return;

  const open = () => {
    header.classList.add('is-open');
    nav.classList.add('is-open'); // ←追加
    document.body.classList.add('scroll-lock');
    button.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    header.classList.remove('is-open');
    nav.classList.remove('is-open'); // ←追加
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

(() => {
  // ...既存のヘッダー・メニューのコード...
})();

<script>
  const swiper = new Swiper('.swiper.belt', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 24,
    speed: 6000, // スライドの移動速度（ms）を大きく
    autoplay: {
      delay: 0, // 0で常に流れる
      disableOnInteraction: false
    },
    freeMode: true, // スライドを止めずに流す
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
</script>