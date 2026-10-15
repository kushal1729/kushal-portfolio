import { ImageResponse } from "next/og";
import { posts, getPost, formatDate } from "@/content/writing";
import { site } from "@/lib/site";

export const alt = "Writing by Kushal Yarlagadda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#f1f2f4";
const INK = "#14161b";
const MUTED = "#555a66";
const ACCENT = "#2a3fe8";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: BG,
          color: INK,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span style={{ color: ACCENT }}>{site.name}</span>
          <span style={{ color: MUTED }}>
            {post ? formatDate(post.date) : "Writing"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: post && post.title.length > 46 ? 76 : 92,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 0.96,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "Writing"}
        </div>

        <div
          style={{
            display: "flex",
            paddingTop: 24,
            borderTop: `3px solid ${ACCENT}`,
            fontSize: 26,
            lineHeight: 1.3,
            color: MUTED,
          }}
        >
          <span style={{ maxWidth: 900 }}>
            {post?.standfirst ?? site.positioning}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
