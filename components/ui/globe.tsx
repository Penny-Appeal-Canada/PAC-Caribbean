"use client";

import { MapPin } from "@phosphor-icons/react";
import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

import { globePins } from "@/lib/content";
import { cn } from "@/lib/utils";

const CARIBBEAN_PHI = 3.05;
const THETA = 0.3;
const MARKER_ELEVATION = 0.03;

const PIN_MARKERS = globePins.map((pin) => ({
  id: pin.id,
  location: [pin.lat, pin.lng] as [number, number],
  size: 0,
  color: [1, 1, 1] as [number, number, number],
}));

export const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: CARIBBEAN_PHI,
  theta: THETA,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 4,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markerElevation: MARKER_ELEVATION,
  markers: PIN_MARKERS,
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const rotationRef = useRef(0);
  const widthRef = useRef(0);
  const configRef = useRef(config);
  configRef.current = config;

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rotationRef.current = delta / 200;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const pinsHost = pinsRef.current;
    if (!canvas || !pinsHost) return;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    onResize();

    const globe = createGlobe(canvas, {
      ...configRef.current,
      width: widthRef.current,
      height: widthRef.current,
      phi: CARIBBEAN_PHI,
      theta: THETA,
      markers: PIN_MARKERS,
    });

    const cobeRoot = canvas.parentElement;
    const dummyNodes = PIN_MARKERS.map(
      ({ id }) =>
        cobeRoot?.querySelector<HTMLElement>(`[style*="--cobe-${id}"]`) ??
        null,
    );
    const pinNodes = PIN_MARKERS.map(({ id }) =>
      pinsHost.querySelector<HTMLElement>(`[data-pin="${id}"]`),
    );

    let frame = 0;
    const tick = () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!pointerInteracting.current && !reduceMotion) {
        phiRef.current -= 0.005;
      }
      const phi = CARIBBEAN_PHI + phiRef.current + rotationRef.current;
      globe.update({
        phi,
        theta: THETA,
      });

      const rootStyle = getComputedStyle(document.documentElement);
      for (let i = 0; i < PIN_MARKERS.length; i++) {
        const node = pinNodes[i];
        const dummy = dummyNodes[i];
        if (!node) continue;
        if (dummy) {
          node.style.left = dummy.style.left;
          node.style.top = dummy.style.top;
        }
        const visible = rootStyle
          .getPropertyValue(`--cobe-visible-${PIN_MARKERS[i].id}`)
          .trim();
        const x = parseFloat(node.style.left) / 100 - 0.5;
        const y = parseFloat(node.style.top) / 100 - 0.5;
        const onFace = Number.isFinite(x) && Math.hypot(x, y) < 0.34;
        node.style.opacity = visible && onFace ? "1" : "0";
      }

      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    const handleResize = () => {
      onResize();
      globe.update({
        width: widthRef.current,
        height: widthRef.current,
      });
    };
    window.addEventListener("resize", handleResize);

    canvas.style.opacity = "1";

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className="size-full cursor-grab opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(event) =>
          updatePointerInteraction(
            event.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(event) => updateMovement(event.clientX)}
        onTouchMove={(event) => {
          const touch = event.touches[0];
          if (touch) updateMovement(touch.clientX);
        }}
      />
      <div ref={pinsRef} className="globe-pins" aria-hidden="true">
        {globePins.map((pin) => (
          <span key={pin.id} className="globe-pin" data-pin={pin.id}>
            <MapPin size={22} weight="fill" />
          </span>
        ))}
      </div>
    </div>
  );
}
