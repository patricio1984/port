import { useEffect, useRef, useState } from 'react';
import '../assets/styles/Expertise.scss';

// ─── Types ─────────────────────────────────────────────────────────────────────
type ViewMode = 'editorial' | 'constellation' | 'marquee';

// ─── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'frontend',
    years: '5+',
    label: 'Front End',
    philosophy: 'UI escalable y duradera — accesible, modular y rápida por defecto.',
    stack: ['React 18', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Mantine UI', 'Bootstrap', 'Twig'],
  },
  {
    id: 'fullstack',
    years: '3+',
    label: 'Full Stack',
    philosophy: 'Ownership end-to-end: desde el esquema de API hasta el deploy, solo o en equipo.',
    stack: ['Node.js', 'MongoDB', 'GraphQL', 'REST APIs', 'Zustand', 'axios', 'Context API', 'JWT'],
  },
  {
    id: 'tools',
    years: '5+',
    label: 'Tools & Craft',
    philosophy: 'Micro Frontends, Module Federation y arquitectura limpia por encima de la complejidad.',
    stack: ['Git', 'GitHub', 'Webpack', 'Module Federation', 'Vite', 'npm', 'WCAG 2.2', 'SEO', 'ESLint', 'Prettier'],
  },
] as const;

const VIEW_OPTIONS: { id: ViewMode; label: string; available: boolean }[] = [
  { id: 'editorial',     label: 'Editorial',      available: true },
  { id: 'constellation', label: 'Constelación',    available: true },
  { id: 'marquee',       label: 'Marquesina',      available: true },
];

// ─── Stagger-reveal via IntersectionObserver ───────────────────────────────────
function useStaggerReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal]')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          targets.forEach((el, i) => {
            // CSS handles the timing via --stagger-i, but we also add an explicit
            // JS delay so items already in view on first load get a staggered entry
            setTimeout(() => el.classList.add('reveal--visible'), i * 130);
          });
          observer.disconnect();
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Option C: Editorial view ──────────────────────────────────────────────────
function EditorialView() {
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <div className="exp-editorial" ref={gridRef}>
      {CATEGORIES.map((cat, i) => (
        <article
          key={cat.id}
          className="exp-card"
          data-reveal
          style={{ '--stagger-i': i } as React.CSSProperties}
        >
          {/* Head: big year + category label */}
          <header className="exp-card__head">
            <span className="exp-card__years" aria-label={`${cat.years} años`}>
              {cat.years}
            </span>
            <span className="exp-card__label">{cat.label}</span>
          </header>

          <div className="exp-card__rule" role="separator" />

          {/* One-sentence editorial philosophy */}
          <p className="exp-card__philosophy">{cat.philosophy}</p>

          <div className="exp-card__rule exp-card__rule--faint" role="separator" />

          {/* Minimal horizontal tech list — no pills, no icons */}
          <p
            className="exp-card__stack"
            aria-label={`Stack: ${cat.stack.join(', ')}`}
          >
            {cat.stack.map((tech, ti) => (
              <span key={tech}>
                <span className="exp-card__tech">{tech}</span>
                {ti < cat.stack.length - 1 && (
                  <span className="exp-card__dot" aria-hidden="true">{' · '}</span>
                )}
              </span>
            ))}
          </p>
        </article>
      ))}
    </div>
  );
}

