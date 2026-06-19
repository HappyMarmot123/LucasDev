import { gsap } from 'gsap';

export function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((marquee) => {
    const track = marquee.querySelector<HTMLElement>('.marquee-track');

    if (!track) {
      return;
    }

    gsap.to(track, {
      xPercent: -50,
      duration: Number(marquee.dataset.duration ?? 22),
      ease: 'none',
      repeat: -1,
    });
  });
}
