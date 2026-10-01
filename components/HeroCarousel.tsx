"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { programmes, type Programme } from "@/lib/content";
import { Button } from "./Button";

function Highlight({
  programme,
  words,
  active,
}: {
  programme: Programme["id"];
  words: string[];
  active: boolean;
}) {
  const count = Math.max(words.length, 1);
  const duration = `${Math.max(0.3, 0.9 / count)}s`;

  return (
    <mark className="highlight" data-programme={programme}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="hl-word"
          data-active={active || undefined}
          style={{
            ["--duration" as string]: duration,
            ["--delay" as string]: `${index * 0.12}s`,
          }}
        >
          {index > 0 ? `\u00a0${word}` : word}
        </span>
      ))}
    </mark>
  );
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"forwards" | "back">("forwards");
  const [paused, setPaused] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const prevIndexRef = useRef(0);

  const nextIndex = (index + 1) % programmes.length;
  const nextSlide = programmes[nextIndex];

  const goTo = useCallback(
    (next: number) => {
      setDirection(next < index || (index === 0 && next === programmes.length - 1) ? "back" : "forwards");
      setIndex((next + programmes.length) % programmes.length);
    },
    [index],
  );

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bar.style.transform = "scaleX(1)";
      return;
    }

    if (prevIndexRef.current !== index) {
      elapsedRef.current = 0;
      prevIndexRef.current = index;
    }

    bar.style.transform = `scaleX(${elapsedRef.current / 5600})`;

    if (paused) return;

    const start = performance.now() - elapsedRef.current;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(5600, now - start);
      elapsedRef.current = elapsed;
      bar.style.transform = `scaleX(${elapsed / 5600})`;
      if (elapsed >= 5600) {
        elapsedRef.current = 0;
        setDirection("forwards");
        setIndex((current) => (current + 1) % programmes.length);
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      elapsedRef.current = Math.min(5600, performance.now() - start);
    };
  }, [paused, index]);

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Programmes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {programmes.map((programme, slideIndex) => {
        const active = slideIndex === index;
        const [before, words] = programme.heroHeadline;
        return (
          <article
            key={programme.id}
            className="slide"
            data-active={active || undefined}
            data-direction={direction}
            aria-hidden={!active}
          >
            <img
              className="background-media"
              src={programme.heroImage}
              alt=""
              width={1920}
              height={1080}
              fetchPriority={slideIndex === 0 ? "high" : "low"}
            />
            <div className="hero-scrim" />
            <div className="hero-copy">
              <div className="slide-copy">
                {active ? (
                  <h1 className="hero-heading">
                    {before}{" "}
                    <Highlight
                      programme={programme.id}
                      words={words}
                      active
                    />
                  </h1>
                ) : (
                  <p className="hero-heading">
                    {before}{" "}
                    <Highlight
                      programme={programme.id}
                      words={words}
                      active={false}
                    />
                  </p>
                )}
                <p className="hero-support">{programme.heroSupport}</p>
                {active ? (
                  <div className="hero-actions">
                    <Button href="/donate">Donate Now</Button>
                    <Button href="/zakat" variant="ghost">
                      Give Zakat
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
            {active ? (
              <p className="hero-credit">{programme.credit}</p>
            ) : null}
          </article>
        );
      })}
      <button
        className="hero-preview"
        type="button"
        data-programme={nextSlide.id}
        onClick={() => goTo(nextIndex)}
      >
        <img src={nextSlide.heroImage} alt="" width={360} height={225} />
        <span className="hero-preview-name" aria-hidden="true">
          {nextSlide.name}
        </span>
        <span className="visually-hidden">Next slide, {nextSlide.name}</span>
      </button>
      <div
        className="hero-progress"
        data-programme={programmes[index].id}
        aria-hidden="true"
      >
        <span ref={barRef} className="hero-progress-bar" />
      </div>
      <div className="hero-nav" onKeyDown={onKey}>
        <button
          className="hero-arrow"
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
        >
          <ArrowLeft size={22} weight="regular" aria-hidden="true" />
        </button>
        <button
          className="hero-arrow"
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
        >
          <ArrowRight size={22} weight="regular" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
