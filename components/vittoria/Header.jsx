"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav } from "../../lib/vittoria/content";

export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`vr-header${stuck ? " is-stuck" : ""}`}>
      <div className="vr-shell vr-header__bar">
        <Link href="/vittoria" aria-label="Arch. Vittoria Ribighini — home">
          <Logo />
        </Link>

        <nav className="vr-nav" aria-label="Principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="vr-header__cta">
          <Link className="vr-btn" href="/vittoria/contatti">
            Prenota una visita
          </Link>
        </div>

        <button
          type="button"
          className="vr-burger"
          aria-expanded={open}
          aria-controls="vr-drawer"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="vr-drawer" className={`vr-drawer${open ? " is-open" : ""}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="vr-btn" href="/vittoria/contatti" style={{ marginTop: "1.6rem" }}>
          Prenota una visita
        </Link>
      </div>
    </header>
  );
}
