import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const binaryGlyphs = ['10001101_', '01011010_', '11100011', '00110101_', '11001001_', '0111000'];

function animateBinaryText() {
  const binaries = Array.from(document.querySelectorAll<HTMLElement>('.binary'));

  binaries.forEach((binary, index) => {
    gsap.to(binary, {
      y: index % 2 === 0 ? -18 : 18,
      opacity: 0.45,
      duration: 2.4 + index * 0.35,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });

  window.setInterval(() => {
    binaries.forEach((binary) => {
      binary.textContent = binaryGlyphs[Math.floor(Math.random() * binaryGlyphs.length)];
    });
  }, 1150);
}

function initHeroSequence() {
  const hero = document.querySelector<HTMLElement>('.hero-section');

  if (!hero) {
    return;
  }

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

  timeline
    .from('.hero-kicker span, .hero-kicker i', {
      yPercent: 120,
      autoAlpha: 0,
      duration: 0.65,
      stagger: 0.08,
    })
    .from(
      '.hero-copy h1 span',
      {
        yPercent: 110,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.11,
      },
      '-=0.25',
    )
    .from(
      '.hero-body',
      {
        y: 34,
        autoAlpha: 0,
        duration: 0.75,
      },
      '-=0.4',
    )
    .from(
      '.hero-emblem span',
      {
        y: 80,
        z: -120,
        rotateZ: -8,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
      },
      '-=0.55',
    )
    .from(
      '.binary',
      {
        y: 18,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
      },
      '-=0.8',
    );

  gsap.to('.hero-emblem', {
    y: -18,
    x: 12,
    rotate: -3.6,
    duration: 4.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  gsap.to('.hero-particles span', {
    y: 'random(-28, 28)',
    x: 'random(-18, 18)',
    opacity: 'random(0.35, 0.95)',
    duration: 'random(2.4, 5.4)',
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.08,
  });

  gsap.to('.binary', {
    x: 'random(-22, 22)',
    y: 'random(-20, 20)',
    duration: 'random(2.2, 4.2)',
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    stagger: 0.14,
  });

  gsap.to('.hero-emblem', {
    yPercent: -14,
    scale: 0.92,
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.hero-particles', {
    yPercent: 28,
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

}

function initShowcaseMotion() {
  const active = document.querySelector<HTMLElement>('.active-showcase');
  const industry = document.querySelector<HTMLElement>('.industry-showcase');

  if (active) {
    gsap.from('.showcase-label > *', {
      scrollTrigger: { trigger: active, start: 'top 72%', once: true },
      y: 26,
      autoAlpha: 0,
      duration: 0.62,
      ease: 'power3.out',
      stagger: 0.055,
    });

    gsap.from('.active-showcase__metric h2', {
      scrollTrigger: { trigger: active, start: 'top 70%', once: true },
      clipPath: 'inset(0 0 100% 0)',
      scale: 0.92,
      duration: 1.05,
      ease: 'power4.out',
    });

    gsap.from('.active-showcase__line', {
      scrollTrigger: { trigger: active, start: 'top 58%', once: true },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.05,
      ease: 'power3.out',
    });

    gsap.from('.active-showcase__items article', {
      scrollTrigger: { trigger: active, start: 'top 52%', once: true },
      y: 48,
      autoAlpha: 0,
      duration: 0.82,
      ease: 'power3.out',
      stagger: 0.12,
    });

    gsap.to('.active-showcase__metric', {
      yPercent: -12,
      scrollTrigger: {
        trigger: active,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  if (industry) {
    gsap.from('.industry-showcase__intro h2 span, .industry-showcase__intro p, .industry-showcase__intro .showcase-button', {
      scrollTrigger: { trigger: industry, start: 'top 74%', once: true },
      y: 60,
      autoAlpha: 0,
      duration: 0.86,
      ease: 'power3.out',
      stagger: 0.09,
    });

    gsap.from('.industry-show-card', {
      scrollTrigger: { trigger: industry, start: 'top 66%', once: true },
      x: 120,
      y: 34,
      rotate: 2,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.11,
    });

    gsap.to('.industry-showcase__blocks span', {
      y: 'random(-38, 38)',
      x: 'random(-18, 18)',
      duration: 'random(3.2, 5.2)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.12,
    });
  }
}

export function initHeroMotion() {
  initHeroSequence();
  initShowcaseMotion();
  animateBinaryText();
}
