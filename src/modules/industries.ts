import Swiper from 'swiper';
import { FreeMode } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/free-mode';

gsap.registerPlugin(ScrollTrigger);

export function initIndustries() {
  const swiperElements = document.querySelectorAll<HTMLElement>('.industry-showcase-swiper');

  swiperElements.forEach((swiperElement) => {
    const swiper = new Swiper(swiperElement, {
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

    if (window.matchMedia('(max-width: 64rem)').matches) {
      return;
    }

    const getScrollDistance = () => Math.abs(swiper.maxTranslate() - swiper.minTranslate());

    requestAnimationFrame(() => {
      swiper.update();

      if (getScrollDistance() <= 0) {
        return;
      }

      ScrollTrigger.create({
        trigger: swiperElement,
        start: 'center center',
        end: () => `+=${Math.max(getScrollDistance() * 1.35, window.innerHeight * 0.9)}`,
        pin: swiperElement,
        scrub: true,
        markers: true,
        invalidateOnRefresh: true,
        onRefresh: () => {
          swiper.update();
          swiper.setProgress(0, 0);
        },
        onUpdate: (self) => {
          swiper.setProgress(self.progress, 0);
        },
        onLeave: () => {
          swiper.setProgress(1, 0);
        },
        onLeaveBack: () => {
          swiper.setProgress(0, 0);
        },
      });

      ScrollTrigger.refresh();
    });
  });
}
