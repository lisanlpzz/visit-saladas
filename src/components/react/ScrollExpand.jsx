'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const ScrollExpand = ({
  src = '',
  mediaType = 'image',
  poster = '',
  initialImage = '',
  alt = '',
  slides = /** @type {{ src: string, alt?: string }[]} */ ([]),
  title = '',
  titleLogo = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children = /** @type {import('react').ReactNode} */ (null),
  className = '',
  style = {},
  ...rest
}) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);
  const controlsRef = useRef(null);
  const [mediaReady, setMediaReady] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSlideRef = useRef(0);
  const expandedRef = useRef(false);
  const slideCleanupRef = useRef(0);
  const carouselSlides = Array.isArray(slides) ? slides : [];

  useEffect(() => {
    if (!isExpanded || carouselSlides.length < 2) return;
    const nextIndex = (activeSlide + 1) % carouselSlides.length;
    const preload = new Image();
    preload.src = carouselSlides[nextIndex].src;
  }, [activeSlide, carouselSlides, isExpanded]);

  const changeSlide = useCallback(index => {
    if (index === activeSlideRef.current) return;
    setPreviousSlide(activeSlideRef.current);
    activeSlideRef.current = index;
    setActiveSlide(index);
    if (slideCleanupRef.current) window.clearTimeout(slideCleanupRef.current);
    slideCleanupRef.current = window.setTimeout(() => setPreviousSlide(null), 1050);
  }, []);

  const propsRef = useRef({});
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  };

  const applyProgress = useCallback(p => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);
    media.style.opacity = `${smoothstep(0.02, 0.2, p)}`;

    const isNarrow = window.matchMedia('(max-width: 640px)').matches;
    const startWidth = isNarrow ? Math.max(c.startWidth, 72) : c.startWidth;
    const startHeight = isNarrow ? Math.min(c.startHeight, 54) : c.startHeight;
    const w = startWidth + (100 - startWidth) * e;
    const h = startHeight + (100 - startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * (0.55 + 0.45 * e)}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }

    if (controlsRef.current) {
      const inn = smoothstep(0.68, 1, p);
      controlsRef.current.style.opacity = `${inn}`;
      controlsRef.current.style.transform = `translate3d(0, ${12 * (1 - inn)}px, 0)`;
      controlsRef.current.style.pointerEvents = p >= 1 ? 'auto' : 'none';
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;
    let carouselTimer = 0;
    let stageVisible = false;
    const video = mediaType === 'video' ? mediaRef.current : null;

    const syncVideoPlayback = progress => {
      if (!video) return;
      const shouldPlay = stageVisible && !document.hidden && progress > 0.01;
      if (shouldPlay && video.paused) {
        video.play().catch(error => {
          if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
            console.error('No se pudo reproducir el video de portada.', error);
          }
        });
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    };

    const syncCarousel = progress => {
      const expanded = progress >= 1;
      if (expanded === expandedRef.current) return;
      expandedRef.current = expanded;
      setIsExpanded(expanded);
      if (expanded && carouselSlides.length > 1 && !reduceMotion && !carouselTimer) {
        carouselTimer = window.setInterval(() => {
          changeSlide((activeSlideRef.current + 1) % carouselSlides.length);
        }, 4500);
      } else if (!expanded && carouselTimer) {
        window.clearInterval(carouselTimer);
        carouselTimer = 0;
      }
      if (!expanded) changeSlide(0);
    };

    const measure = () => {
      const c = propsRef.current;
      stageH = stage.clientHeight || root.clientHeight;
      if (stageH <= 0) return;
      if (!c.useWindowScroll) stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const smoothing = window.innerWidth <= 640 ? Math.min(c.smoothing, 0.045) : c.smoothing;
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      syncCarousel(current);
      syncVideoPlayback(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        syncCarousel(current);
        syncVideoPlayback(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
      syncCarousel(current);
      syncVideoPlayback(current);
    };

    const onVisibilityChange = () => syncVideoPlayback(current);
    const stageObserver = video
      ? new IntersectionObserver(([entry]) => {
          stageVisible = Boolean(entry?.isIntersecting);
          syncVideoPlayback(current);
        })
      : null;

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);
    setMediaReady(true);
    syncCarousel(current);
    syncVideoPlayback(current);
    stageObserver?.observe(stage);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (carouselTimer) window.clearInterval(carouselTimer);
      if (slideCleanupRef.current) window.clearTimeout(slideCleanupRef.current);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stageObserver?.disconnect();
      ro.disconnect();
    };
  }, [applyProgress, changeSlide, mediaType, useWindowScroll, carouselSlides.length]);

  const visibleSlides = new Set([activeSlide, previousSlide].filter(index => index !== null));
  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="absolute inset-0 h-full w-full origin-center object-cover brightness-[.55] select-none will-change-transform"
        src={src}
        poster={poster}
        preload="metadata"
        muted
        loop
        playsInline
      />
    ) : (
      <div ref={mediaRef} className="absolute inset-0 origin-center will-change-transform">
        {initialImage && !mediaReady ? (
          <img
            className="absolute inset-0 h-full w-full object-cover object-center select-none"
            src={initialImage}
            alt=""
            aria-hidden="true"
            decoding="async"
            draggable={false}
          />
        ) : (
          (carouselSlides.length ? carouselSlides : [{ src, alt }]).map((slide, index) => visibleSlides.has(index) && (
            <img
              key={slide.src}
              className={`absolute inset-0 h-full w-full object-cover object-center brightness-[.42] saturate-[.78] contrast-[1.08] select-none transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                activeSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              src={slide.src}
              alt={slide.alt ?? alt}
              loading={index === activeSlide ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          ))
        )}
      </div>
    );

  return (
    <div
      ref={rootRef}
      className={`relative w-full bg-black ${useWindowScroll ? 'h-auto' : 'h-full overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none]'} ${className}`.trim()}
      data-lenis-prevent={!useWindowScroll ? "" : undefined}
      style={style}
      {...rest}
    >
      <div ref={trackRef} data-scroll-expand-track data-scroll-distance={scrollDistance} className="relative w-full bg-black">
        <div ref={stageRef} data-scroll-expand-stage className={`sticky top-0 w-full overflow-hidden bg-black ${useWindowScroll ? 'h-[100svh]' : ''}`}>
          <div
            ref={frameRef}
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: 'inset(21% 29% 21% 29% round 24px)' }}
          >
            {media}
            <div
              ref={scrimRef}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,.82)_34%,rgba(0,0,0,.4)_70%,rgba(0,0,0,.12)_100%)] opacity-0"
            />
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center p-[6%] text-center opacity-0 will-change-[opacity,transform]"
              >
                {children}
              </div>
            ) : null}
            {carouselSlides.length > 1 ? (
              <div
                ref={controlsRef}
                className="absolute inset-x-0 bottom-7 flex items-center justify-center gap-2 opacity-0 will-change-[opacity,transform]"
                aria-label="Controles del carrusel"
                aria-hidden={!isExpanded}
              >
                {carouselSlides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    className={`h-2.5 rounded-full border border-white/80 transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      activeSlide === index ? 'w-8 bg-[#FFC107]' : 'w-2.5 bg-white/60 hover:bg-white'
                    }`}
                    aria-label={`Mostrar imagen ${index + 1} de ${carouselSlides.length}`}
                    aria-current={activeSlide === index ? 'true' : undefined}
                    tabIndex={isExpanded ? 0 : -1}
                    onClick={() => changeSlide(index)}
                  />
                ))}
              </div>
            ) : null}
          </div>
          {title ? (
            <div
              ref={titleRef}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] text-center text-[clamp(20px,7.5vw,84px)] font-bold leading-none tracking-[-0.03em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] will-change-[opacity,transform]"
            >
              <span className="flex max-w-full flex-col items-center gap-3">
                <span>{title}</span>
                {titleLogo ? (
                  <img
                    className="h-[clamp(3.5rem,10vw,7rem)] w-[clamp(3.5rem,10vw,7rem)] object-contain drop-shadow-lg"
                    src={titleLogo}
                    alt=""
                    aria-hidden="true"
                  />
                ) : null}
              </span>
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/80 will-change-[opacity,transform]"
            >
              <span className="inline-block animate-[scroll-cue_1.8s_ease-in-out_infinite] motion-reduce:animate-none">
                {scrollHint}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
