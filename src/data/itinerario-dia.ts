import type { ImageMetadata } from "astro";
import carpincho from "../images/carpincho.webp";
import chipa from "../images/chipa.webp";
import museo from "../images/museo-juan-bautista-cabral.avif";
import costanera from "../images/garza.webp";
import { traducirDato, type DiccionarioLocalizado, type Idioma } from "../i18n";

interface MomentoDelDia {
  hora: string;
  titulo: string;
  descripcion: string;
  lugar: string;
  imagen?: ImageMetadata;
  alt?: string;
}

export const itinerarioDia: MomentoDelDia[] = [
  {
    hora: "Desayuno",
    titulo: "Un chipá para empezar",
    descripcion:
      "Hacé una parada en Cuatro Bocas y probá un chipá calentito, un clásico regional para arrancar el día con sabor correntino.",
    lugar: "Acceso de Cuatro Bocas",
    imagen: chipa,
    alt: "Chipá tradicional correntino para desayunar",
  },
  {
    hora: "Media mañana",
    titulo: "Historia entre mates",
    descripcion:
      "Recorré el casco céntrico sin apuro. Visitá el Museo Histórico Juan Bautista Cabral y paseá por la Plaza Sargento Cabral, punto de encuentro de la ciudad.",
    lugar: "Museo y Plaza Sargento Cabral",
    imagen: museo,
    alt: "Museo Histórico Juan Bautista Cabral en Saladas",
  },
  {
    hora: "Almuerzo",
    titulo: "Sabores al aire libre",
    descripcion:
      "En el Complejo Turístico Municipal hay quinchos y parrillas para compartir el almuerzo rodeado de verde, en familia o con amigos.",
    lugar: "Complejo Turístico Municipal",
    imagen: carpincho,
    alt: "Entorno natural de la laguna de Saladas",
  },
  {
    hora: "Media tarde",
    titulo: "Una pausa junto al agua",
    descripcion:
      "Cerrá el recorrido con una caminata por la costanera. Es un lugar amplio y tranquilo para contemplar el paisaje y tomar unos mates mientras cae el sol.",
    lugar: "Costanera de Saladas",
    imagen: costanera,
    alt: "Paisaje de la costanera de Saladas junto a la laguna",
  },
];

export const cierreItinerario =
  "Historia, tradición, gastronomía y naturaleza: Saladas te espera para vivir un día diferente, a tu propio ritmo.";

export function obtenerItinerarioDia(idioma: Idioma) {
  return {
    momentos: itinerarioDia.map((momento) => ({
      ...momento,
      hora: traducirDato(momento.hora, idioma, traduccionesDatos),
      titulo: traducirDato(momento.titulo, idioma, traduccionesDatos),
      descripcion: traducirDato(momento.descripcion, idioma, traduccionesDatos),
      lugar: traducirDato(momento.lugar, idioma, traduccionesDatos),
      alt: momento.alt ? traducirDato(momento.alt, idioma, traduccionesDatos) : undefined,
    })),
    cierre: traducirDato(cierreItinerario, idioma, traduccionesDatos),
  };
}

