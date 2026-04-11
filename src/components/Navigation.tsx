import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import type Lenis from 'lenis';
import '../assets/styles/Navigation.scss';

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Expertise',    id: 'expertise' },
  { label: 'Experiencia',  id: 'history'   },
  { label: 'Proyectos',    id: 'projects'  },
  { label: 'Contacto',     id: 'contact'   },
] as const;

// ─── Props ────────────────────────────────────────────────────────────────────
interface NavigationProps {
  parentToChild: { mode: string };
  modeChange:    () => void;
  lenisRef?:     MutableRefObject<Lenis | null>;
}

// ─── Inline SVG icons — no MUI dependency ─────────────────────────────────────
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"     x2="12" y2="3"/>
      <line x1="12" y1="21"    x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12"    x2="3"  y2="12"/>
      <line x1="21" y1="12"    x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
function Navigation({ parentToChild, modeChange, lenisRef }: NavigationProps) {
  const { mode } = parentToChild;
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('');
  const headerRef = useRef<HTMLElement>(null);

  // ── Glass effect on scroll ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver ─────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // ── Lock body scroll while mobile menu is open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Smooth scroll via Lenis (fallback to native) ────────────────────────────
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(`#${id}`, { offset: -80 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setMenuOpen(false);
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Fixed header bar ── */}
      <header
        ref={headerRef}
        id="navigation"
        className={[
          'nav',
          scrolled   ? 'nav--scrolled' : '',
          menuOpen   ? 'nav--open'     : '',
        ].filter(Boolean).join(' ')}
        role="banner"
      >
        <div className="nav__inner">

          {/* Logo */}
          <button className="nav__logo" onClick={scrollToTop} aria-label="Ir al inicio">
            <span className="nav__logo-text">
              PM<span className="nav__logo-dot">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="nav__links" aria-label="Navegación principal">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                className={`nav__link${active === id ? ' nav__link--active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Controls: theme + burger */}
          <div className="nav__controls">
            <button
              className="nav__icon-btn"
              onClick={modeChange}
              aria-label={mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              className="nav__burger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span className="nav__burger-bar" />
              <span className="nav__burger-bar" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile overlay ── */}
      <div
        className={`nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Menú de navegación"
      >
        <nav aria-label="Menú móvil">
          {NAV_LINKS.map(({ label, id }, i) => (
            <button
              key={id}
              className="nav__overlay-link"
              onClick={() => scrollTo(id)}
              style={{ '--i': i } as React.CSSProperties}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="nav__overlay-num">0{i + 1}</span>
              <span className="nav__overlay-label">{label}</span>
            </button>
          ))}
        </nav>

        <footer className="nav__overlay-footer">
          <span>© {new Date().getFullYear()} Patricio García</span>
        </footer>
      </div>
    </>
  );
}

export default Navigation;