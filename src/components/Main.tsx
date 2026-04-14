import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import profileImg from '../assets/images/profile.webp';
import '../assets/styles/Main.scss';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
}

// ─── 1. Canvas noise-field particle system ────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      // Canvas 2D not supported — hide element, hero shows plain dark bg
      canvas.style.display = 'none';
      return;
    }

    let raf: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const COUNT = window.innerWidth < 768 ? 55 : 110;
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: 0, vy: 0,
      size:  Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    const tick = () => {
      time += 0.35;
      ctx.clearRect(0, 0, W(), H());

      for (const p of particles) {
        // Noise field: angle derived from 2D sine/cosine
        const angle =
          Math.sin(p.x * 0.0038 + time * 0.00042) * Math.PI * 2 +
          Math.cos(p.y * 0.0045 - time * 0.00031) * Math.PI;

        p.vx += Math.cos(angle) * 0.045;
        p.vy += Math.sin(angle) * 0.045;

        // Cursor repulsion
        const dx   = p.x - mouseRef.current.x;
        const dy   = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170 && dist > 0) {
          const force = (1 - dist / 170) * 0.55;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping & move
        p.vx *= 0.91;
        p.vy *= 0.91;
        p.x  += p.vx;
        p.y  += p.vy;

        // Wrap edges
        if (p.x < -20)      p.x = W() + 20;
        if (p.x > W() + 20) p.x = -20;
        if (p.y < -20)      p.y = H() + 20;
        if (p.y > H() + 20) p.y = -20;

        // Draw — alpha pulses gently with noise
        const a = p.alpha * (0.55 + 0.45 * Math.sin(time * 0.0018 + p.x * 0.009));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mouseleave', onLeave);

    // ── Parallax: canvas shifts at 0.3× scroll speed ─────────────────────
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let parallaxTween: gsap.core.Tween | null = null;
    if (!reduced) {
      parallaxTween = gsap.to(canvas, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: canvas.parentElement ?? canvas, // .hero-wrapper
          start:   'top top',
          end:     'bottom top',
          scrub:   true,
        },
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mouseleave', onLeave);
      parallaxTween?.scrollTrigger?.kill();
      parallaxTween?.kill();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}

// ─── 2. Scroll progress — thin right-side line ────────────────────────────────
function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct   = total > 0 ? window.scrollY / total : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={fillRef} className="scroll-progress__fill" />
    </div>
  );
}

// ─── 3a. Rotating role label — crossfade ─────────────────────────────────────
const ROLES = ['Front End Developer', 'React Engineer', 'UI Craftsman'] as const;

function RotatingRole() {
  const [index, setIndex]     = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      // Phase 1: fade out
      setExiting(true);
      // Phase 2: swap text + fade in
      setTimeout(() => {
        setIndex(i => (i + 1) % ROLES.length);
        setExiting(false);
      }, 380); // matches CSS transition duration
    }, 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="hero__eyebrow" aria-live="polite" aria-atomic="true">
      <span className={`hero__role${exiting ? ' hero__role--exit' : ''}`}>
        {ROLES[index]}
      </span>
    </p>
  );
}

// ─── 3b. Animated name — GSAP clip/mask stagger + variable font scroll ────────
type CharGroup = { type: 'word'; chars: string[] } | { type: 'space' };

function AnimatedName({ text }: { text: string }) {
  const wrapperRef = useRef<HTMLHeadingElement>(null);

  const groups: CharGroup[] = text.split(' ').flatMap((word, wi, arr) => {
    const g: CharGroup[] = [{ type: 'word', chars: word.split('') }];
    if (wi < arr.length - 1) g.push({ type: 'space' });
    return g;
  });

  // GSAP clip-reveal entrance
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>('.char__inner');
    gsap.set(chars, { yPercent: 115 });
    const tween = gsap.to(chars, {
      yPercent: 0,
      duration: 1.25,
      ease: 'power4.out',
      stagger: 0.042,
      delay: 0.2,
    });
    // Kill tween on unmount to prevent memory leak
    return () => { tween.kill(); };
  }, []);

  // Variable font weight: decompress on scroll (900 → 280 over 320px)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty('--name-wght', '800');

    const onScroll = () => {
      const progress = Math.min(1, window.scrollY / 320);
      const wght = Math.round(800 - progress * 520); // 800 → 280
      el.style.setProperty('--name-wght', String(wght));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <h1 ref={wrapperRef} className="hero__name" aria-label={text}>
      {groups.map((g, gi) =>
        g.type === 'space'
          ? <span key={`sp-${gi}`} className="char__space" aria-hidden="true" />
          : (
            <span key={`w-${gi}`} className="char__word">
              {g.chars.map((ch, ci) => (
                <span key={ci} className="char__clip">
                  <span className="char__inner">{ch}</span>
                </span>
              ))}
            </span>
          )
      )}
    </h1>
  );
}

// ─── 4. Magnetic hook ─────────────────────────────────────────────────────────
function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 32) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r  = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      gsap.to(el, {
        x: dx / strength, y: dy / strength, scale: 1.06,
        duration: 0.5, ease: 'power3.out', overwrite: true,
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        x: 0, y: 0, scale: 1,
        duration: 0.9, ease: 'elastic.out(1,0.4)', overwrite: true,
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      // Kill any in-flight GSAP tweens before the component unmounts
      gsap.killTweensOf(el);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength]);
}

// ─── 5. Main Hero ─────────────────────────────────────────────────────────────
export default function Main() {
  const photoRef = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLAnchorElement>(null);

  useMagnetic(photoRef as React.RefObject<HTMLElement>, 28);
  useMagnetic(ctaRef   as React.RefObject<HTMLElement>, 16);

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
    const mo = new MutationObserver(() => {
      setIsLight(root.classList.contains('light-mode'));
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className="hero-wrapper">
      <HeroCanvas />
      <ScrollProgress />

      <section className="hero">

        {/* Social — top left */}
        <nav className="hero__social" aria-label="Redes sociales">
          <a href="https://github.com/patricio1984" target="_blank" rel="noreferrer"
             aria-label="GitHub de Patricio" className="hero__social-link">
            <GitHubIcon />
          </a>
          <a href="https://www.linkedin.com/in/patriciomainero/" target="_blank" rel="noreferrer"
             aria-label="LinkedIn de Patricio" className="hero__social-link">
            <LinkedInIcon />
          </a>
        </nav>

        {/* Photo — top right, magnetic */}
        <div ref={photoRef} className="hero__photo">
            <img
              src={profileImg}
              alt="Patricio Mainero, Front End Developer"
              width="190"
              height="190"
              loading="eager"
            />
          <div className="hero__photo-ring" aria-hidden="true" />
        </div>

        {/* Text — bottom left */}
        <div className="hero__text">
          <RotatingRole />
          <AnimatedName text="Patricio D Mainero" />
          <div className="hero__meta">
            <span className="hero__location">Buenos Aires &mdash; Remoto</span>
            <a
              ref={ctaRef}
              href="#expertise"
              className="hero__cta"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver trabajo
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}