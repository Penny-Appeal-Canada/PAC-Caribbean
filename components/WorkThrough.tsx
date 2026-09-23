"use client";

import { useState, type KeyboardEvent } from "react";
import { programmes, type ProgrammeId } from "@/lib/content";
import { Button } from "./Button";

export function WorkThrough() {
  const [active, setActive] = useState<ProgrammeId>("thirst");
  const programme = programmes.find((item) => item.id === active) ?? programmes[0];

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    const ids = programmes.map((item) => item.id);
    const current = ids.indexOf(active);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive(ids[(current + 1) % ids.length]);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive(ids[(current - 1 + ids.length) % ids.length]);
    }
  }

  const supportLabel =
    programme.id === "feed"
      ? "Support Feed"
      : programme.id === "emergency"
        ? "Support relief"
        : `Support ${programme.name}`;

  return (
    <section id="programmes" className="work-split">
      <div
        className="work-names"
        role="tablist"
        aria-label="Programmes"
        onKeyDown={onKey}
      >
        <h2>We work through</h2>
        {programmes.map((item) => (
          <button
            key={item.id}
            className="work-name"
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={item.id === active}
            aria-controls={`panel-${item.id}`}
            data-active={item.id === active || undefined}
            data-programme={item.id}
            onClick={() => setActive(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div
        className="work-stage"
        role="tabpanel"
        id={`panel-${programme.id}`}
        aria-labelledby={`tab-${programme.id}`}
      >
        <img src={programme.workImage} alt={programme.workAlt} />
        <div className="work-overlay">
          <p className="work-statement">{programme.statement}</p>
          {programme.zakatEligible ? (
            <p className="zakat-badge">Zakat eligible</p>
          ) : (
            <p className="zakat-badge zakat-badge-muted">Sadaqah and general funds</p>
          )}
          <p className="entry-amount">From {programme.entryAmount}</p>
          <p className="entry-note">{programme.currencyNote}</p>
          <Button href={programme.href} programme={programme.id}>
            {supportLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
