import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export function initIndustries() {
  const swiperElements = document.querySelectorAll<HTMLElement>('.industry-showcase-swiper');

  if (swiperElements.length === 0) {
    return;
  }

  swiperElements.forEach((swiperElement) => {
    new Swiper(swiperElement, {
      modules: [FreeMode],
      slidesPerView: 'auto',
      spaceBetween: 18,
      grabCursor: true,
      freeMode: {
        enabled: true,
        momentum: true,
      },
      breakpoints: {
        768: {
          spaceBetween: 24,
        },
        1280: {
          spaceBetween: 30,
        },
      },
    });
  });
}
