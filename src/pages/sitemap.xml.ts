import type { APIRoute } from "astro";
import { eventos } from "../data/eventos";
import { localizarRuta, type Idioma } from "../i18n";

const idiomas: Idioma[] = ["es", "en", "pt-br"];

const rutasBase = [
  "/",
  "/galeria/",
  "/mapa/",
  "/eventos/",
  "/nosotros/",
  "/contacto/",
  "/transporte/",
  "/alojamientos/",
  "/un-dia-en-saladas/",
];

const etiquetaHreflang = (idioma: Idioma) => (idioma === "pt-br" ? "pt-BR" : idioma);

export const GET: APIRoute = ({ site, url }) => {
  const origen = site?.origin ?? url.origin;
  const todasLasRutas = [
    ...rutasBase,
    ...eventos.map((evento) => `/evento/${evento.slug}/`),
  ];

  const entradasXml = todasLasRutas
    .flatMap((rutaBase) =>
      idiomas.map((idiomaActual) => {
        const loc = new URL(localizarRuta(rutaBase, idiomaActual), origen).href;
        const enlacesAlternativos = [
          ...idiomas.map((idiomaAlt) => {
            const href = new URL(localizarRuta(rutaBase, idiomaAlt), origen).href;
            return `    <xhtml:link rel="alternate" hreflang="${etiquetaHreflang(idiomaAlt)}" href="${href}" />`;
          }),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL(localizarRuta(rutaBase, "es"), origen).href}" />`,
        ].join("\n");

        return [
          "  <url>",
          `    <loc>${loc}</loc>`,
          enlacesAlternativos,
          "  </url>",
        ].join("\n");
      }),
    )
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entradasXml,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
