import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. Importamos las herramientas de ruteo
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Index from './pages/Index/_Index';
import GenCV_Build from './pages/CViews/GenCV_Build'; // 2. Importamos la nueva página

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('cv-theme');
    return (savedTheme as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cv-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // 3. Envolvemos toda la aplicación en el BrowserRouter
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        {/* El área principal ahora es dinámica según la ruta */}
        <div className="flex-grow">
          <Routes>
            {/* Ruta raíz (Home) */}
            <Route path="/" element={<Index />} />
            
            {/* Nueva ruta para el constructor */}
            <Route path="/build" element={<GenCV_Build />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}