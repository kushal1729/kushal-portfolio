export const site = {
  name: "Kushal Yarlagadda",
  url: "https://kushalyarlagadda.in",
  role: "Software Engineer I",
  employer: "HashedIn by Deloitte",
  location: "Hyderabad",
  email: "kushalyarlagadda1729@gmail.com",
  github: "https://github.com/kushal1729",
  linkedin: "https://www.linkedin.com/in/kushalyarlagadda/",
  resume: "/resume.pdf",
  /* The one-line pitch everything else on the site answers to. */
  positioning: "I build AI systems that read, reason about and write software.",
  description:
    "Kushal Yarlagadda is a software engineer at HashedIn by Deloitte building AI systems that read, reason about and write software: multi-agent pipelines that turn requirements into code, and AI-assisted mining of legacy codebases nobody can explain.",
} as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "builds", label: "Builds" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "writing", label: "Writing" },
] as const;
