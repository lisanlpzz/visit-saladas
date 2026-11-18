import { useEffect, useMemo, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Banknote,
  BedDouble,
  Camera,
  ChevronLeft,
  ChevronRight,
  Church,
  Fuel,
  HeartPulse,
  Landmark,
  List,
  Map as MapIcon,
  MapPin,
  Navigation,
  Play,
  RotateCcw,
  Search,
  Trees,
  Utensils,
  X,
  Bus,
} from "lucide-react";
import type { CategoriaMapa, IconoCategoriaId, LugarMapa } from "../../data/mapa";
import { traducir, type Idioma } from "../../i18n";
import { traducciones } from "../../i18n/traducciones";

interface MapaInteractivoProps {
  lugares: LugarMapa[];
  categorias: CategoriaMapa[];
  idioma: Idioma;
}

const CENTRO_SALADAS: [number, number] = [-28.2535, -58.622];

function IconoCategoria({ icono, className = "size-4" }: { icono: IconoCategoriaId; className?: string }) {
  switch (icono) {
    case "trees":
      return <Trees className={className} aria-hidden="true" />;
    case "landmark":
      return <Landmark className={className} aria-hidden="true" />;
    case "church":
      return <Church className={className} aria-hidden="true" />;
    case "bed":
      return <BedDouble className={className} aria-hidden="true" />;
    case "utensils":
      return <Utensils className={className} aria-hidden="true" />;
    case "heart-pulse":
      return <HeartPulse className={className} aria-hidden="true" />;
    case "banknote":
      return <Banknote className={className} aria-hidden="true" />;
    case "fuel":
      return <Fuel className={className} aria-hidden="true" />;
    case "bus":
      return <Bus className={className} aria-hidden="true" />;
    default:
      return <MapPin className={className} aria-hidden="true" />;
  }
}

const SVG_PIN_PATHS: Record<IconoCategoriaId, string> = {
  trees: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>',
  landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  church: '<path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22"/><path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7"/>',
  bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>',
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  "heart-pulse": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
  banknote: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  fuel: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
};

