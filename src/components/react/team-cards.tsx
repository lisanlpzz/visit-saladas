import { traducir, type Idioma } from "../../i18n";

type SocialNetwork = "instagram" | "linkedin";

interface TeamMember {
  number: string;
  role: string;
  name: string;
  description: string;
  photo?: string;
  photoAlt?: string;
  socialLinks: { network: SocialNetwork; url: string }[];
}

interface TeamCardsProps {
  people: TeamMember[];
  idioma: Idioma;
}

function TeamCards({ people, idioma }: TeamCardsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {people.map((person) => (
        <article
          key={person.number}
          className="group relative isolate flex min-h-[22rem] w-full flex-col overflow-hidden rounded-3xl border border-[#1E3A2F]/15 bg-[#1E3A2F] p-6 text-[#F9F6F0] shadow-[0_18px_44px_-28px_rgba(0,0,0,0.42)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#B34D36]/60 hover:shadow-[0_24px_52px_-28px_rgba(30,58,47,0.5)] motion-reduce:transform-none motion-reduce:transition-none sm:p-7 md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.667rem)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 -z-10 size-56 rounded-full bg-[#FFC107]/[0.06] blur-2xl transition duration-500 group-hover:bg-[#FFC107]/[0.12] motion-reduce:transition-none"
          />
          <div className="flex items-start justify-between">
            {person.photo ? (
              <img
                src={person.photo}
                alt={person.photoAlt ?? person.name}
                className="size-[4.5rem] rounded-full border-2 border-[#FFC107]/50 object-cover object-center shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span aria-hidden="true" className="size-[4.5rem]" />
            )}
            <span className="text-xs font-bold tracking-[0.18em] text-[#F9F6F0]/45">
              {person.number}
            </span>
          </div>
          <p className="mt-8 text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-[#FFC107]">
            {person.role}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.035em] text-[#fff8e8]">
            {person.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#F9F6F0]/75">
            {person.description}
          </p>
          <nav className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${traducir("Redes sociales de", idioma)} ${person.name}`}>
            {person.socialLinks.map(({ network, url }) => {
              return (
                <a
                  key={network}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${traducir(network === "instagram" ? "Instagram de" : "LinkedIn de", idioma)} ${person.name} ${traducir("(abre en una pestaña nueva)", idioma)}`}
                  className="grid size-10 place-items-center rounded-full border border-[#FFC107]/30 text-[#FFC107] transition-colors hover:border-[#B34D36] hover:bg-[#B34D36]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC107]"
                >
                  {network === "instagram" ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.7">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
                    </svg>
                  ) : (
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
                      <path d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9.6h3.8v11.1H3.3V9.6Zm6.2 0h3.6v1.5h.1a4 4 0 0 1 3.6-2c3.9 0 4.6 2.5 4.6 5.7v5.9h-3.8v-5.2c0-1.2 0-2.8-1.8-2.8s-2.1 1.3-2.1 2.7v5.3H9.5V9.6Z" />
                    </svg>
                  )}
                </a>
              );
            })}
          </nav>
        </article>
      ))}
    </div>
  );
}

export default TeamCards;
