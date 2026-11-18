import { traducirDato, type DiccionarioLocalizado, type Idioma } from "../i18n";

export interface HorarioColectivo {
  empresa: string;
  sale: string;
  llega: string;
}

export const corrientesASaladas: HorarioColectivo[] = [
  { empresa: "ERSA", sale: "05:45", llega: "07:45" },
  { empresa: "ERSA", sale: "11:45", llega: "13:45" },
  { empresa: "Expreso Sauce", sale: "12:30", llega: "14:20" },
  { empresa: "Rápido Bus", sale: "13:00", llega: "14:50" },
  { empresa: "Rápido Bus", sale: "17:00", llega: "18:45" },
  { empresa: "Rápido Bus", sale: "18:30", llega: "20:15" },
  { empresa: "ERSA", sale: "19:00", llega: "21:05" },
  { empresa: "Expreso Sauce", sale: "20:30", llega: "22:20" },
  { empresa: "Rápido Bus", sale: "21:15", llega: "23:05" },
];

export const saladasACorrientes: HorarioColectivo[] = [
  { empresa: "ERSA", sale: "05:30", llega: "07:35" },
  { empresa: "Expreso Sauce", sale: "05:30", llega: "07:10" },
  { empresa: "Rápido Bus", sale: "06:10", llega: "07:45" },
  { empresa: "ERSA", sale: "12:10", llega: "14:20" },
  { empresa: "Expreso Sauce", sale: "14:00", llega: "16:05" },
  { empresa: "Rápido Bus", sale: "14:30", llega: "16:00" },
  { empresa: "ERSA", sale: "17:55", llega: "20:05" },
  { empresa: "Rápido Bus", sale: "19:00", llega: "20:30" },
];

export const informacionTransporte = {
  boleteria: {
    nombre: "Boletería ERSA",
    localidad: "Saladas",
    telefono: "+543782409616",
    telefonoVisible: "3782 409616",
  },
  puertaAPuerta: {
    titulo: "Transporte puerta a puerta",
    empresa: "Minibus Sosa",
    telefonos: [
      { numero: "+543782421839", visible: "3782-421839", tipo: "fijo" },
      { numero: "+543782609445", visible: "3782609445", tipo: "celular" },
    ],
  },
  notaHorarios: "Los horarios se muestran según la página de referencia, que no especifica días de operación.",
};

// --- Traducciones al inglés ---
const traduccionesDatos: DiccionarioLocalizado = {
  en: {
    "Boletería ERSA": "ERSA ticket office",
    "Transporte puerta a puerta": "Door-to-door service",
    "fijo": "landline",
    "celular": "mobile",
    "Los horarios se muestran según la página de referencia, que no especifica días de operación.": "Schedules are based on the reference page, which does not specify operating days.",
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "Boletería ERSA": "Guichê da ERSA",
    "Transporte puerta a puerta": "Transporte porta a porta",
    "fijo": "fixo",
    "celular": "celular",
    "Los horarios se muestran según la página de referencia, que no especifica días de operación.": "Os horários são baseados na página de referência, que não informa os dias de operação.",
  },
};

export function obtenerInformacionTransporte(idioma: Idioma) {
  return {
    ...informacionTransporte,
    boleteria: {
      ...informacionTransporte.boleteria,
      nombre: traducirDato(informacionTransporte.boleteria.nombre, idioma, traduccionesDatos),
    },
    puertaAPuerta: {
      ...informacionTransporte.puertaAPuerta,
      titulo: traducirDato(informacionTransporte.puertaAPuerta.titulo, idioma, traduccionesDatos),
      telefonos: informacionTransporte.puertaAPuerta.telefonos.map((telefono) => ({
        ...telefono,
        tipo: traducirDato(telefono.tipo, idioma, traduccionesDatos),
      })),
    },
    notaHorarios: traducirDato(informacionTransporte.notaHorarios, idioma, traduccionesDatos),
  };
}
