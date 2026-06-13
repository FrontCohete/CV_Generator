// Tipos del CV compartidos por el formulario, el generador de PDF y (a futuro)
// la capa de servicios que hablará con el backend.
// Estos tipos se extrajeron de GenCV_Build.tsx para poder reutilizarlos.

export interface Education {
  id: string;
  institution: string;
  faculty: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface Project {
  id: string;
  name: string;
  organization: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PersonalInfo {
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
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  hardSkills: string[];
  softSkills: string[];
  languages: string[];
}