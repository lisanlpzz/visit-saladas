import { Iphone } from "./iphone"
import { InstagramProfile } from "./instagram-profile"
import { traducir, type Idioma } from "../../i18n"

/** Fracción del alto del teléfono que se ve (0–1). */
const VISIBLE = 0.46
/** Dónde empieza el difuminado, como % de la parte visible. */
const FADE_FROM = 90

const fade = `linear-gradient(to bottom, #000 ${FADE_FROM}%, transparent 100%)`

export function PhoneCropped({ className = "", idioma = "es" }: { className?: string; idioma?: Idioma }) {
  return (
    <div
      className={`relative mx-auto w-full overflow-hidden ${className}`}
      style={{
        aspectRatio: `433 / ${882 * VISIBLE}`,
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    >
      <Iphone screen={<InstagramProfile idioma={idioma} />} />
    </div>
  )
}

export default function PhoneSection({ idioma = "es" }: { idioma?: Idioma } = {}) {
  const t = (texto: string) => traducir(texto, idioma)

  return (
    <section className="bg-white px-6 pt-24 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          {t("Descubrí Saladas desde tu celular")}
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-lg text-neutral-600 dark:text-neutral-400">
          {t("Historia, cultura y naturaleza de Saladas, Corrientes, en un solo perfil.")}
        </p>

        <PhoneCropped idioma={idioma} className="mt-16 max-w-[340px] sm:max-w-[380px]" />
      </div>
    </section>
  )
}
