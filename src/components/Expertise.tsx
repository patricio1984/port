import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faGitAlt, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFrontend = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Twig",
];

const labelsBackend = [
  "Node.js",
  "MongoDB",
  "GraphQL",
  "REST APIs",
  "fetch",
  "axios",
  "useContext",
  "useReducer",
];

const labelsTools = [
  "Git",
  "GitHub",
  "npm",
  "Webpack",
  "Responsive Design",
  "SEO",
  "WCAG 2.2",
  "jQuery",
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h2>Experiencia Técnica</h2>
        <div className="skills-grid">
          <div className="skill">
            <FontAwesomeIcon icon={faReact} size="3x"/>
            <h3>Front End Development</h3>
            <p>Más de 4 años construyendo interfaces modernas, accesibles y escalables. Experiencia sólida en React, diseño responsive y cumplimiento de estándares WCAG.</p>
            <div className="flex-chips">
              <span className="chip-title">Frontend stack:</span>
              {labelsFrontend.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faNodeJs} size="3x"/>
            <h3>Proyectos Full Stack</h3>
            <p>Desarrollo de SPAs y sitios completos como freelance, con integración de APIs y manejo avanzado de estados. Gestión de proyectos end-to-end, desde Git hasta deploy.</p>
            <div className="flex-chips">
              <span className="chip-title">Backend & lógica:</span>
              {labelsBackend.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faGitAlt} size="3x"/>
            <h3>Herramientas y Buenas Prácticas</h3>
            <p>Fuerte foco en buenas prácticas web: accesibilidad, rendimiento, y mantenimiento del código. Experiencia con herramientas modernas y trabajo colaborativo en equipos ágiles.</p>
            <div className="flex-chips">
              <span className="chip-title">Herramientas & extras:</span>
              {labelsTools.map((label, index) => (
                <Chip key={index} className='chip' label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;