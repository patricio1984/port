import React from 'react';
import { IProject } from './ProjectTypes';

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { link, image, alt, title, description } = project;

  return (
    <div className="project">
      <a href={link} target="_blank" rel="noreferrer">
        <img src={image} alt={alt} width="100%" className="zoom" />
      </a>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProjectCard;
