import './styles/app.css';
import { projects } from './data/projects';
import { initHeader } from './modules/header';
import { initHeroMotion } from './modules/heroMotion';
import { initHeroScramble } from './modules/heroScramble';
import { initIndustries } from './modules/industries';
import { initMarquee } from './modules/marquee';
import { initProjectModal } from './modules/projectModal';
import { initSmoothScroll } from './modules/smoothScroll';
import { initStepsPin } from './modules/stepsPin';
import { initTextReveal } from './modules/textReveal';
import { copy, defaultLang, type Lang } from './i18n';

type Card = { title: string; body: string };
type Step = { number: string; eyebrow: string; title: string; body: string };

const contact = {
  email: 'mdnsw28@gmail.com',
  github: 'https://github.com/HappyMarmot123',
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

function iconMarkup() {
  return `
    <span class="card-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <path d="M24 4l17.3 10v20L24 44 6.7 34V14L24 4z" />
        <path d="M15 25.5h18M24 14v20M15.8 16.4l16.4 15.2M32.2 16.4L15.8 31.6" />
      </svg>
    </span>
  `;
}

function renderFeatureCards(cards: readonly Card[], className: string) {
  return cards
    .map(
      (card, index) => `
        <article class="${className}" data-reveal>
          ${iconMarkup()}
          <span class="card-kicker">${String(index + 1).padStart(2, '0')}</span>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </article>
      `,
    )
    .join('');
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

function renderMarqueeItems() {
  const text = `${['Full Stack']}`;
  return Array.from({ length: 6 }, () => `<span>${text}</span>`).join('');
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

    <section class="solais-section section-pad" aria-labelledby="solais-title">
      <div class="solais-grid">
        <div class="solais-copy">
          <p class="solais-kicker" data-reveal>Analytics for</p>
          <h2 id="solais-title" data-reveal>
            <span>VISIBILITY</span>
            <span>IN AI SEARCH</span>
          </h2>
          <div class="solais-body" data-reveal>
            <p>People don't search for information the way they used to. They ask questions, and AI answers. Solais shows how your brand appears within those answers, and how that visibility shifts over time.</p>
            <p>It's clarity for a new kind of discovery.</p>
          </div>
        </div>
        <div class="dashboard-wrap" data-reveal>
          <div class="dashboard-mockup" aria-label="Solais dashboard mockup" role="img">
            <div class="dashboard-topbar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="dashboard-hero">
              <div>
                <p>Visibility score</p>
                <strong>84%</strong>
              </div>
              <div class="radial-chart"><span>AI</span></div>
            </div>
            <div class="dashboard-bars">
              <span style="--bar: 88%"></span>
              <span style="--bar: 64%"></span>
              <span style="--bar: 76%"></span>
              <span style="--bar: 52%"></span>
            </div>
            <div class="dashboard-list">
              <span>ChatGPT</span>
              <span>Google AI Overview</span>
              <span>Claude</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="active-showcase section-pad" aria-labelledby="active-showcase-title">
      <div class="active-showcase__noise grain-overlay" aria-hidden="true"></div>
      <div class="accent-glow accent-glow--active" aria-hidden="true"></div>
      <div class="active-showcase__copy" data-reveal>
        <p>${t.active.body}</p>
        <a class="showcase-button" href="mailto:${contact.email}">${t.active.button}</a>
      </div>
      <div class="active-showcase__metric" data-reveal>
        <div class="showcase-label">
          <span class="showcase-label__icon" aria-hidden="true">+</span>
          <strong>${t.active.label}</strong>
          <i></i><i></i><i></i>
        </div>
        <h2 id="active-showcase-title" data-count-to="4">${t.active.metric}</h2>
      </div>
      <div class="active-showcase__line" aria-hidden="true"></div>
      <div class="active-showcase__items">
        ${t.active.items
          .map(
            (item) => `
              <article data-reveal>
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="understanding-section section-pad" id="about" aria-labelledby="about-title">
      <div class="section-heading">
        <p class="section-label" data-reveal>${t.about.label}</p>
        <h2 id="about-title" data-reveal><span>${t.about.titleA}</span><span>${t.about.titleB}</span></h2>
        <p class="section-intro" data-reveal>${t.about.intro}</p>
      </div>
      <div class="feature-grid feature-grid--three">
        ${renderFeatureCards(t.about.cards, 'feature-card')}
      </div>
    </section>

    <section class="steps-section section-pad" id="experience" data-steps-pin aria-labelledby="experience-title">
      <div class="steps-pin-inner">
        <div class="section-heading">
          <p class="section-label" data-reveal>${t.experience.label}</p>
          <h2 id="experience-title" data-reveal><span>${t.experience.titleA}</span><span>${t.experience.titleB}</span></h2>
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
      <div class="industry-showcase__blocks" aria-hidden="true">
        <span>04</span><span>03</span><span>06</span><span>02</span>
      </div>
      <div class="industry-showcase__intro" data-reveal>
        <p class="section-label">${t.projects.label}</p>
        <h2 id="projects-title">
          <span>${t.projects.titleA}</span>
          ${t.projects.titleB ? `<span><b></b>${t.projects.titleB}</span>` : ''}
        </h2>
        <p>${t.projects.intro}</p>
        <a class="showcase-button" href="${contact.github}" target="_blank" rel="noreferrer">${t.projects.github}</a>
      </div>
      <div class="swiper industry-showcase-swiper" aria-label="Projects carousel">
        <div class="swiper-wrapper">
          ${renderProjectSlides()}
        </div>
      </div>
    </section>

    <section class="cta-section section-pad" id="contact" aria-labelledby="contact-title">
      <div class="cta-main" data-reveal>
        <p class="section-label">${t.cta.label}</p>
        <h2 id="contact-title">${t.cta.title}</h2>
        <p>${t.cta.body}</p>
        <a class="showcase-button" href="mailto:${contact.email}">${t.cta.button}</a>
      </div>
      <div class="demo-card" data-reveal>
        <div class="active-users">
          <span>${t.cta.metricLabel}</span>
          <strong data-count-to="4">4</strong>
        </div>
        <h3>${t.cta.demoTitle}</h3>
        <p>${t.cta.demoBody}</p>
        <ol>
          ${t.cta.points.map((point) => `<li><strong>${point.title}</strong><span>${point.body}</span></li>`).join('')}
        </ol>
      </div>
      <div class="cta-wordmark" aria-hidden="true">LUCAS</div>
    </section>
  </main>

  <footer class="site-footer section-pad">
    <div class="footer-grid footer-grid--contact">
      <div>
        ${logoMark()}
        <p class="footer-tagline">${t.footer.tagline}</p>
      </div>
      <div>
        <h3>Explore</h3>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="#about">${t.nav.about}</a>
          <a href="#experience">${t.nav.experience}</a>
          <a href="#projects">${t.nav.projects}</a>
          <a href="#contact">${t.nav.contact}</a>
        </nav>
      </div>
      <div class="footer-contact-links">
        <h3>${t.footer.linksTitle}</h3>
        <a href="mailto:${contact.email}">${t.footer.email}: ${contact.email}</a>
        <a href="${contact.github}" target="_blank" rel="noreferrer">${t.footer.github}: HappyMarmot123</a>
        <span aria-disabled="true">${t.footer.linkedin}</span>
      </div>
    </div>
    <div class="footer-bottom">
      <span>${t.footer.copyright}</span>
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
  initStepsPin();
  initHeroScramble();
} else {
  document.documentElement.classList.add('reduced-motion');
}
