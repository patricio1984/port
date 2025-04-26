import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profileImg from '../assets/images/profile.webp';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profileImg} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/patricio1984" target="_blank" rel="noreferrer" aria-label="GitHub de Patricio"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/patriciomainero/" target="_blank" rel="noreferrer" aria-label="Linkedin de Patricio"><LinkedInIcon/></a>
          </div>
          <h1>Patricio D Mainero</h1>
          <p>Front End Developer</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/patricio1984" target="_blank" rel="noreferrer" aria-label="GitHub de Patricio"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/patriciomainero/" target="_blank" rel="noreferrer" aria-label="Linkedin de Patricio"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;