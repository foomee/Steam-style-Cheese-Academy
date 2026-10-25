// jsを記述する際はここに記載していく
// サムネイル用のSwiper
const thumbnailSwiper = new Swiper(".thumbnail-swiper", {
  slidesPerView: 4,
  spaceBetween: 8,
  watchSlidesProgress: true,
  loop: true,
});

// メイン画像用のSwiper
const mainSwiper = new Swiper(".main-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  thumbs: {
    swiper: thumbnailSwiper,
  },
});

//  ヘッダー
const header = document.querySelector("#top");

let lastScrollY = window.scrollY;
let scrollDistance = 0;
let lastDirection = 0;

const threshold = 30;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const headerTop = header.getBoundingClientRect().top;

  // ページ最上部では必ず表示
  if (currentScrollY <= 0) {
    header.classList.remove("hide");
    scrollDistance = 0;
    lastScrollY = currentScrollY;
    return;
  }

  // ナビゲーションが画面上端に到達するまでは隠さない
  if (headerTop > 0) {
    header.classList.remove("hide");
    scrollDistance = 0;
    lastDirection = 0;
    lastScrollY = currentScrollY;
    return;
  }

  // ページ上部500pxまでは必ず表示
  if (currentScrollY < 500) {
    header.classList.remove("hide");
    scrollDistance = 0;
    lastScrollY = currentScrollY;
    return;
}

  const difference = currentScrollY - lastScrollY;
  const direction = Math.sign(difference);

  // スクロール方向が変わったら、距離をリセット
  if (direction !== 0 && direction !== lastDirection) {
    scrollDistance = 0;
    lastDirection = direction;
  }

  scrollDistance += Math.abs(difference);

  // 下に30px以上スクロールしたら隠す
  if (direction > 0 && scrollDistance >= threshold) {
    header.classList.add("hide");
    scrollDistance = 0;
  }

  // 上に30px以上スクロールしたら表示
  if (direction < 0 && scrollDistance >= threshold) {
    header.classList.remove("hide");
    scrollDistance = 0;
  }

  lastScrollY = currentScrollY;
});