// ─── Constellation — physics canvas ────────────────────────────────────────────────────
function ConstellationView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Re-assign to explicitly-typed consts so TypeScript keeps non-null narrowing
    // inside async closures (rAF / ResizeObserver).
    const cv: HTMLCanvasElement         = canvas;
    const c:  CanvasRenderingContext2D  = ctx;

    // Hex values from design-tokens.css — CSS vars not available in canvas 2D
    const NODE_COLORS = ['#a78bfa', '#8b5cf6', '#c4b5fd'] as const;
    const LINE_COLORS = [
      'rgba(167,139,250,0.18)',
      'rgba(139, 92,246,0.18)',
      'rgba(196,181,253,0.18)',
    ] as const;

    const allNodes = CATEGORIES.flatMap((cat, ci) =>
      cat.stack.map((tech) => ({ tech, ci }))
    );

    type Node = { x: number; y: number; vx: number; vy: number; tech: string; ci: number };
    let nodes: Node[] = [];
    let raf = 0;

    function init(W: number, H: number) {
      nodes = allNodes.map(({ tech, ci }) => ({
        x:  W * 0.1 + Math.random() * W * 0.8,
        y:  H * 0.1 + Math.random() * H * 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        tech,
        ci,
      }));
    }

    function setSize() {
      const rect = cv.getBoundingClientRect();
      const W    = Math.round(rect.width);
      const H    = Math.round(rect.height);
      if (!W || !H) return;
      const dpr   = window.devicePixelRatio ?? 1;
      cv.width  = W * dpr;
      cv.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!nodes.length) init(W, H);
    }

    function tick() {
      const W = cv.width  / (window.devicePixelRatio ?? 1);
      const H = cv.height / (window.devicePixelRatio ?? 1);
      if (!W || !H) { raf = requestAnimationFrame(tick); return; }

      c.clearRect(0, 0, W, H);

      // ─ edges between same-category nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].ci !== nodes[j].ci) continue;
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d  = Math.hypot(dx, dy);
          if (d > 170) continue;
          c.save();
          c.globalAlpha = (1 - d / 170) * 0.9;
          c.strokeStyle = LINE_COLORS[nodes[i].ci];
          c.lineWidth   = 0.8;
          c.beginPath();
          c.moveTo(nodes[i].x, nodes[i].y);
          c.lineTo(nodes[j].x, nodes[j].y);
          c.stroke();
          c.restore();
        }
      }

      // ─ nodes + labels
      c.font = '10px "Fira Code", "Fira Mono", monospace';
      nodes.forEach((n) => {
        c.beginPath();
        c.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        c.fillStyle = NODE_COLORS[n.ci];
        c.fill();

        c.globalAlpha = 0.72;
        c.fillStyle   = NODE_COLORS[n.ci];
        c.fillText(n.tech, n.x + 7, n.y + 3.5);
        c.globalAlpha = 1;
      });

      // ─ physics
      const { x: mx, y: my } = mouseRef.current;
      nodes.forEach((n) => {
        const dx = n.x - mx;
        const dy = n.y - my;
        const d  = Math.hypot(dx, dy);
        if (d < 90 && d > 0) {
          const f = ((90 - d) / 90) * 1.4;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        n.vx += (W / 2 - n.x) * 0.00007;
        n.vy += (H / 2 - n.y) * 0.00007;
        n.vx += (Math.random() - 0.5) * 0.06;
        n.vy += (Math.random() - 0.5) * 0.06;
        n.vx *= 0.95;
        n.vy *= 0.95;
        n.x  += n.vx;
        n.y  += n.vy;
        if (n.x < 20)     { n.x = 20;     n.vx =  Math.abs(n.vx); }
        if (n.x > W - 20) { n.x = W - 20; n.vx = -Math.abs(n.vx); }
        if (n.y < 16)     { n.y = 16;     n.vy =  Math.abs(n.vy); }
        if (n.y > H - 16) { n.y = H - 16; n.vy = -Math.abs(n.vy); }
      });

      raf = requestAnimationFrame(tick);
    }

    setSize();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(setSize);
    ro.observe(cv);

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    cv.addEventListener('mousemove', onMove);
    cv.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener('mousemove', onMove);
      cv.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="exp-constellation">
      <canvas
        ref={canvasRef}
        className="exp-constellation__canvas"
        aria-label="Visualización de constelación de habilidades"
        role="img"
      />
      <div className="exp-constellation__legend" aria-hidden="true">
        {CATEGORIES.map((cat, i) => (
          <span key={cat.id} className={`exp-constellation__chip exp-constellation__chip--${i}`}>
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Marquee — infinite CSS scroll ──────────────────────────────────────────────────
function MarqueeView() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="exp-marquee" aria-label="Habilidades en modo ticker">
      {CATEGORIES.map((cat, i) => {
        // Alternate direction per row for visual rhythm
        const reverse = i % 2 !== 0;
        // Triplicate for seamless loop even on very wide screens
        const belt = [...cat.stack, ...cat.stack, ...cat.stack];
        return (
          <div key={cat.id} className="exp-marquee__row">
            {/* Sticky label — left side */}
            <span className="exp-marquee__cat">{cat.label}</span>

            {/* Scrolling belt */}
            <div
              className="exp-marquee__track"
              aria-hidden="true"
              style={{
                '--mqspeed': `${38 + i * 9}s`,
              } as React.CSSProperties}
            >
              <div
                className={[
                  'exp-marquee__belt',
                  reverse  ? 'exp-marquee__belt--reverse' : '',
                  reduced  ? 'exp-marquee__belt--paused'  : '',
                ].filter(Boolean).join(' ')}
              >
                {belt.map((tech, ti) => (
                  <span key={ti} className="exp-marquee__item">
                    <span className="exp-marquee__tech">{tech}</span>
                    <span className="exp-marquee__sep" aria-hidden="true">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Default export ────────────────────────────────────────────────────────────
function Expertise() {
  const [view, setView] = useState<ViewMode>('editorial');
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Reveal section title on scroll-in
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container" id="expertise">
      <section className="exp-section">
        {/* Section header + view toggle */}
        <header
          className="exp-header"
        >
          <h2
            ref={titleRef}
            className="exp-title reveal-item"
            style={{ '--stagger-i': 0 } as React.CSSProperties}
          >Experiencia Técnica</h2>

          <nav className="exp-toggle" aria-label="Cambiar vista de habilidades">
            {VIEW_OPTIONS.map(({ id, label, available }) => (
              <button
                key={id}
                className={
                  `exp-toggle__btn` +
                  (view === id        ? ' exp-toggle__btn--active'   : '') +
                  (!available        ? ' exp-toggle__btn--disabled' : '')
                }
                onClick={() => available && setView(id)}
                aria-pressed={view === id}
                disabled={!available}
                title={!available ? 'Próximamente' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
        </header>

        {view === 'editorial'     && <EditorialView />}
        {view === 'constellation' && <ConstellationView />}
        {view === 'marquee'       && <MarqueeView />}
      </section>
    </div>
  );
}

export default Expertise;