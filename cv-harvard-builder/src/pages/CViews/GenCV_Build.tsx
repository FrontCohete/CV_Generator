import { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, Briefcase, Code, Wrench, Languages, Plus, Trash2, CheckCircle2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './GenCV_Build.css';

interface Education { id: string; institution: string; faculty: string; degree: string; startDate: string; endDate: string; }
interface Experience { id: string; company: string; role: string; startDate: string; endDate: string; responsibilities: string; }
interface Project { id: string; name: string; organization: string; link: string; startDate: string; endDate: string; description: string; }
interface CVData {
  personalInfo: { firstName: string; lastNameP: string; lastNameM: string; email: string; phone: string; country: string; state: string; city: string; colonia: string; zipCode: string; summary: string; };
  education: Education[]; experience: Experience[]; projects: Project[]; hardSkills: string[]; softSkills: string[]; languages: string[];
}
type TabType = 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'languages';

export default function GenCV_Build() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const formAreaRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<CVData>({
    personalInfo: { firstName: '', lastNameP: '', lastNameM: '', email: '', phone: '', country: '', state: '', city: '', colonia: '', zipCode: '', summary: '' },
    education: [], experience: [], projects: [], hardSkills: [], softSkills: [], languages: []
  });

  useEffect(() => {
    const observerOptions = {
      root: formAreaRef.current,
      // Margen para detectar la sección cuando llega cerca de la parte superior, no al centro exacto
      rootMargin: '-10% 0px -80% 0px', 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id as TabType);
        }
      });
    }, observerOptions);

    const sectionIds = ['personal', 'education', 'experience', 'projects', 'skills', 'languages'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: TabType) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- MANEJADORES DE ESTADO ---
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => { const newArray = [...prev.education]; newArray[index] = { ...newArray[index], [field]: value }; return { ...prev, education: newArray }; });
  };
  const addEducation = () => setFormData(prev => ({ ...prev, education: [...prev.education, { id: crypto.randomUUID(), institution: '', faculty: '', degree: '', startDate: '', endDate: '' }] }));
  const removeEducation = (indexToRemove: number) => setFormData(prev => ({ ...prev, education: prev.education.filter((_, index) => index !== indexToRemove) }));

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setFormData(prev => { const newArray = [...prev.experience]; newArray[index] = { ...newArray[index], [field]: value }; return { ...prev, experience: newArray }; });
  };
  const addExperience = () => setFormData(prev => ({ ...prev, experience: [...prev.experience, { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', responsibilities: '' }] }));
  const removeExperience = (indexToRemove: number) => setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, index) => index !== indexToRemove) }));
  
  const handleKeyDownBulletExp = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (e.key === 'Enter') { e.preventDefault(); const target = e.target as HTMLTextAreaElement; const cursorPosition = target.selectionStart; const textBefore = target.value.substring(0, cursorPosition); const textAfter = target.value.substring(cursorPosition); handleExperienceChange(index, 'responsibilities', textBefore + '\n• ' + textAfter); setTimeout(() => { target.selectionStart = cursorPosition + 3; target.selectionEnd = cursorPosition + 3; }, 0); }
  };
  const handleFocusBulletExp = (e: React.FocusEvent<HTMLTextAreaElement>, index: number) => { if (e.target.value.trim() === '') handleExperienceChange(index, 'responsibilities', '• '); };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    setFormData(prev => { const newArray = [...prev.projects]; newArray[index] = { ...newArray[index], [field]: value }; return { ...prev, projects: newArray }; });
  };
  const addProject = () => setFormData(prev => ({ ...prev, projects: [...prev.projects, { id: crypto.randomUUID(), name: '', organization: '', link: '', startDate: '', endDate: '', description: '' }] }));
  const removeProject = (indexToRemove: number) => setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, index) => index !== indexToRemove) }));

  const handleKeyDownBulletProj = (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => {
    if (e.key === 'Enter') { e.preventDefault(); const target = e.target as HTMLTextAreaElement; const cursorPosition = target.selectionStart; const textBefore = target.value.substring(0, cursorPosition); const textAfter = target.value.substring(cursorPosition); handleProjectChange(index, 'description', textBefore + '\n• ' + textAfter); setTimeout(() => { target.selectionStart = cursorPosition + 3; target.selectionEnd = cursorPosition + 3; }, 0); }
  };
  const handleFocusBulletProj = (e: React.FocusEvent<HTMLTextAreaElement>, index: number) => { if (e.target.value.trim() === '') handleProjectChange(index, 'description', '• '); };

  // --- COMBO BOXES ---
  const [hardCatalog, setHardCatalog] = useState(["React", "JavaScript", "TypeScript", "Python", "SQL", "Git", "Figma", "HTML", "CSS", "Node.js"]);
  const [softCatalog, setSoftCatalog] = useState(["Trabajo en Equipo", "Liderazgo", "Comunicación Asertiva", "Resolución de Problemas", "Gestión del Tiempo", "Adaptabilidad"]);
  const [langCatalog, setLangCatalog] = useState(["Español (Nativo)", "Inglés (Básico)", "Inglés (Intermedio)", "Inglés (Avanzado)", "Inglés (Fluido)", "Francés (Básico)", "Francés (Intermedio)", "Alemán (Básico)"]);

  const [hardSearch, setHardSearch] = useState(''); const [softSearch, setSoftSearch] = useState(''); const [langSearch, setLangSearch] = useState('');
  const [showHardDrop, setShowHardDrop] = useState(false); const [showSoftDrop, setShowSoftDrop] = useState(false); const [showLangDrop, setShowLangDrop] = useState(false);

  const availableHard = hardCatalog.filter(s => !formData.hardSkills.includes(s));
  const availableSoft = softCatalog.filter(s => !formData.softSkills.includes(s));
  const availableLang = langCatalog.filter(s => !formData.languages.includes(s));

  const filteredHard = availableHard.filter(s => s.toLowerCase().includes(hardSearch.toLowerCase()));
  const filteredSoft = availableSoft.filter(s => s.toLowerCase().includes(softSearch.toLowerCase()));
  const filteredLang = availableLang.filter(s => s.toLowerCase().includes(langSearch.toLowerCase()));

  const exactHardExists = hardCatalog.some(s => s.toLowerCase() === hardSearch.trim().toLowerCase());
  const exactSoftExists = softCatalog.some(s => s.toLowerCase() === softSearch.trim().toLowerCase());
  const exactLangExists = langCatalog.some(s => s.toLowerCase() === langSearch.trim().toLowerCase());

  const selectItem = (item: string, type: 'hard' | 'soft' | 'lang') => {
    if (type === 'hard') { setFormData(prev => ({ ...prev, hardSkills: [...prev.hardSkills, item] })); setHardSearch(''); setShowHardDrop(false); }
    else if (type === 'soft') { setFormData(prev => ({ ...prev, softSkills: [...prev.softSkills, item] })); setSoftSearch(''); setShowSoftDrop(false); }
    else { setFormData(prev => ({ ...prev, languages: [...prev.languages, item] })); setLangSearch(''); setShowLangDrop(false); }
  };

  const addNewItemToCatalog = (itemName: string, type: 'hard' | 'soft' | 'lang') => {
    const cleanItem = itemName.trim(); if (!cleanItem) return;
    if (type === 'hard') { setHardCatalog(prev => [...prev, cleanItem]); selectItem(cleanItem, 'hard'); }
    else if (type === 'soft') { setSoftCatalog(prev => [...prev, cleanItem]); selectItem(cleanItem, 'soft'); }
    else { setLangCatalog(prev => [...prev, cleanItem]); selectItem(cleanItem, 'lang'); }
  };

  const removeItem = (itemToRemove: string, type: 'hard' | 'soft' | 'lang') => {
    if (type === 'hard') setFormData(prev => ({ ...prev, hardSkills: prev.hardSkills.filter(s => s !== itemToRemove) }));
    else if (type === 'soft') setFormData(prev => ({ ...prev, softSkills: prev.softSkills.filter(s => s !== itemToRemove) }));
    else setFormData(prev => ({ ...prev, languages: prev.languages.filter(s => s !== itemToRemove) }));
  };
  const checkIfFormIsValid = () => {
    const { personalInfo, education, experience, projects } = formData;
    if (!personalInfo.firstName.trim() || !personalInfo.lastNameP.trim() || !personalInfo.country.trim() || !personalInfo.state.trim() || !personalInfo.city.trim()) return false;
    for (const edu of education) { if (!edu.institution.trim() || !edu.faculty.trim() || !edu.degree.trim()) return false; }
    for (const exp of experience) { if (!exp.company.trim() || !exp.role.trim()) return false; }
    for (const proj of projects) { if (!proj.name.trim()) return false; }
    return true;
  };

  const isReadyToGenerate = checkIfFormIsValid();

  const handleGenerateCV = (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log('Enviando JSON estructurado al Backend:', JSON.stringify(formData, null, 2));
  };

  return (
    <div className="build-wrapper">
      
      <header className="build-header">
        <h1>Crea tu CV en Formato Harvard</h1>
        <p>Navega entre las secciones e ingresa tus datos para construir tu Curriculum Vitae en Formato Harvard.</p>
      </header>

      <div className="build-layout">
        
        <aside className="build-sidebar">
          <button type="button" className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => scrollToSection('personal')}>
            <User /> <span>Datos</span>
          </button>
          <button type="button" className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => scrollToSection('education')}>
            <GraduationCap /> <span>Educación</span>
          </button>
          <button type="button" className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => scrollToSection('experience')}>
            <Briefcase /> <span>Experiencia</span>
          </button>
          <button type="button" className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => scrollToSection('projects')}>
            <Code /> <span>Proyectos</span>
          </button>
          <button type="button" className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => scrollToSection('skills')}>
            <Wrench /> <span>Skills</span>
          </button>
          <button type="button" className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`} onClick={() => scrollToSection('languages')}>
            <Languages /> <span>Idiomas</span>
          </button>

          <AnimatePresence>
            {isReadyToGenerate && (
              <motion.div 
                className="generate-btn-wrapper"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <button type="submit" form="cv-form" className="generate-btn">
                  <FileText size={20} /> Generar CV
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
        <div className="build-form-area" ref={formAreaRef}>
          <form id="cv-form" className="form-container-inner" onSubmit={handleGenerateCV}>
            
            {/* INFORMACIÓN PERSONAL */}
            <section id="personal" className="scroll-section">
              <h2 className="form-section-title">Información Personal</h2>
              <p className="form-section-desc">Estructura tus datos base siguiendo las pautas de legibilidad para reclutadores.</p>
              
              <h3 className="form-subsection-title">Datos Personales</h3>
              <div className="form-row-3">
                <div className="input-group">
                  <input type="text" name="firstName" id="firstName" className="input-field" placeholder="Ej. Juan" required value={formData.personalInfo.firstName} onChange={handlePersonalInfoChange} />
                  <label htmlFor="firstName" className="input-label">Nombre (s) *</label>
                </div>
                <div className="input-group">
                  <input type="text" name="lastNameP" id="lastNameP" className="input-field" placeholder="Ej. Pérez" required value={formData.personalInfo.lastNameP} onChange={handlePersonalInfoChange} />
                  <label htmlFor="lastNameP" className="input-label">Apellido Paterno *</label>
                </div>
                <div className="input-group">
                  <input type="text" name="lastNameM" id="lastNameM" className="input-field" placeholder="Ej. López" value={formData.personalInfo.lastNameM} onChange={handlePersonalInfoChange} />
                  <label htmlFor="lastNameM" className="input-label">Apellido Materno °</label>
                </div>
              </div>
              <div className="form-row-2">
                <div className="input-group">
                  <input type="email" name="email" id="email" className="input-field" placeholder="Ej. juan@correo.com" value={formData.personalInfo.email} onChange={handlePersonalInfoChange} />
                  <label htmlFor="email" className="input-label">Correo Electrónico °</label>
                  <span className="input-error-msg">Ingresa un correo válido</span>
                </div>
                <div className="input-group">
                  <input type="tel" name="phone" id="phone" className="input-field" placeholder="Ej. 5512345678" pattern="[0-9]{10}" value={formData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                  <label htmlFor="phone" className="input-label">Número celular °</label>
                  <span className="input-error-msg">Debe contener 10 dígitos numéricos</span>
                </div>
              </div>

              <h3 className="form-subsection-title">Ubicación</h3>
              <div className="form-row-3">
                <div className="input-group">
                  <input type="text" name="country" id="country" className="input-field" placeholder="Ej. México" required value={formData.personalInfo.country} onChange={handlePersonalInfoChange} />
                  <label htmlFor="country" className="input-label">País *</label>
                </div>
                <div className="input-group">
                  <input type="text" name="state" id="state" className="input-field" placeholder="Ej. CDMX" required value={formData.personalInfo.state} onChange={handlePersonalInfoChange} />
                  <label htmlFor="state" className="input-label">Estado (Entidad Federativa) *</label>
                </div>
                <div className="input-group">
                  <input type="text" name="city" id="city" className="input-field" placeholder="Ej. Coyoacán" required value={formData.personalInfo.city} onChange={handlePersonalInfoChange} />
                  <label htmlFor="city" className="input-label">Municipio / Alcaldía *</label>
                </div>
              </div>
              <div className="form-row-2">
                <div className="input-group">
                  <input type="text" name="colonia" id="colonia" className="input-field" placeholder="Ej. Del Carmen" value={formData.personalInfo.colonia} onChange={handlePersonalInfoChange} />
                  <label htmlFor="colonia" className="input-label">Colonia °</label>
                </div>
                <div className="input-group">
                  <input type="text" name="zipCode" id="zipCode" className="input-field" placeholder="Ej. 04100" pattern="[0-9]{5}" value={formData.personalInfo.zipCode} onChange={handlePersonalInfoChange} />
                  <label htmlFor="zipCode" className="input-label">Código Postal °</label>
                  <span className="input-error-msg">Debe tener 5 dígitos</span>
                </div>
              </div>

              <h3 className="form-subsection-title">Presentación</h3>
              <div className="form-row-1">
                <div className="input-group">
                  <textarea name="summary" id="summary" className="textarea-field" placeholder="Ej. Desarrollador de software con experiencia en MVC..." value={formData.personalInfo.summary} onChange={handlePersonalInfoChange} />
                  <label htmlFor="summary" className="input-label">Perfil °</label>
                </div>
              </div>
            </section>

            {/* EDUCACIÓN */}
            <section id="education" className="scroll-section">
              <h2 className="form-section-title">Historial Académico</h2>
              <p className="form-section-desc">Agrega tus estudios superiores. El formato Harvard requiere orden cronológico inverso.</p>
              
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="education-card">
                  <button type="button" onClick={() => removeEducation(index)} className="btn-delete" title="Eliminar estudio"><Trash2 size={18} /></button>
                  <div className="education-card-header"><span className="education-card-title">Estudio / Formación #{index + 1}</span></div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" id={`institution-${index}`} className="input-field" placeholder="Ej. IPN" required value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} />
                      <label htmlFor={`institution-${index}`} className="input-label">Institución / Universidad *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id={`faculty-${index}`} className="input-field" placeholder="Ej. ESCOM" required value={edu.faculty} onChange={(e) => handleEducationChange(index, 'faculty', e.target.value)} />
                      <label htmlFor={`faculty-${index}`} className="input-label">Facultad / Plantel *</label>
                    </div>
                  </div>

                  <div className="form-row-1">
                    <div className="input-group">
                      <input type="text" id={`degree-${index}`} className="input-field" placeholder="Ej. Ing. en Sistemas Computacionales" required value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} />
                      <label htmlFor={`degree-${index}`} className="input-label">Carrera / Título obtenido *</label>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" id={`startDateEdu-${index}`} className="input-field" placeholder="Ej. Agosto 2018" value={edu.startDate} onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)} />
                      <label htmlFor={`startDateEdu-${index}`} className="input-label">Fecha de Inicio °</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id={`endDateEdu-${index}`} className="input-field" placeholder="Ej. Junio 2022" value={edu.endDate} onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)} />
                      <label htmlFor={`endDateEdu-${index}`} className="input-label">Fecha de Fin °</label>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addEducation}><Plus size={20} /> Agregar Educación</button>
            </section>

            {/* EXPERIENCIA */}
            <section id="experience" className="scroll-section">
              <h2 className="form-section-title">Experiencia Profesional</h2>
              <p className="form-section-desc">Enumera tu experiencia laboral más relevante de la más reciente a la más antigua.</p>
              
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="education-card">
                  <button type="button" onClick={() => removeExperience(index)} className="btn-delete" title="Eliminar experiencia"><Trash2 size={18} /></button>
                  <div className="education-card-header"><span className="education-card-title">Experiencia Laboral #{index + 1}</span></div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" id={`company-${index}`} className="input-field" placeholder="Ej. Tech Solutions" required value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                      <label htmlFor={`company-${index}`} className="input-label">Empresa *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id={`role-${index}`} className="input-field" placeholder="Ej. Frontend Developer" required value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} />
                      <label htmlFor={`role-${index}`} className="input-label">Puesto / Cargo *</label>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" id={`startDateExp-${index}`} className="input-field" placeholder="Ej. Enero 2023" value={exp.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} />
                      <label htmlFor={`startDateExp-${index}`} className="input-label">Fecha de Inicio °</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id={`endDateExp-${index}`} className="input-field" placeholder="Ej. Presente" value={exp.endDate} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} />
                      <label htmlFor={`endDateExp-${index}`} className="input-label">Fecha de Fin °</label>
                    </div>
                  </div>

                  <div className="form-row-1">
                    <div className="input-group">
                      <textarea id={`resp-${index}`} className="textarea-field" placeholder="Ej. Lideré el desarrollo de la app móvil..." value={exp.responsibilities} onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value)} onKeyDown={(e) => handleKeyDownBulletExp(e, index)} onFocus={(e) => handleFocusBulletExp(e, index)} />
                      <label htmlFor={`resp-${index}`} className="input-label">Acciones / Responsabilidades / Logros °</label>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addExperience}><Plus size={20} /> Agregar Experiencia</button>
            </section>

            {/* PROYECTOS Y LICENCIAS */}
            <section id="projects" className="scroll-section">
              <h2 className="form-section-title">Proyectos y Licencias</h2>
              <p className="form-section-desc">Destaca proyectos relevantes, certificaciones oficiales o membresías en organizaciones profesionales.</p>
              
              {formData.projects.map((proj, index) => (
                <div key={proj.id} className="education-card">
                  <button type="button" onClick={() => removeProject(index)} className="btn-delete" title="Eliminar ítem"><Trash2 size={18} /></button>
                  <div className="education-card-header"><span className="education-card-title">Proyecto / Credencial #{index + 1}</span></div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" id={`projName-${index}`} className="input-field" placeholder="Ej. Plataforma ClusterPolice" required value={proj.name} onChange={(e) => handleProjectChange(index, 'name', e.target.value)} />
                      <label htmlFor={`projName-${index}`} className="input-label">Nombre del Proyecto o Licencia *</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id={`projOrg-${index}`} className="input-field" placeholder="Ej. Universidad / Institución" value={proj.organization} onChange={(e) => handleProjectChange(index, 'organization', e.target.value)} />
                      <label htmlFor={`projOrg-${index}`} className="input-label">Organización / Institución asociada °</label>
                    </div>
                  </div>

                  <div className="form-row-1">
                    <div className="input-group">
                      <input type="url" id={`projLink-${index}`} className="input-field" placeholder="Ej. https://github.com/usuario/repo" value={proj.link} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} />
                      <label htmlFor={`projLink-${index}`} className="input-label">Enlace / Credencial (URL) °</label>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <input type="text" id={`startDateProj-${index}`} className="input-field" placeholder="Ej. Junio 2026" value={proj.startDate} onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)} />
                      <label htmlFor={`startDateProj-${index}`} className="input-label">Fecha de Inicio / Emisión °</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id={`endDateProj-${index}`} className="input-field" placeholder="Ej. Diciembre 2026" value={proj.endDate} onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)} />
                      <label htmlFor={`endDateProj-${index}`} className="input-label">Fecha de Fin / Expiración °</label>
                    </div>
                  </div>

                  <div className="form-row-1">
                    <div className="input-group">
                      <textarea id={`projDesc-${index}`} className="textarea-field" placeholder="Ej. Optimización de rutas de patrullaje..." value={proj.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} onKeyDown={(e) => handleKeyDownBulletProj(e, index)} onFocus={(e) => handleFocusBulletProj(e, index)} />
                      <label htmlFor={`projDesc-${index}`} className="input-label">Descripción / Logros °</label>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addProject}><Plus size={20} /> Agregar Proyecto / Certificación</button>
            </section>

            {/* SKILLS */}
            <section id="skills" className="scroll-section">
              <h2 className="form-section-title">Habilidades y Competencias</h2>
              <p className="form-section-desc">Busca o agrega las herramientas y aptitudes que dominas.</p>
              
              <div className="education-card">
                <div className="education-card-header"><span className="education-card-title">Hard Skills (Conocimientos Técnicos)</span></div>
                <div className="form-row-1">
                  <div className="combo-box-container">
                    <div className="input-group" style={{ margin: 0 }}>
                      <input type="text" id="hardSkillInput" className="input-field" placeholder="Ej. Python, React..." value={hardSearch} onChange={(e) => { setHardSearch(e.target.value); setShowHardDrop(true); }} onFocus={() => setShowHardDrop(true)} onBlur={() => setShowHardDrop(false)} autoComplete="off" onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); if(!hardSearch.trim()) return; if(exactHardExists) selectItem(hardSearch.trim(), 'hard'); else addNewItemToCatalog(hardSearch, 'hard'); } }} />
                      <label htmlFor="hardSkillInput" className="input-label">Escribe para buscar o agregar una técnica...</label>
                    </div>
                    {showHardDrop && hardSearch && (
                      <div className="combo-dropdown">
                        {filteredHard.length > 0 ? (
                          filteredHard.map((skill, idx) => ( <div key={`hs-opt-${idx}`} className="combo-item" onMouseDown={(e) => { e.preventDefault(); selectItem(skill, 'hard'); }}> {skill} <Plus size={16} opacity={0.5} /> </div> ))
                        ) : ( <div className="combo-item" style={{ opacity: 0.6, cursor: 'default' }}>No hay coincidencias en el catálogo.</div> )}
                        {!exactHardExists && hardSearch.trim() !== '' && (
                          <div className="combo-item combo-add-action" onMouseDown={(e) => { e.preventDefault(); addNewItemToCatalog(hardSearch, 'hard'); }}> <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}> <CheckCircle2 size={16} /> Agregar "{hardSearch.trim()}" al catálogo </span> </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="skills-container">
                  {formData.hardSkills.length === 0 ? ( <p className="empty-skills-msg">Aún no has agregado conocimientos técnicos.</p> ) : (
                    formData.hardSkills.map((skill, idx) => ( <span key={`hs-${idx}`} className="skill-chip hard"> {skill} <button type="button" className="skill-chip-btn" onClick={() => removeItem(skill, 'hard')} title="Eliminar"><Trash2 size={14} /></button> </span> ))
                  )}
                </div>
              </div>

              <div className="education-card">
                <div className="education-card-header"><span className="education-card-title">Soft Skills (Habilidades Blandas)</span></div>
                <div className="form-row-1">
                  <div className="combo-box-container">
                    <div className="input-group" style={{ margin: 0 }}>
                      <input type="text" id="softSkillInput" className="input-field" placeholder="Ej. Liderazgo, Comunicación..." value={softSearch} onChange={(e) => { setSoftSearch(e.target.value); setShowSoftDrop(true); }} onFocus={() => setShowSoftDrop(true)} onBlur={() => setShowSoftDrop(false)} autoComplete="off" onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); if(!softSearch.trim()) return; if(exactSoftExists) selectItem(softSearch.trim(), 'soft'); else addNewItemToCatalog(softSearch, 'soft'); } }} />
                      <label htmlFor="softSkillInput" className="input-label">Escribe para buscar o agregar una aptitud...</label>
                    </div>
                    {showSoftDrop && softSearch && (
                      <div className="combo-dropdown">
                        {filteredSoft.length > 0 ? (
                          filteredSoft.map((skill, idx) => ( <div key={`ss-opt-${idx}`} className="combo-item" onMouseDown={(e) => { e.preventDefault(); selectItem(skill, 'soft'); }}> {skill} <Plus size={16} opacity={0.5} /> </div> ))
                        ) : ( <div className="combo-item" style={{ opacity: 0.6, cursor: 'default' }}>No hay coincidencias en el catálogo.</div> )}
                        {!exactSoftExists && softSearch.trim() !== '' && (
                          <div className="combo-item combo-add-action" onMouseDown={(e) => { e.preventDefault(); addNewItemToCatalog(softSearch, 'soft'); }}> <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}> <CheckCircle2 size={16} /> Agregar "{softSearch.trim()}" al catálogo </span> </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="skills-container">
                  {formData.softSkills.length === 0 ? ( <p className="empty-skills-msg">Aún no has agregado habilidades blandas.</p> ) : (
                    formData.softSkills.map((skill, idx) => ( <span key={`ss-${idx}`} className="skill-chip soft"> {skill} <button type="button" className="skill-chip-btn" onClick={() => removeItem(skill, 'soft')} title="Eliminar"><Trash2 size={14} /></button> </span> ))
                  )}
                </div>
              </div>
            </section>

            {/* IDIOMAS */}
            <section id="languages" className="scroll-section">
              <h2 className="form-section-title">Idiomas</h2>
              <p className="form-section-desc">Agrega los idiomas que dominas y especifica tu nivel de fluidez (ej. Básico, Intermedio, Avanzado, Nativo).</p>
              
              <div className="education-card">
                <div className="education-card-header"><span className="education-card-title">Idiomas</span></div>
                <div className="form-row-1">
                  <div className="combo-box-container">
                    <div className="input-group" style={{ margin: 0 }}>
                      <input type="text" id="langInput" className="input-field" placeholder="Ej. Inglés (Avanzado)..." value={langSearch} onChange={(e) => { setLangSearch(e.target.value); setShowLangDrop(true); }} onFocus={() => setShowLangDrop(true)} onBlur={() => setShowLangDrop(false)} autoComplete="off" onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); if(!langSearch.trim()) return; if(exactLangExists) selectItem(langSearch.trim(), 'lang'); else addNewItemToCatalog(langSearch, 'lang'); } }} />
                      <label htmlFor="langInput" className="input-label">Escribe para buscar o agregar un idioma...</label>
                    </div>
                    {showLangDrop && langSearch && (
                      <div className="combo-dropdown">
                        {filteredLang.length > 0 ? (
                          filteredLang.map((lang, idx) => ( <div key={`lang-opt-${idx}`} className="combo-item" onMouseDown={(e) => { e.preventDefault(); selectItem(lang, 'lang'); }}> {lang} <Plus size={16} opacity={0.5} /> </div> ))
                        ) : ( <div className="combo-item" style={{ opacity: 0.6, cursor: 'default' }}>No hay coincidencias en el catálogo.</div> )}
                        {!exactLangExists && langSearch.trim() !== '' && (
                          <div className="combo-item combo-add-action" onMouseDown={(e) => { e.preventDefault(); addNewItemToCatalog(langSearch, 'lang'); }}> <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}> <CheckCircle2 size={16} /> Agregar "{langSearch.trim()}" al catálogo </span> </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="skills-container">
                  {formData.languages.length === 0 ? ( <p className="empty-skills-msg">Aún no has agregado idiomas a tu currículum.</p> ) : (
                    formData.languages.map((lang, idx) => ( <span key={`lang-${idx}`} className="skill-chip soft"> {lang} <button type="button" className="skill-chip-btn" onClick={() => removeItem(lang, 'lang')} title="Eliminar"><Trash2 size={14} /></button> </span> ))
                  )}
                </div>
              </div>
            </section>

          </form>
        </div>
      </div>

    </div>
  );
}