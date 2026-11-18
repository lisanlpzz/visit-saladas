import { traducciones } from "./traducciones";

export type Idioma = "es" | "en" | "pt-br";
export type DiccionarioLocalizado = Record<Exclude<Idioma, "es">, Record<string, string>>;

export function obtenerIdioma(ruta: string): Idioma {
  if (ruta === "/en" || ruta.startsWith("/en/")) return "en";
  if (ruta === "/pt-br" || ruta.startsWith("/pt-br/")) return "pt-br";
  return "es";
}

export function localizarRuta(ruta: string, idioma: Idioma): string {
  const rutaSinPrefijo = ruta.replace(/^\/(en|pt-br)(?=\/|$)/, "") || "/";
  const rutaNormalizada = rutaSinPrefijo.startsWith("/") ? rutaSinPrefijo : `/${rutaSinPrefijo}`;

  if (idioma === "es") return rutaNormalizada;
  return `/${idioma}${rutaNormalizada === "/" ? "/" : rutaNormalizada}`;
}

export function traducir(texto: string, idioma: Idioma): string {
  if (idioma === "es") return texto;
  const traduccion = traducciones[idioma][texto];
  if (traduccion === undefined) {
    throw new Error(`Falta la traducción de "${texto}" para "${idioma}".`);
  }
  return traduccion;
}

export function traducirDato(
  texto: string,
  idioma: Idioma,
  diccionario: DiccionarioLocalizado,
): string {
  if (idioma === "es") return texto;
  const traduccion = diccionario[idioma][texto];
  if (traduccion === undefined) {
    throw new Error(`Missing data translation for "${texto}" in "${idioma}".`);
  }
  return traduccion;
}
