import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../assets/styles/Timeline.scss';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 'zeetrex',
    company: 'Zeetrex',
    location: 'Argentina · Híbrido',
    role: 'Senior Frontend Developer',
    period: 'Ago 2025 – Presente',
    year: '2025',
    type: 'Full-time',
    achievements: [
      'Desarrollo y ownership de módulos React 18 desacoplados con Webpack Module Federation, mejorando la modularidad del sistema en un 45 %.',
      'Arquitectura de estado global con Zustand y Context API en Connexa, plataforma enterprise de retail para clientes como Diarco y GDN.',
      'Ownership sobre flujos críticos de autenticación, autorización y ruteo protegido en un entorno de Micro Frontends.',
      'Reducción del 30 % de deuda técnica mediante refactorización continua y definición de patrones reutilizables con Mantine UI.',
    ],
  },
  {
    id: 'avature',
    company: 'Avature',
    location: 'Argentina · Remoto',
    role: 'Senior Frontend Developer',
    period: 'Jun 2021 – Abr 2025',
    year: '2021',
    type: 'Full-time',
    achievements: [
      'Desarrollo de portales corporativos accesibles con React, TypeScript y Twig, cumpliendo estándares WCAG 2.1 / 2.2 validados con WAVE, NVDA y JAWS.',
      'Refactorización de componentes críticos con mejoras del 30 % en tiempos de carga y optimización de Core Web Vitals.',
      'Ownership de estándares de accesibilidad (A11y) transversales a múltiples proyectos enterprise simultáneos.',
      'Mentoreo de desarrolladores junior y colaboración con equipos de UX, QA y backend distribuidos globalmente.',
    ],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    location: 'Argentina · Remoto',
    role: 'Frontend Developer',
    period: 'Mar 2020 – Jun 2021',
    year: '2020',
    type: 'Independiente',
    achievements: [
      'Diseño y desarrollo de portales web responsive end-to-end, desde la UI hasta la integración con APIs REST.',
      'Reducción del 40 % en tiempos de integración de APIs mediante uso eficiente de Fetch, Axios y estrategias de caching.',
      'Construcción de lógica de negocio con Hooks personalizados y Context API, reduciendo un 25 % el tiempo de desarrollo.',
      'Gestión completa de proyectos: definición técnica, iteración con cliente y despliegue final.',
    ],
  },
] as const;

type Job = typeof JOBS[number];

// ─── Single panel ──────────────────────────────────────────────────────────
function JobPanel({
  job,
  index,
  total,
}: {
  job: Job;
  index: number;
  total: number;
}) {
  return (
    <article
      className="tl-panel"
      tabIndex={0}
      aria-label={`Puesto ${index + 1} de ${total}: ${job.role} en ${job.company}, ${job.period}`}
    >
      {/* ── Watermark year — decorative, aria-hidden ── */}
      <span className="tl-panel__year-bg" aria-hidden="true">
        {job.year}
      </span>

      {/* ── Counter top-right ── */}
      <span className="tl-panel__count" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
        <span className="tl-panel__count-sep">/</span>
        {String(total).padStart(2, '0')}
      </span>

      {/* ── Main editorial content ── */}
      <div className="tl-panel__body">
        <div className="tl-panel__meta">
          <time className="tl-panel__period" dateTime={job.period}>
            {job.period}
          </time>
          <span className="tl-panel__type">{job.type}</span>
        </div>

        <h3 className="tl-panel__role">{job.role}</h3>

        <p className="tl-panel__company">
          <strong>{job.company}</strong>
          <span className="tl-panel__sep" aria-hidden="true"> · </span>
          <span className="tl-panel__location">{job.location}</span>
        </p>

        {/* Achievements — always in DOM for screen-readers, visually toggled */}
        <ul
          className="tl-panel__achievements"
          aria-label={`Logros en ${job.company}`}
        >
          {job.achievements.map((a, ai) => (
            <li key={ai} className="tl-panel__achievement">
              {a}
            </li>
          ))}
        </ul>

        <div className="tl-panel__reveal-hint" aria-hidden="true">
          hover · focus
        </div>
      </div>

      {/* ── Decorative bottom progress line ── */}
      <div className="tl-panel__line" aria-hidden="true" />
    </article>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    // — gsap.matchMedia handles both breakpoint AND reduced-motion —
    const mm = gsap.matchMedia();

    mm.add(
      // Only activate on desktop AND when motion is allowed
      '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
      (context) => {
        const totalScroll = () => track.scrollWidth - section.offsetWidth;

        // ─ Main horizontal pin + scrub ───────────────────
        const mainTween = gsap.to(track, {
          x: () => -totalScroll(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.4,          // spring-like follow = “page turning” feel
            end: () => `+=${totalScroll()}`,
            invalidateOnRefresh: true,
          },
        });

        // ─ Watermark year: subtle parallax per panel ───────
        const yearEls = track.querySelectorAll<HTMLElement>('.tl-panel__year-bg');
        // Keep references to tweens so we can kill them explicitly on cleanup
        const createdTweens: gsap.core.Tween[] = [mainTween];

        yearEls.forEach((el) => {
          const t = gsap.fromTo(
            el,
            { x: -50 },
            {
              x: 50,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('.tl-panel') as Element,
                containerAnimation: mainTween,
                start: 'left right',
                end:   'right left',
                scrub: true,
              },
            }
          );
          createdTweens.push(t);
        });

        // ─ Panel entrance: scale 0.95→1 + fade 0.4→1 ─────
        // Creates the “page being turned into view” feeling
        const panels = track.querySelectorAll<HTMLElement>('.tl-panel');
        panels.forEach((panel) => {
          const t = gsap.fromTo(
            panel,
            { opacity: 0.25, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: mainTween,
                start: 'left 85%',
                end:   'left 30%',
                scrub: true,
              },
            }
          );
          createdTweens.push(t);
        });

        // Helper wrapper used above: push any additional tweens to createdTweens
        // (we pushed year/panel tweens above when creating them)

        // Instead of returning context.revert() (which would cause recursive
        // revert/kill calls), return an explicit cleanup that kills the
        // created tweens and their ScrollTriggers.
        return () => {
          createdTweens.forEach((t) => {
            try {
              if (t.scrollTrigger) t.scrollTrigger.kill();
            } catch (e) {
              /* ignore */
            }
            try { t.kill(); } catch (e) { /* ignore */ }
          });
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="history"
      className="tl-section"
      aria-label="Experiencia Laboral"
      aria-roledescription="carrusel de experiencia"
    >
      {/* Screen-reader heading — visible on mobile, sr-only on desktop */}
      <h2 className="tl-heading">Experiencia Laboral</h2>

      <div
        ref={trackRef}
        className="tl-track"
        role="list"
        aria-label="Puestos de trabajo"
      >
        {JOBS.map((job, i) => (
          <JobPanel
            key={job.id}
            job={job}
            index={i}
            total={JOBS.length}
          />
        ))}
      </div>
    </section>
  );
}

export default Timeline;
