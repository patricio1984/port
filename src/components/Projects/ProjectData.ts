import { IProject } from './ProjectTypes';

import project11 from '../../assets/images/9.webp';
import project13 from '../../assets/images/11.webp';
import project18 from '../../assets/images/18.webp';

const projectData: IProject[] = [
  {
    id: 1,
    link: 'https://issinrealtime.netlify.app/',
    image: project11,
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
    link: 'https://github.com/patricio1984/analizador-de-imagenes',
    image: project13,
    alt: 'Captura de pantalla del Analizador de Imágenes',
    title: 'Analizador de Imágenes',
    year: '2024',
    description: 'Análisis de imágenes con inteligencia artificial: clasifica el contenido y enriquece los resultados con Wikipedia.',
    tech: ['React', 'TypeScript', 'Hugging Face API (ViT)', 'Netlify Functions', 'Wikipedia API'],
    decisions: [
      'Las Netlify Functions actúan como proxy seguro: el token de Hugging Face nunca llega al cliente.',
      'Elegí el modelo ViT (Vision Transformer) por su precisión superior en clasificación de imágenes.',
      'La integración con Wikipedia enriquece automáticamente los resultados con contexto enciclopédico.',
    ],
  },
];

export default projectData;