import Link from "next/link";
import { site } from "@/lib/site";
import { posts } from "@/content/writing";
import { SiteHeader as Header } from "./site-header";

/* The header is interactive; only post titles cross into the client bundle,
   never the post bodies. */
export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <Header
      home={home}
      posts={posts.map(({ slug, title }) => ({ slug, title }))}
    />
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer-inner">
        <p>&copy; 2026 {site.name}</p>
        <nav aria-label="Footer">
          <Link href="/writing">Writing</Link>
          <a href="/writing/rss.xml">RSS</a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
