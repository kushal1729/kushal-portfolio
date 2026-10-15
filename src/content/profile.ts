/* Everything the homepage, the print view and the structured data say about
   the work lives here. Client engagements are described by method and
   technology only: no client, sector, partner or platform names, no figures. */

export type Case = {
  id: string;
  title: string;
  context: string;
  summary: string;
  points: string[];
  stack: string[];
  /* Longer explanation, behind a disclosure so the page stays scannable. */
  details: { heading: string; body: string }[];
  /* For client work: what stays with the client. */
  note?: string;
};

export const cases: Case[] = [
  {
    id: "product-to-code",
    title: "Product-to-code agents",
    context: "Internship project at HashedIn by Deloitte, 2026",
    summary:
      "A multi-agent workflow that takes a product requirement and produces epics, user stories, technical specifications and working code, with a person able to stop and correct it between every step.",
    points: [
      "Pause-and-resume checkpoints between stages, so a reviewer can fix a story before any code is written from it",
      "Live progress streamed to the browser over WebSockets, with Mermaid diagrams generated alongside each spec",
      "Every model call traced in Langfuse, so a bad output can be followed back to the prompt that produced it",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "pgvector", "Langfuse", "WebSockets"],
    details: [
      {
        heading: "Why checkpoints matter more than the model",
        body: "A wrong user story produces confidently wrong code. Each stage writes its output to a checkpoint and can stop there for review, so the expensive mistake is caught while it is still a sentence. Resuming picks up from the corrected state rather than starting over.",
      },
      {
        heading: "Built forwards, useful backwards",
        body: "Going from requirements to code is legacy mining run in reverse. Building this direction is where most of what I know about reading the other direction came from: what a specification has to contain for code to follow from it, and what is lost when nobody writes it down.",
      },
    ],
  },
  {
    id: "legacy-mining",
    title: "Mining a legacy codebase",
    context: "Client engagement at HashedIn by Deloitte, ongoing",
    summary:
      "Reading a large enterprise Java application that nobody fully understands any more, and writing down what it actually does: screen by screen, down into the database and the mainframe.",
    points: [
      "Use cases derived from each JSF screen downward, through the service layer into DB2, stored procedures and mainframe transactions",
      "External JAR dependencies and outside integrations mapped to the exact point each one is called from",
      "Decommissioning impact analysis: before anything is switched off, every caller inside and outside the application is accounted for",
    ],
    stack: ["JSF", "Java", "DB2", "Stored procedures", "Mainframe", "LLM-assisted analysis"],
    details: [
      {
        heading: "Survey",
        body: "Every screen, entry point and outbound call, found by walking the view tree and faces config and following each screen into its managed beans. Models read breadth no person has time for; I decide what the breadth means.",
      },
      {
        heading: "Excavate",
        body: "Behaviour recovered from the code rather than the documentation: the service calls behind a button, the reads and writes, the stored procedures, and the identifiers that let one request be followed across all of it.",
      },
      {
        heading: "Interpret",
        body: "Capabilities, not classes. Written specifically enough that an engineer can act on it tomorrow, and plainly enough that the person funding the work can read it.",
      },
      {
        heading: "Modernize",
        body: "Behaviour pinned under tests first, edges strangled before the core, and nothing switched off until the evidence says it is safe. Every claim a model makes has to point to a file, a commit or a log query, or it is recorded as a hypothesis.",
      },
    ],
    note: "The client, its systems and its figures stay with the client.",
  },
  {
    id: "agent-assessment",
    title: "Where an agent pays for itself",
    context: "Client engagement at HashedIn by Deloitte, completed June 2026",
    summary:
      "Walking a client's business end to end, marking every point where an AI agent could take on or assist the work, then keeping only the ones that would pay for themselves.",
    points: [
      "The business model and its processes mapped step by step before any agent was proposed",
      "A cost case for every candidate: what it would take to build and run, against the work it would actually remove",
      "A shortlist that survived that test, instead of a list of everything an agent could do",
    ],
    stack: ["Process mapping", "Cost–benefit modelling", "Agent design"],
    details: [
      {
        heading: "Could versus should",
        body: "There are plenty of places an agent could go and far fewer where it should. Most candidates fail on running cost, on how little work they really remove, or because the step needs a person to stay accountable for it.",
      },
    ],
    note: "The client, its figures and the shortlist stay with the client.",
  },
];

/* The four stages of the mining method, drawn as a stepper next to the case. */
export const miningStages = [
  { name: "Survey", out: "Screen, entry-point and dependency inventory" },
  { name: "Excavate", out: "Call paths into stored procedures and the mainframe" },
  { name: "Interpret", out: "Capability map and use-case catalogue" },
  { name: "Modernize", out: "Impact matrix and a defensible migration order" },
];

export const buildFilters = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "data", label: "Data" },
  { id: "ml", label: "Machine learning" },
  { id: "legacy", label: "Legacy" },
] as const;

export type BuildFilter = (typeof buildFilters)[number]["id"];

export type Build = {
  id: string;
  name: string;
  when: string;
  body: string;
  stack: string[];
  tags: Exclude<BuildFilter, "all">[];
  href?: string;
};

