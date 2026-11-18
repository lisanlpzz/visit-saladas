import type { ImageMetadata } from "astro";
import carpincho from "../images/carpincho.webp";
import costanera from "../images/costanera.avif";
import garza from "../images/garza.webp";
import garzaBlanca from "../images/garza-blanca.avif";
import museo from "../images/museo-juan-bautista-cabral.avif";
import muralHistorico from "../images/mural-historico-1920.webp";
import paseoHeroes from "../images/paseo-heroes-de-malvinas.avif";
import plazaCabral from "../images/plaza-cabral.avif";
import plazaCabo from "../images/plaza-cabo-marciano-veron.avif";
import plazaIglesia from "../images/plaza-iglesia-1920.webp";
import plazaSanMartin from "../images/plaza-san-martin.avif";
import portalMurales from "../images/portal-murales-1920.webp";
import portalSaladas from "../images/portal-saladas-1920.webp";
import paseoEstacion1 from "../images/galeria/paseo-la-estacion-1.png";
import paseoEstacion2 from "../images/galeria/paseo-la-estacion-2.png";
import paseoEstacion3 from "../images/galeria/paseo-la-estacion-3.png";
import paseoEstacion4 from "../images/galeria/paseo-la-estacion-4.png";
import paseoEstacion5 from "../images/galeria/paseo-la-estacion-5.png";
import paseoEstacion6 from "../images/galeria/paseo-la-estacion-6.png";
import { traducirDato, type DiccionarioLocalizado, type Idioma } from "../i18n";

interface GaleriaImagen {
  id: string;
  image: ImageMetadata;
  alt: string;
}

export const galeria = [
  { id: "portal-saladas", image: portalSaladas, alt: "Portal de acceso a la ciudad de Saladas" },
  { id: "portal-murales", image: portalMurales, alt: "Murales que reciben a quienes visitan Saladas" },
  { id: "plaza-san-martin", image: plazaSanMartin, alt: "Plaza San Martín de Saladas" },
  { id: "plaza-iglesia", image: plazaIglesia, alt: "Iglesia San José en Saladas" },
  { id: "plaza-cabral", image: plazaCabral, alt: "Plaza Sargento Cabral, en el centro de la ciudad" },
  { id: "monumento-cabo-marciano-veron", image: plazaCabo, alt: "Monumento a Cabo Marciano Verón" },
  { id: "paseo-heroes-malvinas", image: paseoHeroes, alt: "Paseo Héroes de Malvinas" },
  { id: "museo-juan-bautista-cabral", image: museo, alt: "Museo Histórico Juan Bautista Cabral" },
  { id: "mural-historico", image: muralHistorico, alt: "Mural histórico de Saladas" },
  { id: "garza-costanera", image: garza, alt: "Monumento a la garza en la costanera de Saladas" },
  { id: "garza-blanca", image: garzaBlanca, alt: "Garza blanca en los paisajes naturales de Saladas" },
  { id: "costanera", image: costanera, alt: "Costanera de Saladas junto a la laguna" },
  { id: "carpincho", image: carpincho, alt: "Carpincho en su hábitat natural en la laguna de Saladas" },
  { id: "paseo-estacion-1", image: paseoEstacion1, alt: "Espacios verdes del Paseo La Estación" },
  { id: "paseo-estacion-2", image: paseoEstacion2, alt: "Murales ferroviarios del Paseo La Estación" },
  { id: "paseo-estacion-3", image: paseoEstacion3, alt: "Detalle del mural ferroviario del Paseo La Estación" },
  { id: "paseo-estacion-4", image: paseoEstacion4, alt: "Vista amplia del Paseo La Estación y sus senderos" },
  { id: "paseo-estacion-5", image: paseoEstacion5, alt: "Juegos infantiles y tanque de agua en el Paseo La Estación" },
  { id: "paseo-estacion-6", image: paseoEstacion6, alt: "Tanque de agua y juegos del Paseo La Estación" },
].map(({ id, image, alt }: GaleriaImagen) => ({
  id,
  img: image.src,
  alt,
  width: image.width,
  height: image.height,
}));

