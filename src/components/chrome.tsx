import Link from "next/link";
import { site, nav } from "@/lib/site";

export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="nav">
      {home ? (
        <a className="mark" href="#top" aria-label={`${site.name}, home`}>
          K<b>Y</b>
        </a>
      ) : (
        <Link className="mark" href="/" aria-label={`${site.name}, home`}>
          K<b>Y</b>
        </Link>
      )}
      <nav className="nav-links" aria-label="Primary">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href={home ? "#contact" : "/#contact"} className="nav-cta">
          Get in touch
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="band-dark">
      <p>&copy; 2026 {site.name}</p>
      <nav aria-label="Footer">
        <Link href="/writing">Writing</Link>
        <a href="/writing/rss.xml">RSS</a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`}>Email</a>
      </nav>
    </footer>
  );
}
