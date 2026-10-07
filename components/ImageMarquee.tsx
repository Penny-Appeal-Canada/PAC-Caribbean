"use client";

import { useEffect, useRef } from "react";
import { marqueeImages } from "@/lib/content";

function Track({ offset = 0 }: { offset?: number }) {
  const row = [...marqueeImages.slice(offset), ...marqueeImages.slice(0, offset)];
  const loop = [...row, ...row];

  return (
    <div className="marquee-row">
      <div className="marquee-track">
        {loop.map((image, index) => (
          <figure className="marquee-card" key={`${image.src}-${index}`}>
            <img src={image.src} alt={image.alt} />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

const MAX_TILT = 18;

function applyTilt(stack: HTMLElement, angle: number) {
  const a = angle.toFixed(2);
  stack.style.transform = `perspective(1200px) rotate(${a}deg) rotateX(${a}deg) rotateY(${(-angle).toFixed(2)}deg)`;
}

export function ImageMarquee() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const stack = stackRef.current;
    if (!stage || !stack) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      stack.style.transform = "none";
      return;
    }

    applyTilt(stack, MAX_TILT);

    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight;
      const center = rect.top + rect.height / 2;
      // Full tilt as the block enters; horizontal once its centre hits mid-viewport.
      const start = viewport;
      const end = viewport / 2;
      const raw = (start - center) / (start - end);
      const progress = Math.min(1, Math.max(0, raw));
      applyTilt(stack, MAX_TILT * (1 - progress));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className="section marquee"
      id="work-region"
      aria-labelledby="marquee-heading"
    >
      <h2 id="marquee-heading" className="visually-hidden">
        Field photographs
      </h2>
      <div ref={stageRef} className="marquee-tilt">
        <div ref={stackRef} className="marquee-stack">
          <Track offset={0} />
          <Track offset={4} />
        </div>
      </div>
    </section>
  );
}
