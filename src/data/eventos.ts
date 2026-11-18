import type { ImageMetadata } from "astro";
import aniversario from "../images/eventos/portadas/aniversario-de-la-ciudad.webp";
import carnavales from "../images/eventos/portadas/carnavales.webp";
import fiestaMiel from "../images/eventos/portadas/fiesta-de-la-miel.webp";
import sanJose from "../images/eventos/portadas/fiesta-patronal-san-jose.webp";
import gauchitoGil from "../images/eventos/portadas/gauchito-gil.webp";
import gauchoLega from "../images/eventos/portadas/gaucho-lega.webp";
import sargentoCabral from "../images/eventos/portadas/paso-inmortalidad-sgto-cabral.webp";
import sanBaltazar from "../images/eventos/portadas/san-baltazar.webp";
import virgenItati from "../images/eventos/portadas/virgen-de-itati.webp";
import aves from "../images/eventos/aves-con-pichones/FF4_2239.avif";
import type { Idioma } from "../i18n";

export interface Evento {
  slug: string;
  nombre: string;
  fecha: string;
  fechaISO: string | null;
  lugar: string;
  resumen: string;
  descripcion: string[];
  portada: ImageMetadata;
  alt: string;
  galeria: string;
}

export const eventos: Evento[] = [
  {
    slug: "fiesta-provincial-de-la-miel-y-el-desarrollo-emprendedor",
    nombre: "Fiesta Provincial de la Miel y el Desarrollo Emprendedor",
    fecha: "Tercer fin de semana de octubre de 2026",
    fechaISO: "2026-10-16",
    lugar: "Complejo Turístico Municipal",
    resumen: "Un encuentro que celebra la apicultura, la producción regional y el talento emprendedor.",
    descripcion: [
      "El origen de esta fiesta se remonta a 1999, cuando jóvenes de la Cooperativa Apícola Los Azahares organizaron una jornada provincial para compartir conocimientos sobre la producción de miel. Apostaron a la apicultura como una oportunidad de trabajo local y una alternativa para que los jóvenes pudieran desarrollar su futuro en Saladas.",
      "El crecimiento de aquellas jornadas llevó a que la celebración recibiera reconocimiento provincial en 2001, mediante el Decreto Nº 383. Con el tiempo, el encuentro técnico se convirtió en una fiesta popular de octubre en el Complejo Turístico Municipal.",
      "A la apicultura se sumaron la Expo Saladas, con su muestra comercial y productiva, la elección de representantes y los espectáculos musicales. En 2024, en su 21.ª edición, el nombre incorporó oficialmente el desarrollo emprendedor y dio mayor visibilidad a productores, artesanos y emprendedores locales.",
    ],
    portada: fiestaMiel,
    alt: "Fiesta Provincial de la Miel en Saladas",
    galeria: "fiesta-de-la-miel",
  },
  {
    slug: "aniversario-de-la-ciudad",
    nombre: "Aniversario de Saladas",
    fecha: "19 de noviembre de 2026",
    fechaISO: "2026-11-19",
    lugar: "Plaza Sargento Cabral",
    resumen: "Una celebración de la historia, la identidad y el presente de la comunidad saladeña.",
    descripcion: [
      "Saladas es conocida como la Cuna de Héroes por ser el lugar natal del Sargento Juan Bautista Cabral. Su historia también está vinculada con figuras correntinas como el coronel Marcos Azcona y Juan Gregorio Pujol, y con acontecimientos como el levantamiento de los comuneros.",
      "Aunque los registros mencionan la existencia de una guardia o fortín en la zona desde 1707, el aniversario se conmemora el 19 de noviembre de 1732, fecha relacionada con la llegada del primer cura párroco, León Pesoa y Figueroa. Las autoridades locales adoptaron ese hito como referencia fundacional en 1989.",
      "Cada aniversario enlaza esa memoria con la identidad viva de la ciudad: su comunidad, el chamamé y las tradiciones que siguen dando forma a Saladas.",
    ],
    portada: aniversario,
    alt: "Celebración del aniversario de Saladas",
    galeria: "aniversario-ciudad",
  },
  {
    slug: "fiesta-de-la-virgen-de-itati",
    nombre: "Fiesta de la Virgen de Itatí",
    fecha: "8 de diciembre de 2026",
    fechaISO: "2026-12-08",
    lugar: "Capilla Doña Panchita, Barrio Itatí",
    resumen: "Vecinos y visitantes se reúnen para honrar a la Reina del Paraná.",
    descripcion: [
      "En el barrio Itatí, la comunidad mantiene viva su devoción a María de Itatí en la capilla conocida como Doña Panchita. La fiesta del 8 de diciembre reúne a vecinos en torno a la Inmaculada Concepción y a la figura de la Virgen, venerada en Corrientes como Reina del Paraná.",
      "La celebración se extiende durante dos días y combina encuentros comunitarios con actividades religiosas. Al comenzar el 8 de diciembre, una caravana recorre las calles con la imagen para acompañar y bendecir al pueblo; durante la jornada también se realizan instancias de catequesis y bautismos.",
      "La procesión solemne por el barrio y la misa central reúnen a los fieles en el momento principal de la fiesta. La participación es libre y gratuita, y la tradición fortalece los lazos entre la capilla y la comunidad saladeña.",
    ],
    portada: virgenItati,
    alt: "Celebración de la Virgen de Itatí en Saladas",
    galeria: "virgen-itati",
  },
  {
    slug: "avistando-aves-con-pichones",
    nombre: "Pajareando con Pichones",
    fecha: "2 de enero de 2027",
    fechaISO: "2027-01-02",
    lugar: "Complejo Turístico Municipal",
    resumen: "Una propuesta para que chicos y familias descubran el mundo de las aves.",
    descripcion: [
      "Pajareando con Pichones acerca la observación de aves a las nuevas generaciones con una propuesta pensada para niños de 6 a 12 años y sus familias.",
      "La iniciativa reúne a Visit Saladas y a los Avistadores de Aves de Mburucuyá en el entorno natural del Complejo Turístico Municipal. El paseo invita a descubrir la diversidad de aves que habita la zona.",
      "Durante la recorrida, los participantes observan especies y aprenden sobre sus hábitos, nidos y el cuidado de su ambiente. Así, la experiencia combina recreación familiar con el interés por la naturaleza local.",
    ],
    portada: aves,
    alt: "Observación de aves en una actividad de Pajareando con Pichones",
    galeria: "aves-con-pichones",
  },
  {
    slug: "san-baltasar",
    nombre: "San Baltasar",
    fecha: "6 de enero de 2027",
    fechaISO: "2027-01-06",
    lugar: "Predio Polo Borda",
    resumen: "Una tradición de música, danza y devoción transmitida por generaciones.",
    descripcion: [
      "La devoción a San Baltasar, también llamado Santo Kambá, es una tradición religiosa y cultural de larga presencia en Corrientes, especialmente ligada a las comunidades afrodescendientes del Litoral. Sus celebraciones conservan expresiones musicales y danzas de raíces africanas, como charandas, zembas y candombes.",
      "En Saladas, el festejo del 6 de enero tiene como centro una imagen de madera que, según la memoria local, llegó a la familia Borda en 1948. La familia asumió su cuidado y sostuvo una costumbre en la que la imagen visitaba los hogares de devotos para recibir sus colaboraciones.",
      "La reunión anual en el Predio Polo Borda mantiene vivo ese legado compartido. La música, la danza y la participación de vecinos y visitantes hacen de la fecha una expresión singular de la identidad saladeña.",
    ],
    portada: sanBaltazar,
    alt: "Celebración tradicional de San Baltasar en Saladas",
    galeria: "san-baltasar",
  },
  {
    slug: "gauchito-gil",
    nombre: "Gauchito Gil",
    fecha: "8 de enero de 2027",
    fechaISO: "2027-01-08",
    lugar: "Barrio Vélez Sarsfield",
    resumen: "Una expresión de devoción popular que convoca a la comunidad.",
    descripcion: [
      "Antonio Mamerto Gil Núñez, conocido como Gauchito Gil, habría nacido en Pay Ubre, cerca de Mercedes. Fue un peón rural y, según la tradición popular, participó en la Guerra de la Triple Alianza antes de convertirse en un gaucho justiciero que defendía a los más humildes.",
      "El relato cuenta que abandonó el ejército para evitar enfrentarse con sus compatriotas y que por ello fue perseguido. La historia sitúa su muerte el 8 de enero de 1878, en las afueras de Mercedes; también narra que anunció a su verdugo la curación de un hijo, origen de uno de los primeros relatos de milagro asociados a su figura.",
      "Su devoción, popular y ajena al santoral oficial, se expresa en altares y velas rojas junto a los caminos. En Saladas, el homenaje del barrio Vélez Sarsfield forma parte de una tradición correntina de fe, promesas y agradecimiento.",
    ],
    portada: gauchitoGil,
    alt: "Homenaje al Gauchito Gil en Saladas",
    galeria: "gauchito-gil",
  },
  {
    slug: "carnavales",
    nombre: "Carnavales",
    fecha: "Enero de 2027 · fechas a confirmar",
    fechaISO: null,
    lugar: "Corsódromo Pedro Pablo Ignacio, Complejo Turístico Municipal",
    resumen: "Comparsas, música y color llenan de alegría el verano saladeño.",
    descripcion: [
      "El carnaval saladeño nació en los barrios, como una celebración espontánea. En las décadas de 1960 y 1970, las máscaras sueltas y los juegos con agua animaban las calles; más adelante, los corsos de la calle Mitre se hicieron célebres por la cercanía entre comparseros y público.",
      "Con los años surgieron agrupaciones que marcaron distintas generaciones. La rivalidad entre Coé Berá y Carisma Show se convirtió en un clásico, junto con comparsas como Cristal de Luna. New Porá, que comenzó como una agrupación infantil, llegó a competir en la categoría mayor, mientras que Iberá y las agrupaciones musicales Sambatuque y Xangó renovaron la escena.",
      "El 9 de febrero de 2013 se inauguró el Corsódromo Pedro Pablo Ignacio, llamado así en homenaje a un artista plástico local. Su instalación en el Complejo Turístico Municipal, junto a la Laguna Soto, dio al carnaval un espacio con mayor infraestructura para recibir a comparseros y visitantes.",
    ],
    portada: carnavales,
    alt: "Comparsas en los carnavales de Saladas",
    galeria: "carnavales",
  },
  {
    slug: "paso-a-la-inmortalidad-del-sargento-cabral",
    nombre: "Paso a la inmortalidad del Sargento Cabral",
    fecha: "3 de febrero de 2027",
    fechaISO: "2027-02-03",
    lugar: "Plaza Sargento Cabral",
    resumen: "Un homenaje al héroe saladeño que dio su vida en el Combate de San Lorenzo.",
    descripcion: [
      "Juan Bautista Cabral nació a fines del siglo XVIII en las afueras de Saladas, en el paraje que hoy se conoce como Colonia Cabral. De ascendencia afroindígena, era hijo de Carmen Robledo y de un padre guaraní. Al incorporarse al ejército en 1812 adoptó el apellido Cabral y se integró al recién creado Regimiento de Granaderos a Caballo.",
      "El 3 de febrero de 1813, durante el Combate de San Lorenzo, el caballo de José de San Martín cayó y lo dejó atrapado. Cabral acudió en su ayuda, logró liberarlo y quedó gravemente herido. Fue trasladado al Convento de San Carlos, que funcionaba como hospital, donde murió a causa de las heridas.",
      "La tradición conserva las palabras de despedida que se le atribuyen en guaraní y recuerda que San Martín honró su sacrificio con una inscripción dedicada al soldado. Aunque murió sin ese grado, la memoria colectiva lo reconoció como sargento. Cada 3 de febrero, Saladas rinde homenaje a quien considera uno de sus héroes máximos.",
    ],
    portada: sargentoCabral,
    alt: "Acto en homenaje al Sargento Juan Bautista Cabral",
    galeria: "inmortalidad-sargento-cabral",
  },
  {
    slug: "fiesta-patronal-san-jose",
    nombre: "Fiesta Patronal de San José",
    fecha: "19 de marzo de 2027",
    fechaISO: "2027-03-19",
    lugar: "Parroquia San José",
    resumen: "Una tradición de fe ligada a los orígenes de Saladas.",
    descripcion: [
      "La relación de Saladas con San José de Nazaret forma parte de la historia religiosa de la ciudad. Un documento fechado el 30 de septiembre de 1742 ya menciona el Fuerte de San José, nombre asociado con los orígenes de la localidad y su posterior denominación como San José de las Saladas.",
      "La tradición sostiene que, poco después de 1732, un estanciero donó una imagen de San José al primer rector del Curato de las Saladas para la capilla. Desde 1955, el 19 de marzo quedó establecido como fecha de la fiesta patronal y feriado local.",
      "La procesión y la misa reúnen cada año a la comunidad. También perdura el locro de San José, una comida compartida que tomó el lugar de la antigua costumbre de donar carne a las familias necesitadas y conserva el sentido solidario de la celebración.",
    ],
    portada: sanJose,
    alt: "Celebración de la Fiesta Patronal de San José",
    galeria: "fiesta-patronal-san-jose",
  },
  {
    slug: "fiesta-del-gaucho-lega",
    nombre: "Fiesta del Gaucho Lega",
    fecha: "23 de mayo de 2027",
    fechaISO: "2027-05-23",
    lugar: "Barrio 2 de Noviembre",
    resumen: "Una tradición de fe popular en homenaje al Gaucho Lega.",
    descripcion: [
      "Olegario Álvarez, llamado Gaucho Lega o Leguita, nació en Saladas en 1871. En una época de fuertes enfrentamientos políticos, perteneció al Partido Autonomista y trabajó como sargento de policía. Tras verse envuelto en conflictos, fue condenado a prisión perpetua.",
      "En 1904 escapó de la Penitenciaría de Corrientes junto con otros fugitivos. La leyenda que creció alrededor de su figura lo retrata como un justiciero que quitaba a los ricos para ayudar a los pobres. Murió a los 35 años, el 23 de mayo de 1906, durante un enfrentamiento policial en Rincón de Luna.",
      "Después de su muerte, su sepulcro en el cementerio de Saladas se convirtió en un sitio de devoción popular. Las velas y prendas rojas recuerdan tanto la tradición ligada a su figura como su afiliación política; cada 23 de mayo, promeseros llegan a rendirle homenaje.",
    ],
    portada: gauchoLega,
    alt: "Celebración en homenaje al Gaucho Lega",
    galeria: "fiesta-gaucho-lega",
  },
];

