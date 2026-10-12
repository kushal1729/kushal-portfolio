export const site = {
  name: "Kushal Yarlagadda",
  url: "https://kushalyarlagadda.in",
  role: "Software Engineer, HashedIn by Deloitte",
  discipline: "Legacy systems and applied AI",
  email: "kushalyarlagadda1729@gmail.com",
  github: "https://github.com/kushal1729",
  linkedin: "https://www.linkedin.com/in/kushalyarlagadda/",
  resume: "/resume.pdf",
  /* The one-line positioning everything else on the site answers to. */
  positioning:
    "I map the systems companies depend on and can no longer explain.",
  description:
    "Kushal Yarlagadda is a software engineer working on legacy codebase archaeology: using AI to map, document and modernize enterprise systems that have outlived their documentation and their original engineers.",
} as const;

export const nav = [
  { href: "/#method", label: "Method" },
  { href: "/#work", label: "Work" },
  { href: "/writing", label: "Writing" },
] as const;