// --- Traducciones al inglés ---
const traduccionesDatos: DiccionarioLocalizado = {
  en: {
    "Desayuno": "Breakfast",
    "Un chipá para empezar": "Start the day with chipá",
    "Hacé una parada en Cuatro Bocas y probá un chipá calentito, un clásico regional para arrancar el día con sabor correntino.": "Stop at Cuatro Bocas and try warm chipá, a regional favorite and a delicious way to start the day in Corrientes.",
    "Acceso de Cuatro Bocas": "Cuatro Bocas entrance",
    "Chipá tradicional correntino para desayunar": "Traditional chipá from Corrientes for breakfast",
    "Media mañana": "Mid-morning",
    "Historia entre mates": "History over mate",
    "Recorré el casco céntrico sin apuro. Visitá el Museo Histórico Juan Bautista Cabral y paseá por la Plaza Sargento Cabral, punto de encuentro de la ciudad.": "Take your time exploring the city center. Visit the Juan Bautista Cabral Historical Museum and stroll through Sergeant Cabral Square (Plaza Sargento Cabral), a popular gathering place.",
    "Museo y Plaza Sargento Cabral": "Museum and Sergeant Cabral Square (Plaza Sargento Cabral)",
    "Museo Histórico Juan Bautista Cabral en Saladas": "Juan Bautista Cabral Historical Museum in Saladas",
    "Almuerzo": "Lunch",
    "Sabores al aire libre": "Dining outdoors",
    "En el Complejo Turístico Municipal hay quinchos y parrillas para compartir el almuerzo rodeado de verde, en familia o con amigos.": "The Municipal Tourist Complex has covered barbecue areas and grills where you can enjoy lunch surrounded by greenery, with family or friends.",
    "Complejo Turístico Municipal": "Municipal Tourist Complex",
    "Entorno natural de la laguna de Saladas": "Natural surroundings of the Saladas lagoon",
    "Media tarde": "Late afternoon",
    "Una pausa junto al agua": "A break by the water",
    "Cerrá el recorrido con una caminata por la costanera. Es un lugar amplio y tranquilo para contemplar el paisaje y tomar unos mates mientras cae el sol.": "End your outing with a walk along the waterfront. It's a peaceful, open place to take in the scenery and share mate as the sun sets.",
    "Costanera de Saladas": "Saladas waterfront",
    "Paisaje de la costanera de Saladas junto a la laguna": "Scenery along the Saladas waterfront by the lagoon",
    "Historia, tradición, gastronomía y naturaleza: Saladas te espera para vivir un día diferente, a tu propio ritmo.": "History, tradition, local food, and nature: Saladas is ready to give you a different kind of day, at your own pace.",
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "Desayuno": "Café da manhã",
    "Un chipá para empezar": "Um chipá para começar o dia",
    "Hacé una parada en Cuatro Bocas y probá un chipá calentito, un clásico regional para arrancar el día con sabor correntino.": "Faça uma parada em Cuatro Bocas e experimente um chipá quentinho, um clássico regional para começar o dia com o sabor de Corrientes.",
    "Acceso de Cuatro Bocas": "Acesso a Cuatro Bocas",
    "Chipá tradicional correntino para desayunar": "Chipá tradicional de Corrientes para o café da manhã",
    "Media mañana": "Meio da manhã",
    "Historia entre mates": "História e mate",
    "Recorré el casco céntrico sin apuro. Visitá el Museo Histórico Juan Bautista Cabral y paseá por la Plaza Sargento Cabral, punto de encuentro de la ciudad.": "Explore o centro da cidade sem pressa. Visite o Museu Histórico Juan Bautista Cabral e passeie pela Praça Sargento Cabral (Plaza Sargento Cabral), ponto de encontro da cidade.",
    "Museo y Plaza Sargento Cabral": "Museu e Praça Sargento Cabral (Plaza Sargento Cabral)",
    "Museo Histórico Juan Bautista Cabral en Saladas": "Museu Histórico Juan Bautista Cabral em Saladas",
    "Almuerzo": "Almoço",
    "Sabores al aire libre": "Sabores ao ar livre",
    "En el Complejo Turístico Municipal hay quinchos y parrillas para compartir el almuerzo rodeado de verde, en familia o con amigos.": "No Complexo Turístico Municipal há quiosques e churrasqueiras para almoçar em meio ao verde, com a família ou os amigos.",
    "Complejo Turístico Municipal": "Complexo Turístico Municipal",
    "Entorno natural de la laguna de Saladas": "Paisagem natural da lagoa de Saladas",
    "Media tarde": "Meio da tarde",
    "Una pausa junto al agua": "Uma pausa à beira d'água",
    "Cerrá el recorrido con una caminata por la costanera. Es un lugar amplio y tranquilo para contemplar el paisaje y tomar unos mates mientras cae el sol.": "Termine o passeio com uma caminhada pela orla. É um lugar amplo e tranquilo para apreciar a paisagem e tomar um mate enquanto o sol se põe.",
    "Costanera de Saladas": "Orla de Saladas",
    "Paisaje de la costanera de Saladas junto a la laguna": "Paisagem da orla de Saladas às margens da lagoa",
    "Historia, tradición, gastronomía y naturaleza: Saladas te espera para vivir un día diferente, a tu propio ritmo.": "História, tradição, gastronomia e natureza: Saladas espera por você para um dia diferente, no seu ritmo.",
  },
};
