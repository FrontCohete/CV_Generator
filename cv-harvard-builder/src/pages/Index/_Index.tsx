import { useState, useEffect } from 'react';
import { FileText, UploadCloud } from 'lucide-react';
import './_index.css';
import heroImage from '../../assets/images/12174624.png';

export default function Index() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [cursorPosition, setCursorPosition] = useState(1);

  const fullText1 = "¿Curriculum?...";
  const fullText2 = "CV-Gen"; 
  const fullText3 = " te puede ayudar";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentLen1 = 0;
    let currentLen2 = 0;
    let currentLen3 = 0;

    const typeWriter = () => {
      if (currentLen1 < fullText1.length) {
        setLine1(fullText1.slice(0, currentLen1 + 1));
        currentLen1++;
        timeout = setTimeout(typeWriter, 60);
      } else if (currentLen2 < fullText2.length) {
        setCursorPosition(2);
        setLine2(fullText2.slice(0, currentLen2 + 1));
        currentLen2++;
        timeout = setTimeout(typeWriter, 60);
      } else if (currentLen3 < fullText3.length) {
        setCursorPosition(3);
        setLine3(fullText3.slice(0, currentLen3 + 1));
        currentLen3++;
        timeout = setTimeout(typeWriter, 60);
      }
    };

    timeout = setTimeout(typeWriter, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <section className="hero-title-container">
          <h1 className="hero-title">
            {line1}{cursorPosition === 1 && <span className="typing-cursor"></span>}
            <br />
            <span className="hero-highlight">{line2}</span>{cursorPosition === 2 && <span className="typing-cursor"></span>}
            <br />
            {line3}{cursorPosition === 3 && <span className="typing-cursor"></span>}
          </h1>
        </section>
        
        <section className="hero-description"> 
          <p className="hero-subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi veniam, animi culpa, laboriosam non, odio magnam ea iusto suscipit maiores inventore? Fuga voluptas fugit sit temporibus necessitatibus. Voluptatibus, id error?
            Maxime quidem dolorum nulla veritatis porro voluptatem sapiente inventore quaerat rerum? Dolorum eum ex recusandae id. Accusamus unde omnis voluptatibus et harum dolore excepturi sapiente nostrum! Accusantium cum error dicta!  
          </p>

          <div className="action-buttons">
            <button className="btn-primary">
              <FileText size={20} />
              Comenzar desde cero
            </button>
            
            <button className="btn-secondary">
              <UploadCloud size={20} />
              Subir mi CV actual
            </button>
          </div>
        </section>
      </div>

      <div className="hero-image-container">
        <img 
          src={heroImage} 
          alt="Vista previa de generación de CV" 
          className="hero-image"
        />
      </div>
    </div>
  );
}