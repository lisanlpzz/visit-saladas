import marcosFoto from "../images/equipo/marcos-portillo.png";
import arielFoto from "../images/equipo/ariel-perucca.png";
import lisandroFoto from "../images/equipo/lisandro-lopez.png";
import anahiFoto from "../images/equipo/anahi-vera.png";
import { traducirDato, type DiccionarioLocalizado, type Idioma } from "../i18n";

type RedSocial = "instagram" | "linkedin";

interface Integrante {
  number: string;
  role: string;
  name: string;
  photo: string;
  photoAlt: string;
  description: string;
  socialLinks: { network: RedSocial; url: string }[];
}

export const equipo: Integrante[] = [
  {
    number: "01",
    role: "Fundador · Fotografía y desarrollo web",
    name: "Marcos Anselmo Portillo",
    photo: marcosFoto.src,
    photoAlt: "Marcos Anselmo Portillo",
    description:
      "Impulsa Visit Saladas con el sueño de que más personas descubran y valoren la riqueza natural, histórica y cultural de la ciudad.",
    socialLinks: [
      {
        network: "linkedin",
        url: "https://www.linkedin.com/in/marcos-anselmo-portillo-94318015/",
      },
      { network: "instagram", url: "https://www.instagram.com/marcosportillook/" },
    ],
  },
  {
    number: "02",
    role: "Estrategia digital y análisis de datos",
    name: "Ariel Perucca",
    photo: arielFoto.src,
    photoAlt: "Ariel Perucca",
    description:
      "Licenciado en Sistemas de Información y saladeño radicado en Buenos Aires, contribuye con su visión estratégica y experiencia digital.",
    socialLinks: [
      { network: "linkedin", url: "https://www.linkedin.com/in/arielperucca/" },
      { network: "instagram", url: "https://www.instagram.com/ariperucca/" },
    ],
  },
  {
    number: "03",
    role: "Diseño y desarrollo web",
    name: "Anahí Vera",
    photo: anahiFoto.src,
    photoAlt: "Anahí Vera",
    description:
      "Criada en Saladas y estudiante de Ingeniería en Sistemas de Información, aporta su pasión y conocimientos para dar vida a la plataforma.",
    socialLinks: [],
  },
  {
    number: "04",
    role: "Desarrollador web en formación",
    name: "Lisandro Lopez",
    photo: lisandroFoto.src,
    photoAlt: "Lisandro Lopez",
    description:
      "Saladeño y estudiante de Licenciatura en Sistemas de Información, colabora con el desarrollo y crecimiento digital de Visit Saladas.",
    socialLinks: [
      { network: "linkedin", url: "https://www.linkedin.com/in/lisandro-l%C3%B3pez-73a22a252/" },
      { network: "instagram", url: "https://www.instagram.com/lisanlpz/" },
    ],
  },
];

export function obtenerEquipo(idioma: Idioma): Integrante[] {
  return equipo.map((integrante) => ({
    ...integrante,
    role: traducirDato(integrante.role, idioma, traduccionesDatos),
    description: traducirDato(integrante.description, idioma, traduccionesDatos),
  }));
}

// --- Traducciones al inglés ---
const traduccionesDatos: DiccionarioLocalizado = {
  en: {
    "Fundador · Fotografía y desarrollo web": "Founder · Photography and web development",
    "Impulsa Visit Saladas con el sueño de que más personas descubran y valoren la riqueza natural, histórica y cultural de la ciudad.": "He founded Visit Saladas with the hope that more people will discover and appreciate the city's natural, historical, and cultural richness.",
    "Estrategia digital y análisis de datos": "Digital strategy and data analysis",
    "Licenciado en Sistemas de Información y saladeño radicado en Buenos Aires, contribuye con su visión estratégica y experiencia digital.": "A Saladas native based in Buenos Aires with a degree in Information Systems, he contributes his strategic perspective and digital expertise.",
    "Desarrollador web en formación": "Web developer in training",
    "Saladeño y estudiante de Licenciatura en Sistemas de Información, colabora con el desarrollo y crecimiento digital de Visit Saladas.": "A Saladas native studying for a degree in Information Systems, he contributes to Visit Saladas' development and digital growth.",
    "Diseño y desarrollo web": "Web design and development",
    "Criada en Saladas y estudiante de Ingeniería en Sistemas de Información, aporta su pasión y conocimientos para dar vida a la plataforma.": "Raised in Saladas and studying Information Systems Engineering, she brings her passion and knowledge to bring the platform to life.",
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "Fundador · Fotografía y desarrollo web": "Fundador · Fotografia e desenvolvimento web",
    "Impulsa Visit Saladas con el sueño de que más personas descubran y valoren la riqueza natural, histórica y cultural de la ciudad.": "Criou a Visit Saladas com o sonho de que mais pessoas descubram e valorizem a riqueza natural, histórica e cultural da cidade.",
    "Estrategia digital y análisis de datos": "Estratégia digital e análise de dados",
    "Licenciado en Sistemas de Información y saladeño radicado en Buenos Aires, contribuye con su visión estratégica y experiencia digital.": "Formado em Sistemas de Informação e natural de Saladas, atualmente em Buenos Aires, contribui com sua visão estratégica e experiência digital.",
    "Desarrollador web en formación": "Desenvolvedor web em formação",
    "Saladeño y estudiante de Licenciatura en Sistemas de Información, colabora con el desarrollo y crecimiento digital de Visit Saladas.": "Natural de Saladas e estudante de Sistemas de Informação, colabora com o desenvolvimento e o crescimento digital da Visit Saladas.",
    "Diseño y desarrollo web": "Design e desenvolvimento web",
    "Criada en Saladas y estudiante de Ingeniería en Sistemas de Información, aporta su pasión y conocimientos para dar vida a la plataforma.": "Criada em Saladas e estudante de Engenharia de Sistemas de Informação, contribui com sua paixão e conhecimento para dar vida à plataforma.",
  },
};
