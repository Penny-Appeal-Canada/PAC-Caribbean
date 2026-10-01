"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type Lines = string[][];

function wordsOf(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function groupByLine(container: HTMLElement): Lines {
  const nodes = [...container.querySelectorAll<HTMLElement>("[data-word]")];
  const lines: Lines = [];
  let top: number | null = null;
  let current: string[] = [];

  for (const node of nodes) {
    const word = node.dataset.word ?? "";
    const y = node.offsetTop;
    if (top === null || Math.abs(y - top) > 2) {
      if (current.length) lines.push(current);
      current = [word];
      top = y;
    } else {
      current.push(word);
    }
  }
  if (current.length) lines.push(current);
  return lines;
}

export function RevealText({
  as: Tag = "h2",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: string;
  className?: string;
  id?: string;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const widthRef = useRef(0);
  const [lines, setLines] = useState<Lines | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const words = wordsOf(children);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const measure = (width: number) => {
      if (width === widthRef.current && widthRef.current !== 0) return;
      widthRef.current = width;
      setArmed(false);
      setLines(null);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!rootRef.current) return;
          setLines(groupByLine(rootRef.current));
          setArmed(true);
        });
      });
    };

    measure(Math.round(root.getBoundingClientRect().width));
    const observer = new ResizeObserver((entries) => {
      measure(Math.round(entries[0]?.contentRect.width ?? 0));
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !armed || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [armed, shown, lines]);

  const split = lines && lines.length > 0;

  return (
    <Tag
      ref={rootRef}
      id={id}
      className={["reveal-text", className].filter(Boolean).join(" ")}
      data-armed={armed && !shown ? "" : undefined}
      data-in={shown ? "" : undefined}
      aria-label={children}
    >
      {split
        ? lines.map((line, index) => (
            <span
              className="reveal-line-mask"
              aria-hidden="true"
              key={`${line.join(" ")}-${index}`}
              style={{ ["--i" as string]: Math.min(index, 2) }}
            >
              <span className="reveal-line">{line.join(" ")}</span>
            </span>
          ))
        : words.map((word, index) => (
            <span data-word={word} aria-hidden="true" key={`${word}-${index}`}>
              {index > 0 ? ` ${word}` : word}
            </span>
          ))}
    </Tag>
  );
}

export function RevealIn({
  as: Tag = "div",
  children,
  className,
  delay = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={rootRef}
      className={["reveal-in", className].filter(Boolean).join(" ")}
      data-armed={armed && !shown ? "" : undefined}
      data-in={shown ? "" : undefined}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
