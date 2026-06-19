import './styles/app.css';
import { projects } from './data/projects';
import { initHeader } from './modules/header';
import { initHeroMotion } from './modules/heroMotion';
import { initHeroScramble } from './modules/heroScramble';
import { initIndustries } from './modules/industries';
import { initMarquee } from './modules/marquee';
import { initProfileCardMotion } from './modules/profileCardMotion';
import { initProjectModal } from './modules/projectModal';
import { initSmoothScroll } from './modules/smoothScroll';
import { initStepsPin } from './modules/stepsPin';
import { initTextReveal } from './modules/textReveal';
import { copy, defaultLang, type Lang } from './i18n';

type Step = { number: string; eyebrow: string; title: string; body: string };

const contact = {
  email: 'mdnsw28@gmail.com',
  github: 'https://github.com/HappyMarmot123',
  linkedin: 'https://www.linkedin.com/',
};

function getLang(): Lang {
  return localStorage.getItem('lucasdev-lang') === 'ko' ? 'ko' : defaultLang;
}

const lang = getLang();
const t = copy[lang];
document.documentElement.lang = lang;

function logoMark() {
  return `
    <a class="logo-mark" href="#top" aria-label="Lucas Kim home">
      <span class="logo-mark__glyph" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i><i></i>
      </span>
      <span>LUCAS KIM</span>
    </a>
  `;
}