export function obtenerEventos(idioma: Idioma): Evento[] {
  if (idioma === "es") return eventos;

  return eventos.map((evento) => {
    const textos = eventosLocalizados[idioma][evento.slug];
    if (!textos) throw new Error(`Falta la traducción del evento "${evento.slug}" para "${idioma}".`);
    return { ...evento, ...textos };
  });
}

// --- Traducciones de eventos ---
export interface TextoEvento {
  nombre: string;
  fecha: string;
  lugar: string;
  resumen: string;
  descripcion: [string, string, string];
  alt: string;
}

export const eventosLocalizados: Record<"en" | "pt-br", Record<string, TextoEvento>> = {
  // Traducciones al inglés.
  en: {
    "fiesta-provincial-de-la-miel-y-el-desarrollo-emprendedor": {
      nombre: "Provincial Honey and Entrepreneurship Festival",
      fecha: "Third weekend of October 2026",
      lugar: "Municipal Tourist Complex",
      resumen: "A celebration of beekeeping, regional products, and local entrepreneurship.",
      descripcion: [
        "The festival began in 1999, when young members of the Los Azahares Beekeepers' Cooperative organized a provincial event to share their knowledge of honey production. They saw beekeeping as a source of local jobs and a way for young people to build a future in Saladas.",
        "The event grew and received provincial recognition in 2001 under Decree No. 383. Over time, the technical gathering evolved into a popular October festival at the Municipal Tourist Complex.",
        "Alongside beekeeping, the program now includes Expo Saladas, showcasing local businesses and production, as well as pageants and live music. In 2024, its 21st edition officially added entrepreneurship to its name, bringing greater visibility to local producers, artisans, and business owners.",
      ],
      alt: "Provincial Honey Festival in Saladas",
    },
    "aniversario-de-la-ciudad": {
      nombre: "Saladas Anniversary",
      fecha: "November 19, 2026",
      lugar: "Sergeant Cabral Square (Plaza Sargento Cabral)",
      resumen: "A celebration of Saladas' history, identity, and present-day community.",
      descripcion: [
        "Saladas is known as the Cradle of Heroes because it is the birthplace of Sergeant Juan Bautista Cabral. Its history is also linked to Corrientes figures such as Colonel Marcos Azcona and Juan Gregorio Pujol, as well as events like the Comuneros uprising.",
        "Records mention a guard post or fort in the area as early as 1707, but the city celebrates its anniversary on November 19, 1732, the date associated with the arrival of its first parish priest, León Pesoa y Figueroa. Local authorities adopted this milestone as the city's founding reference in 1989.",
        "Each anniversary connects that history with the city's living identity: its people, chamamé music, and traditions that continue to shape Saladas.",
      ],
      alt: "Saladas anniversary celebration",
    },
    "fiesta-de-la-virgen-de-itati": {
      nombre: "Our Lady of Itatí Festival",
      fecha: "December 8, 2026",
      lugar: "Doña Panchita Chapel, Itatí neighborhood",
      resumen: "Residents and visitors gather to honor the Queen of the Paraná.",
      descripcion: [
        "In the Itatí neighborhood, the community keeps its devotion to Our Lady of Itatí alive at the chapel known as Doña Panchita. The December 8 festival brings neighbors together to celebrate the Immaculate Conception and the Virgin, revered in Corrientes as the Queen of the Paraná.",
        "The celebration lasts two days and combines community gatherings with religious activities. At the start of December 8, a procession carries the image through the streets to bless the town. The day also includes catechism sessions and baptisms.",
        "The solemn neighborhood procession and main Mass are the highlights of the festival. Attendance is free, and this tradition strengthens the bond between the chapel and the people of Saladas.",
      ],
      alt: "Our Lady of Itatí celebration in Saladas",
    },
    "avistando-aves-con-pichones": {
      nombre: "Birdwatching with the Little Ones",
      fecha: "January 2, 2027",
      lugar: "Municipal Tourist Complex",
      resumen: "An invitation for children and families to discover the world of birds.",
      descripcion: [
        "Birdwatching with the Little Ones introduces a new generation to birdwatching through an activity designed for children ages 6 to 12 and their families.",
        "Visit Saladas and the Mburucuyá Birdwatchers host the outing in the natural surroundings of the Municipal Tourist Complex. It invites participants to discover the area's diverse birdlife.",
        "Along the way, participants spot different species and learn about their habits, nests, and habitats. The experience combines family fun with an appreciation for local nature.",
      ],
      alt: "Birdwatching during the Birdwatching with the Little Ones activity",
    },
    "san-baltasar": {
      nombre: "San Baltasar",
      fecha: "January 6, 2027",
      lugar: "Polo Borda grounds",
      resumen: "A tradition of music, dance, and devotion passed down through generations.",
      descripcion: [
        "Devotion to San Baltasar, also known as Santo Kambá, has deep religious and cultural roots in Corrientes, especially among Afro-descendant communities in the Littoral region. Celebrations preserve musical and dance traditions of African origin, including charandas, zembas, and candombes.",
        "In Saladas, the January 6 celebration centers on a wooden image that, according to local memory, came to the Borda family in 1948. The family took responsibility for it and maintained the custom of bringing the image to devotees' homes to receive their offerings.",
        "The annual gathering at the Polo Borda grounds keeps this shared legacy alive. Music, dance, and the participation of residents and visitors make the occasion a distinctive expression of Saladas' identity.",
      ],
      alt: "Traditional San Baltasar celebration in Saladas",
    },
    "gauchito-gil": {
      nombre: "Gauchito Gil",
      fecha: "January 8, 2027",
      lugar: "Vélez Sarsfield neighborhood",
      resumen: "An expression of popular devotion that brings the community together.",
      descripcion: [
        "Antonio Mamerto Gil Núñez, known as Gauchito Gil, is said to have been born in Pay Ubre, near Mercedes. He worked as a rural laborer and, according to popular tradition, took part in the War of the Triple Alliance before becoming a folk hero who defended the poor.",
        "The story says he left the army to avoid fighting his compatriots and was subsequently pursued. His death is dated to January 8, 1878, on the outskirts of Mercedes. Legend also says he told his executioner that his son would be healed, giving rise to one of the first miracle stories associated with him.",
        "His popular devotion, outside the official calendar of saints, is expressed through roadside shrines and red candles. In Saladas, the tribute in the Vélez Sarsfield neighborhood is part of a Corrientes tradition of faith, promises, and gratitude.",
      ],
      alt: "Tribute to Gauchito Gil in Saladas",
    },
    carnavales: {
      nombre: "Carnival",
      fecha: "January 2027 · dates to be confirmed",
      lugar: "Pedro Pablo Ignacio Carnival Grounds, Municipal Tourist Complex",
      resumen: "Carnival troupes, music, and color bring joy to Saladas' summer.",
      descripcion: [
        "Saladas' carnival began in its neighborhoods as a spontaneous celebration. In the 1960s and 1970s, masked revelers and water games filled the streets. Later, the parades on Mitre Street became famous for the close connection between performers and audiences.",
        "Over the years, groups emerged that defined entire generations. The rivalry between Coé Berá and Carisma Show became a classic, alongside groups such as Cristal de Luna. New Porá began as a children's group and went on to compete in the top division, while Iberá and the musical groups Sambatuque and Xangó brought new energy to the scene.",
        "On February 9, 2013, the Pedro Pablo Ignacio Carnival Grounds opened, named in honor of a local visual artist. Located at the Municipal Tourist Complex beside Soto Lagoon, it gave carnival a larger, better-equipped venue for performers and visitors.",
      ],
      alt: "Carnival groups parading in Saladas",
    },
    "paso-a-la-inmortalidad-del-sargento-cabral": {
      nombre: "Commemoration of Sergeant Cabral",
      fecha: "February 3, 2027",
      lugar: "Sergeant Cabral Square (Plaza Sargento Cabral)",
      resumen: "A tribute to the Saladas-born hero who gave his life at the Battle of San Lorenzo.",
      descripcion: [
        "Juan Bautista Cabral was born in the late 18th century on the outskirts of Saladas, in the area now known as Colonia Cabral. Of Afro-Indigenous descent, he was the son of Carmen Robledo and a Guaraní father. When he joined the army in 1812, he adopted the surname Cabral and enlisted in the newly formed Regiment of Mounted Grenadiers.",
        "On February 3, 1813, during the Battle of San Lorenzo, José de San Martín's horse fell and trapped him. Cabral rushed to help, freed him, and was seriously wounded. He was taken to the Convent of San Carlos, then serving as a hospital, where he died from his injuries.",
        "Tradition preserves the farewell words attributed to him in Guaraní and recalls how San Martín honored his sacrifice with an inscription dedicated to the soldier. Though he died without the rank, collective memory came to know him as a sergeant. Every February 3, Saladas pays tribute to one of its greatest heroes.",
      ],
      alt: "Ceremony honoring Sergeant Juan Bautista Cabral",
    },
    "fiesta-patronal-san-jose": {
      nombre: "Saint Joseph's Feast Day",
      fecha: "March 19, 2027",
      lugar: "San José Parish",
      resumen: "A religious tradition connected to the origins of Saladas.",
      descripcion: [
        "Saladas' connection to Saint Joseph is part of the city's religious history. A document dated September 30, 1742, already mentions Fort San José, a name linked to the town's origins and its later name, San José de las Saladas.",
        "Tradition holds that shortly after 1732, a rancher donated an image of Saint Joseph to the first parish priest of Curato de las Saladas for the chapel. Since 1955, March 19 has been the date of the patron saint festival and a local holiday.",
        "The procession and Mass bring the community together every year. The tradition of locro de San José also continues: this shared meal replaced the former custom of donating meat to families in need and preserves the celebration's spirit of solidarity.",
      ],
      alt: "Celebration of the Saint Joseph's Feast Day",
    },
    "fiesta-del-gaucho-lega": {
      nombre: "Gaucho Lega Festival",
      fecha: "May 23, 2027",
      lugar: "2 de Noviembre neighborhood",
      resumen: "A popular devotional tradition honoring Gaucho Lega.",
      descripcion: [
        "Olegario Álvarez, known as Gaucho Lega or Leguita, was born in Saladas in 1871. During a period of intense political conflict, he belonged to the Autonomist Party and worked as a police sergeant. After becoming involved in a series of disputes, he was sentenced to life in prison.",
        "In 1904, he escaped from the Corrientes Penitentiary with other prisoners. The legend that grew around him portrays him as a folk hero who took from the rich to help the poor. He died at age 35 on May 23, 1906, during a police confrontation at Rincón de Luna.",
        "After his death, his grave in the Saladas cemetery became a place of popular devotion. Candles and red garments recall both the traditions surrounding him and his political affiliation. Every May 23, devotees come to pay their respects.",
      ],
      alt: "Celebration honoring Gaucho Lega",
    },
  },
  // Traducciones al portugués brasileño.
  "pt-br": {
    "fiesta-provincial-de-la-miel-y-el-desarrollo-emprendedor": {
      nombre: "Festa Provincial do Mel e do Empreendedorismo",
      fecha: "Terceiro fim de semana de outubro de 2026",
      lugar: "Complexo Turístico Municipal",
      resumen: "Uma celebração da apicultura, da produção regional e do talento empreendedor.",
      descripcion: [
        "A festa começou em 1999, quando jovens da Cooperativa Apícola Los Azahares organizaram um encontro provincial para compartilhar conhecimentos sobre a produção de mel. Eles apostaram na apicultura como oportunidade de trabalho local e como alternativa para que os jovens pudessem construir seu futuro em Saladas.",
        "O crescimento desses encontros levou ao reconhecimento provincial da festa em 2001, por meio do Decreto nº 383. Com o tempo, o encontro técnico se transformou em uma festa popular de outubro no Complexo Turístico Municipal.",
        "À apicultura se juntaram a Expo Saladas, com sua feira comercial e produtiva, a escolha de representantes e os shows musicais. Em 2024, na 21ª edição, o nome passou a incluir oficialmente o empreendedorismo, dando mais visibilidade a produtores, artesãos e empreendedores locais.",
      ],
      alt: "Festa Provincial do Mel em Saladas",
    },
    "aniversario-de-la-ciudad": {
      nombre: "Aniversário de Saladas",
      fecha: "19 de novembro de 2026",
      lugar: "Praça Sargento Cabral (Plaza Sargento Cabral)",
      resumen: "Uma celebração da história, da identidade e da comunidade atual de Saladas.",
      descripcion: [
        "Saladas é conhecida como o Berço de Heróis por ser a cidade natal do Sargento Juan Bautista Cabral. Sua história também está ligada a figuras de Corrientes, como o coronel Marcos Azcona e Juan Gregorio Pujol, e a acontecimentos como o levante dos comuneros.",
        "Embora os registros mencionem a existência de uma guarda ou fortim na região desde 1707, o aniversário é comemorado em 19 de novembro de 1732, data associada à chegada do primeiro pároco, León Pesoa y Figueroa. Em 1989, as autoridades locais adotaram esse marco como referência para a fundação da cidade.",
        "A cada aniversário, essa memória se conecta à identidade viva da cidade: sua comunidade, o chamamé e as tradições que continuam dando forma a Saladas.",
      ],
      alt: "Celebração do aniversário de Saladas",
    },
    "fiesta-de-la-virgen-de-itati": {
      nombre: "Festa de Nossa Senhora de Itatí",
      fecha: "8 de dezembro de 2026",
      lugar: "Capela Doña Panchita, bairro Itatí",
      resumen: "Moradores e visitantes se reúnem para homenagear a Rainha do Paraná.",
      descripcion: [
        "No bairro Itatí, a comunidade mantém viva sua devoção a Nossa Senhora de Itatí na capela conhecida como Doña Panchita. A festa de 8 de dezembro reúne os moradores em torno da Imaculada Conceição e da Virgem, venerada em Corrientes como Rainha do Paraná.",
        "A celebração dura dois dias e combina encontros comunitários com atividades religiosas. No início do dia 8 de dezembro, uma procissão percorre as ruas com a imagem para acompanhar e abençoar o povo; também há momentos de catequese e batizados.",
        "A procissão solene pelo bairro e a missa principal são os momentos centrais da festa. A participação é gratuita, e a tradição fortalece os laços entre a capela e a comunidade de Saladas.",
      ],
      alt: "Celebração de Nossa Senhora de Itatí em Saladas",
    },
    "avistando-aves-con-pichones": {
      nombre: "Observação de Aves com as Crianças",
      fecha: "2 de janeiro de 2027",
      lugar: "Complexo Turístico Municipal",
      resumen: "Uma atividade para crianças e famílias descobrirem o mundo das aves.",
      descripcion: [
        "A atividade Observação de Aves com as Crianças aproxima as novas gerações da observação de aves, com uma proposta para crianças de 6 a 12 anos e suas famílias.",
        "A Visit Saladas e os Observadores de Aves de Mburucuyá organizam o passeio no ambiente natural do Complexo Turístico Municipal. O convite é para descobrir a diversidade de aves que vivem na região.",
        "Durante o passeio, os participantes observam diferentes espécies e aprendem sobre seus hábitos, ninhos e a preservação do ambiente. Assim, a experiência combina diversão em família com o interesse pela natureza local.",
      ],
      alt: "Observação de aves durante a atividade Observação de Aves com as Crianças",
    },
    "san-baltasar": {
      nombre: "San Baltasar",
      fecha: "6 de janeiro de 2027",
      lugar: "Espaço Polo Borda",
      resumen: "Uma tradição de música, dança e devoção transmitida por gerações.",
      descripcion: [
        "A devoção a San Baltasar, também chamado de Santo Kambá, é uma tradição religiosa e cultural antiga em Corrientes, especialmente ligada às comunidades afrodescendentes do Litoral. As celebrações preservam expressões musicais e danças de raízes africanas, como charandas, zembas e candombes.",
        "Em Saladas, a festa de 6 de janeiro tem como centro uma imagem de madeira que, segundo a memória local, chegou à família Borda em 1948. A família assumiu seus cuidados e manteve o costume de levar a imagem às casas dos devotos para receber suas contribuições.",
        "O encontro anual no Espaço Polo Borda mantém vivo esse legado compartilhado. A música, a dança e a participação de moradores e visitantes fazem da data uma expressão singular da identidade de Saladas.",
      ],
      alt: "Celebração tradicional de San Baltasar em Saladas",
    },
    "gauchito-gil": {
      nombre: "Gauchito Gil",
      fecha: "8 de janeiro de 2027",
      lugar: "Bairro Vélez Sarsfield",
      resumen: "Uma expressão de devoção popular que reúne a comunidade.",
      descripcion: [
        "Antonio Mamerto Gil Núñez, conhecido como Gauchito Gil, teria nascido em Pay Ubre, perto de Mercedes. Trabalhava no campo e, segundo a tradição popular, participou da Guerra da Tríplice Aliança antes de se tornar um gaúcho justiceiro que defendia os mais humildes.",
        "A história conta que ele abandonou o Exército para não lutar contra seus compatriotas e, por isso, passou a ser perseguido. Sua morte teria ocorrido em 8 de janeiro de 1878, nos arredores de Mercedes. Também se conta que ele anunciou ao carrasco a cura de seu filho, dando origem a um dos primeiros relatos de milagre ligados à sua figura.",
        "Sua devoção popular, fora do calendário oficial de santos, se expressa em altares e velas vermelhas à beira das estradas. Em Saladas, a homenagem no bairro Vélez Sarsfield faz parte de uma tradição correntina de fé, promessas e agradecimento.",
      ],
      alt: "Homenagem ao Gauchito Gil em Saladas",
    },
    carnavales: {
      nombre: "Carnaval",
      fecha: "Janeiro de 2027 · datas a confirmar",
      lugar: "Sambódromo Pedro Pablo Ignacio, Complexo Turístico Municipal",
      resumen: "Grupos carnavalescos, música e cores animam o verão de Saladas.",
      descripcion: [
        "O carnaval de Saladas nasceu nos bairros como uma festa espontânea. Nas décadas de 1960 e 1970, mascarados e brincadeiras com água animavam as ruas; mais tarde, os desfiles na rua Mitre ficaram conhecidos pela proximidade entre os integrantes das escolas de samba e o público.",
        "Com o passar dos anos, surgiram grupos que marcaram diferentes gerações. A rivalidade entre Coé Berá e Carisma Show virou um clássico, ao lado de escolas como Cristal de Luna. New Porá começou como um grupo infantil e chegou a competir na categoria principal, enquanto Iberá e os grupos musicais Sambatuque e Xangó renovaram a cena.",
        "Em 9 de fevereiro de 2013, foi inaugurado o Sambódromo Pedro Pablo Ignacio, em homenagem a um artista plástico local. Instalado no Complexo Turístico Municipal, ao lado da Lagoa Soto, o espaço deu ao carnaval uma estrutura maior para receber os integrantes das escolas e os visitantes.",
      ],
      alt: "Escolas de samba no carnaval de Saladas",
    },
    "paso-a-la-inmortalidad-del-sargento-cabral": {
      nombre: "Homenagem ao Sargento Cabral",
      fecha: "3 de fevereiro de 2027",
      lugar: "Praça Sargento Cabral (Plaza Sargento Cabral)",
      resumen: "Uma homenagem ao herói de Saladas que deu a vida na Batalha de San Lorenzo.",
      descripcion: [
        "Juan Bautista Cabral nasceu no fim do século XVIII nos arredores de Saladas, na região hoje conhecida como Colonia Cabral. De ascendência afro-indígena, era filho de Carmen Robledo e de um pai guarani. Ao ingressar no Exército em 1812, adotou o sobrenome Cabral e passou a integrar o recém-criado Regimento de Granadeiros a Cavalo.",
        "Em 3 de fevereiro de 1813, durante a Batalha de San Lorenzo, o cavalo de José de San Martín caiu e o prendeu. Cabral correu para ajudá-lo, conseguiu libertá-lo e ficou gravemente ferido. Foi levado ao Convento de San Carlos, que funcionava como hospital, onde morreu em consequência dos ferimentos.",
        "A tradição preserva as palavras de despedida atribuídas a ele em guarani e lembra que San Martín homenageou seu sacrifício com uma inscrição dedicada ao soldado. Embora tenha morrido sem essa patente, a memória coletiva passou a reconhecê-lo como sargento. Todo 3 de fevereiro, Saladas homenageia um de seus maiores heróis.",
      ],
      alt: "Cerimônia em homenagem ao Sargento Juan Bautista Cabral",
    },
    "fiesta-patronal-san-jose": {
      nombre: "Festa de São José",
      fecha: "19 de março de 2027",
      lugar: "Paróquia San José",
      resumen: "Uma tradição de fé ligada às origens de Saladas.",
      descripcion: [
        "A relação de Saladas com São José faz parte da história religiosa da cidade. Um documento de 30 de setembro de 1742 já menciona o Forte de San José, nome associado às origens da localidade e à sua denominação posterior como San José de las Saladas.",
        "Segundo a tradição, pouco depois de 1732, um estancieiro doou uma imagem de São José ao primeiro pároco do Curato de las Saladas para a capela. Desde 1955, 19 de março é a data da festa do padroeiro e feriado local.",
        "A procissão e a missa reúnem a comunidade todos os anos. Também continua a tradição do locro de San José, uma refeição compartilhada que substituiu o antigo costume de doar carne às famílias necessitadas e mantém o espírito solidário da celebração.",
      ],
      alt: "Celebração da Festa de São José",
    },
    "fiesta-del-gaucho-lega": {
      nombre: "Festa do Gaucho Lega",
      fecha: "23 de maio de 2027",
      lugar: "Bairro 2 de Noviembre",
      resumen: "Uma tradição de devoção popular em homenagem ao Gaucho Lega.",
      descripcion: [
        "Olegario Álvarez, conhecido como Gaucho Lega ou Leguita, nasceu em Saladas em 1871. Em uma época de fortes conflitos políticos, fazia parte do Partido Autonomista e trabalhava como sargento de polícia. Depois de se envolver em conflitos, foi condenado à prisão perpétua.",
        "Em 1904, fugiu da Penitenciária de Corrientes com outros presos. A lenda criada em torno de sua figura o retrata como um justiceiro que tirava dos ricos para ajudar os pobres. Morreu aos 35 anos, em 23 de maio de 1906, durante um confronto com a polícia em Rincón de Luna.",
        "Após sua morte, seu túmulo no cemitério de Saladas se tornou um lugar de devoção popular. Velas e roupas vermelhas lembram tanto a tradição ligada à sua figura quanto sua filiação política. Todo 23 de maio, devotos vão prestar homenagem.",
      ],
      alt: "Celebração em homenagem ao Gaucho Lega",
    },
  },
};
