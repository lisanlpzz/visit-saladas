import { useCallback, useEffect, useMemo, useState } from "react";
import { BusFront, Clock, Hourglass } from "lucide-react";
import { corrientesASaladas, saladasACorrientes, type HorarioColectivo } from "../../data/transporte";
import { traducir, type Idioma } from "../../i18n";

type Sentido = "corrientes-saladas" | "saladas-corrientes";
type Traductor = (texto: string) => string;

interface Viaje extends HorarioColectivo {
  clave: string;
  salidaSeg: number;
  duracionMin: number;
}

interface Itinerario {
  origen: string;
  destino: string;
  etiqueta: string;
  descripcion: string;
}

const SENTIDOS: Sentido[] = ["corrientes-saladas", "saladas-corrientes"];
const ITINERARIOS: Record<Sentido, Itinerario> = {
  "corrientes-saladas": {
    origen: "Corrientes",
    destino: "Saladas",
    etiqueta: "Hacia Saladas",
    descripcion: "De Corrientes a Saladas",
  },
  "saladas-corrientes": {
    origen: "Saladas",
    destino: "Corrientes",
    etiqueta: "Desde Saladas",
    descripcion: "De Saladas a Corrientes",
  },
};
const EMPRESAS = ["ERSA", "Expreso Sauce", "Rápido Bus"];
const SEGUNDOS_DIA = 86_400;

const pad = (n: number) => String(n).padStart(2, "0");

const aSegundos = (hora: string) => {
  const [h, m] = hora.split(":").map(Number);
  return h * 3600 + m * 60;
};

function prepararViajes(sentido: Sentido, viajes: HorarioColectivo[]): Viaje[] {
  return viajes
    .map((viaje) => {
      const salidaSeg = aSegundos(viaje.sale);
      let duracion = aSegundos(viaje.llega) - salidaSeg;
      if (duracion < 0) duracion += SEGUNDOS_DIA;
      return {
        ...viaje,
        clave: `${sentido}|${viaje.empresa}|${viaje.sale}|${viaje.llega}`,
        salidaSeg,
        duracionMin: Math.round(duracion / 60),
      };
    })
    .sort((a, b) => a.salidaSeg - b.salidaSeg);
}

const VIAJES: Record<Sentido, Viaje[]> = {
  "corrientes-saladas": prepararViajes("corrientes-saladas", corrientesASaladas),
  "saladas-corrientes": prepararViajes("saladas-corrientes", saladasACorrientes),
};

function buscarProximo(viajes: Viaje[], ahora: number) {
  const hoy = viajes.find((viaje) => viaje.salidaSeg >= ahora);
  if (hoy) return { viaje: hoy, manana: false, restante: hoy.salidaSeg - ahora };
  const primero = viajes[0];
  if (!primero) return null;
  return { viaje: primero, manana: true, restante: SEGUNDOS_DIA - ahora + primero.salidaSeg };
}

const formatoDuracion = (minutos: number) => {
  const horas = Math.floor(minutos / 60);
  return horas === 0 ? `${minutos} min` : `${horas} h ${pad(minutos % 60)} min`;
};

function textoCuentaRegresiva(segundos: number, t: Traductor) {
  const minutosTotales = Math.max(1, Math.ceil(segundos / 60));
  const horas = Math.floor(minutosTotales / 60);
  const minutos = minutosTotales % 60;
  if (horas === 0) return t("Sale en {minutos} min").replace("{minutos}", String(minutosTotales));
  if (minutos === 0) return t("Sale en {horas} h").replace("{horas}", String(horas));
  return t("Sale en {horas} h {minutos} min")
    .replace("{horas}", String(horas))
    .replace("{minutos}", String(minutos));
}

function useHoraArgentina(locale: string) {
  const formateador = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        timeZone: "America/Argentina/Cordoba",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
    [locale],
  );
  const [hora, setHora] = useState<{ hh: string; mm: string; segundos: number } | null>(null);

  useEffect(() => {
    const leer = () => {
      const partes = formateador.formatToParts(new Date());
      const obtener = (tipo: Intl.DateTimeFormatPartTypes) => partes.find((p) => p.type === tipo)?.value;
      const hh = obtener("hour");
      const mm = obtener("minute");
      const ss = obtener("second");
      if (hh === undefined || mm === undefined || ss === undefined) return;
      setHora({ hh, mm, segundos: Number(hh) * 3600 + Number(mm) * 60 + Number(ss) });
    };
    leer();
    const id = window.setInterval(leer, 15_000);
    return () => window.clearInterval(id);
  }, [formateador]);

  return hora;
}

