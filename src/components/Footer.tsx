import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href="https://github.com/patricio1984" target="_blank" rel="noreferrer" aria-label="GitHub de Patricio"><GitHubIcon/></a>
        <a href="https://www.linkedin.com/in/patriciomainero/" target="_blank" rel="noreferrer" aria-label="Linkedin de Patricio"><LinkedInIcon/></a>
      </div>
      <p>Un portfolio diseñado y construido por <a href="https://github.com/patricio1984/port" target="_blank" rel="noreferrer">Patricio Mainero</a> con 💜</p>
    </footer>
  );
}

export default Footer;