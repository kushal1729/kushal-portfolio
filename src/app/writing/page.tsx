import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { BackLink } from "@/components/back-link";
import { FollowButton } from "@/components/follow-button";
import { posts, formatDate } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes from mining legacy code with a language model: which sources of truth about an old system to trust, in what order, and where the model earns its place.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing — Kushal Yarlagadda",
    description:
      "Notes from mining legacy code with a language model, and where the model earns its place.",
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
          <BackLink href="/#writing">Back to portfolio</BackLink>
          <h1>Writing</h1>
          <p>
            Notes from mining legacy code with a language model: which
            sources to trust, in what order, and where the model earns its
            place.
          </p>
          <div className="page-actions">
            <FollowButton />
          </div>
        </header>

        <div className="page-body">
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link className="post-link" href={`/writing/${post.slug}`} prefetch>
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
          <div className="feed-note">
            Want new posts as they&apos;re published?{" "}
            <FollowButton className="text-button" label="Follow the writing" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