/* ---------- Tarjetas de próxima salida (ida y vuelta) ---------- */

function TarjetaProxima({
  sentido,
  activa,
  ahora,
  onSelect,
  t,
}: {
  sentido: Sentido;
  activa: boolean;
  ahora: number | null;
  onSelect: (sentido: Sentido) => void;
  t: Traductor;
}) {
  const itinerario = ITINERARIOS[sentido];
  const proximo = ahora === null ? null : buscarProximo(VIAJES[sentido], ahora);

  return (
    <button
      type="button"
      onClick={() => onSelect(sentido)}
      aria-pressed={activa}
      className={`group relative w-full rounded-3xl border p-5 text-left transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B34D36] focus-visible:ring-offset-2 sm:p-6 md:hover:-translate-y-0.5 ${
        activa
          ? "border-[#1E3A2F] bg-[#1E3A2F] text-[#F9F6F0] shadow-lg"
          : "border-[#1E3A2F]/12 bg-white text-[#1E3A2F] shadow-sm md:hover:border-[#1E3A2F]/30 md:hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
            activa ? "bg-white/12 text-[#FFC107]" : "bg-[#1E3A2F]/6 text-[#40564A]"
          }`}
        >
          <BusFront className="size-3.5" strokeWidth={2} aria-hidden="true" />
          {t(itinerario.etiqueta)}
        </span>

        {proximo && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              proximo.manana
                ? activa
                  ? "bg-white/12 text-[#F9F6F0]"
                  : "bg-[#1E3A2F]/8 text-[#40564A]"
                : "bg-[#FFC107] text-[#1E3A2F]"
            }`}
          >
            {proximo.manana ? t("Mañana") : t("Próximo")}
          </span>
        )}
      </div>

      <p className={`mt-4 text-base font-bold ${activa ? "text-[#F9F6F0]/90" : "text-[#1E3A2F]"}`}>
        {t(itinerario.descripcion)}
      </p>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-1.5">
          {proximo ? (
            <span className="text-4xl font-extrabold leading-none tracking-tight tabular-nums sm:text-5xl">
              {proximo.viaje.sale}
            </span>
          ) : (
            <span className="inline-block h-10 w-28 animate-pulse rounded-xl bg-current opacity-10" />
          )}
          <span className="text-sm font-semibold opacity-70">hs</span>
        </div>

        {proximo && (
          <div className="text-right">
            <p className="text-base font-bold">{proximo.viaje.empresa}</p>
            <p className={`text-xs ${activa ? "text-[#F9F6F0]/70" : "text-[#40564A]"}`}>
              {t("Llega")} {proximo.viaje.llega} hs
            </p>
          </div>
        )}
      </div>

      <div
        className={`mt-4 flex items-center gap-2 border-t pt-3.5 text-sm font-semibold ${
          activa ? "border-white/15 text-[#FFC107]" : "border-[#1E3A2F]/10 text-[#B34D36]"
        }`}
      >
        <Hourglass className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        <span>{proximo ? textoCuentaRegresiva(proximo.restante, t) : t("Consultando el próximo horario...")}</span>
      </div>
    </button>
  );
}

/* ---------- Tarjeta de cada horario en la lista ---------- */

function TarjetaViaje({
  viaje,
  itinerario,
  pasado,
  proximo,
  seleccionado,
  restante,
  onClick,
  t,
}: {
  viaje: Viaje;
  itinerario: Itinerario;
  pasado: boolean;
  proximo: boolean;
  seleccionado: boolean;
  restante: number | null;
  onClick: () => void;
  t: Traductor;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={seleccionado}
      aria-current={proximo ? "true" : undefined}
      className={`group w-full rounded-2xl border p-4 text-left transition-[transform,border-color,background-color,opacity] duration-200 ease-out active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B34D36] focus-visible:ring-offset-2 sm:p-5 md:hover:-translate-y-0.5 ${
        seleccionado
          ? "border-[#FFC107] bg-[#FFF8E1] shadow-md"
          : proximo
            ? "border-[#1E3A2F]/30 bg-white shadow-sm md:hover:border-[#1E3A2F]/45"
            : "border-[#1E3A2F]/12 bg-white shadow-xs md:hover:border-[#1E3A2F]/30"
      } ${pasado && !seleccionado ? "opacity-60 md:hover:opacity-100" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-[#1E3A2F]">{viaje.empresa}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          {proximo && (
            <span className="rounded-full bg-[#FFC107] px-2.5 py-0.5 text-xs font-bold text-[#1E3A2F]">
              {t("Próximo")}
            </span>
          )}
          {pasado && !seleccionado && (
            <span className="rounded-full bg-[#1E3A2F]/6 px-2.5 py-0.5 text-xs font-semibold text-[#40564A]">
              {t("Ya salió")}
            </span>
          )}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="min-w-[4.5rem]">
          <p className="text-xs text-[#40564A]">{itinerario.origen}</p>
          <p className="mt-0.5 text-xl font-extrabold tabular-nums text-[#1E3A2F]">
            {viaje.sale} <span className="text-xs font-medium text-[#40564A]">hs</span>
          </p>
        </div>

        <div className="relative flex flex-1 flex-col items-center" aria-hidden="true">
          <div className="relative h-6 w-full">
            <span className="absolute inset-x-2 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[#1E3A2F]/15" />
            <span
              className={`absolute inset-x-2 top-1/2 h-0.5 origin-left -translate-y-1/2 rounded-full bg-[#FFC107] transition-transform duration-500 ease-out ${
                seleccionado ? "scale-x-100" : "scale-x-0"
              }`}
            />
            <span className="absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#1E3A2F]" />
            <span className="absolute right-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#B34D36]" />
            <span className="absolute inset-y-0 left-2 right-8 block">
              <span
                className={`block h-full w-full transition-transform duration-500 ease-out ${
                  seleccionado ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <span className="flex size-6 items-center justify-center rounded-full border border-[#1E3A2F]/15 bg-white text-[#1E3A2F] shadow-xs">
                  <BusFront className="size-3.5" strokeWidth={1.8} />
                </span>
              </span>
            </span>
          </div>
          <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#40564A]/80">
            <Clock className="size-3" />
            {formatoDuracion(viaje.duracionMin)}
          </span>
        </div>

        <div className="min-w-[4.5rem] text-right">
          <p className="text-xs text-[#40564A]">{itinerario.destino}</p>
          <p className="mt-0.5 text-xl font-extrabold tabular-nums text-[#1E3A2F]">
            {viaje.llega} <span className="text-xs font-medium text-[#40564A]">hs</span>
          </p>
        </div>
      </div>

      {restante !== null && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
            seleccionado ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="mt-3 flex items-center gap-2 border-t border-[#1E3A2F]/10 pt-3 text-sm font-semibold text-[#B34D36]">
              <Hourglass className="size-4 shrink-0" aria-hidden="true" />
              {restante < 0 ? t("Este horario ya pasó hoy.") : textoCuentaRegresiva(restante, t)}
            </p>
          </div>
        </div>
      )}
    </button>
  );
}

/* ---------- Componente principal ---------- */

export default function TransportePlanner({ idioma }: { idioma: Idioma }) {
  const t = useCallback<Traductor>((texto) => traducir(texto, idioma), [idioma]);
  const locale = idioma === "en" ? "en-US" : idioma === "pt-br" ? "pt-BR" : "es-AR";
  const hora = useHoraArgentina(locale);
  const ahora = hora?.segundos ?? null;

  const [sentido, setSentido] = useState<Sentido>("corrientes-saladas");
  const [empresa, setEmpresa] = useState("all");
  const [elegido, setElegido] = useState<string | null>(null);

  const itinerario = ITINERARIOS[sentido];
  const viajes = VIAJES[sentido];
  const filtrados = empresa === "all" ? viajes : viajes.filter((viaje) => viaje.empresa === empresa);
  const proximoHoy = ahora === null ? undefined : filtrados.find((viaje) => viaje.salidaSeg >= ahora);

  const cambiarSentido = (nuevo: Sentido) => {
    if (nuevo === sentido) return;
    setSentido(nuevo);
    setEmpresa("all");
    setElegido(null);
  };

  return (
    <>
      {/* Encabezado + hora actual */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 id="horarios-transporte-title" className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("Horarios de colectivos")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#40564A] sm:text-lg">
            {t("Elegí el sentido, filtrá por empresa y seleccioná una salida para ver el recorrido.")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-[#1E3A2F]/12 bg-white px-4 py-2 text-sm shadow-xs sm:self-auto">
          <Clock className="size-4 text-[#B34D36]" aria-hidden="true" />
          <span className="text-[#40564A]">{t("Hora de Argentina")}</span>
          <span className="font-bold tabular-nums text-[#1E3A2F]">
            {hora ? `${hora.hh}:${hora.mm} hs` : "--:--"}
          </span>
        </div>
      </div>

      {/* Próxima salida: ida y vuelta */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
        {SENTIDOS.map((s) => (
          <TarjetaProxima
            key={s}
            sentido={s}
            activa={s === sentido}
            ahora={ahora}
            onSelect={cambiarSentido}
            t={t}
          />
        ))}
      </div>

      {/* Controles y lista de salidas */}
      <div id="horarios-lista" className="mt-10 scroll-mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="relative grid grid-cols-2 rounded-2xl border border-[#1E3A2F]/12 bg-white p-1.5 shadow-xs sm:inline-grid"
            role="group"
            aria-label={t("Elegir sentido del viaje")}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-[#FFC107] shadow-xs transition-transform duration-300 ease-out ${
                sentido === "saladas-corrientes" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            {SENTIDOS.map((s) => {
              const activo = s === sentido;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => cambiarSentido(s)}
                  aria-pressed={activo}
                  className={`relative z-10 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B34D36] focus-visible:ring-offset-2 sm:px-4 sm:text-sm ${
                    activo ? "text-[#1E3A2F]" : "text-[#40564A] md:hover:text-[#1E3A2F]"
                  }`}
                >
                  {ITINERARIOS[s].origen} <span aria-hidden="true">→</span> {ITINERARIOS[s].destino}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label={t("Filtrar por empresa")}>
            {["all", ...EMPRESAS].map((opcion) => {
              const activa = opcion === empresa;
              const cantidad = opcion === "all" ? viajes.length : viajes.filter((viaje) => viaje.empresa === opcion).length;
              return (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => {
                    setEmpresa(opcion);
                    setElegido(null);
                  }}
                  aria-pressed={activa}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B34D36] focus-visible:ring-offset-2 ${
                    activa
                      ? "border-[#1E3A2F] bg-[#1E3A2F] text-white"
                      : "border-[#1E3A2F]/15 bg-white text-[#40564A] md:hover:border-[#1E3A2F]/35"
                  }`}
                >
                  <span>{opcion === "all" ? t("Todas") : opcion}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${activa ? "bg-white/15" : "bg-black/5"}`}>
                    {cantidad}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={`${sentido}-${empresa}`} className="mt-6">
          <h3 className="sr-only">
            {t("Horarios disponibles")}: {itinerario.origen} → {itinerario.destino}
          </h3>

          {filtrados.length > 0 ? (
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((viaje) => (
                <TarjetaViaje
                  key={viaje.clave}
                  viaje={viaje}
                  itinerario={itinerario}
                  pasado={ahora !== null && viaje.salidaSeg < ahora}
                  proximo={proximoHoy?.clave === viaje.clave}
                  seleccionado={elegido === viaje.clave}
                  restante={ahora === null ? null : viaje.salidaSeg - ahora}
                  onClick={() => setElegido(elegido === viaje.clave ? null : viaje.clave)}
                  t={t}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-[#1E3A2F]/20 p-6 text-center text-sm text-[#40564A]">
              {t("No hay salidas de esta empresa para este sentido.")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
