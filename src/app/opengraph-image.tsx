import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#f1f2f4";
const INK = "#14161b";
const MUTED = "#555a66";
const ACCENT = "#2a3fe8";

const verbs = ["Read", "Reason", "Write"];

export default function OpenGraphImage() {
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
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: MUTED }}>
          <span>
            {site.role}, {site.employer}
          </span>
          <span>kushalyarlagadda.in</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 0.9 }}>
            Kushal
          </div>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 0.9 }}>
            Yarlagadda
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, lineHeight: 1.2, maxWidth: 820, letterSpacing: -1 }}>
            {site.positioning}
          </div>
        </div>

        {/* the hero's three states, drawn as a trace */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {verbs.map((verb, i) => (
            <div key={verb} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  border: `3px solid ${ACCENT}`,
                  background: i === verbs.length - 1 ? ACCENT : BG,
                }}
              />
              <span style={{ display: "flex", marginLeft: 14, fontSize: 26, color: INK }}>{verb}</span>
              {i < verbs.length - 1 && (
                <div style={{ display: "flex", width: 120, height: 3, margin: "0 22px", background: ACCENT, opacity: 0.4 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
