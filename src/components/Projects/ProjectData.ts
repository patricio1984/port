import { IProject } from './ProjectTypes';

import project11 from '../../assets/images/9.webp';
import project11Light from '../../assets/images/9-light.webp';
import project13 from '../../assets/images/11.webp';
import project13Light from '../../assets/images/11-light.webp';
import project18 from '../../assets/images/18.webp';
import project18Light from '../../assets/images/18-light.webp';

const projectData: IProject[] = [
  {
    id: 1,
    link: 'https://issinrealtime.netlify.app/',
    image: project11,
    imageLight: project11Light,
    alt: 'Captura de pantalla de Seguimiento en tiempo real de la ISS',
    title: 'Seguimiento en tiempo real de la ISS',
    year: '2024',
    description: 'Visualización orbital en tiempo real de la Estación Espacial Internacional.',
    tech: ['React.js', 'Vite', 'Leaflet', 'react-leaflet', 'satellite.js', 'tle.js', 'Emotion CSS'],
    decisions: [
      'Elegí Leaflet sobre Google Maps para mantener el bundle ligero sin costos de API key.',
      'satellite.js + datos TLE de la NASA calculan la posición orbital en el cliente, sin backend.',
      'Los datos TLE se refrescan automáticamente cada 12 horas para mantener precisión orbital.',
    ],
  },
  {
    id: 2,
    link: 'https://pokemonapi30.netlify.app/',
    image: project18,
    imageLight: project18Light,
    alt: 'Captura de pantalla de Pokemon API',
    title: 'Pokemon API Explorer',
    year: '2026',
    description: 'Explorador de 1000+ pokémon con búsqueda instantánea, virtualización de listas y animaciones fluidas.',
    tech: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'TanStack Virtual', 'framer-motion'],
    decisions: [
      'react-virtual de TanStack virtualiza la lista completa de pokémon, manteniendo 60fps con 1000+ items.',
      'React Query gestiona cache, refetch automático y estados de carga sin estado manual.',
      'framer-motion para transiciones de entrada que no bloquean el hilo principal en listas grandes.',
    ],
  },
  {
    id: 3,
    link: 'https://analizadordeimagenes.netlify.app/',
    image: project13,
    imageLight: project13Light,
    alt: 'Captura de pantalla del Analizador de Imágenes',
    title: 'Animal Classifier — Clasificador de imágenes con IA',
    year: '2024',
    description: 'Identificación de animales en tiempo real usando visión por computadora y diseño brutalist premium.',
    tech: ['React 19 + TypeScript', 'Vite 6', 'Tailwind CSS v3', 'Framer Motion', 'Netlify Functions', 'Space Grotesk / Space Mono'],
    decisions: [
      'Usé Netlify Functions como proxy para la API de Hugging Face, manteniendo el token fuera del bundle del cliente sin necesidad de un backend propio.',
      'El modelo google/vit-base-patch16-224 corre 100% en la nube — el cliente solo envía los bytes de la imagen y recibe un ranking de clasificación con porcentaje de confianza.',
      'El sistema de diseño brutalist se construyó sobre CSS custom properties (--accent, --bg, --fg) con soporte de dark mode via clase .dark, lo que permite tematizar toda la UI desde un único punto sin duplicar utilidades de Tailwind.',
      'El cursor personalizado detecta el contexto mediante atributos data-cursor en el DOM, desacoplando la lógica del cursor de cada componente individual. Solo se monta en dispositivos con puntero real (hover: hover) para no afectar mobile.',
      'Las animaciones de entrada usan clipPath reveal en lugar de opacity/translateY tradicionales para lograr el efecto de "cortina" característico de sitios Awwwards-level.',
    ],
  },
];

export default projectData;