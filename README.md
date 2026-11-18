# Visit Saladas

Visit Saladas es una guía turística digital para descubrir Saladas, Corrientes, Argentina. Reúne información e inspiración para conocer la historia, la naturaleza, la cultura y las propuestas locales, y planificar una visita.

## Qué podés encontrar en la página

- **Experiencias y lugares:** recorridos por el casco histórico y propuestas para disfrutar la naturaleza.
- **Mapa:** puntos de interés para orientarte y explorar la ciudad.
- **Un día en Saladas:** ideas para organizar una visita.
- **Eventos:** fiestas, actividades y propuestas locales.
- **Alojamientos:** opciones para planificar la estadía.
- **Galería:** imágenes de Saladas y sus atractivos.
- **Transporte, contacto e información sobre la ciudad.**

El sitio está disponible en español, inglés y portugués brasileño:

- Español: `/`
- English: `/en/`
- Português: `/pt-br/`

## Tecnologías

- [Astro](https://astro.build/) para el sitio y sus páginas.
- React para componentes interactivos.
- TypeScript y Tailwind CSS.
- Leaflet para mapas.

## Requisitos

- Node.js `>=22.12.0`
- npm

## Instalación y uso local

Cloná el repositorio e instalá sus dependencias:

```bash
git clone https://github.com/lisanlpzz/visit-saladas.git
cd visit-saladas
npm install
```

Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Astro mostrará en la terminal la dirección local para abrir el sitio en el navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Previsualiza localmente la versión generada. |
| `npm test` | Ejecuta las pruebas con Vitest. |

## Estructura principal

```text
src/
├── components/   # Componentes de las páginas y secciones
├── data/         # Contenido de alojamientos, eventos, mapas y más
├── i18n/         # Idiomas y traducciones
├── images/       # Imágenes usadas por el sitio
├── layouts/      # Estructuras compartidas
└── pages/        # Rutas del sitio, incluidas /en/ y /pt-br/
public/           # Recursos estáticos
```

## Configuración del sitio

La URL del sitio se configura con la variable de entorno `SITE_URL`. Si no se define, se usa `https://visitsaladas.tur.ar`.
