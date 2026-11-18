import { NumberTicker } from "./number-ticker"
import { traducir, type Idioma } from "../../i18n"

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

export interface InstagramProfileProps {
  /** Muestra la barra de estado (hora, señal, batería) */
  statusBar?: boolean
  idioma?: Idioma
}

export function InstagramProfile({ statusBar = true, idioma = "es" }: InstagramProfileProps) {
  const t = (texto: string) => traducir(texto, idioma)
  return (
    <div className="ig-profile">
      <style>{CSS}</style>

      <div className="ig-scroll">
        {statusBar && (
          <div className="ig-status">
            <span className="ig-time">9:41</span>
            <span className="ig-sys">
              <svg viewBox="0 0 18 12" fill="#fff" style={{ width: "4.6cqw" }}>
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" />
              </svg>
              <svg viewBox="0 0 17 12" fill="#fff" style={{ width: "4.4cqw" }}>
                <path d="M8.5 2.2c2.3 0 4.4.9 6 2.4l1-1.1A10.4 10.4 0 0 0 8.5.6C5.700.6 3.100 1.700 1.100 3.500l1 1.100a8.800 8.800 0 0 1 6.400-2.400zm0 3.600c1.400 0 2.700.5 3.700 1.400l1-1.100a7.200 7.200 0 0 0-9.400 0l1 1.100c1-.9 2.300-1.400 3.700-1.400zm0 3.500c.6 0 1.100.2 1.500.6L8.500 11.500 7 9.900c.4-.4.900-.6 1.500-.6z" />
              </svg>
              <svg viewBox="0 0 27 13" style={{ width: "6.9cqw" }}>
                <rect x="0.5" y="0.5" width="23" height="12" rx="3.500" fill="none" stroke="#fff" opacity=".4" />
                <rect x="2" y="2" width="20" height="9" rx="2" fill="#fff" />
                <path d="M25 4.500v4c.8-.3 1.500-1.100 1.500-2s-.7-1.700-1.500-2z" fill="#fff" opacity=".5" />
              </svg>
            </span>
          </div>
        )}

        {/* ===== Cabecera ===== */}
        <div className="ig-head">
          <svg className="abs back" viewBox="0 0 24 24" {...stroke} stroke="#fff"><path d="M21 12H3M10 5l-7 7 7 7" /></svg>
          <div className="abs mid title">visitsaladas</div>

          <svg className="abs badge" viewBox="0 0 24 24">
            <g fill="#0a95f5">
              <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.2" />
              <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.2" transform="rotate(45 12 12)" />
            </g>
            <path d="M7.6 12.4l3 3 5.8-6.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <svg className="abs bell" viewBox="0 0 24 24" {...stroke} stroke="#fff">
            <path d="M18 8a6 6 0 0 0-12 0c0 6-2.5 8-2.5 8h17S18 14 18 8z" />
            <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
          </svg>
          <svg className="abs dots" viewBox="0 0 8 24" fill="#fff">
            <circle cx="4" cy="4" r="2.2" /><circle cx="4" cy="12" r="2.2" /><circle cx="4" cy="20" r="2.2" />
          </svg>

          <div className="abs avatar">
            <svg viewBox="0 0 100 100" role="img" aria-label="Visit Saladas">
              <circle cx="50" cy="50" r="50" fill="#f4f2d9" />
              <circle cx="50" cy="50" r="46.5" fill="none" stroke="#111" strokeWidth="1.6" />
              <circle cx="50" cy="50" r="43.5" fill="none" stroke="#111" strokeWidth="0.6" />
              <g fill="#111" fontFamily="'Arial Narrow','Helvetica Neue',Arial,sans-serif" fontWeight="800">
                <text x="18" y="55" fontSize="33" textLength="64" lengthAdjust="spacingAndGlyphs">VISIT</text>
                <text x="18" y="70" fontSize="17" textLength="64" lengthAdjust="spacingAndGlyphs">SALADAS</text>
              </g>
            </svg>
          </div>

          <div className="abs mid name">Visit Saladas ~ Corrientes ~ Argentina</div>
          <div className="abs mid num c1">362</div>          <div className="abs mid lbl c1">{t("publicaciones")}</div>
          <div className="abs mid num c2"><NumberTicker value={4900} className="text-white" /></div><div className="abs mid lbl c2">{t("seguidores")}</div>
          <div className="abs mid num c3">8.135</div><div className="abs mid lbl c3">{t("seguidos")}</div>

          <div className="abs mid cat">{t("Sitio web de atracciones locales y viajes")}</div>
          <div className="abs bio">
            🌿 {t("Promoción turística de Saladas, Corrientes: historia, cultura")}<br />
            {t("y naturaleza que conectan a visitantes y residentes.")}<br />
            {t("Contactanos!")} 📩
          </div>
          <div className="abs mid link">
            <svg viewBox="0 0 24 24" {...stroke} stroke="#fff">
              <path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7" />
              <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" />
            </svg>
            <span>{t("visitsaladas.tur.ar y 2 más")}</span>
          </div>
        </div>

        {/* ===== Botones ===== */}
        <div className="actions">
          <a
            className="btn btn-follow"
            href="https://www.instagram.com/visitsaladas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("Seguir a Visit Saladas en Instagram")}
          >
            {t("Seguir")}
          </a>
          <button className="btn btn-message" type="button">{t("Mensaje")}</button>
          <button className="btn btn-icon" type="button" aria-label={t("Sugerencias")}>
            <svg viewBox="0 0 24 24" {...stroke} stroke="#fff">
              <circle cx="9" cy="8" r="3.6" /><path d="M2.5 20c.4-3.6 3-5.6 6.5-5.6s6.1 2 6.5 5.6" /><path d="M19 8v6M16 11h6" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}

/* Todo en cqw (% del ancho de la pantalla): escala solo con el marco. */
const CSS = `
.ig-profile{container-type:inline-size;width:100%;height:100%;display:flex;flex-direction:column;background:#0c0f13;color:#fff;
  font-family:-apple-system,"SF Pro Text","Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-align:left}
.ig-profile *{box-sizing:border-box;margin:0;padding:0}
.ig-profile .ig-scroll{flex:1;min-height:0;overflow:hidden;user-select:text;-webkit-user-select:text}

.ig-profile .ig-status{height:15cqw;display:flex;align-items:center;justify-content:space-between;padding:0 9cqw 0 10.5cqw}
.ig-profile .ig-time{font-size:3.9cqw;font-weight:600;letter-spacing:-.01em}
.ig-profile .ig-sys{display:flex;align-items:center;gap:1.2cqw}
.ig-profile .ig-sys svg{height:auto;display:block}

.ig-profile .ig-head{position:relative;width:100%;aspect-ratio:1219/660}
.ig-profile .abs{position:absolute;white-space:nowrap}
.ig-profile .mid{transform:translateY(-50%)}
.ig-profile .back{left:3cqw;top:3.9cqw;width:5cqw;aspect-ratio:1}
.ig-profile .title{left:14.6cqw;top:5.75cqw;font-size:4.3cqw;font-weight:700;letter-spacing:-.01em}
.ig-profile .badge{left:44.8cqw;top:4.2cqw;width:3.2cqw;aspect-ratio:1}
.ig-profile .bell{left:79.6cqw;top:3.2cqw;width:4.6cqw}
.ig-profile .dots{left:91.4cqw;top:3.7cqw;width:2.2cqw;aspect-ratio:8/24}
.ig-profile .avatar{left:3.7cqw;top:11.9cqw;width:19.7cqw;height:19.7cqw;border-radius:50%;background:#26292e;padding:1.55cqw}
.ig-profile .avatar svg{width:100%;height:100%;display:block}
.ig-profile .name{left:27.1cqw;top:16.8cqw;font-size:2.95cqw;font-weight:600}
.ig-profile .num{top:22.8cqw;font-size:3.5cqw;font-weight:700}
.ig-profile .num.c2{font-size:4.8cqw;font-weight:800}
.ig-profile .lbl{top:27.1cqw;font-size:2.95cqw}
.ig-profile .c1{left:27.1cqw}.ig-profile .c2{left:54.8cqw}.ig-profile .c3{left:78.4cqw}
.ig-profile .cat{left:3.7cqw;top:33.9cqw;font-size:2.8cqw;color:#9b9cb3}
.ig-profile .bio{left:3.7cqw;top:36cqw;font-size:2.95cqw;line-height:4.02cqw}
.ig-profile .link{left:3.7cqw;top:50.9cqw;display:flex;align-items:center;gap:1.6cqw;font-size:2.95cqw;font-weight:600}
.ig-profile .link svg{width:3.3cqw;height:3.3cqw}

.ig-profile .actions{display:flex;gap:2cqw;padding:1.6cqw 3.7cqw 0}
.ig-profile .btn{height:8.6cqw;border:0;border-radius:2.6cqw;display:flex;align-items:center;justify-content:center;
  font-family:inherit;font-size:3.3cqw;font-weight:600;line-height:1;color:#fff;text-decoration:none;cursor:pointer;pointer-events:auto}
.ig-profile .btn-follow:focus-visible{outline:2px solid #fff;outline-offset:2px}
.ig-profile .btn-follow{flex:1;background:#4a5df9}
.ig-profile .btn-message{flex:1;background:#262a30}
.ig-profile .btn-icon{width:9.6cqw;flex:none;background:#262a30}
.ig-profile .btn svg{width:4.4cqw;height:4.4cqw}

`
