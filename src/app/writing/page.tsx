import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { posts, formatDate } from "@/content/writing";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on legacy codebase archaeology: which sources of truth about an old system to trust, in what order, and where a language model earns its place.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing — Kushal Yarlagadda",
    description:
      "Notes on legacy codebase archaeology: what to trust about an old system, in what order.",
    url: "/writing",
    type: "website",
  },
};

export default function WritingIndex() {
  return (
    <div className="shell">
      <SiteHeader />

      <main className="writing writing-page band" id="main">
        <div className="head">
          <h1>Writing</h1>
          <p className="head-note">
            Notes on reading systems nobody remembers: which sources to trust,
            in what order, and where a language model earns its place.
          </p>
        </div>

        <div className="posts">
          {posts.map((post) => (
            <Link
              className="post-row"
              key={post.slug}
              href={`/writing/${post.slug}`}
            >
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>
                <h2>{post.title}</h2>
                <p>{post.standfirst}</p>
              </span>
              <span className="go">
                <ArrowRight />
              </span>
            </Link>
          ))}
        </div>

        <p className="feed-note">
          Follow along with the <a href="/writing/rss.xml">RSS feed</a>.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