function normalizarBusqueda(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function MapaInteractivo({ lugares, categorias, idioma }: MapaInteractivoProps) {
  const t = (texto: string) => traducir(texto, idioma);
  const tCategoria = (nombre: string) =>
    idioma === "es" ? nombre : (traducciones[idioma][nombre] ?? nombre);

  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState("");
  const [lugarSeleccionadoId, setLugarSeleccionadoId] = useState<string | null>(null);
  const [listaMovilAbierta, setListaMovilAbierta] = useState(false);
  const [indiceFoto, setIndiceFoto] = useState(0);
  const [tabMedia, setTabMedia] = useState<"fotos" | "video">("fotos");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const leafletRef = useRef<typeof LeafletNS | null>(null);
  const markersRef = useRef<Map<string, LeafletNS.Marker>>(new Map());
  const listRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const layerGroupRef = useRef<LeafletNS.LayerGroup | null>(null);

  const lugaresFiltrados = useMemo(() => {
    const query = normalizarBusqueda(busqueda);
    return lugares.filter((lugar) => {
      if (categoriaActiva !== "todas" && lugar.categoriaId !== categoriaActiva) {
        return false;
      }
      if (!query) return true;
      const nombreNorm = normalizarBusqueda(lugar.nombre);
      const catNorm = normalizarBusqueda(tCategoria(lugar.categoriaNombre));
      return nombreNorm.includes(query) || catNorm.includes(query);
    });
  }, [lugares, categoriaActiva, busqueda, idioma]);

  const lugarSeleccionado = useMemo(
    () => lugares.find((l) => l.id === lugarSeleccionadoId) ?? null,
    [lugares, lugarSeleccionadoId],
  );

  // Reiniciar estado de multimedia al cambiar de lugar
  useEffect(() => {
    setIndiceFoto(0);
    if (lugarSeleccionado) {
      setTabMedia(lugarSeleccionado.imagenes.length > 0 ? "fotos" : "video");
    }
  }, [lugarSeleccionado?.id]);

  // Inicializar Leaflet dinámicamente en el cliente
  useEffect(() => {
    let cancelado = false;

    const iniciarMapa = async () => {
      const L = await import("leaflet");
      if (cancelado || !mapContainerRef.current || mapRef.current) return;

      leafletRef.current = L;
      const map = L.map(mapContainerRef.current, {
        center: CENTRO_SALADAS,
        zoom: 14,
        zoomControl: false,
      });

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const tilePane = map.getPane("tilePane");
      if (tilePane) {
        tilePane.style.filter = "saturate(0.82) contrast(0.96) brightness(1.02)";
      }

      const group = L.layerGroup().addTo(map);
      mapRef.current = map;
      layerGroupRef.current = group;

      // Forzar renderizado de marcadores iniciales
      renderizarMarcadores(L, map, group);
    };

    const crearIcono = (L: typeof LeafletNS, lugar: LugarMapa, seleccionado: boolean) => {
      const size = seleccionado ? 40 : 32;
      const iconSize = seleccionado ? 19 : 15;
      const ring = seleccionado ? "box-shadow:0 0 0 4px #FFC107,0 8px 18px rgba(0,0,0,0.35);" : "box-shadow:0 3px 10px rgba(0,0,0,0.28);";
      const html = `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${lugar.color};border:2.5px solid #ffffff;${ring}display:flex;align-items:center;justify-content:center;color:#ffffff;transition:transform 0.2s ease;"><svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${SVG_PIN_PATHS[lugar.icono]}</svg></div>`;
      return L.divIcon({
        html,
        className: "vs-map-pin",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    };

    const renderizarMarcadores = (
      L: typeof LeafletNS,
      map: LeafletNS.Map,
      group: LeafletNS.LayerGroup,
    ) => {
      group.clearLayers();
      markersRef.current.clear();

      lugaresFiltrados.forEach((lugar) => {
        const seleccionado = lugar.id === lugarSeleccionadoId;
        const marker = L.marker([lugar.lat, lugar.lng], {
          icon: crearIcono(L, lugar, seleccionado),
          zIndexOffset: seleccionado ? 1000 : 0,
          title: lugar.nombre,
        });

        marker.on("click", () => {
          setLugarSeleccionadoId(lugar.id);
          setListaMovilAbierta(false);
          const item = listRefs.current.get(lugar.id);
          item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          map.flyTo([lugar.lat, lugar.lng], Math.max(map.getZoom(), 16), { duration: 0.55 });
        });

        marker.addTo(group);
        markersRef.current.set(lugar.id, marker);
      });

      if (!lugarSeleccionadoId && lugaresFiltrados.length > 0) {
        const bounds = L.latLngBounds(lugaresFiltrados.map((l) => [l.lat, l.lng] as [number, number]));
        map.fitBounds(bounds, { padding: [44, 44], maxZoom: 15 });
      }
    };

    iniciarMapa();

    return () => {
      cancelado = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layerGroupRef.current = null;
        markersRef.current.clear();
      }
    };
  }, []);

  // Actualizar marcadores cuando cambian los filtros o la selección
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    const group = layerGroupRef.current;
    if (!L || !map || !group) return;

    group.clearLayers();
    markersRef.current.clear();

    lugaresFiltrados.forEach((lugar) => {
      const seleccionado = lugar.id === lugarSeleccionadoId;
      const size = seleccionado ? 40 : 32;
      const iconSize = seleccionado ? 19 : 15;
      const ring = seleccionado
        ? "box-shadow:0 0 0 4px #FFC107,0 8px 18px rgba(0,0,0,0.35);"
        : "box-shadow:0 3px 10px rgba(0,0,0,0.28);";
      const html = `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:${lugar.color};border:2.5px solid #ffffff;${ring}display:flex;align-items:center;justify-content:center;color:#ffffff;transition:transform 0.2s ease;"><svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${SVG_PIN_PATHS[lugar.icono]}</svg></div>`;

      const marker = L.marker([lugar.lat, lugar.lng], {
        icon: L.divIcon({
          html,
          className: "vs-map-pin",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        }),
        zIndexOffset: seleccionado ? 1000 : 0,
        title: lugar.nombre,
      });

      marker.on("click", () => {
        setLugarSeleccionadoId(lugar.id);
        setListaMovilAbierta(false);
        const item = listRefs.current.get(lugar.id);
        item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        map.flyTo([lugar.lat, lugar.lng], Math.max(map.getZoom(), 16), { duration: 0.55 });
      });

      marker.addTo(group);
      markersRef.current.set(lugar.id, marker);
    });
  }, [lugaresFiltrados, lugarSeleccionadoId]);

  // Ajustar vista al cambiar categoría o búsqueda
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map || lugaresFiltrados.length === 0) return;

    const bounds = L.latLngBounds(lugaresFiltrados.map((l) => [l.lat, l.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [44, 44], maxZoom: 15, animate: true });
  }, [categoriaActiva, busqueda]);

  const seleccionarLugar = (lugar: LugarMapa) => {
    setLugarSeleccionadoId(lugar.id);
    setListaMovilAbierta(false);
    const map = mapRef.current;
    if (map) {
      map.flyTo([lugar.lat, lugar.lng], Math.max(map.getZoom(), 16), { duration: 0.6 });
    }
  };

  const centrarMapa = () => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    setLugarSeleccionadoId(null);
    if (lugaresFiltrados.length > 0) {
      const bounds = L.latLngBounds(lugaresFiltrados.map((l) => [l.lat, l.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [44, 44], maxZoom: 15, animate: true });
    } else {
      map.flyTo(CENTRO_SALADAS, 14);
    }
  };

  const limpiarFiltros = () => {
    setCategoriaActiva("todas");
    setBusqueda("");
    setLugarSeleccionadoId(null);
  };

  useEffect(() => {
    const el = categoriesScrollRef.current;
    if (!el) return;

    const actualizarFlechas = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    actualizarFlechas();
    el.addEventListener("scroll", actualizarFlechas, { passive: true });
    const ro = new ResizeObserver(actualizarFlechas);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", actualizarFlechas);
      ro.disconnect();
    };
  }, [categorias.length]);

  const desplazarCategorias = (direccion: -1 | 1) => {
    const el = categoriesScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direccion * 240, behavior: "smooth" });
  };

  const totalLugares = lugaresFiltrados.length;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#2a1b13]/12 bg-white shadow-[0_24px_70px_rgba(42,27,19,0.12)]">
      {/* Barra superior de búsqueda y categorías */}
      <div className="border-b border-[#2a1b13]/10 bg-[#F9F6F0]/65 p-3.5 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Buscador */}
          <div className="relative w-full lg:w-80 lg:shrink-0">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#2a1b13]/50"
            />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder={t("Buscar lugar...")}
              aria-label={t("Buscar lugar...")}
              className="h-11 w-full rounded-full border border-[#2a1b13]/15 bg-white pl-10 pr-10 text-sm text-[#2a1b13] placeholder:text-[#2a1b13]/45 focus:border-[#1E3A2F] focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]/20"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                aria-label={t("Limpiar búsqueda")}
                className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-[#2a1b13]/55 hover:bg-[#2a1b13]/10 hover:text-[#2a1b13]"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Filtros de categoría */}
          <div className="relative min-w-0 flex-1">
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => desplazarCategorias(-1)}
                aria-label="Desplazar categorías a la izquierda"
                className="absolute left-0 top-1/2 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-[#2a1b13]/15 bg-white/95 text-[#1E3A2F] shadow-md transition-colors hover:bg-white lg:grid"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
            )}
            <div
              ref={categoriesScrollRef}
              onWheel={(e) => {
                const el = categoriesScrollRef.current;
                if (!el || el.scrollWidth <= el.clientWidth) return;
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                  e.preventDefault();
                  el.scrollLeft += e.deltaY;
                }
              }}
              className={`flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                canScrollLeft ? "lg:pl-10" : ""
              } ${canScrollRight ? "lg:pr-10" : ""}`}
              data-lenis-prevent
              role="group"
              aria-label={t("Lugares para descubrir")}
            >
              <button
                type="button"
                onClick={() => setCategoriaActiva("todas")}
                aria-pressed={categoriaActiva === "todas"}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A2F] sm:text-sm ${
                  categoriaActiva === "todas"
                    ? "bg-[#1E3A2F] text-[#F9F6F0] shadow-sm"
                    : "border border-[#2a1b13]/15 bg-white text-[#2a1b13]/80 hover:border-[#1E3A2F]/40 hover:bg-white"
                }`}
              >
                <span>{t("Todos")}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] tabular-nums ${
                    categoriaActiva === "todas" ? "bg-white/15 text-white" : "bg-[#2a1b13]/8 text-[#2a1b13]/65"
                  }`}
                >
                  {lugares.length}
                </span>
              </button>

              {categorias.map((cat) => {
                const activa = categoriaActiva === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoriaActiva(activa ? "todas" : cat.id)}
                    aria-pressed={activa}
                    className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A2F] sm:text-sm ${
                      activa
                        ? "bg-[#1E3A2F] text-[#F9F6F0] shadow-sm"
                        : "border border-[#2a1b13]/15 bg-white text-[#2a1b13]/85 hover:border-[#2a1b13]/35"
                    }`}
                  >
                    <span
                      className="grid size-5 place-items-center rounded-full text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      <IconoCategoria icono={cat.icono} className="size-3" />
                    </span>
                    <span className="whitespace-nowrap">{tCategoria(cat.nombreOriginal)}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[11px] tabular-nums ${
                        activa ? "bg-white/15 text-white" : "bg-[#2a1b13]/8 text-[#2a1b13]/65"
                      }`}
                    >
                      {cat.cantidad}
                    </span>
                  </button>
                );
              })}
            </div>
            {canScrollRight && (
              <button
                type="button"
                onClick={() => desplazarCategorias(1)}
                aria-label="Desplazar categorías a la derecha"
                className="absolute right-0 top-1/2 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-[#2a1b13]/15 bg-white/95 text-[#1E3A2F] shadow-md transition-colors hover:bg-white lg:grid"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cuerpo principal: Lista lateral (desktop) + Mapa + Ficha */}
      <div className="relative grid lg:h-[min(74svh,44rem)] lg:min-h-[34rem] lg:grid-cols-[22rem_minmax(0,1fr)]">
        {/* Lista lateral Desktop */}
        <aside className="hidden flex-col overflow-hidden border-r border-[#2a1b13]/10 bg-[#fffdf9] lg:flex">
          <div className="flex items-center justify-between border-b border-[#2a1b13]/8 px-4 py-2.5 text-xs font-medium text-[#2a1b13]/60">
            <span>
              {totalLugares} {totalLugares === 1 ? t("lugar") : t("lugares")}
            </span>
            {(categoriaActiva !== "todas" || busqueda) && (
              <button
                type="button"
                onClick={limpiarFiltros}
                className="font-semibold text-[#B34D36] hover:underline"
              >
                {t("Limpiar filtros")}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2.5" data-lenis-prevent>
            {lugaresFiltrados.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-10 text-center">
                <p className="text-sm text-[#2a1b13]/65">{t("No se encontraron lugares con ese filtro.")}</p>
                <button
                  type="button"
                  onClick={limpiarFiltros}
                  className="rounded-full bg-[#FFC107] px-4 py-2 text-xs font-bold text-[#1E3A2F] hover:bg-[#e0a800]"
                >
                  {t("Limpiar filtros")}
                </button>
              </div>
            ) : (
              <ul className="space-y-1.5">
                {lugaresFiltrados.map((lugar) => {
                  const seleccionado = lugar.id === lugarSeleccionadoId;
                  const tieneMedia = lugar.imagenes.length > 0 || Boolean(lugar.youtubeId);
                  return (
                    <li key={lugar.id}>
                      <button
                        ref={(el) => {
                          if (el) listRefs.current.set(lugar.id, el);
                          else listRefs.current.delete(lugar.id);
                        }}
                        type="button"
                        onClick={() => seleccionarLugar(lugar)}
                        aria-current={seleccionado ? "true" : undefined}
                        className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A2F] ${
                          seleccionado
                            ? "bg-[#1E3A2F] text-[#F9F6F0] shadow-sm"
                            : "hover:bg-[#F9F6F0] text-[#2a1b13]"
                        }`}
                      >
                        <span
                          className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-white shadow-sm"
                          style={{ backgroundColor: lugar.color }}
                        >
                          <IconoCategoria icono={lugar.icono} className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold leading-snug">{lugar.nombre}</span>
                          <span
                            className={`mt-0.5 block truncate text-xs ${
                              seleccionado ? "text-[#F9F6F0]/75" : "text-[#2a1b13]/60"
                            }`}
                          >
                            {tCategoria(lugar.categoriaNombre)}
                          </span>
                        </span>
                        {tieneMedia && (
                          <span
                            className={`mt-1 shrink-0 rounded-full p-1 ${
                              seleccionado ? "text-[#FFC107]" : "text-[#2a1b13]/40"
                            }`}
                            aria-hidden="true"
                          >
                            {lugar.youtubeId ? <Play className="size-3.5" /> : <Camera className="size-3.5" />}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Contenedor del Mapa */}
        <div className="relative h-[62svh] min-h-[24rem] w-full bg-[#e9e2d1] lg:h-full">
          <div ref={mapContainerRef} className="z-0 h-full w-full" data-lenis-prevent />

          {/* Controles flotantes sobre el mapa */}
          <div className="pointer-events-none absolute left-3 top-3 z-[400] flex items-center gap-2">
            <button
              type="button"
              onClick={centrarMapa}
              title={t("Centrar mapa")}
              aria-label={t("Centrar mapa")}
              className="pointer-events-auto inline-flex h-10 items-center gap-2 rounded-full border border-[#2a1b13]/15 bg-white/95 px-3.5 text-xs font-semibold text-[#1E3A2F] shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A2F]"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{t("Centrar mapa")}</span>
            </button>
          </div>

          {/* Botón toggle lista/mapa en Mobile */}
          {!lugarSeleccionado && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[400] flex justify-center lg:hidden">
              <button
                type="button"
                onClick={() => setListaMovilAbierta((v) => !v)}
                className="pointer-events-auto inline-flex h-11 items-center gap-2 rounded-full bg-[#1E3A2F] px-5 text-sm font-bold text-[#F9F6F0] shadow-lg transition-transform active:scale-95"
              >
                {listaMovilAbierta ? (
                  <>
                    <MapIcon className="size-4 text-[#FFC107]" aria-hidden="true" />
                    <span>{t("Ver mapa")}</span>
                  </>
                ) : (
                  <>
                    <List className="size-4 text-[#FFC107]" aria-hidden="true" />
                    <span>
                      {t("Ver lista")} ({totalLugares})
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Panel deslizable de lista en Mobile */}
          {listaMovilAbierta && (
            <div className="absolute inset-x-0 bottom-0 top-14 z-[450] flex flex-col rounded-t-3xl border-t border-[#2a1b13]/15 bg-[#fffdf9] shadow-2xl lg:hidden">
              <div className="flex items-center justify-between border-b border-[#2a1b13]/10 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2a1b13]/60">
                  {totalLugares} {totalLugares === 1 ? t("lugar") : t("lugares")}
                </span>
                <button
                  type="button"
                  onClick={() => setListaMovilAbierta(false)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1E3A2F]/10 px-3 text-xs font-bold text-[#1E3A2F]"
                >
                  <MapIcon className="size-3.5" aria-hidden="true" />
                  {t("Ver mapa")}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3" data-lenis-prevent>
                {lugaresFiltrados.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <p className="text-sm text-[#2a1b13]/65">{t("No se encontraron lugares con ese filtro.")}</p>
                    <button
                      type="button"
                      onClick={limpiarFiltros}
                      className="rounded-full bg-[#FFC107] px-4 py-2 text-xs font-bold text-[#1E3A2F]"
                    >
                      {t("Limpiar filtros")}
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-1.5">
                    {lugaresFiltrados.map((lugar) => (
                      <li key={lugar.id}>
                        <button
                          type="button"
                          onClick={() => seleccionarLugar(lugar)}
                          className="flex w-full items-center gap-3 rounded-2xl border border-[#2a1b13]/8 bg-white p-3 text-left active:bg-[#F9F6F0]"
                        >
                          <span
                            className="grid size-8 shrink-0 place-items-center rounded-full text-white"
                            style={{ backgroundColor: lugar.color }}
                          >
                            <IconoCategoria icono={lugar.icono} className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold text-[#2a1b13]">{lugar.nombre}</span>
                            <span className="block truncate text-xs text-[#2a1b13]/60">
                              {tCategoria(lugar.categoriaNombre)}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Ficha del lugar seleccionado */}
          {lugarSeleccionado && (
            <div
              role="region"
              aria-label={lugarSeleccionado.nombre}
              className="absolute inset-x-3 bottom-3 z-[500] max-h-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-[#2a1b13]/12 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:left-4 sm:right-auto sm:w-[23rem]"
              data-lenis-prevent
            >
              {/* Multimedia (Fotos / Video YouTube) */}
              {(lugarSeleccionado.imagenes.length > 0 || lugarSeleccionado.youtubeId) && (
                <div className="relative bg-black">
                  {lugarSeleccionado.imagenes.length > 0 && lugarSeleccionado.youtubeId && (
                    <div className="absolute left-3 top-3 z-20 flex gap-1 rounded-full bg-black/65 p-1 backdrop-blur-sm">
                      <button
                        type="button"
                        onClick={() => setTabMedia("fotos")}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                          tabMedia === "fotos" ? "bg-[#FFC107] text-[#1E3A2F]" : "text-white/85 hover:text-white"
                        }`}
                      >
                        {t("Fotos")} ({lugarSeleccionado.imagenes.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setTabMedia("video")}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                          tabMedia === "video" ? "bg-[#FFC107] text-[#1E3A2F]" : "text-white/85 hover:text-white"
                        }`}
                      >
                        {t("Video")}
                      </button>
                    </div>
                  )}

                  {tabMedia === "video" && lugarSeleccionado.youtubeId ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${lugarSeleccionado.youtubeId}`}
                        title={lugarSeleccionado.nombre}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    lugarSeleccionado.imagenes.length > 0 && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E3A2F]/10">
                        <img
                          src={lugarSeleccionado.imagenes[indiceFoto] ?? lugarSeleccionado.imagenes[0]}
                          alt={lugarSeleccionado.nombre}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {lugarSeleccionado.imagenes.length > 1 && (
                          <>
                            <button
                              type="button"
                              aria-label={t("Foto anterior")}
                              onClick={() =>
                                setIndiceFoto((i) =>
                                  i === 0 ? lugarSeleccionado.imagenes.length - 1 : i - 1,
                                )
                              }
                              className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
                            >
                              <ChevronLeft className="size-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              aria-label={t("Foto siguiente")}
                              onClick={() =>
                                setIndiceFoto((i) => (i + 1) % lugarSeleccionado.imagenes.length)
                              }
                              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
                            >
                              <ChevronRight className="size-4" aria-hidden="true" />
                            </button>
                            <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                              {indiceFoto + 1} / {lugarSeleccionado.imagenes.length}
                            </span>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2a1b13]/70">
                      <span
                        className="inline-block size-2.5 rounded-full"
                        style={{ backgroundColor: lugarSeleccionado.color }}
                      />
                      {tCategoria(lugarSeleccionado.categoriaNombre)}
                    </span>
                    <h3 className="mt-1 text-lg font-extrabold leading-snug text-[#1E3A2F]">
                      {lugarSeleccionado.nombre}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLugarSeleccionadoId(null)}
                    aria-label={t("Cerrar ficha")}
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-[#2a1b13]/8 text-[#2a1b13]/75 transition-colors hover:bg-[#2a1b13]/15 hover:text-[#2a1b13]"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                {lugarSeleccionado.descripcion && (
                  <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-[#2a1b13]/75">
                    {lugarSeleccionado.descripcion}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${lugarSeleccionado.lat},${lugarSeleccionado.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#FFC107] px-4 text-sm font-bold text-[#1E3A2F] shadow-sm transition-colors hover:bg-[#e0a800] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A2F]"
                  >
                    <Navigation className="size-4" aria-hidden="true" />
                    <span>{t("Cómo llegar")}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
