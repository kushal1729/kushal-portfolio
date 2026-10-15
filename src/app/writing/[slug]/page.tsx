import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { posts, getPost, formatDate } from "@/content/writing";
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

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.standfirst,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/writing/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main className="wrap" id="main">
        <article className="article">
          <p className="article-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} read</span>
          </p>
          <ViewTransition name={`post-title-${post.slug}`} share="morph" default="none">
            <h1>{post.title}</h1>
          </ViewTransition>
          <p className="article-standfirst">{post.standfirst}</p>
          <div className="prose">{post.body}</div>

          <div className="article-foot">
            <Link href="/writing">All writing</Link>
            <a href={`mailto:${site.email}`}>Reply by email</a>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
