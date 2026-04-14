import { useState, useEffect, useRef, useCallback } from 'react';
import '../../assets/styles/Project.scss';
import projectData from './ProjectData';
import { IProject } from './ProjectTypes';


// ─── Fade-in reveal hook ───────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: visible inmediatamente sin transición
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('sr-image-wrap--visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-image-wrap--visible');
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    // Fallback: si el observer no dispara, revelar igualmente
    const fallback = setTimeout(() => {
      el.classList.add('sr-image-wrap--visible');
      observer.disconnect();
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return ref;
}


// ─── Single showreel entry ────────────────────────────────────────────────────
function ShowreelEntry({
  project,
  index,
  onOpen,
  isLight,
}: {
  project: IProject;
  index: number;
  onOpen: () => void;
  isLight: boolean;
}) {
  const imageWrapRef = useReveal<HTMLDivElement>();
  const num = String(index + 1).padStart(2, '0');
  const total = String(projectData.length).padStart(2, '0');

  return (
    <article
      className="sr-entry"
      role="listitem"
      aria-label={`Proyecto ${index + 1} de ${projectData.length}: ${project.title}`}
    >
      {/* ── Oversized counter watermark ── */}
      <span className="sr-entry__counter" aria-hidden="true">{num}</span>

      {/* ── Image: clip-path curtain reveal, scale on hover ── */}
      <div ref={imageWrapRef} className="sr-image-wrap">
        <img
          src={isLight && project.imageLight ? project.imageLight : project.image}
          alt={project.alt}
          className="sr-entry__image"
          width="1600"
          height="800"
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding={index === 0 ? 'sync' : 'async'}
        />

        {/* Title overlaid on image — gradient behind for legibility */}
        <div className="sr-entry__title-area" aria-hidden="true">
          <h3 className="sr-entry__title">{project.title}</h3>
        </div>
      </div>

      {/* ── Footer: meta + actions ── */}
      <footer className="sr-entry__footer">
        <div className="sr-entry__meta">
          <time className="sr-entry__year" dateTime={project.year}>
            {project.year}
          </time>
          <span className="sr-entry__sep" aria-hidden="true">·</span>
          <span className="sr-entry__count" aria-label={`Proyecto ${index + 1} de ${projectData.length}`}>
            {num}<span aria-hidden="true"> / {total}</span>
          </span>
        </div>

        {/* Screen-reader title (complements aria-hidden title over image) */}
        <h3 className="sr-only">{project.title}</h3>

        <div className="sr-entry__actions">
          {project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="sr-entry__ext-link"
              aria-label={`Abrir ${project.title} en nueva pestaña`}
            >
              Ver proyecto <span aria-hidden="true">↗</span>
            </a>
          )}
          <button
            className="sr-entry__case-btn"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-label={`Ver case study de ${project.title}`}
          >
            Case Study
            <span className="sr-entry__case-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </footer>
    </article>
  );
}


// ─── Case study overlay panel ─────────────────────────────────────────────────
function CaseStudyPanel({
  project,
  onClose,
  isLight,
}: {
  project: IProject;
  onClose: () => void;
  isLight?: boolean;
}) {
  // Accept optional isLight prop in later patch (kept backward compatible)
  const panelRef  = useRef<HTMLDivElement>(null);
  const closeRef  = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  // Animate in after mount (rAF to allow CSS pick up the initial state)
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Animate out then call onClose
  const handleClose = useCallback(() => {
    setVisible(false);
    const timeout = setTimeout(onClose, 420);
    return () => clearTimeout(timeout);
  }, [onClose]);

  // ESC closes the panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [handleClose]);

  // Focus close button on open
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Lock body scroll while panel is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Basic focus trap: keep focus inside panel
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div
        className={`sr-backdrop${visible ? ' sr-backdrop--visible' : ''}`}
        aria-hidden="true"
        onClick={handleClose}
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Case study: ${project.title}`}
        className={`sr-panel${visible ? ' sr-panel--visible' : ''}`}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <header className="sr-panel__header">
          <span className="sr-panel__eyebrow" aria-hidden="true">Case Study</span>
          <button
            ref={closeRef}
            className="sr-panel__close"
            onClick={handleClose}
            aria-label="Cerrar case study"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        {/* Body */}
        <div className="sr-panel__body">
          {/* Project image — small thumbnail in panel */}
          <div className="sr-panel__thumb">
            <img
              src={isLight && project.imageLight ? project.imageLight : project.image}
              alt=""
              aria-hidden="true"
              width="800"
              height="400"
              loading="lazy"
              decoding="async"
            />
          </div>

          <h2 className="sr-panel__title">{project.title}</h2>
          <p className="sr-panel__desc">{project.description}</p>

          {project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="sr-panel__live-link"
            >
              Ver en vivo <span aria-hidden="true">↗</span>
            </a>
          )}

          {/* Tech stack */}
          <section
            className="sr-panel__block"
            aria-labelledby={`tech-heading-${project.id}`}
          >
            <h3
              id={`tech-heading-${project.id}`}
              className="sr-panel__block-title"
            >
              Stack técnico
            </h3>
            <ul
              className="sr-panel__tech-list"
              aria-label={`Tecnologías usadas en ${project.title}`}
            >
              {project.tech.map((t) => (
                <li key={t} className="sr-panel__tech-item">{t}</li>
              ))}
            </ul>
          </section>

          {/* Key decisions */}
          <section
            className="sr-panel__block"
            aria-labelledby={`dec-heading-${project.id}`}
          >
            <h3
              id={`dec-heading-${project.id}`}
              className="sr-panel__block-title"
            >
              Decisiones clave
            </h3>
            <ol
              className="sr-panel__decisions"
              aria-label={`Decisiones técnicas de ${project.title}`}
            >
              {project.decisions.map((d) => (
                <li key={d} className="sr-panel__decision">{d}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}


// ─── Section ──────────────────────────────────────────────────────────────────
const Project = () => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    try {
      return !!document.querySelector('.main-container')?.classList.contains('light-mode');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.querySelector('.main-container');
    if (!root) return;
    const mo = new MutationObserver(() => setIsLight(root.classList.contains('light-mode')));
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeProject = projectData.find(p => p.id === activeId) ?? null;

  return (
    <section
      id="projects"
      className="sr-section"
      aria-label="Proyectos Personales"
    >
      {/* Section header */}
      <header className="sr-section__header">
        <h2 className="sr-section__title">Proyectos Personales</h2>
        <p className="sr-section__sub" aria-hidden="true">
          Trabajos seleccionados — {String(projectData.length).padStart(2, '0')}
        </p>
      </header>

      {/* Showreel list */}
      <div className="sr-list" role="list">
        {projectData.map((project, i) => (
          <ShowreelEntry
            key={project.id}
            project={project}
            index={i}
            isLight={isLight}
            onOpen={() => setActiveId(project.id)}
          />
        ))}
      </div>

      {/* Case study overlay */}
      {activeProject && (
        <CaseStudyPanel
          project={activeProject}
          onClose={() => setActiveId(null)}
          isLight={isLight}
        />
      )}
    </section>
  );
};

export default Project;

