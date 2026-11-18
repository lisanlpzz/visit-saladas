import { useEffect, useLayoutEffect, useMemo, useRef, useState, type WheelEvent } from "react";
import { gsap } from "gsap";
import { traducir, type Idioma } from "../../i18n";

interface MasonryItem {
  id: string;
  img: string;
  alt: string;
  width: number;
  height: number;
}

interface MasonryProps {
  items: MasonryItem[];
  idioma: Idioma;
  highlightedImageId: string;
  featuredLabel: string;
}

interface PositionedItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

function getColumnCount(width: number) {
  if (width >= 1500) return 5;
  if (width >= 1000) return 4;
  if (width >= 600) return 3;
  if (width >= 400) return 2;
  return 1;
}

function Masonry({ items, idioma, highlightedImageId, featuredLabel }: MasonryProps) {
  const t = (texto: string) => traducir(texto, idioma);
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imageAreaSize, setImageAreaSize] = useState({ width: 0, height: 0 });
  const [selectedItem, setSelectedItem] = useState<MasonryItem | null>(null);
  const [zoom, setZoom] = useState(1);
  const columns = getColumnCount(containerWidth);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => setContainerWidth(container.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const positionedItems = useMemo(() => {
    if (containerWidth <= 0) return { items: [], height: 0 };

    const gap = 16;
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns;
    const columnHeights = Array.from({ length: columns }, () => 0);
    const placed = items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const height = columnWidth * (item.height / item.width);
      const positioned: PositionedItem = {
        ...item,
        x: column * (columnWidth + gap),
        y: columnHeights[column],
        w: columnWidth,
        h: height,
      };
      columnHeights[column] += height + gap;
      return positioned;
    });

    return {
      items: placed,
      height: Math.max(0, ...columnHeights) - gap,
    };
  }, [columns, containerWidth, items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !positionedItems.items.length) return;

    const cards = container.querySelectorAll<HTMLAnchorElement>("[data-masonry-card]");
    if (hasAnimated.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 28, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.045,
            clearProps: "filter,willChange",
          },
        );
      },
      { threshold: 0.08 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [positionedItems.items.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedItem && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedItem]);

  useLayoutEffect(() => {
    const imageArea = imageAreaRef.current;
    if (!imageArea) return;

    const observer = new ResizeObserver(([entry]) => {
      setImageAreaSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(imageArea);
    return () => observer.disconnect();
  }, [selectedItem]);

  const closeDialog = () => {
    dialogRef.current?.close();
    setSelectedItem(null);
    setZoom(1);
  };

  const changeZoom = (delta: number) => {
    setZoom((current) => Math.min(3, Math.max(1, Number((current + delta).toFixed(2)))));
  };

  const handleZoomWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 0.2 : -0.2);
  };

  const imageAspectRatio = selectedItem ? selectedItem.width / selectedItem.height : 1;
  const fitImageWidth =
    imageAreaSize.width > 0 && imageAreaSize.height > 0
      ? Math.min(imageAreaSize.width, imageAreaSize.height * imageAspectRatio)
      : 0;
  const displayedImageWidth = fitImageWidth * zoom;
  const displayedImageHeight = displayedImageWidth / imageAspectRatio;

  const animateHover = (element: HTMLAnchorElement, scale: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(element, { scale, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[60vh] w-full"
      style={{ height: positionedItems.height > 0 ? `${positionedItems.height}px` : undefined }}
    >
      {positionedItems.items.map((item) => (
        <button
          key={item.id}
          data-masonry-card
          type="button"
          aria-label={`${item.alt}. ${t("Ver en tamaño completo")}`}
          className="group absolute block cursor-zoom-in overflow-hidden rounded-2xl border-0 bg-transparent p-1.5 text-left transition-[filter] duration-300 hover:drop-shadow-[0_16px_28px_rgba(42,27,19,0.28)] focus-visible:drop-shadow-[0_16px_28px_rgba(42,27,19,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d5c2e]"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            width: `${item.w}px`,
            height: `${item.h}px`,
            visibility: hasAnimated.current ? "visible" : undefined,
          }}
          onClick={() => {
            setZoom(1);
            setSelectedItem(item);
          }}
          onMouseEnter={(event) => animateHover(event.currentTarget, 1.02)}
          onMouseLeave={(event) => animateHover(event.currentTarget, 1)}
          onFocus={(event) => animateHover(event.currentTarget, 1.02)}
          onBlur={(event) => animateHover(event.currentTarget, 1)}
        >
          <span className="relative block size-full overflow-hidden rounded-xl bg-[#d9cbb0] shadow-[0_8px_24px_rgba(42,27,19,0.12)]">
            <img
              src={item.img}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"></span>
            {item.id === highlightedImageId && (
              <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-[#1E3A2F]/75 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur-sm">
                {featuredLabel}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-4 pr-14 pt-12 text-left text-sm font-medium text-white">
              {item.alt}
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 grid size-9 translate-y-1 place-items-center rounded-full border border-white/40 bg-black/35 text-white opacity-0 shadow-md backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5M10.8 7.8v6m-3-3h6" />
              </svg>
            </span>
          </span>
        </button>
      ))}

      <dialog
        ref={dialogRef}
        aria-label={selectedItem ? `${t("Imagen ampliada")}: ${selectedItem.alt}` : t("Imagen ampliada")}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-black p-0 text-white backdrop:bg-black"
        onClose={() => {
          setSelectedItem(null);
          setZoom(1);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {selectedItem && (
          <div className="grid h-full grid-rows-[auto_1fr_auto]">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="min-w-0 truncate text-sm text-white/75">{selectedItem.alt}</p>
              <button
                type="button"
                aria-label={t("Cerrar imagen ampliada")}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={closeDialog}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div
              ref={imageAreaRef}
              className="grid min-h-0 min-w-0 place-items-center overflow-auto p-3 sm:p-5"
              data-lenis-prevent
              onWheel={handleZoomWheel}
            >
              <img
                src={selectedItem.img}
                alt={selectedItem.alt}
                width={selectedItem.width}
                height={selectedItem.height}
                draggable={false}
                className="block max-w-none select-none object-contain"
                style={{
                  width: displayedImageWidth > 0 ? `${displayedImageWidth}px` : "auto",
                  height: displayedImageHeight > 0 ? `${displayedImageHeight}px` : "auto",
                }}
              />
            </div>

            <div className="flex items-center justify-center gap-2 px-4 pb-4 pt-2">
              <button
                type="button"
                aria-label={t("Alejar")}
                disabled={zoom <= 1}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-xl transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => changeZoom(-0.25)}
              >
                <span aria-hidden="true">−</span>
              </button>
              <span className="min-w-14 text-center text-sm tabular-nums" aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                aria-label={t("Acercar")}
                disabled={zoom >= 3}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-xl transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => changeZoom(0.25)}
              >
                <span aria-hidden="true">+</span>
              </button>
              <button
                type="button"
                className="ml-1 min-h-10 rounded-full px-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setZoom(1)}
              >
                {t("Ajustar")}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default Masonry;
