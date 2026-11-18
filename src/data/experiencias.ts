import type { ImageMetadata } from "astro";
import carpincho from "../images/carpincho.webp";
import murales from "../images/mural-historico-1920.webp";
import plazaCabral from "../images/plaza-cabral.avif";
import { traducirDato, type DiccionarioLocalizado, type Idioma } from "../i18n";

interface Experiencia {
  id: string;
  title: string;
  description: string;
  photo: ImageMetadata;
  alt: string;
  cta: string;
  href: string;
}

export const experiencias: Experiencia[] = [
  {
    id: "casco-historico",
    title: "Recorré el casco histórico",
    description: "Visitá la Plaza Sargento Cabral, la iglesia San José y el museo Juan Bautista Cabral.",
    photo: plazaCabral,
    alt: "Plaza Sargento Cabral, la iglesia San José y el monumento a Juan Bautista Cabral",
    cta: "Ver en el mapa",
    href: "/mapa",
  },
  {
    id: "naturaleza",
    title: "Conectate con la naturaleza",
    description: "Caminá por el muelle de la laguna Soto, hacé avistaje de aves o disfrutá un paseo rural.",
    photo: carpincho,
    alt: "Carpincho en su hábitat natural en la laguna de Saladas",
    cta: "Planifica tu día",
    href: "/un-dia-en-saladas",
  },
  {
    id: "tradiciones",
    title: "Viví nuestras tradiciones",
    description: "Eventos, fiestas populares y costumbres que mantienen viva la identidad saladeña.",
    photo: murales,
    alt: "Mural histórico de la ciudad de Saladas",
    cta: "Ver eventos",
    href: "/eventos",
  },
];

export function obtenerExperiencias(idioma: Idioma): Experiencia[] {
  return experiencias.map((experiencia) => ({
    ...experiencia,
    title: traducirDato(experiencia.title, idioma, traduccionesDatos),
    description: traducirDato(experiencia.description, idioma, traduccionesDatos),
    alt: traducirDato(experiencia.alt, idioma, traduccionesDatos),
    cta: traducirDato(experiencia.cta, idioma, traduccionesDatos),
  }));
}

// --- Traducciones al inglés ---
const traduccionesDatos: DiccionarioLocalizado = {
  en: {
    "Recorré el casco histórico": "Explore the historic center",
    "Visitá la Plaza Sargento Cabral, la iglesia San José y el museo Juan Bautista Cabral.": "Visit Sergeant Cabral Square (Plaza Sargento Cabral), San José Church, and the Juan Bautista Cabral Museum.",
    "Plaza Sargento Cabral, la iglesia San José y el monumento a Juan Bautista Cabral": "Sergeant Cabral Square (Plaza Sargento Cabral), San José Church, and the monument to Juan Bautista Cabral",
    "Ver en el mapa": "View on the map",
    "Conectate con la naturaleza": "Connect with nature",
    "Caminá por el muelle de la laguna Soto, hacé avistaje de aves o disfrutá un paseo rural.": "Walk along the Soto Lagoon pier, go birdwatching, or enjoy a countryside outing.",
    "Carpincho en su hábitat natural en la laguna de Saladas": "Capybara in its natural habitat at the Saladas lagoon",
    "Planifica tu día": "Plan your day",
    "Viví nuestras tradiciones": "Experience our traditions",
    "Eventos, fiestas populares y costumbres que mantienen viva la identidad saladeña.": "Events, popular festivals, and traditions that keep Saladas' identity alive.",
    "Mural histórico de la ciudad de Saladas": "Historic mural in the city of Saladas",
    "Ver eventos": "View events",
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "Recorré el casco histórico": "Conheça o centro histórico",
    "Visitá la Plaza Sargento Cabral, la iglesia San José y el museo Juan Bautista Cabral.": "Visite a Praça Sargento Cabral (Plaza Sargento Cabral), a Igreja San José e o Museu Juan Bautista Cabral.",
    "Plaza Sargento Cabral, la iglesia San José y el monumento a Juan Bautista Cabral": "Praça Sargento Cabral (Plaza Sargento Cabral), Igreja San José e monumento a Juan Bautista Cabral",
    "Ver en el mapa": "Ver no mapa",
    "Conectate con la naturaleza": "Conecte-se com a natureza",
    "Caminá por el muelle de la laguna Soto, hacé avistaje de aves o disfrutá un paseo rural.": "Caminhe pelo píer da lagoa Soto, observe aves ou aproveite um passeio pelo campo.",
    "Carpincho en su hábitat natural en la laguna de Saladas": "Capivara em seu habitat natural na lagoa de Saladas",
    "Planifica tu día": "Planeje seu dia",
    "Viví nuestras tradiciones": "Viva nossas tradições",
    "Eventos, fiestas populares y costumbres que mantienen viva la identidad saladeña.": "Eventos, festas populares e costumes que mantêm viva a identidade de Saladas.",
    "Mural histórico de la ciudad de Saladas": "Mural histórico da cidade de Saladas",
    "Ver eventos": "Ver eventos",
  },
};
