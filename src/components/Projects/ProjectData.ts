import { IProject } from './ProjectTypes';

import project01 from '../../assets/images/17.webp';
import project02 from '../../assets/images/16.webp';
import project04 from '../../assets/images/2.webp';
import project05 from '../../assets/images/3.webp';
import project06 from '../../assets/images/4.webp';
import project08 from '../../assets/images/6.webp';
import project09 from '../../assets/images/7.webp';
import project11 from '../../assets/images/9.webp';
import project13 from '../../assets/images/11.webp';
import project14 from '../../assets/images/12.webp';

const projectData: IProject[] = [
  {
    id: 1,
    link: 'https://issinrealtime.netlify.app/',
    image: project11,
    alt: 'Captura de pantalla de Seguimiento en tiempo real de la ISS',
    title: 'Seguimiento en tiempo real de la ISS',
    description: 'Tecnologías utilizadas: React.js, Vite, Leaflet, react-leaflet, satellite.js, tle.js, Emotion, modo oscuro y menú hamburguesa.',
  },
  {
    id: 2,
    link: 'https://github.com/patricio1984/analizador-de-imagenes',
    image: project13,
    alt: 'Captura de pantalla del Analizador de Imágenes',
    title: 'Analizador de Imágenes',
    description: 'App en React + TypeScript con análisis de imágenes vía Hugging Face Inference API (ViT). Usa funciones de Netlify como backend para ocultar el token y consulta Wikipedia para descripciones detalladas.',
  },
  {
    id: 3,
    link: 'https://inspiring-ardinghelli-b82a39.netlify.app/',
    image: project01,
    alt: 'Captura de pantalla de Bienes raíces Gatsby',
    title: 'Sitio de Bienes Raíces',
    description: 'Tecnologías utilizadas: Gatsby.js, Strapi, Emotion (styled components)',
  },
  {
    id: 4,
    link: 'https://trusting-brahmagupta-cb59ed.netlify.app/',
    image: project02,
    alt: 'Captura de pantalla de Hotel Gatsby',
    title: 'Hotel Gatsby',
    description: 'Tecnologías utilizadas: Gatsby.js, DatoCMS, Emotion (styled components)',
  },
  {
    id: 5,
    link: 'https://gorgeous-narwhal-908498.netlify.app/',
    image: project04,
    alt: 'Captura de pantalla de Administrador de pacientes',
    title: 'Administrador de Pacientes',
    description: 'Tecnologías utilizadas: React.js, Vite, TailwindCSS',
  },
  {
    id: 6,
    link: 'https://super-bubblegum-13e63f.netlify.app/',
    image: project05,
    alt: 'Captura de pantalla de Control de presupuesto',
    title: 'Control de Presupuesto',
    description: 'Tecnologías utilizadas: React.js, Vite, librerías varias',
  },
  {
    id: 7,
    link: 'https://amazing-cori-75ee92.netlify.app/',
    image: project06,
    alt: 'Captura de pantalla de Cotizador de seguros',
    title: 'Cotizador de Seguros',
    description: 'Tecnologías utilizadas: React.js, Emotion',
  },
  {
    id: 8,
    link: 'https://clever-fermi-923fa4.netlify.app/',
    image: project08,
    alt: 'Captura de pantalla de App de Clima',
    title: 'App de Clima',
    description: 'Tecnologías utilizadas: React.js, Materialize, API pública',
  },
  {
    id: 9,
    link: 'https://mellifluous-frangollo-063e9f.netlify.app/',
    image: project09,
    alt: 'Captura de pantalla de Cotizador de Criptomonedas',
    title: 'Cotizador de Criptomonedas',
    description: 'Tecnologías utilizadas: React.js, Vite, Emotion, API',
  },
  {
    id: 10,
    link: 'https://clone-4fc1c.web.app/',
    image: project14,
    alt: 'Captura de pantalla de Clon de Amazon',
    title: 'Clon de Amazon',
    description: 'Tecnologías utilizadas: React.js, CSS, Firebase',
  },
];

export default projectData;