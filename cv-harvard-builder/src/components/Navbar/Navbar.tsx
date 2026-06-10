import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Home, Moon, Sun, FileText, Edit3, Activity, Lock, Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="icon-btn" aria-label="Volver al inicio" onClick={() => setIsMenuOpen(false)}>
          <Home size={24} />
        </Link>

        <div className={`nav-center ${isMenuOpen ? 'mobile-open' : ''}`}>
          
          <Link to="/build" className="nav-link" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
            <FileText size={18} />
            Crear CV
          </Link>
          
          <div className="nav-link"style={{ textDecoration: 'none' }}>
            <Edit3 size={18} />
            Editar CV
          </div>
          
          <div className="nav-link disabled" data-tooltip="Próximamente"style={{ textDecoration: 'none' }}>
            <Activity size={18} />
            Analizar CV
            <Lock size={14} />
          </div>
        </div>

        <div className="nav-actions-right">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          
          <button className="icon-btn mobile-toggle" onClick={toggleMenu} aria-label="Alternar menú">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
    </nav>
  );
}