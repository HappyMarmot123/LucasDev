const maxRotate = 8;
const maxShift = 10;

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

export function initProfileCardMotion() {
  document.querySelectorAll<HTMLElement>('[data-profile-motion]').forEach((section) => {
    const card = section.querySelector<HTMLElement>('[data-profile-card]');

    if (!card) {
      return;
    }

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    const applyTilt = () => {
      frame = 0;

      card.style.setProperty('--tilt-x', `${(-nextY * maxRotate).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(nextX * maxRotate).toFixed(2)}deg`);
      card.style.setProperty('--tilt-shift-x', `${(nextX * maxShift).toFixed(2)}px`);
      card.style.setProperty('--tilt-shift-y', `${(nextY * maxShift).toFixed(2)}px`);
      card.style.setProperty('--card-light-x', `${((nextX + 1) * 50).toFixed(2)}%`);
      card.style.setProperty('--card-light-y', `${((nextY + 1) * 50).toFixed(2)}%`);
    };

    section.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      nextX = clamp((event.clientX - centerX) / (window.innerWidth * 0.38));
      nextY = clamp((event.clientY - centerY) / (window.innerHeight * 0.42));

      if (!frame) {
        frame = window.requestAnimationFrame(applyTilt);
      }
    });

    section.addEventListener('pointerleave', () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }

      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--tilt-shift-x');
      card.style.removeProperty('--tilt-shift-y');
      card.style.removeProperty('--card-light-x');
      card.style.removeProperty('--card-light-y');
    });
  });
}
