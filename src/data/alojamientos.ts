import type { ImageMetadata } from "astro";
import cheRoga from "../images/alojamientos/che-roga.avif";
import hotelFlorida from "../images/alojamientos/hotel-florida.avif";
import villaRaquel from "../images/alojamientos/alojamiento-villa-raquel.avif";
import { traducirDato, type DiccionarioLocalizado, type Idioma } from "../i18n";

interface Alojamiento {
  nombre: string;
  descripcion: string;
  imagen: ImageMetadata;
  alt: string;
  esLogo: boolean;
  url: string;
}

export const alojamientos: Alojamiento[] = [
  {
    nombre: "Che Roga Dúplex",
    descripcion: "Un espacio tipo dúplex para disfrutar tu estadía en Saladas.",
    imagen: cheRoga,
    alt: "Alojamiento Che Roga Dúplex",
    esLogo: true,
    url: "https://www.instagram.com/cherogaduplex/",
  },
  {
    nombre: "Cabaña en Saladas",
    descripcion: "Cabaña diseñada para disfrutar la naturaleza.",
    imagen: villaRaquel,
    alt: "Cabaña rodeada de naturaleza en Saladas",
    esLogo: false,
    url: "https://www.airbnb.com.ar/rooms/52879071?source_impression_id=p3_1768454156_P3WHs3u7JsZYj_D",
  },
  {
    nombre: "Hotel Florida",
    descripcion: "Una opción de hospedaje para descansar y disfrutar Saladas.",
    imagen: hotelFlorida,
    alt: "Hotel Florida de Saladas",
    esLogo: true,
    url: "https://www.instagram.com/hotelfloridasaladas/",
  },
];

export function obtenerAlojamientos(idioma: Idioma): Alojamiento[] {
  return alojamientos.map((alojamiento) => ({
    ...alojamiento,
    descripcion: traducirDato(alojamiento.descripcion, idioma, traduccionesDatos),
    alt: traducirDato(alojamiento.alt, idioma, traduccionesDatos),
  }));
}

// --- Traducciones al inglés ---
const traduccionesDatos: DiccionarioLocalizado = {
  en: {
    "Un espacio tipo dúplex para disfrutar tu estadía en Saladas.": "A duplex-style space for a comfortable stay in Saladas.",
    "Alojamiento Che Roga Dúplex": "Che Roga Dúplex accommodation",
    "Cabaña diseñada para disfrutar la naturaleza.": "A cabin designed for enjoying the outdoors.",
    "Cabaña rodeada de naturaleza en Saladas": "A cabin surrounded by nature in Saladas",
    "Una opción de hospedaje para descansar y disfrutar Saladas.": "A place to stay, relax, and enjoy Saladas.",
    "Hotel Florida de Saladas": "Hotel Florida in Saladas",
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "Un espacio tipo dúplex para disfrutar tu estadía en Saladas.": "Um espaço no estilo duplex para aproveitar sua estadia em Saladas.",
    "Alojamiento Che Roga Dúplex": "Hospedagem Che Roga Dúplex",
    "Cabaña diseñada para disfrutar la naturaleza.": "Cabana planejada para aproveitar a natureza.",
    "Cabaña rodeada de naturaleza en Saladas": "Cabana cercada pela natureza em Saladas",
    "Una opción de hospedaje para descansar y disfrutar Saladas.": "Uma opção de hospedagem para descansar e aproveitar Saladas.",
    "Hotel Florida de Saladas": "Hotel Florida de Saladas",
  },
};
