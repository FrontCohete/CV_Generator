import { useState } from 'react';
import { User, GraduationCap, Briefcase, Code, Wrench, Languages, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './GenCV_Build.css';

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CVData {
  personalInfo: {
    firstName: string;
    lastNameP: string;
    lastNameM: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    colonia: string;
    zipCode: string;
    summary: string;
  };
  education: Education[];
}

type TabType = 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'languages';

export default function GenCV_Build() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const [formData, setFormData] = useState<CVData>({
    personalInfo: {
      firstName: '',
      lastNameP: '',
      lastNameM: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      colonia: '',
      zipCode: '',
      summary: ''
    },
    education: []
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => {
      const newEducation = [...prev.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      return { ...prev, education: newEducation };
    });
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: crypto.randomUUID(), institution: '', degree: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };

  const removeEducation = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, index) => index !== indexToRemove)
    }));
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },   
    animate: { opacity: 1, x: 0 },    
    exit: { opacity: 0, x: -20 }      
  };

  return (
    <div className="build-wrapper">
      
      <header className="build-header">
        <h1>Crea tu CV en Formato Harvard</h1>
        <p>Navega entre las secciones e ingresa tus datos para construir tu Curriculum Vitae en Formato Harvard.</p>
      </header>

      {/*CONTENIDO  -------------------------------------------------------- */}
      <div className="build-layout">
        <aside className="build-sidebar">
          <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
            <User /> <span>Datos</span>
          </button>
          <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
            <GraduationCap /> <span>Educación</span>
          </button>
          <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
            <Briefcase /> <span>Experiencia</span>
          </button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <Code /> <span>Proyectos</span>
          </button>
          <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
            <Wrench /> <span>Skills</span>
          </button>
          <button className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`} onClick={() => setActiveTab('languages')}>
            <Languages /> <span>Idiomas</span>
          </button>
        </aside>

        {/*FORMULARIO -------------------------------------------------- */}
        <main className="build-form-area">
          <div className="form-container-inner">
            <AnimatePresence mode="wait">
              
              {/* SECCIÓN: INFORMACIÓN PERSONAL */}
              {activeTab === 'personal' && (
                <motion.section 
                  key="personal"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="form-section-title">Información Personal</h2>
                  <p className="form-section-desc">Estructura tus datos base siguiendo las pautas de legibilidad para reclutadores.</p>
                  
                  {/* DATOS PERSONALES*/}
                  <h3 className="form-subsection-title">Datos Personales</h3>
                  <div className="form-row-3">
                    <div className="input-group">
                      <input type="text" name="firstName" id="firstName" className="input-field" placeholder=" " required value={formData.personalInfo.firstName} onChange={handlePersonalInfoChange} />
                      <label htmlFor="firstName" className="input-label">Nombre (s) *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" name="lastNameP" id="lastNameP" className="input-field" placeholder=" " required value={formData.personalInfo.lastNameP} onChange={handlePersonalInfoChange} />
                      <label htmlFor="lastNameP" className="input-label">Apellido Paterno *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" name="lastNameM" id="lastNameM" className="input-field" placeholder=" " value={formData.personalInfo.lastNameM} onChange={handlePersonalInfoChange} />
                      <label htmlFor="lastNameM" className="input-label">Apellido Materno °</label>
                    </div>
                  </div>
                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="email" name="email" id="email" className="input-field" placeholder=" " value={formData.personalInfo.email} onChange={handlePersonalInfoChange} />
                      <label htmlFor="email" className="input-label">Correo Electrónico °</label>
                      <span className="input-error-msg">Ingresa un correo válido</span>
                    </div>
                    <div className="input-group">
                      <input type="tel" name="phone" id="phone" className="input-field" placeholder=" " pattern="[0-9]{10}" value={formData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                      <label htmlFor="phone" className="input-label">Número celular °</label>
                      <span className="input-error-msg">Debe contener 10 dígitos numéricos</span>
                    </div>
                  </div>

                  {/*UBICACIÓN*/}
                  <h3 className="form-subsection-title">Ubicación</h3>
                  <div className="form-row-3">
                    <div className="input-group">
                      <input type="text" name="country" id="country" className="input-field" placeholder=" " required value={formData.personalInfo.country} onChange={handlePersonalInfoChange} />
                      <label htmlFor="country" className="input-label">País *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" name="state" id="state" className="input-field" placeholder=" " required value={formData.personalInfo.state} onChange={handlePersonalInfoChange} />
                      <label htmlFor="state" className="input-label">Estado (Entidad Federativa) *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" name="city" id="city" className="input-field" placeholder=" " required value={formData.personalInfo.city} onChange={handlePersonalInfoChange} />
                      <label htmlFor="city" className="input-label">Municipio / Alcaldía *</label>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" name="colonia" id="colonia" className="input-field" placeholder=" " value={formData.personalInfo.colonia} onChange={handlePersonalInfoChange} />
                      <label htmlFor="colonia" className="input-label">Colonia °</label>
                    </div>
                    <div className="input-group">
                      <input type="text" name="zipCode" id="zipCode" className="input-field" placeholder=" " pattern="[0-9]{5}" value={formData.personalInfo.zipCode} onChange={handlePersonalInfoChange} />
                      <label htmlFor="zipCode" className="input-label">Código Postal °</label>
                      <span className="input-error-msg">Debe tener 5 dígitos</span>
                    </div>
                  </div>

                  {/* ================= BLOQUE 3: PRESENTACIÓN ================= */}
                  <h3 className="form-subsection-title">Presentación</h3>
                  
                  {/* [En 1 columna] */}
                  <div className="form-row-1">
                    <div className="input-group">
                      <textarea name="summary" id="summary" className="textarea-field" placeholder=" " value={formData.personalInfo.summary} onChange={handlePersonalInfoChange} />
                      <label htmlFor="summary" className="input-label">Perfil °</label>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* SECCIÓN: EDUCACIÓN */}
              {activeTab === 'education' && (
                <motion.section 
                  key="education"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="form-section-title">Historial Académico</h2>
                  <p className="form-section-desc">Agrega tus estudios superiores. El formato Harvard requiere orden cronológico inverso.</p>
                  
                  {formData.education.map((edu, index) => (
                    <div key={edu.id} className="mb-8 p-4 md:p-6 border-2 border-[var(--accent-soft)] rounded-lg relative mt-4">
                      
                      <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 md:top-4 md:right-4 text-red-500 hover:text-red-700 transition-colors" title="Eliminar estudio">
                        <Trash2 size={20} />
                      </button>

                      <div className="form-row-2 mt-8">
                        <div className="input-group">
                          <input type="text" id={`institution-${index}`} className="input-field" placeholder=" " value={edu.institution} onChange={(e) => handleArrayChange(index, 'institution', e.target.value)} />
                          <label htmlFor={`institution-${index}`} className="input-label">Institución</label>
                        </div>
                        <div className="input-group">
                          <input type="text" id={`degree-${index}`} className="input-field" placeholder=" " value={edu.degree} onChange={(e) => handleArrayChange(index, 'degree', e.target.value)} />
                          <label htmlFor={`degree-${index}`} className="input-label">Título Obtenido</label>
                        </div>
                        <div className="input-group">
                          <input type="month" id={`startDate-${index}`} className="input-field" placeholder=" " value={edu.startDate} onChange={(e) => handleArrayChange(index, 'startDate', e.target.value)} />
                          <label htmlFor={`startDate-${index}`} className="input-label">Fecha de Inicio</label>
                        </div>
                        <div className="input-group">
                          <input type="month" id={`endDate-${index}`} className="input-field" placeholder=" " value={edu.endDate} onChange={(e) => handleArrayChange(index, 'endDate', e.target.value)} />
                          <label htmlFor={`endDate-${index}`} className="input-label">Fecha de Fin</label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="btn-add" onClick={addEducation}>
                    <Plus size={20} /> Agregar Educación
                  </button>
                </motion.section>
              )}

            </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  );
}