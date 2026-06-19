import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scrambleTo(element: HTMLElement, target: string, duration = 900) {
  const started = performance.now();
  const letters = target.split('');

  const tick = (now: number) => {
    const progress = Math.min(1, (now - started) / duration);
    const fixed = Math.floor(progress * letters.length);

    element.textContent = letters
      .map((letter, index) => {
        if (letter === ' ') {
          return ' ';
        }

        if (index < fixed) {
          return letter;
        }

        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      element.textContent = target;
    }
  };

  window.requestAnimationFrame(tick);
}

export function initHeroScramble() {
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((element) => {
    const text = element.dataset.scramble ?? element.textContent ?? '';
    scrambleTo(element, text, 1050);
  });

  document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((counter) => {
    const target = Number(counter.dataset.countTo ?? 0);
    const state = { value: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 86%',
      once: true,
      markers: true,
      onEnter: () => {
        gsap.to(state, {
          value: target,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = String(Math.round(state.value));
          },
        });
      },
    });
  });
}
