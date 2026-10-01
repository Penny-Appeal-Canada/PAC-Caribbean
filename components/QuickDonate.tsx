"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react";
import { programmes } from "@/lib/content";

const amounts = [50, 100, 250];

export function QuickDonate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState("once");
  const [preset, setPreset] = useState<number | "custom">(50);
  const [custom, setCustom] = useState("");
  const [program, setProgram] = useState("most-needed");

  const amount = preset === "custom" ? Number(custom) || 0 : preset;

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (amount <= 0) return;
    const params = new URLSearchParams({
      amount: String(amount),
      frequency,
      program,
    });
    router.push(`/donate?${params.toString()}`);
  }

  return (
    <div className="quick-donate" data-open={open || undefined}>
      <button
        className="quick-donate-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="quick-donate-panel"
        onClick={() => setOpen((value) => !value)}
      >
        Quick Donate
        <CaretDown size={20} weight="bold" aria-hidden="true" />
      </button>
      <form
        id="quick-donate-panel"
        className="quick-donate-panel"
        onSubmit={onSubmit}
      >
        <div className="quick-row">
          <label className="quick-label" htmlFor="quick-frequency">
            Make a
          </label>
          <select
            id="quick-frequency"
            name="frequency"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
          >
            <option value="once">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
          <span className="quick-label">donation of</span>
        </div>

        <fieldset className="quick-amounts">
          <legend className="quick-heading">Choose an amount</legend>
          <div className="quick-amount-row">
            {amounts.map((value) => (
              <label
                key={value}
                className="quick-chip"
                data-active={preset === value || undefined}
              >
                <input
                  type="radio"
                  name="amount"
                  value={value}
                  checked={preset === value}
                  onChange={() => {
                    setPreset(value);
                    setCustom("");
                  }}
                />
                {value}
              </label>
            ))}
            <label className="quick-custom">
              <span className="visually-hidden">Custom amount in USD</span>
              <span aria-hidden="true">USD</span>
              <input
                type="number"
                name="custom"
                min={1}
                inputMode="numeric"
                placeholder="Amount"
                value={custom}
                onChange={(event) => {
                  setCustom(event.target.value);
                  setPreset("custom");
                }}
              />
            </label>
          </div>
        </fieldset>

        <div className="quick-program">
          <label className="quick-heading" htmlFor="quick-program">
            Pick a programme
          </label>
          <select
            id="quick-program"
            name="program"
            value={program}
            onChange={(event) => setProgram(event.target.value)}
          >
            <option value="most-needed">Where most needed</option>
            {programmes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
            <option value="zakat">Zakat</option>
          </select>
        </div>

        <button className="btn" type="submit" disabled={amount <= 0}>
          Donate {amount > 0 ? `USD ${amount}` : ""}
        </button>
      </form>
    </div>
  );
}
