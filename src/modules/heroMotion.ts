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
      markers: true,
    },
  });

  gsap.to('.hero-particles', {
    yPercent: 28,
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      markers: true,
    },
  });

}

function initShowcaseMotion() {
  const industry = document.querySelector<HTMLElement>('.industry-showcase');

  if (industry) {
    gsap.from('.industry-show-card', {
      scrollTrigger: { trigger: industry, start: 'top 66%', once: true, markers: true },
      x: 120,
      y: 34,
      rotate: 2,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.11,
    });
  }
}

export function initHeroMotion() {
  initHeroSequence();
  initShowcaseMotion();
  animateBinaryText();
}