export const builds: Build[] = [
  {
    id: "devex",
    name: "Developer experience platform",
    when: "Internship, 2026",
    body: "Internal engineering insights: GitHub activity tracking, anonymous pulse surveys, and role-based views for developers, managers, admins and stakeholders.",
    stack: ["Python", "FastAPI", "React", "PostgreSQL"],
    tags: ["backend", "frontend"],
  },
  {
    id: "home-api",
    name: "Home Solutions REST API",
    when: "Internship, 2026",
    body: "Role-based API for customers, experts and admins with JWT auth, a full payment lifecycle and an expert approval flow. Over 80% test coverage, documented in Swagger.",
    stack: ["Java 17", "Spring Boot 3", "PostgreSQL", "JUnit 5", "Mockito"],
    tags: ["backend"],
  },
  {
    id: "housemate",
    name: "HouseMate booking app",
    when: "Internship, 2026",
    body: "Customer and expert single-page app: a five-slice NgRx store, a four-step booking wizard, card, UPI and net-banking payments, English and Hindi, and WCAG AA accessibility.",
    stack: ["Angular 19", "NgRx", "RxJS", "Karma"],
    tags: ["frontend"],
  },
  {
    id: "helpdesk",
    name: "IT help desk platform",
    when: "Internship, 2026",
    body: "Ticket management with role-based dashboards and real-time status tracking. Over 80% test coverage.",
    stack: ["Node.js", "Express", "React", "Jest", "Vite"],
    tags: ["backend", "frontend"],
  },
  {
    id: "medallion",
    name: "Medallion data pipelines",
    when: "Internship, 2026",
    body: "Bronze, silver and gold layers with SCD type 1 and 2, change data capture and star-schema modelling, orchestrated through Data Factory and Databricks job clusters.",
    stack: ["Azure Databricks", "PySpark", "Delta Lake", "ADF"],
    tags: ["data"],
  },
  {
    id: "enterprise-frontend",
    name: "Enterprise platform frontend",
    when: "HashedIn, current",
    body: "Modular frontend architecture, feature work and performance tuning across large modules of a client-facing enterprise platform.",
    stack: ["Angular 21", "TypeScript", "RxJS"],
    tags: ["frontend"],
  },
  {
    id: "vba-extraction",
    name: "Logic extraction from Excel and bot scripts",
    when: "HashedIn, 2026",
    body: "A business process that ran as an Excel ribbon tool, its rules buried in VBA and a chain of bot scripts that had outlived their author. Read out what each macro decided and which file formats were load-bearing.",
    stack: ["VBA", "Excel", "Bot scripts"],
    tags: ["legacy"],
  },
  {
    id: "ecg",
    name: "ECG anomaly detection",
    when: "Research, 2025",
    body: "A CNN that detects arrhythmia from QRS and RR-interval features, at 97% test accuracy. Published at IEEE INDISCON 2025.",
    stack: ["Python", "TensorFlow", "CNN"],
    tags: ["ml"],
    href: "https://doi.org/10.1109/INDISCON66021.2025.11251818",
  },
  {
    id: "plant-id",
    name: "Handheld medicinal plant identifier",
    when: "Research, 2025",
    body: "Identifies 96 medicinal plant species offline on a Raspberry Pi, with a model sized for the device rather than the notebook it was trained in. Published at IEEE INCIP 2025.",
    stack: ["MobileNetV2", "Raspberry Pi", "IoT"],
    tags: ["ml"],
    href: "https://doi.org/10.1109/INCIP64058.2025.11019308",
  },
  {
    id: "cattle-id",
    name: "Biometric cattle identification",
    when: "Hackathon, 2024",
    body: "Identifies cattle from muzzle-pattern images using deep features, at 93% accuracy. Third place at the TANUVAS Digital Veterinary Hackathon.",
    stack: ["Xception", "Python"],
    tags: ["ml"],
  },
];

export type Role = {
  when: string;
  title: string;
  org: string;
  place?: string;
  body: string;
};

/* A true sequence, newest first. */
export const experience: Role[] = [
  {
    when: "Apr 2026 – now",
    title: "Software Engineer I",
    org: "HashedIn by Deloitte",
    place: "Hyderabad",
    body: "Client work on a large Angular 21 enterprise platform, legacy codebase mining, and an agent opportunity assessment.",
  },
  {
    when: "Jan – Apr 2026",
    title: "Software Engineer Intern",
    org: "HashedIn by Deloitte",
    place: "Bengaluru",
    body: "Built six systems end to end across Python, Java, Node, Angular and Databricks, including the product-to-code agents.",
  },
  {
    when: "2022 – 2026",
    title: "B.Tech, Computer and Communication Engineering",
    org: "Amrita Vishwa Vidyapeetham",
    body: "CGPA 8.43, with a minor in Data Science at 9.1. Field research on rural infrastructure and livelihoods in Assam through Live-in-Labs.",
  },
  {
    when: "2022 – 2026",
    title: "B.Sc, Data Science",
    org: "IIT Madras",
    body: "Online degree, CGPA 9.23.",
  },
];

export const papers = [
  {
    title: "CNN-based ECG signal analysis for anomalous heartbeat detection",
    venue: "IEEE INDISCON 2025, Rourkela",
    summary: "Arrhythmia detection from QRS and RR-interval features at 97% test accuracy.",
    href: "https://doi.org/10.1109/INDISCON66021.2025.11251818",
  },
  {
    title: "Handheld device for medicinal plant identification using deep learning and IoT",
    venue: "IEEE INCIP 2025, Bangalore",
    summary: "96 species classified offline on a Raspberry Pi.",
    href: "https://doi.org/10.1109/INCIP64058.2025.11019308",
  },
];

export const recognition = [
  {
    kind: "Certification",
    what: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    when: "Valid to Oct 2027",
  },
  {
    kind: "Certification",
    what: "Anthropic Claude Architect Professional, Architect Foundation, Associate Foundation and Developer Foundations",
    when: "4 credentials",
  },
  {
    kind: "Service",
    what: "Technical reviewer for IEEE INDISCON and CVMI",
    when: "2025",
  },
  {
    kind: "Award",
    what: "Third place, TANUVAS Digital Veterinary Hackathon",
    when: "2024",
  },
];
