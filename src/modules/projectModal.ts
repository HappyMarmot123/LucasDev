import { gsap } from 'gsap';
import type { Project } from '../data/projects';
import type { Lang } from '../i18n';

interface ModalCopy {
  role: string;
  period: string;
  stack: string;
  motivation: string;
  about: string;
  close: string;
}

function renderTech(tech: string[]) {
  return tech.map((item) => `<span class="tech-chip">${item}</span>`).join('');
}

function renderLink(label: string, href?: string) {
  if (!href) {
    return '';
  }

  return `<a class="showcase-button project-modal__link" href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
}

export function initProjectModal(projects: Project[], lang: Lang, labels: ModalCopy) {
  const modal = document.querySelector<HTMLElement>('[data-project-modal]');
  const panel = modal?.querySelector<HTMLElement>('[data-project-modal-panel]');
  const content = modal?.querySelector<HTMLElement>('[data-project-modal-content]');
  const closeButtons = modal?.querySelectorAll<HTMLButtonElement>('[data-project-modal-close]');

  if (!modal || !panel || !content || !closeButtons) {
    return;
  }

  let lastFocused: HTMLElement | null = null;

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-menu-open');
    gsap.to(panel, { autoAlpha: 0, y: 24, scale: 0.98, duration: 0.18, ease: 'power2.in' });
    lastFocused?.focus();
  };

  const open = (project: Project, trigger: HTMLElement) => {
    lastFocused = trigger;
    content.innerHTML = `
      <img class="project-modal__image" src="${project.thumbnail}" alt="${project.title}" />
      <div class="project-modal__header">
        <p class="section-label">${labels.role}: ${project.role}</p>
        <h2>${project.title}</h2>
        ${project.period ? `<p class="project-modal__meta">${labels.period}: ${project.period}</p>` : ''}
      </div>
      <div class="project-modal__stack" aria-label="${labels.stack}">${renderTech(project.tech)}</div>
      <section>
        <h3>${labels.motivation}</h3>
        <p>${project.detail.motivation[lang]}</p>
      </section>
      <section>
        <h3>${labels.about}</h3>
        <p>${project.detail.about[lang]}</p>
      </section>
      <div class="project-modal__links">
        ${renderLink('Live', project.links.live)}
        ${renderLink('GitHub', project.links.repo)}
      </div>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-menu-open');
    gsap.fromTo(panel, { autoAlpha: 0, y: 32, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: 'power3.out' });
    panel.focus();
  };

  document.querySelectorAll<HTMLElement>('[data-project-open]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const project = projects.find((item) => item.id === button.dataset.projectOpen);

      if (project) {
        open(project, button);
      }
    });
  });

  closeButtons.forEach((button) => button.addEventListener('click', close));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      close();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      close();
    }
  });
}
