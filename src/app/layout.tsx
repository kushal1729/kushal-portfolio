import type { Metadata, Viewport } from "next";
import { Mona_Sans, Martian_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* One variable family does all the talking; its width axis gives data its
   own voice without reaching for a monospace. */
const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

/* Literal code only. */
const mono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Kushal Yarlagadda — AI systems that read and write software";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — Kushal Yarlagadda",
  },
  description: site.description,
  keywords: [
    "Kushal Yarlagadda",
    "software engineer",
    "AI engineer",
    "multi-agent systems",
    "LangGraph",
    "agentic workflows",
    "legacy code analysis",
    "legacy system modernization",
    "codebase documentation",
    "full-stack engineer",
    "Angular",
    "FastAPI",
    "Spring Boot",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/writing/rss.xml` },
  },
  openGraph: {
    title,
    description: site.positioning,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1020" },
  ],
};

/* Runs before first paint. Only an explicit choice is stored; without one,
   the CSS follows the system setting live. */
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/* Structured data: how search and answer engines learn what the person does,
   not just the job title. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software Engineer",
  description: site.description,
  knowsAbout: [
    "Multi-agent LLM systems",
    "LangGraph",
    "LLM observability",
    "Legacy system modernization",
    "Static code analysis",
    "Data lineage",
    "Full-stack web development",
    "Angular",
    "FastAPI",
    "Spring Boot",
    "Data engineering",
    "Computer vision",
  ],
  worksFor: { "@type": "Organization", name: site.employer },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Amrita Vishwa Vidyapeetham" },
    { "@type": "CollegeOrUniversity", name: "IIT Madras" },
  ],
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${mona.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
