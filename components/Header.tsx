"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { navLinks } from "@/lib/content";
import { Button } from "./Button";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header" data-menu-open={open || undefined}>
      <div className="wrap inner">
        <a className="wordmark" href="/">
          Penny Appeal
          <span>Caribbean</span>
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <Button href="/donate" size="nav">
            Donate
          </Button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={28} /> : <List size={28} />}
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-panel"
        data-open={open || undefined}
        aria-label="Mobile"
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
