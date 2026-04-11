/**
 * useLenis — initializes Lenis smooth scroll and wires it into GSAP ScrollTrigger.
 *
 * Returns a stable ref to the Lenis instance so callers can do:
 *   lenisRef.current?.scrollTo(0, { duration: 1.2 })
 *
 * Disabled automatically when prefers-reduced-motion: reduce is set.
 */
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Bail out on reduced-motion — native scroll handles everything
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp:        0.1,      // smoothing factor (0 = instant, 1 = never arrives)
      smoothWheel: true,
      syncTouch:   false,    // keep native momentum on touch devices
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll position
    lenis.on('scroll', () => ScrollTrigger.update());

    // Drive Lenis via GSAP's ticker so everything runs on the same rAF budget
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0); // prevent timer jumps from causing scroll jumps

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
