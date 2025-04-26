import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h2>Experiencia Laboral</h2>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="Junio 2021 – Abril 2025"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faReact} />}
          >
            <h3 className="vertical-timeline-element-title">Front End Developer</h3>
            <p className="vertical-timeline-element-subtitle">Avature · Buenos Aires, Argentina</p>
            <p>
              Desarrollo y mantenimiento de portales accesibles (WCAG) usando HTML, Twig y React. Refactorización de componentes críticos, colaboración con equipos de UX y QA, y mejoras en rendimiento y escalabilidad.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Marzo 2020 – Actualidad"
            iconStyle={{ background: '#5000ca', color: 'white' }}
            icon={<FontAwesomeIcon icon={faReact} />}
          >
            <h3 className="vertical-timeline-element-title">Front End Developer</h3>
            <p className="vertical-timeline-element-subtitle">Freelance · Remoto, Argentina</p>
            <p>
              Creación de sitios web responsive y SPAs con React. Integración de APIs RESTful, gestión de estados compleja con hooks personalizados y context, y despliegue de proyectos completos con control de versiones en GitHub.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
