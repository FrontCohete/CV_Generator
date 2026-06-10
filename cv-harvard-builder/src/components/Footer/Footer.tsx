import { FiGithub, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a href="https://github.com/FrontCohete" target="_blank" rel="noreferrer" className="footer-link">
          <FiGithub size={24} />
        </a>
        <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noreferrer" className="footer-link">
          <FiLinkedin size={24} />
        </a>
      </div>
      <p className="footer-text">"Todos los frootloops saben igual"</p>
    </footer>
  );
}