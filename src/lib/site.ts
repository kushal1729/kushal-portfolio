export const site = {
  name: "Kushal Yarlagadda",
  url: "https://kushalyarlagadda.in",
  role: "Software Engineer I",
  employer: "HashedIn by Deloitte",
  location: "Bengaluru",
  email: "kushal@kushalyarlagadda.in",
  github: "https://github.com/kushal1729",
  linkedin: "https://www.linkedin.com/in/kushalyarlagadda/",
  resume: "/resume.pdf",
  /* The one-line pitch everything else on the site answers to. */
  positioning: "AI full-stack developer.",
  /* What the work is right now, said under the pitch. */
  now: "I build across the stack, from Angular and Spring Boot to LangGraph agents. Right now I'm using AI to mine legacy services nobody can fully explain.",
  description:
    "Kushal Yarlagadda is an AI full-stack developer at HashedIn by Deloitte, building across the stack from Angular and Spring Boot to LangGraph agents, and currently using AI to mine legacy services nobody can fully explain.",
} as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "builds", label: "Builds" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "writing", label: "Writing" },
] as const;
