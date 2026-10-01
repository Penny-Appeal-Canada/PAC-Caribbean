"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { programmes, type Programme } from "@/lib/content";
import { RevealText } from "./RevealText";

function supportLabel(programme: Programme) {
  if (programme.id === "feed") return "Support Feed";
  if (programme.id === "emergency") return "Support relief";
  return `Support ${programme.name}`;
}

export function TakeAction() {
  const [index, setIndex] = useState(0);
  const count = programmes.length;
  const current = programmes[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + count) % count);
    },
    [count],
  );

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
      id="programmes"
      className="section take-today"
      aria-roledescription="carousel"
      aria-label="Take action today"
    >
      <div className="wrap">
        <RevealText>Take action today</RevealText>
        <div className="appeals-slider" onKeyDown={onKey}>
          <a
            className="campaign"
            href={current.href}
            aria-label={`${current.name}. ${supportLabel(current)}.`}
          >
            <img src={current.workImage} alt={current.workAlt} />
            <div className="campaign-copy">
              <p className="happen-cat" data-programme={current.id}>
                {current.name}
              </p>
              <h3>{current.statement}</h3>
              <p>
                From {current.entryAmount}, {current.currencyNote}.
              </p>
              <span className="btn" data-programme={current.id}>
                {supportLabel(current)}
              </span>
            </div>
          </a>
          <div className="appeals-nav">
            <button
              className="appeals-arrow"
              type="button"
              aria-label="Previous programme"
              onClick={() => goTo(index - 1)}
            >
              <ArrowLeft size={22} weight="regular" aria-hidden="true" />
            </button>
            <button
              className="appeals-arrow"
              type="button"
              aria-label="Next programme"
              onClick={() => goTo(index + 1)}
            >
              <ArrowRight size={22} weight="regular" aria-hidden="true" />
            </button>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {current.name}, {index + 1} of {count}
          </p>
        </div>
      </div>
    </section>
  );
}
