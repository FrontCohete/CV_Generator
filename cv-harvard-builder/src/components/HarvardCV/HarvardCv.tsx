import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { ReactNode } from 'react';
import type { CVData, Education, Experience, Project } from '../../types/cv';

// Fuentes locales (Vite las resuelve a una URL que react-pdf puede incrustar).
import LatoRegular from '../../assets/fonts/Lato-Regular.ttf';
import LatoBold from '../../assets/fonts/Lato-Bold.ttf';
import LatoItalic from '../../assets/fonts/Lato-Italic.ttf';
import LatoBoldItalic from '../../assets/fonts/Lato-BoldItalic.ttf';

Font.register({
  family: 'Lato',
  fonts: [
    { src: LatoRegular, fontWeight: 'normal', fontStyle: 'normal' },
    { src: LatoBold, fontWeight: 'bold', fontStyle: 'normal' },
    { src: LatoItalic, fontWeight: 'normal', fontStyle: 'italic' },
    { src: LatoBoldItalic, fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

// El formato Harvard evita partir palabras con guiones.
Font.registerHyphenationCallback((word) => [word]);

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const joinNonEmpty = (parts: (string | undefined)[], sep = ' ') =>
  parts.map((p) => (p ?? '').trim()).filter(Boolean).join(sep);

// "Agosto 2018" – "Diciembre 2022"  |  "Agosto 2018 – Actualidad"
const formatRange = (start: string, end: string) => {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return '';
  if (s && !e) return `${s} – Actualidad`;
  if (!s && e) return e;
  return `${s} – ${e}`;
};

// Convierte el textarea (que ya guarda viñetas "• ") en líneas limpias,
// quitando cualquier viñeta inicial para que el PDF la dibuje con sangría.
const toBullets = (text: string): string[] =>
  (text ?? '')
    .split('\n')
    .map((line) => line.replace(/^[\s]*[•\-*]\s*/, '').trim())
    .filter(Boolean);

/* -------------------------------------------------------------------------- */
/*  Estilos                                                                    */
/* -------------------------------------------------------------------------- */

const COLORS = {
  text: '#1a1a1a',
  muted: '#555555',
  rule: '#222222',
  link: '#1a1a1a',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Lato',
    fontSize: 9.5,
    lineHeight: 1.4,
    color: COLORS.text,
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 46,
  },

  /* Encabezado */
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  contactLine: {
    fontSize: 9,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 4,
  },

  /* Resumen */
  summary: {
    fontSize: 9.5,
    textAlign: 'justify',
    marginTop: 10,
  },

  /* Secciones */
  section: { marginTop: 14 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.rule,
    paddingBottom: 2,
    marginBottom: 6,
  },

  /* Entradas (educación / experiencia / proyectos) */
  entry: { marginBottom: 8 },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryTitle: { fontSize: 10.5, fontWeight: 'bold', flex: 1, paddingRight: 8 },
  entryDates: { fontSize: 9.5, color: COLORS.muted, textAlign: 'right' },
  entrySubtitle: { fontSize: 10, fontStyle: 'italic', marginTop: 1 },
  entryMeta: { fontSize: 9, color: COLORS.muted, marginTop: 1 },

  /* Viñetas */
  bulletRow: { flexDirection: 'row', marginTop: 2, paddingRight: 4 },
  bulletDot: { width: 10, fontSize: 9.5 },
  bulletText: { flex: 1, fontSize: 9.5, textAlign: 'justify' },

  /* Skills / idiomas */
  skillGroup: { marginBottom: 3 },
  skillLabel: { fontWeight: 'bold' },

  link: { color: COLORS.link, textDecoration: 'none' },
});

/* -------------------------------------------------------------------------- */
/*  Sub-componentes                                                            */
/* -------------------------------------------------------------------------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Bullets = ({ text }: { text: string }) => (
  <>
    {toBullets(text).map((line, i) => (
      <View style={styles.bulletRow} key={i}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>{line}</Text>
      </View>
    ))}
  </>
);

const EducationEntry = ({ edu }: { edu: Education }) => (
  <View style={styles.entry}>
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{edu.institution}</Text>
      <Text style={styles.entryDates}>{formatRange(edu.startDate, edu.endDate)}</Text>
    </View>
    {!!edu.degree && <Text style={styles.entrySubtitle}>{edu.degree}</Text>}
    {!!edu.faculty && <Text style={styles.entryMeta}>{edu.faculty}</Text>}
  </View>
);

const ExperienceEntry = ({ exp }: { exp: Experience }) => (
  <View style={styles.entry}>
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{exp.company}</Text>
      <Text style={styles.entryDates}>{formatRange(exp.startDate, exp.endDate)}</Text>
    </View>
    {!!exp.role && <Text style={styles.entrySubtitle}>{exp.role}</Text>}
    <Bullets text={exp.responsibilities} />
  </View>
);

const ProjectEntry = ({ proj }: { proj: Project }) => (
  <View style={styles.entry}>
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{proj.name}</Text>
      <Text style={styles.entryDates}>{formatRange(proj.startDate, proj.endDate)}</Text>
    </View>
    {!!proj.organization && <Text style={styles.entrySubtitle}>{proj.organization}</Text>}
    {!!proj.link && (
      <Link src={proj.link} style={[styles.entryMeta, styles.link]}>
        {proj.link}
      </Link>
    )}
    <Bullets text={proj.description} />
  </View>
);

/* -------------------------------------------------------------------------- */
/*  Documento principal                                                        */
/* -------------------------------------------------------------------------- */

export default function HarvardCV({ data }: { data: CVData }) {
  const { personalInfo, education, experience, projects, hardSkills, softSkills, languages } = data;

  const fullName = joinNonEmpty([
    personalInfo.firstName,
    personalInfo.lastNameP,
    personalInfo.lastNameM,
  ]);

  const location = joinNonEmpty(
    [personalInfo.city, personalInfo.state, personalInfo.country],
    ', '
  );

  const contactBits = joinNonEmpty(
    [personalInfo.email, personalInfo.phone, location],
    '   |   '
  );

  return (
    <Document
      title={`CV - ${fullName || 'Sin nombre'}`}
      author={fullName}
      creator="CV-Gen"
    >
      <Page size="LETTER" style={styles.page}>
        {/* Encabezado */}
        <Text style={styles.name}>{fullName || 'Nombre Apellido'}</Text>
        {!!contactBits && <Text style={styles.contactLine}>{contactBits}</Text>}

        {/* Resumen / perfil */}
        {!!personalInfo.summary.trim() && (
          <Text style={styles.summary}>{personalInfo.summary.trim()}</Text>
        )}

        {/* Educación */}
        {education.length > 0 && (
          <Section title="Educación">
            {education.map((edu) => (
              <EducationEntry key={edu.id} edu={edu} />
            ))}
          </Section>
        )}

        {/* Experiencia */}
        {experience.length > 0 && (
          <Section title="Experiencia Profesional">
            {experience.map((exp) => (
              <ExperienceEntry key={exp.id} exp={exp} />
            ))}
          </Section>
        )}

        {/* Proyectos */}
        {projects.length > 0 && (
          <Section title="Proyectos">
            {projects.map((proj) => (
              <ProjectEntry key={proj.id} proj={proj} />
            ))}
          </Section>
        )}

        {/* Habilidades */}
        {(hardSkills.length > 0 || softSkills.length > 0) && (
          <Section title="Habilidades">
            {hardSkills.length > 0 && (
              <Text style={styles.skillGroup}>
                <Text style={styles.skillLabel}>Técnicas: </Text>
                {hardSkills.join('  ·  ')}
              </Text>
            )}
            {softSkills.length > 0 && (
              <Text style={styles.skillGroup}>
                <Text style={styles.skillLabel}>Blandas: </Text>
                {softSkills.join('  ·  ')}
              </Text>
            )}
          </Section>
        )}

        {/* Idiomas */}
        {languages.length > 0 && (
          <Section title="Idiomas">
            <Text>{languages.join('  ·  ')}</Text>
          </Section>
        )}
      </Page>
    </Document>
  );
}
