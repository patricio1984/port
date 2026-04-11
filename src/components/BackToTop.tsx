/**
 * BackToTop
 * ─────────
 * Fixed button that appears after the user has scrolled past 50 % of the page.
 * Uses the Lenis instance (via ref) so the scroll-to-top is also smoothed.
 * Falls back to native window.scrollTo if Lenis is unavailable.
 *
 * Accessibility:
 *  - aria-label in Spanish
 *  - aria-hidden when invisible (avoids phantom tab-stop)
 *  - keyboard-focusable via button element
 */
import { useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import './BackToTop.scss';

interface BackToTopProps {
  lenisRef: React.MutableRefObject<Lenis | null>;
}

export default function BackToTop({ lenisRef }: BackToTopProps) {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // ── Track scroll depth ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const { scrollY, document: doc } = window;
      const total = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
      setVisible(total > 0 && scrollY / total > 0.5);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Handle click ────────────────────────────────────────────────────────────
  const handleClick = () => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      ref={btnRef}
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      aria-label="Volver al inicio"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={handleClick}
    >
      {/* Chevron up */}
      <svg
        className="back-to-top__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 10.5L8 5.5L13 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="back-to-top__label">top</span>
    </button>
  );
}
