import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/chrome";

export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main className="wrap not-found" id="main">
        <p className="not-found-code">404</p>
        <h1>This page doesn&apos;t exist</h1>
        <p>
          The link may be out of date, or the address mistyped. Everything on
          the site is reachable from one of these.
        </p>
        <div className="hero-actions">
          <Link className="btn" href="/">
            Back to portfolio
          </Link>
          <Link className="btn btn-quiet" href="/writing">
            All writing
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
