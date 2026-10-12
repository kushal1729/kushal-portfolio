import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Kushal Yarlagadda — I map the systems companies depend on and can no longer explain.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#dbd8ce";
const INK = "#171a18";
const VERDIGRIS = "#1b5f4d";
const OCHRE = "#7a5508";

const strata = [
  { yr: "2024", what: "Managed services, half-documented" },
  { yr: "2019", what: "Spring Boot API, no listed owner" },
  { yr: "2015", what: "Struts and JSP, original author gone" },
  { yr: "2010", what: "SOAP integration layer" },
  { yr: "2004", what: "Batch job, still runs payroll" },
];

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
          background: PAPER,
          color: INK,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span style={{ color: VERDIGRIS }}>{site.role}</span>
          <span style={{ color: "#575d59" }}>kushalyarlagadda.in</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.86 }}>
            Kushal
          </div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.86 }}>
            Yarlagadda
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 30, lineHeight: 1.25, maxWidth: 720, color: "#474d49" }}>
            {site.positioning}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", borderTop: `3px solid ${INK}` }}>
          {strata.map((layer, i) => (
            <div
              key={layer.yr}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: "7px 10px",
                fontSize: 18,
                background: `rgba(27, 95, 77, ${0.05 + i * 0.05})`,
                borderBottom: "1px solid rgba(23,26,24,0.16)",
              }}
            >
              <span style={{ color: "#474d49", width: 60 }}>{layer.yr}</span>
              <span>{layer.what}</span>
              {i === strata.length - 1 && (
                <span style={{ marginLeft: "auto", color: OCHRE }}>oral history</span>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