function renderStepCards(steps: readonly Step[]) {
  return steps
    .map(
      (step, index) => `
        <article
          class="step-card ${index === 0 ? 'is-active' : ''}"
          data-step
          data-step-number="${step.number}"
          data-step-title="${step.title}"
        >
          <span class="step-card__number">${step.number}</span>
          <div>
            <p class="section-label">${step.eyebrow}</p>
            <h3>${step.title}</h3>
            <p>${step.body}</p>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderProjectChips(tech: string[]) {
  return tech.map((item) => `<span class="tech-chip">${item}</span>`).join('');
}

function renderProjectLink(label: string, href?: string) {
  if (!href) {
    return '';
  }

  return `<a class="project-card__link" href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
}

function renderProjectSlides() {
  return projects
    .map(
      (project, index) => `
        <article class="swiper-slide industry-show-card project-card">
          <button class="project-card__media" type="button" data-project-open="${project.id}" aria-label="Open ${project.title} details">
            <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" />
          </button>
          <div class="industry-show-card__code">PROJECT <span></span> ${String(index + 1).padStart(2, '0')}</div>
          <h3>${project.title}</h3>
          <p class="project-card__role">${project.role}${project.period ? ` · ${project.period}` : ''}</p>
          <div class="project-card__tech">${renderProjectChips(project.tech)}</div>
          <p>${project.summary[lang]}</p>
          <div class="project-card__actions">
            ${renderProjectLink(t.projects.live, project.links.live)}
            ${renderProjectLink(t.projects.repo, project.links.repo)}
            <button class="project-card__details" type="button" data-project-open="${project.id}">${t.projects.details}</button>
          </div>
          <div class="industry-show-card__barcode" aria-hidden="true"></div>
        </article>
      `,
    )
    .join('');
}

function renderProfileCard() {
  return `
    <div class="dashboard-wrap" data-reveal>
      <div class="dashboard-mockup" data-profile-card aria-label="${t.about.label} profile summary" role="img">
        <div class="dashboard-topbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="dashboard-hero">
          <div>
            <span class="profile-name">김보준 / Kimbojun</span>
            <div class="profile-years">
              <strong>4</strong>
              <p>${t.cta.metricLabel}</p>
            </div>
          </div>
          <div class="profile-photo">
            <img src="/mejpg.jpg" alt="Lucas Kim" />
          </div>
        </div>
        <div class="profile-meta">
			<span><small>Born</small>1999</span>
			<span><small>Gender</small>Male</span>
			<span><small>Location</small>Gangseo-gu, Seoul</span>
        </div>
        <div class="dashboard-bars">
          <span style="--bar: 0%"></span>
        </div>
        <div class="dashboard-list">
          ${t.about.cards.map((card) => `<span>${card.title}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderMarqueeItems() {
  const text = `${['Full Stack']}`;
  return Array.from({ length: 6 }, () => `<span>${text}</span>`).join('');
}

function githubIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.25 9.25 0 0 1 12 6.94c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.8c0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  `;
}

function emailIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 6.25h15A2.5 2.5 0 0 1 22 8.75v6.5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 15.25v-6.5a2.5 2.5 0 0 1 2.5-2.5Zm.44 1.75 6.2 4.87a1.38 1.38 0 0 0 1.72 0L19.06 8H4.94Zm15.31 1.37-6.31 4.95a3.13 3.13 0 0 1-3.88 0L3.75 9.37v5.88c0 .41.34.75.75.75h15c.41 0 .75-.34.75-.75V9.37Z" />
    </svg>
  `;
}

function linkedinIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.34 8.98H2.42v12.44h2.92V8.98ZM3.88 3.18a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm8.58 5.8H9.66v12.44h2.86v-6.56c0-1.72.79-3 2.35-3 1.34 0 2.03.91 2.03 2.63v6.93h2.92v-7.37c0-3.36-1.78-5.25-4.43-5.25-1.7 0-2.62.82-3.07 1.47h-.04l.18-1.29Z" />
    </svg>
  `;
}

function renderContactActions() {
  return `
    <div class="contact-actions" data-reveal aria-label="Contact links">
      <a class="contact-action" href="${contact.github}" target="_blank" rel="noreferrer" aria-label="Open GitHub">
        ${githubIcon()}
        <span>GitHub</span>
      </a>
      <a class="contact-action" href="mailto:${contact.email}" aria-label="Email Lucas Kim">
        ${emailIcon()}
        <span>Gmail</span>
      </a>
      <a class="contact-action" href="${contact.linkedin}" target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
        ${linkedinIcon()}
        <span>LinkedIn</span>
      </a>
    </div>
  `;
}

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Missing #app mount point');
}

app.innerHTML = `
  <header class="site-header" data-header>
    <div class="header-shell">
      ${logoMark()}
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#about">${t.nav.about}</a><span>/</span>
        <a href="#experience">${t.nav.experience}</a><span>/</span>
        <a href="#projects">${t.nav.projects}</a><span>/</span>
        <a href="#contact">${t.nav.contact}</a>
      </nav>
      <div class="header-actions">
        <button class="lang-toggle" type="button" data-lang-toggle aria-label="Switch language">${lang === 'en' ? 'KO' : 'EN'}</button>
        <a class="button button--small button--outline" href="mailto:${contact.email}">
          <span>${t.nav.email}</span>
          <span aria-hidden="true">↗</span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-menu" aria-label="Mobile navigation" data-mobile-menu>
      <a href="#about">${t.nav.about}</a>
      <a href="#experience">${t.nav.experience}</a>
      <a href="#projects">${t.nav.projects}</a>
      <a href="#contact">${t.nav.contact}</a>
    </nav>
    <div class="scroll-progress" aria-hidden="true"><span data-scroll-progress></span></div>
  </header>

  <main id="top">
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-noise grain-overlay" aria-hidden="true"></div>
      <div class="accent-glow accent-glow--hero" aria-hidden="true"></div>
      <div class="hero-particles" aria-hidden="true">
        <span style="--x: 8%; --y: 26%; --s: 0.42rem"></span>
        <span style="--x: 17%; --y: 52%; --s: 0.58rem"></span>
        <span style="--x: 28%; --y: 34%; --s: 0.32rem"></span>
        <span style="--x: 36%; --y: 70%; --s: 0.46rem"></span>
        <span style="--x: 48%; --y: 18%; --s: 0.28rem"></span>
        <span style="--x: 61%; --y: 58%; --s: 0.36rem"></span>
        <span style="--x: 73%; --y: 31%; --s: 0.5rem"></span>
        <span style="--x: 86%; --y: 68%; --s: 0.4rem"></span>
        <span style="--x: 93%; --y: 22%; --s: 0.34rem"></span>
        <span style="--x: 78%; --y: 82%; --s: 0.3rem"></span>
        <span style="--x: 55%; --y: 76%; --s: 0.5rem"></span>
        <span style="--x: 21%; --y: 83%; --s: 0.34rem"></span>
      </div>
      <div class="binary binary--one" aria-hidden="true">10001101_</div>
      <div class="binary binary--two" aria-hidden="true">10000111</div>
      <div class="binary binary--three" aria-hidden="true">11001001_</div>
      <div class="binary binary--four" aria-hidden="true">0111000</div>
      <div class="hero-emblem" aria-hidden="true">
        <span></span><span></span><span></span>
        <span></span><span></span><span></span>
      </div>
      <div class="hero-copy">
        <div class="hero-kicker">
          <span>${t.hero.kicker}</span>
          <i></i><i></i>
        </div>
        <h1 id="hero-title">
          <span>${t.hero.titleA}</span>
          <span><b></b>${t.hero.titleB}</span>
        </h1>
      </div>
      <div class="hero-body">
        <p>${t.hero.body}</p>
      </div>
    </section>

    <section class="profile-section section-pad" data-profile-motion aria-labelledby="profile-title">
      <div class="profile-grid">
        <div class="profile-copy">
          <p class="profile-kicker" data-reveal>${t.about.label}</p>
          <h2 id="profile-title" data-reveal>
            <span>${t.about.titleA}</span>
            <span>${t.about.titleB}</span>
          </h2>
          <div class="profile-body" data-reveal>
            <p>${t.about.intro}</p>
          </div>
        </div>
        ${renderProfileCard()}
      </div>
    </section>

    <section class="steps-section section-pad" id="experience" data-steps-pin aria-labelledby="experience-title">
      <div class="steps-pin-inner">
        <div class="section-heading">
          <p class="section-kicker" data-reveal>${t.experience.label}</p>
          <h2 id="experience-title" data-reveal><span>${t.experience.titleA}${t.experience.titleB}</span></h2>
          <p class="section-intro" data-reveal>${t.experience.intro}</p>
        </div>
        <div class="steps-grid">
          <div class="step-visual" data-step-visual>
            <span>${t.experience.steps[0].number}</span>
            <strong>${t.experience.steps[0].title}</strong>
            <div class="step-visual__rings" aria-hidden="true"></div>
          </div>
          <div class="step-list">
            ${renderStepCards(t.experience.steps)}
          </div>
        </div>
      </div>
    </section>

    <section class="marquee-band" data-marquee aria-label="Portfolio marquee">
      <div class="marquee-track">
        ${renderMarqueeItems()}
      </div>
    </section>

    <section class="industry-showcase section-pad" id="projects" aria-labelledby="projects-title">
      <div class="grain-overlay" aria-hidden="true"></div>
      <div class="accent-glow accent-glow--industry" aria-hidden="true"></div>
      <div class="industries-head">
        <div class="section-heading" data-reveal>
          <p class="section-kicker">${t.projects.label}</p>
          <h2 id="projects-title">
            <span>${t.projects.title}</span>
          </h2>
          <div class="industries-copy">
            <p>${t.projects.intro}</p>
          </div>
        </div>
      </div>
      <div class="swiper industry-showcase-swiper" aria-label="Projects carousel">
        <div class="swiper-wrapper">
          ${renderProjectSlides()}
        </div>
      </div>
    </section>

    <section class="cta-section section-pad" id="contact" aria-labelledby="contact-title">
      <div class="cta-main" data-reveal>
        <p class="section-kicker">${t.cta.label}</p>
        <h2 id="contact-title">${t.cta.title}</h2>
        <div class="cta-body">
          <div>
            <p>${t.cta.body}</p>
          </div>
          ${renderContactActions()}
        </div>
      </div>
      <div class="cta-wordmark" aria-hidden="true">LUCAS</div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <span class="footer-copy">${t.footer.copyright}</span>
      <div class="footer-contact" aria-label="Footer links">
        <a href="${contact.github}" target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <small>${contact.github}</small>
        </a>
        <a href="mailto:${contact.email}">
          <span>Email</span>
          <small>${contact.email}</small>
        </a>
        <a href="${contact.linkedin}" target="_blank" rel="noreferrer">
          <span>LinkedIn</span>
          <small>${contact.linkedin}</small>
        </a>
      </div>
    </div>
  </footer>

  <div class="project-modal" data-project-modal aria-hidden="true">
    <div class="project-modal__panel" data-project-modal-panel role="dialog" aria-modal="true" tabindex="-1">
      <button class="project-modal__close" type="button" data-project-modal-close aria-label="${t.modal.close}">×</button>
      <div data-project-modal-content></div>
    </div>
  </div>
`;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initHeader();
initIndustries();
initProjectModal(projects, lang, t.modal);

document.querySelector<HTMLButtonElement>('[data-lang-toggle]')?.addEventListener('click', () => {
  localStorage.setItem('lucasdev-lang', lang === 'en' ? 'ko' : 'en');
  window.location.reload();
});

if (!reduce) {
  initSmoothScroll();
  initTextReveal();
  initHeroMotion();
  initMarquee();
  initProfileCardMotion();
  initStepsPin();
  initHeroScramble();
} else {
  document.documentElement.classList.add('reduced-motion');
}
