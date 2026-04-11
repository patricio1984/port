/**
 * Custom cursor system
 * ─ Dot  : 6 px, zero-lag — updated directly on mousemove
 * ─ Ring : 40 px, lerp factor 0.12 — smoothed via rAF loop
 *
 * Cursor states (detected by event delegation, no component changes needed):
 *   default → normal browsing
 *   view    → <a>, <button> (ring expands + "VIEW" label)
 *   drag    → project images / sr-image-wrap  ("DRAG" label)
 *   write   → input / textarea ("WRITE" label)
 *
 * Mix-blend-mode: difference on the dot → auto inverts on any bg.
 * Ring switches border-color via CSS dark/light classes.
 *
 * Disabled automatically when:
 *   • pointer is coarse (touch device)
 *   • prefers-reduced-motion is set
 *   • JS matchMedia says fine pointer isn't available
 */

import { useEffect, useRef, useState } from 'react';
import './Cursor.scss';

// ─── Types ────────────────────────────────────────────────────────────────────
type CursorState = 'default' | 'view' | 'drag' | 'write';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Detect whether the environment should show a custom cursor at all. */
function shouldEnable(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(pointer: coarse)').matches)          return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

/** Walk up the DOM from an element to detect which cursor state to use. */
function detectState(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return 'default';

  // Write: form field
  if (target.closest('input, textarea, [contenteditable="true"]')) return 'write';
  // Drag: project image / image wrap
  if (target.closest('.sr-image-wrap, .sr-entry__image, .tl-panel__thumb')) return 'drag';
  // View: any interactive element
  if (target.closest('a, button, [role="button"], [tabindex]')) return 'view';

  return 'default';
}

// ─── Cursor component ─────────────────────────────────────────────────────────
export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // rafRef keeps the animation-frame ID for cleanup
  const rafRef  = useRef<number>(0);

  // Live mouse & ring positions — refs so the rAF closure reads fresh values
  // without triggering re-renders at 60fps
  const mouse = useRef({ x: -100, y: -100 });
  const ring  = useRef({ x: -100, y: -100 });

  const [state,    setState]    = useState<CursorState>('default');
  const [clicking, setClicking] = useState(false);
  const [onLight,  setOnLight]  = useState(false);
  const [enabled,  setEnabled]  = useState(false);

  useEffect(() => {
    if (!shouldEnable()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot  = dotRef.current;
    const rl   = ringRef.current;
    if (!dot || !rl) return;

    // ── rAF loop: lerp ring toward mouse ──────────────────────────────────
    let alive = true;

    function tick() {
      if (!alive || !dot || !rl) return;
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      // Individual CSS `translate` property — doesn't conflict with CSS `scale`
      // that the state classes apply (unlike the shorthand `transform`).
      rl.style.setProperty('--tx', `${ring.current.x - 20}px`);
      rl.style.setProperty('--ty', `${ring.current.y - 20}px`);
      dot.style.setProperty('--dx', `${mouse.current.x - 3}px`);
      dot.style.setProperty('--dy', `${mouse.current.y - 3}px`);

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    // ── Mouse move: update dot instantly ─────────────────────────────────
    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Detect light/dark section under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isLight = !!el?.closest('.light-mode');
      setOnLight(isLight);
    }

    // ── Pointer over/out: detect cursor state ─────────────────────────────
    function onOver(e: MouseEvent)  { setState(detectState(e.target)); }
    function onOut()                { setState('default'); }

    // ── Click spring: scale down briefly ─────────────────────────────────
    function onDown() { setClicking(true); }
    function onUp()   { setClicking(false); }

    document.addEventListener('mousemove',   onMove,  { passive: true });
    document.addEventListener('mouseover',   onOver,  { passive: true });
    document.addEventListener('mouseout',    onOut,   { passive: true });
    document.addEventListener('mousedown',   onDown,  { passive: true });
    document.addEventListener('mouseup',     onUp,    { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const LABELS: Record<CursorState, string> = {
    default: '',
    view:    'VIEW',
    drag:    'DRAG',
    write:   'WRITE',
  };

  const rootClass = [
    'cursor',
    `cursor--${state}`,
    clicking  ? 'cursor--clicking'  : '',
    onLight   ? 'cursor--on-light'  : 'cursor--on-dark',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClass} aria-hidden="true">
      {/* Dot — zero lag, mix-blend-mode: difference */}
      <div ref={dotRef} className="cursor__dot" />

      {/* Ring — lerp follower */}
      <div ref={ringRef} className="cursor__ring">
        {state !== 'default' && (
          <span className="cursor__label">{LABELS[state]}</span>
        )}
      </div>
    </div>
  );
}
