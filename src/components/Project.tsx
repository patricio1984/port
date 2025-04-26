import React from "react";
import project01 from '../assets/images/17.webp';
import project02 from '../assets/images/16.webp';
import project04 from '../assets/images/2.webp';
import project05 from '../assets/images/3.webp';
import project06 from '../assets/images/4.webp';
import project08 from '../assets/images/6.webp';
import project09 from '../assets/images/7.webp';
import project11 from '../assets/images/9.webp';
import project13 from '../assets/images/11.webp';
import project14 from '../assets/images/12.webp';
import '../assets/styles/Project.scss';

function Project() {
    return (
        <div className="projects-container" id="projects">
            <h2>Proyectos Personales</h2>
            <div className="projects-grid">
                <div className="project">
                    <a href="https://inspiring-ardinghelli-b82a39.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project01} alt="Captura de pantalla de Bienes raíces Gatsby" width="100%" className="zoom" />
                    </a>
                    <h3>Sitio de Bienes Raíces</h3>
                    <p>Tecnologías utilizadas: Gatsby.js, Strapi, Emotion (styled components)</p>
                </div>

                <div className="project">
                    <a href="https://trusting-brahmagupta-cb59ed.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project02} alt="Captura de pantalla de Hotel Gatsby" width="100%" className="zoom" />
                    </a>
                    <h3>Hotel Gatsby</h3>
                    <p>Tecnologías utilizadas: Gatsby.js, DatoCMS, Emotion (styled components)</p>
                </div>

                <div className="project">
                    <a href="https://gorgeous-narwhal-908498.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project04} alt="Captura de pantalla de Administrador de pacientes" width="100%" className="zoom" />
                    </a>
                    <h3>Administrador de Pacientes</h3>
                    <p>Tecnologías utilizadas: React.js, Vite, TailwindCSS</p>
                </div>

                <div className="project">
                    <a href="https://super-bubblegum-13e63f.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project05} alt="Captura de pantalla de Control de presupuesto" width="100%" className="zoom" />
                    </a>
                    <h3>Control de Presupuesto</h3>
                    <p>Tecnologías utilizadas: React.js, Vite, librerías varias</p>
                </div>

                <div className="project">
                    <a href="https://amazing-cori-75ee92.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project06} alt="Captura de pantalla de Cotizador de seguros" width="100%" className="zoom" />
                    </a>
                    <h3>Cotizador de Seguros</h3>
                    <p>Tecnologías utilizadas: React.js, Emotion</p>
                </div>

                <div className="project">
                    <a href="https://clever-fermi-923fa4.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project08} alt="Captura de pantalla de App de Clima" width="100%" className="zoom" />
                    </a>
                    <h3>App de Clima</h3>
                    <p>Tecnologías utilizadas: React.js, Materialize, API pública</p>
                </div>

                <div className="project">
                    <a href="https://mellifluous-frangollo-063e9f.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project09} alt="Captura de pantalla de Cotizador de Criptomonedas" width="100%" className="zoom" />
                    </a>
                    <h3>Cotizador de Criptomonedas</h3>
                    <p>Tecnologías utilizadas: React.js, Vite, Emotion, API</p>
                </div>

                <div className="project">
                    <a href="https://compassionate-blackwell-a547a5.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project11} alt="Captura de pantalla de Buscador de imágenes" width="100%" className="zoom" />
                    </a>
                    <h3>Buscador de Imágenes</h3>
                    <p>Tecnologías utilizadas: React.js, Bootswatch, API de Pixabay</p>
                </div>

                <div className="project">
                    <a href="https://goofy-goodall-e4c6d5.netlify.app/" target="_blank" rel="noreferrer">
                        <img src={project13} alt="Captura de pantalla de Buscador de bebidas" width="100%" className="zoom" />
                    </a>
                    <h3>Buscador de Bebidas</h3>
                    <p>Tecnologías utilizadas: React.js, Axios, Bootstrap, Material UI</p>
                </div>

                <div className="project">
                    <a href="https://clone-4fc1c.web.app/" target="_blank" rel="noreferrer">
                        <img src={project14} alt="Captura de pantalla de Clon de Amazon" width="100%" className="zoom" />
                    </a>
                    <h3>Clon de Amazon</h3>
                    <p>Tecnologías utilizadas: React.js, CSS, Firebase</p>
                </div>
            </div>
        </div>
    );
}

export default Project;