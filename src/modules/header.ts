export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');

  if (!header) {
    return;
  }

  let ticking = false;

  const updateScrolled = () => {
    const currentScrollY = window.scrollY;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = currentScrollY / maxScroll;

    header.classList.toggle('is-scrolled', currentScrollY > 12);
    header.classList.toggle('is-condensed', currentScrollY > 80);

    if (progress) {
      progress.style.transform = `scaleX(${scrollProgress})`;
    }

    ticking = false;
  };

  updateScrolled();
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    },
    { passive: true },
  );

  if (!toggle || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove('is-open');
    document.body.classList.remove('is-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-open');
    document.body.classList.toggle('is-menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  header.querySelectorAll<HTMLAnchorElement>('.desktop-nav a').forEach((link) => {
    const text = link.textContent ?? '';

    link.addEventListener('mouseenter', () => {
      link.dataset.hovering = 'true';
      link.textContent = text
        .split('')
        .map((letter, index) => (letter === ' ' || index % 2 === 0 ? letter : '0'))
        .join('');

      window.setTimeout(() => {
        if (link.dataset.hovering === 'true') {
          link.textContent = text;
        }
      }, 130);
    });

    link.addEventListener('mouseleave', () => {
      link.dataset.hovering = 'false';
      link.textContent = text;
    });
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
