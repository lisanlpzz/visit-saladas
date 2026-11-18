import { readFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

export const MAPA_MY_MAPS_ID = "1tj6GcL6HF5-hWzGdsnbXp8sNzzqoqRg";
export const MAPA_ORIGINAL_URL = `https://www.google.com/maps/d/viewer?mid=${MAPA_MY_MAPS_ID}`;
export const MAPA_KML_URL = `https://www.google.com/maps/d/kml?mid=${MAPA_MY_MAPS_ID}&forcekml=1`;

export type IconoCategoriaId =
  | "trees"
  | "landmark"
  | "church"
  | "bed"
  | "utensils"
  | "heart-pulse"
  | "banknote"
  | "fuel"
  | "bus"
  | "map-pin";

export interface CategoriaMapa {
  id: string;
  nombreOriginal: string;
  color: string;
  icono: IconoCategoriaId;
  cantidad: number;
}

export interface LugarMapa {
  id: string;
  nombre: string;
  categoriaId: string;
  categoriaNombre: string;
  color: string;
  icono: IconoCategoriaId;
  lat: number;
  lng: number;
  descripcion: string;
  youtubeId: string | null;
}

export interface DatosMapa {
  lugares: LugarMapa[];
  categorias: CategoriaMapa[];
}

interface ConfigCategoria {
  id: string;
  color: string;
  icono: IconoCategoriaId;
}

const CATEGORIAS_CONOCIDAS: Record<string, ConfigCategoria> = {
  "Esparcimiento y recreación": { id: "esparcimiento", color: "#0288D1", icono: "trees" },
  "Histórico - Cultural - Deportivo": { id: "historico-cultural", color: "#B34D36", icono: "landmark" },
  Religioso: { id: "religioso", color: "#7E22CE", icono: "church" },
  Alojamientos: { id: "alojamientos", color: "#C2185B", icono: "bed" },
  Gastronomía: { id: "gastronomia", color: "#D97706", icono: "utensils" },
  Salud: { id: "salud", color: "#DC2626", icono: "heart-pulse" },
  "Bancos y cajeros automáticos": { id: "bancos", color: "#795548", icono: "banknote" },
  "Estaciones de servicio": { id: "combustible", color: "#475569", icono: "fuel" },
  Transporte: { id: "transporte", color: "#CA8A04", icono: "bus" },
  Otros: { id: "otros", color: "#1E3A2F", icono: "map-pin" },
};

function crearSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodificarEntidades(texto: string): string {
  return texto
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function extraerTexto(valor: unknown): string {
  if (typeof valor === "string") return valor;
  if (typeof valor === "number") return String(valor);
  if (valor && typeof valor === "object" && "#text" in valor) {
    return String((valor as Record<string, unknown>)["#text"] ?? "");
  }
  return "";
}

function limpiarDescripcion(html: string, nombreLugar: string): string {
  if (!html) return "";
  const sinMultimedia = html
    .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, " ")
    .replace(/<img\b[^>]*>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  const limpio = decodificarEntidades(sinMultimedia)
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  if (!limpio || limpio.toLowerCase() === nombreLugar.trim().toLowerCase()) {
    return "";
  }
  return limpio;
}

function extraerYoutubeId(descripcionHtml: string, gxMediaLinks: string): string | null {
  const fuentes = [gxMediaLinks, descripcionHtml].filter(Boolean).join(" ");

  const matchYoutube = fuentes.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return matchYoutube ? matchYoutube[1] : null;
}

function parsearKml(kml: string): DatosMapa {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    trimValues: true,
    isArray: (nombre) => nombre === "Folder" || nombre === "Placemark" || nombre === "Data",
  });

  const doc = parser.parse(kml);
  const foldersRaw = doc?.kml?.Document?.Folder ?? [];
  const folders = Array.isArray(foldersRaw) ? foldersRaw : [foldersRaw];

  const lugares: LugarMapa[] = [];
  const categorias: CategoriaMapa[] = [];
  const idsUsados = new Set<string>();

  for (const folder of folders) {
    const nombreCategoria = extraerTexto(folder?.name).trim();
    if (!nombreCategoria) continue;

    const config = CATEGORIAS_CONOCIDAS[nombreCategoria] ?? {
      id: crearSlug(nombreCategoria) || "otros",
      color: "#1E3A2F",
      icono: "map-pin" as IconoCategoriaId,
    };

    const placemarksRaw = folder?.Placemark ?? [];
    const placemarks = Array.isArray(placemarksRaw) ? placemarksRaw : [placemarksRaw];
    let cantidadEnCategoria = 0;

    for (const placemark of placemarks) {
      const nombre = extraerTexto(placemark?.name).trim();
      const coordsTexto = extraerTexto(placemark?.Point?.coordinates).trim();
      if (!nombre || !coordsTexto) continue;

      const [lngStr, latStr] = coordsTexto.split(",");
      const lng = Number(lngStr);
      const lat = Number(latStr);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

      const descripcionHtml = extraerTexto(placemark?.description);
      const dataItems = placemark?.ExtendedData?.Data ?? [];
      const gxMedia = Array.isArray(dataItems)
        ? dataItems.find((d: Record<string, unknown>) => d?.["@_name"] === "gx_media_links")
        : null;
      const gxMediaLinks = extraerTexto(gxMedia?.value);

      const youtubeId = extraerYoutubeId(descripcionHtml, gxMediaLinks);
      const descripcion = limpiarDescripcion(descripcionHtml, nombre);

      const slugBase = crearSlug(nombre) || "lugar";
      let id = slugBase;
      let sufijo = 2;
      while (idsUsados.has(id)) {
        id = `${slugBase}-${sufijo++}`;
      }
      idsUsados.add(id);

      lugares.push({
        id,
        nombre,
        categoriaId: config.id,
        categoriaNombre: nombreCategoria,
        color: config.color,
        icono: config.icono,
        lat,
        lng,
        descripcion,
        youtubeId,
      });
      cantidadEnCategoria += 1;
    }

    if (cantidadEnCategoria > 0) {
      categorias.push({
        id: config.id,
        nombreOriginal: nombreCategoria,
        color: config.color,
        icono: config.icono,
        cantidad: cantidadEnCategoria,
      });
    }
  }

  return { lugares, categorias };
}

let cacheDatosMapa: Promise<DatosMapa> | null = null;

async function cargarDatosMapa(): Promise<DatosMapa> {
  let datos: DatosMapa | null = null;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const respuesta = await fetch(MAPA_KML_URL, { signal: controller.signal });
    clearTimeout(timer);

    if (respuesta.ok) {
      const kml = await respuesta.text();
      if (kml.includes("<Placemark>")) {
        const parseados = parsearKml(kml);
        if (parseados.lugares.length > 0) {
          datos = parseados;
        }
      }
    }
    if (!datos) {
      console.warn("[mapa] No se pudo obtener el KML en vivo de My Maps; se usa el respaldo local.");
    }
  } catch (error) {
    console.warn("[mapa] Error al descargar My Maps KML; se usa el respaldo local.", error);
  }

  if (!datos) {
    const kmlRespaldo = await readFile(new URL("./mapa-fallback.kml", import.meta.url), "utf-8");
    datos = parsearKml(kmlRespaldo);
  }

  return datos;
}

export function obtenerDatosMapa(): Promise<DatosMapa> {
  if (!cacheDatosMapa) {
    cacheDatosMapa = cargarDatosMapa();
  }
  return cacheDatosMapa;
}