export function obtenerGaleria(idioma: Idioma) {
  return galeria.map((imagen) => ({
    ...imagen,
    alt: traducirDato(imagen.alt, idioma, traduccionesDatos),
  }));
}

// --- Traducciones al inglés ---
const traduccionesDatos: DiccionarioLocalizado = {
  en: {
    "Portal de acceso a la ciudad de Saladas": "Gateway to the city of Saladas",
    "Murales que reciben a quienes visitan Saladas": "Murals welcoming visitors to Saladas",
    "Plaza San Martín de Saladas": "San Martín Square in Saladas",
    "Iglesia San José en Saladas": "San José Church in Saladas",
    "Plaza Sargento Cabral, en el centro de la ciudad": "Sergeant Cabral Square in the city center (Plaza Sargento Cabral)",
    "Monumento a Cabo Marciano Verón": "Monument to Corporal Marciano Verón",
    "Paseo Héroes de Malvinas": "Malvinas Heroes Walk",
    "Museo Histórico Juan Bautista Cabral": "Juan Bautista Cabral Historical Museum",
    "Mural histórico de Saladas": "Historic mural in Saladas",
    "Monumento a la garza en la costanera de Saladas": "Heron monument on the Saladas waterfront",
    "Garza blanca en los paisajes naturales de Saladas": "Great egret in Saladas' natural landscape",
    "Costanera de Saladas junto a la laguna": "Saladas waterfront by the lagoon",
    "Carpincho en su hábitat natural en la laguna de Saladas": "Capybara in its natural habitat at the Saladas lagoon",
    "Espacios verdes del Paseo La Estación": "Green spaces at La Estación Walk",
    "Murales ferroviarios del Paseo La Estación": "Railway murals at La Estación Walk",
    "Detalle del mural ferroviario del Paseo La Estación": "Detail of the railway mural at La Estación Walk",
    "Vista amplia del Paseo La Estación y sus senderos": "Wide view of La Estación Walk and its paths",
    "Juegos infantiles y tanque de agua en el Paseo La Estación": "Playground and water tower at La Estación Walk",
    "Tanque de agua y juegos del Paseo La Estación": "Water tower and playground at La Estación Walk",
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "Portal de acceso a la ciudad de Saladas": "Portal de entrada da cidade de Saladas",
    "Murales que reciben a quienes visitan Saladas": "Murais que dão boas-vindas a quem visita Saladas",
    "Plaza San Martín de Saladas": "Praça San Martín de Saladas",
    "Iglesia San José en Saladas": "Igreja San José em Saladas",
    "Plaza Sargento Cabral, en el centro de la ciudad": "Praça Sargento Cabral, no centro da cidade (Plaza Sargento Cabral)",
    "Monumento a Cabo Marciano Verón": "Monumento ao Cabo Marciano Verón",
    "Paseo Héroes de Malvinas": "Passeio Heróis das Malvinas",
    "Museo Histórico Juan Bautista Cabral": "Museu Histórico Juan Bautista Cabral",
    "Mural histórico de Saladas": "Mural histórico de Saladas",
    "Monumento a la garza en la costanera de Saladas": "Monumento à garça na orla de Saladas",
    "Garza blanca en los paisajes naturales de Saladas": "Garça-branca na paisagem natural de Saladas",
    "Costanera de Saladas junto a la laguna": "Orla de Saladas à beira da lagoa",
    "Carpincho en su hábitat natural en la laguna de Saladas": "Capivara em seu habitat natural na lagoa de Saladas",
    "Espacios verdes del Paseo La Estación": "Áreas verdes do Passeio La Estación",
    "Murales ferroviarios del Paseo La Estación": "Murais ferroviários do Passeio La Estación",
    "Detalle del mural ferroviario del Paseo La Estación": "Detalhe do mural ferroviário do Passeio La Estación",
    "Vista amplia del Paseo La Estación y sus senderos": "Vista ampla do Passeio La Estación e seus caminhos",
    "Juegos infantiles y tanque de agua en el Paseo La Estación": "Parquinho e caixa d'água no Passeio La Estación",
    "Tanque de agua y juegos del Paseo La Estación": "Caixa d'água e parquinho no Passeio La Estación",
  },
};
