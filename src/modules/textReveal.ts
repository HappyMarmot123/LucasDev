import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTextReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 56 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true,
          markers: true,
        },
      },
    );
  });
}
