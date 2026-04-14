import '../assets/styles/Footer.scss';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';

const SOCIAL = [
  {
    label: 'GitHub',
    href:  'https://github.com/patricio1984',
    icon:  <GitHubIcon />,
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/patriciomainero/',
    icon:  <LinkedInIcon />,
  },
] as const;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Hairline top divider */}
      <div className="footer__rule" aria-hidden="true" />

      <div className="footer__inner">

        {/* Brand */}
        <p className="footer__brand">
          PM<span className="footer__brand-dot">.</span>
        </p>

        {/* Credit */}
        <p className="footer__credit">
          Diseñado y construido por{' '}
          <a
            className="footer__link"
            href="https://github.com/patricio1984/port"
            target="_blank"
            rel="noreferrer"
          >
            Patricio D.Mainero
          </a>
          {' '}— {year}
        </p>

        {/* Social links */}
        <nav className="footer__social" aria-label="Redes sociales">
          {SOCIAL.map(({ label, href, icon }) => (
            <a
              key={label}
              className="footer__social-link"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label} de Patricio D. Mainero`}
            >
              {icon}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}

export default Footer;