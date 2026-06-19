import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initStepsPin() {
  const section = document.querySelector<HTMLElement>('[data-steps-pin]');
  const pin = section?.querySelector<HTMLElement>('.steps-pin-inner');
  const visual = section?.querySelector<HTMLElement>('[data-step-visual]');
  const visualNumber = visual?.querySelector<HTMLElement>('span');
  const visualTitle = visual?.querySelector<HTMLElement>('strong');
  const cards = Array.from(section?.querySelectorAll<HTMLElement>('[data-step]') ?? []);

  if (!section || !pin || !visual || !visualNumber || !visualTitle || cards.length === 0) {
    return;
  }

  if (window.matchMedia('(max-width: 64rem)').matches) {
    return;
  }

  const setActive = (index: number) => {
    const card = cards[index];

    if (!card) {
      return;
    }

    cards.forEach((item) => item.classList.toggle('is-active', item === card));
    visualNumber.textContent = card.dataset.stepNumber ?? '';
    visualTitle.textContent = card.dataset.stepTitle ?? '';
  };

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * (cards.length - 1.15)}`,
    pin,
    scrub: true,
    onUpdate: (self) => {
      const index = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
      setActive(index);
    },
  });
}
