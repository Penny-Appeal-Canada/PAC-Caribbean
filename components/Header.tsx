"use client";

import { useEffect, useId, useState, type MouseEvent } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { navMenu, type NavChild, type NavItem } from "@/lib/content";
import { Button } from "./Button";

function Brand({ href = "/" }: { href?: string }) {
  return (
    <a className="brand" href={href}>
      <span className="brand-mark">pennyappeal</span>
      <span className="brand-region">caribbean</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [panel, setPanel] = useState<NavItem | null>(null);
  const drawerId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (panel) setPanel(null);
        else setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, panel]);

  function closeMenu() {
    setOpen(false);
    setPanel(null);
  }

  function openPanel(item: NavItem, event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setPanel(item);
  }

  const items: Array<NavItem | NavChild> = panel?.children ?? navMenu;

  return (
    <>
      <header
        className="site-header"
        data-menu-open={open || undefined}
        data-overlay={overHero || undefined}
        data-solid={!overHero ? true : undefined}
      >
        <div className="inner">
          <Brand />
          <nav className="nav-desktop" aria-label="Primary">
            {navMenu.map((item) => (
              <div
                key={item.label}
                className="nav-item"
                data-children={item.children ? true : undefined}
              >
                <a href={item.href}>{item.label}</a>
                {item.children ? (
                  <ul className="nav-flyout">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <a href={child.href}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <Button href="/donate" size="nav">
              Donate
            </Button>
          </nav>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => (open ? closeMenu() : setOpen(true))}
          >
            <span className="menu-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </header>

      <div
        className="menu-backdrop"
        data-open={open || undefined}
        onClick={closeMenu}
      />
      <nav
        id={drawerId}
        className="menu-drawer"
        data-open={open || undefined}
        aria-label="Menu"
      >
        <Brand href="/" />
        <div className="menu-crumbs">
          <button
            className="menu-crumb"
            type="button"
            data-current={!panel || undefined}
            onClick={() => setPanel(null)}
          >
            Main
          </button>
          {panel ? (
            <>
              <CaretRight size={12} weight="bold" aria-hidden="true" />
              <span className="menu-crumb" data-current>
                {panel.label}
              </span>
            </>
          ) : null}
        </div>
        <ul className="menu-list">
          {items.map((item) => {
            const hasChildren =
              "children" in item &&
              Array.isArray(item.children) &&
              item.children.length > 0;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  data-children={hasChildren || undefined}
                  onClick={
                    hasChildren
                      ? (event) => openPanel(item, event)
                      : closeMenu
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          {!panel ? (
            <li>
              <a href="/donate" onClick={closeMenu}>
                Donate
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  );
}
