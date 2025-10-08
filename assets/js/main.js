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

// 即時関数（IIFE）で囲むことで、
// この中の変数や処理が他のスクリプトと干渉しないようにする
(function() {

  // スライドのアニメーション速度（1周にかかる時間：ミリ秒）
  let speed = 5000;

  // =============================
  // ✅ Swiper（スライダー）の初期設定
  // =============================
  const mySwiper = new Swiper('.swiper', {
    loop: true,               // 無限ループでスライドを繰り返す
    slidesPerView: 'auto',    // 自動でスライド数を調整（※下で4に上書きされている）
    slidesPerView: 4,         // 一度に表示するスライドの枚数（上の設定を上書き）
    speed: speed,             // スライドアニメーションにかかる時間（5000ms = 5秒）
    spaceBetween: 10,         // スライド間の余白（10px）
    allowTouchMove: false,    // ユーザーによるスワイプ操作を無効化

    autoplay: {
      delay: 0,               // 次のスライドまでの待ち時間（0にすると常に動き続ける）
      disableOnInteraction: false, // ユーザーが触れても自動再生を止めない
    },
  });

  // 現在のスライド位置（translate値）を一時的に保存するための変数
  let getTranslate;

  // =============================
  // ✅ マウスホバー時にスライドを停止・再開する処理
  // =============================
  document.querySelectorAll('.swiper').forEach(function(e){

    // -----------------------------
    // 🖱️ マウスを乗せた時の動作（スライド停止）
    // -----------------------------
    e.addEventListener('mouseover', function () {
      // 現在のスライド位置（translate値）を取得
      getTranslate = mySwiper.getTranslate();
      // 現在位置でスライドを固定（アニメーションを止める）
      mySwiper.setTranslate(getTranslate);
      // トランジション（アニメーション）を無効化して完全に静止
      mySwiper.setTransition(0);
    });

    // -----------------------------
    // 🖱️ マウスを離した時の動作（スライド再開）
    // -----------------------------
    e.addEventListener('mouseout', function () {
      // 現在のスライド位置を再取得
      getTranslate = mySwiper.getTranslate();

      // 現在のスライド要素（アクティブなスライド）を取得
      let activeSlide = document.querySelector('.swiper-slide-active');

      // 左右のマージンを取得（CSSで設定されていない場合は0）
      let getSlideWidthMgLeft = activeSlide.style.marginLeft
        ? parseFloat(activeSlide.style.marginLeft)
        : 0;
      let getSlideWidthMgRight = activeSlide.style.marginRight
        ? parseFloat(activeSlide.style.marginRight)
        : 0;

      // スライド1枚分の幅を取得
      let getSlideWidth = activeSlide.offsetWidth;

      // マージン込みのスライド1枚分の合計幅
      let getTotalSlideWidth = getSlideWidthMgLeft + getSlideWidthMgRight + getSlideWidth;

      // スライド再開時に「次のスライドに滑らかに移行する」ための調整量
      // 現在位置をもとに、ちょうどスライド1枚分の終端までの差を計算
      let diff = -getTotalSlideWidth - (getTranslate % getTotalSlideWidth);

      // 移動距離に応じた時間比率を算出
      let diffTime = diff / -getSlideWidth;

      // スライド位置を次の正しい位置に補正
      mySwiper.setTranslate(getTranslate + diff);

      // スライドを再び動かす（トランジション時間を調整して自然に再開）
      mySwiper.setTransition(speed * diffTime);
    });
  });

})(); // 即時実行してスクリプトを完了
