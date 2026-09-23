"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
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
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next < index || (index === 0 && next === programmes.length - 1) ? "back" : "forwards");
      setIndex((next + programmes.length) % programmes.length);
    },
    [index],
  );

  useEffect(() => {
    if (paused || reduceRef.current) return;
    const id = window.setInterval(() => {
      setDirection("forwards");
      setIndex((current) => (current + 1) % programmes.length);
    }, 5600);
    return () => window.clearInterval(id);
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
                {active ? <Button href="/donate">Donate</Button> : null}
              </div>
            </div>
            {active ? (
              <p className="hero-credit">{programme.credit}</p>
            ) : null}
          </article>
        );
      })}
      <div
        className="hero-dots"
        role="tablist"
        aria-label="Programme slides"
        onKeyDown={onKey}
      >
        {programmes.map((programme, slideIndex) => (
          <button
            key={programme.id}
            className="dot"
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            data-active={slideIndex === index || undefined}
            onClick={() => goTo(slideIndex)}
          >
            <span className="visually-hidden">
              Slide {slideIndex + 1}, {programme.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
