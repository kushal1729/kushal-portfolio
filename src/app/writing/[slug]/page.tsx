import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { BackLink } from "@/components/back-link";
import { PostOutline } from "@/components/post-outline";
import { ShareButton } from "@/components/share-button";
import { FollowButton } from "@/components/follow-button";
import { ToTop } from "@/components/to-top";
import { ArrowLeft, ArrowRight, ChevronDown, Mail } from "@/components/icons";
import { posts, getPost, formatDate } from "@/content/writing";
import { outline } from "@/lib/outline";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.standfirst,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.standfirst,
      url: `/writing/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [site.url],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.standfirst,
    },
  };
}

/* The slug is URL data. Reading it inside Suspense lets the header, the way
   back and a placeholder appear the moment a post is opened, while the post
   itself streams in (or arrives already prefetched by the link). */
export default function PostPage({ params }: Params) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <Suspense fallback={<PostPlaceholder />}>
        <Post params={params} />
      </Suspense>
      <ToTop target="main" />
      <SiteFooter />
    </>
  );
}

function PostPlaceholder() {
  return (
    <main className="wrap post-layout" id="main" aria-busy="true">
      <div className="article">
        <BackLink href="/writing">All writing</BackLink>
        <div className="post-placeholder" aria-hidden="true">
          <span className="ph ph-meta" />
          <span className="ph ph-title" />
          <span className="ph ph-title ph-short" />
          <span className="ph ph-line" />
          <span className="ph ph-line" />
          <span className="ph ph-line" />
        </div>
        <p className="sr-only">Loading the post</p>
      </div>
    </main>
  );
}

async function Post({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content, headings } = outline(post.body);
  /* posts are newest first */
  const index = posts.findIndex((entry) => entry.slug === post.slug);
  const later = posts[index - 1];
  const earlier = posts[index + 1];
  const showOutline = headings.length > 2;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.standfirst,
      datePublished: post.date,
      author: { "@type": "Person", name: site.name, url: site.url },
      publisher: { "@type": "Person", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/writing/${post.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Writing", item: `${site.url}/writing` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/writing/${post.slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="wrap post-layout" id="main" data-outline={showOutline ? "" : undefined}>
        <article className="article" aria-labelledby="post-title">
          <BackLink href="/writing">All writing</BackLink>
          <p className="article-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} read</span>
          </p>
          <ViewTransition name={`post-title-${post.slug}`} share="morph" default="none">
            <h1 id="post-title">{post.title}</h1>
          </ViewTransition>
          <p className="article-standfirst">{post.standfirst}</p>

          {showOutline && (
            <details className="toc-inline">
              <summary>
                <ChevronDown />
                On this page
              </summary>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="prose">{content}</div>

          <div className="post-actions">
            <ShareButton title={post.title} />
            <a
              className="btn btn-quiet"
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Re: ${post.title}`)}`}
            >
              <Mail />
              Reply by email
            </a>
            <FollowButton />
          </div>

          {(earlier || later) && (
            <nav className="post-pager" aria-label="More writing">
              {earlier && (
                <Link className="pager-card spot" href={`/writing/${earlier.slug}`} prefetch>
                  <span className="pager-dir">
                    <ArrowLeft />
                    Earlier post
                  </span>
                  <ViewTransition name={`post-title-${earlier.slug}`} share="morph" default="none">
                    <span className="pager-title">{earlier.title}</span>
                  </ViewTransition>
                </Link>
              )}
              {later && (
                <Link className="pager-card spot" href={`/writing/${later.slug}`} data-dir="later" prefetch>
                  <span className="pager-dir">
                    Later post
                    <ArrowRight />
                  </span>
                  <ViewTransition name={`post-title-${later.slug}`} share="morph" default="none">
                    <span className="pager-title">{later.title}</span>
                  </ViewTransition>
                </Link>
              )}
            </nav>
          )}

          <div className="post-end">
            <BackLink href="/#writing">Back to portfolio</BackLink>
          </div>
        </article>

        {showOutline && (
          <aside className="toc-aside">
            <PostOutline headings={headings} />
          </aside>
        )}
      </main>
    </>
  );
}
