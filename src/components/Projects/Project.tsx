import React from 'react';
import '../../assets/styles/Project.scss';
import projectData from './ProjectData';
import ProjectCard from './ProjectCard';
import { IProject } from './ProjectTypes';

const Project: React.FC = () => {
  return (
    <div className="projects-container" id="projects">
      <h2>Proyectos Personales</h2>
      <div className="projects-grid">
        {projectData.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Project;

