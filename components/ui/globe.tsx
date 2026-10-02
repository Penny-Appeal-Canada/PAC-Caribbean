"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

import { globePins } from "@/lib/content";
import { cn } from "@/lib/utils";

const PAC_ORANGE: [number, number, number] = [239 / 255, 124 / 255, 0];
const CARIBBEAN_PHI = 3.05;

export const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: CARIBBEAN_PHI,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 4,
  baseColor: [1, 1, 1],
  markerColor: PAC_ORANGE,
  glowColor: [1, 1, 1],
  markerElevation: 0.03,
  markers: globePins.map((pin) => ({
    location: [pin.lat, pin.lng] as [number, number],
    size: pin.id === "caribbean" || pin.id === "canada" ? 0.09 : 0.07,
    id: pin.id,
  })),
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    if (!canvas) return;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    onResize();

    const globe = createGlobe(canvas, {
      ...configRef.current,
      width: widthRef.current,
      height: widthRef.current,
      phi: CARIBBEAN_PHI,
      theta: 0.3,
    });

    let frame = 0;
    const tick = () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!pointerInteracting.current && !reduceMotion) {
        phiRef.current -= 0.005;
      }
      globe.update({
        phi: CARIBBEAN_PHI + phiRef.current + rotationRef.current,
        theta: 0.3,
      });
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
    </div>
  );
}
