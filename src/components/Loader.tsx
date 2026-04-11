/**
 * Loader — page-load intro sequence
 *
 * Phase 1 (0 – 800 ms)  : count animate with number 00 → 100
 * Phase 2 (800 – 1 100 ms): overlay wipes up (translateY -100 %)
 * Total   : ≤ 1.1 s
 *
 * Notifies parent via onDone() once the overlay is gone so the main
 * content can start its entrance animations.
 *
 * Fully disabled (renders null immediately) when prefers-reduced-motion.
 */
import { useEffect, useRef, useState } from 'react';
import './Loader.scss';

interface LoaderProps {
  onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const [count,   setCount]   = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone,    setGone]    = useState(false);

  // Respect reduced-motion — skip immediately
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    // Count 0 → 100 over ~800 ms using rAF + easing
    const DURATION = 800; // ms
    const start    = performance.now();

    let raf: number;

    const tick = (now: number) => {
      const t    = Math.min((now - start) / DURATION, 1);
      // Ease-out expo
      const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(Math.round(ease * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Phase 2: slide overlay up
        setLeaving(true);
        const afterLeave = setTimeout(() => {
          setGone(true);
          onDone();
        }, 350); // matches CSS transition duration
        return () => clearTimeout(afterLeave);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduced || gone) return null;

  return (
    <div
      className={`loader${leaving ? ' loader--leaving' : ''}`}
      aria-hidden="true"      // purely decorative — content is not ready yet
      role="presentation"
    >
      {/* Minimal logo mark */}
      <div className="loader__mark">
        <span className="loader__slash" aria-hidden="true">/</span>
        <span className="loader__slash" aria-hidden="true">/</span>
      </div>

      {/* Counting number */}
      <span className="loader__count">
        {String(count).padStart(2, '0')}
      </span>
    </div>
  );
}
