import type { Metadata } from "next";
import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kushal Yarlagadda — Legacy codebase archaeology & modernization",
    template: "%s — Kushal Yarlagadda",
  },
  description: site.description,
  keywords: [
    "legacy codebase",
    "legacy system modernization",
    "software archaeology",
    "codebase documentation",
    "legacy code analysis",
    "AI code analysis",
    "undocumented systems",
    "Kushal Yarlagadda",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/writing/rss.xml` },
  },
  openGraph: {
    title: "Kushal Yarlagadda — Legacy codebase archaeology & modernization",
    description: site.positioning,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Yarlagadda — Legacy codebase archaeology & modernization",
    description: site.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/* Structured data: how search and answer engines learn to associate
   the person with the specialism, not just the job title. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software Engineer",
  description: site.description,
  knowsAbout: [
    "Legacy system modernization",
    "Static and dynamic code analysis",
    "Call graph and dependency analysis",
    "Retrieval-augmented generation",
    "Multi-agent LLM systems",
    "Computer vision",
  ],
  worksFor: { "@type": "Organization", name: "HashedIn by Deloitte" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Amrita Vishwa Vidyapeetham",
  },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${mono.variable}`}
    >
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
