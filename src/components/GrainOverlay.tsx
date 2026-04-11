/**
 * GrainOverlay — film grain texture at 3–5 % opacity
 *
 * Technique:
 *  1. Generate a 200×200 random-noise canvas ONCE on mount (useMemo via ref).
 *  2. Export as PNG base64 data URL.
 *  3. Set as repeating background-image on a fixed div.
 *  4. CSS animation shifts background-position in ~8 steps/sec to simulate
 *     the temporal noise of analog film grain.
 *
 * Disabled when prefers-reduced-motion is set (returns null).
 * z-index 997 — below cursor (9998) and loader (9999).
 */
import { useEffect, useRef, useState } from 'react';
import './GrainOverlay.scss';

function buildGrainDataUrl(size = 200): string {
  const canvas = document.createElement('canvas');
  canvas.width  = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const img = ctx.createImageData(size, size);
  const d   = img.data;

  // Luminance-only noise (R=G=B) so grain is neutral, not coloured
  for (let i = 0; i < d.length; i += 4) {
    const v = Math.floor(Math.random() * 256);
    d[i]     = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}

export default function GrainOverlay() {
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const dataUrlRef = useRef<string>('');
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (reduced) return;
    if (!dataUrlRef.current) {
      dataUrlRef.current = buildGrainDataUrl(200);
    }
    setUrl(dataUrlRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduced || !url) return null;

  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}
