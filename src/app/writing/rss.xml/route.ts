import { posts } from "@/content/writing";
import { site } from "@/lib/site";

const FEED_DESCRIPTION =
  "Notes on reading systems nobody remembers: what to trust about an old system, in what order, and where a language model earns its place.";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Cached as a string — a Response cannot cross a "use cache" boundary. */
async function buildFeed(): Promise<string> {
  "use cache";

  const items = posts
    .map((post) => {
      const url = `${site.url}/writing/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.standfirst)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Writing</title>
    <link>${site.url}/writing</link>
    <atom:link href="${site.url}/writing/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(FEED_DESCRIPTION)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}

export async function GET() {
  return new Response(await buildFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
