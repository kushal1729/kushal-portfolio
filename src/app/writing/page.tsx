import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { posts, formatDate } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on reading systems nobody remembers: which sources of truth about an old system to trust, in what order, and where a language model earns its place.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing — Kushal Yarlagadda",
    description:
      "Notes on reading systems nobody remembers, and where a language model earns its place.",
    url: "/writing",
    type: "website",
  },
};

export default function WritingIndex() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main className="wrap" id="main">
        <header className="page-head">
          <h1>Writing</h1>
          <p>
            Notes on reading systems nobody remembers: which sources to trust,
            in what order, and where a language model earns its place.
          </p>
        </header>

        <div className="page-body">
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link className="post-link" href={`/writing/${post.slug}`}>
                  <ViewTransition name={`post-title-${post.slug}`} share="morph" default="none">
                    <h2>{post.title}</h2>
                  </ViewTransition>
                  <p>{post.standfirst}</p>
                  <span className="post-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime} read</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="feed-note">
            Follow along with the <a href="/writing/rss.xml">RSS feed</a>.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
