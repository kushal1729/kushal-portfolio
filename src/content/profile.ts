/* Everything the homepage, the print view and the structured data say about
   the work lives here. Client engagements are described by method and
   technology only: no client, sector, partner or platform names, no figures. */

export type Case = {
  id: string;
  /* "now" is current client work; "built" is something taken from an empty
     repository to working software. */
  group: "now" | "built";
  /* Client work only: whether the engagement is still running. */
  status?: "current" | "finished";
  title: string;
  context: string;
  summary: string;
  points: string[];
  stack: string[];
  /* Longer explanation, behind a disclosure so the page stays scannable. */
  details?: { heading: string; body: string }[];
  /* For client work: what stays with the client. */
  note?: string;
};

export const cases: Case[] = [
  {
    id: "legacy-mining",
    group: "now",
    status: "current",
    title: "Mining two legacy services",
    context:
      "Client engagement at HashedIn by Deloitte. I'm the only engineer mining these two services.",
    summary:
      "Two services in a large enterprise estate are mine to read end to end: what each one actually does, what it calls, and where the same logic lives somewhere else. What comes out is a set of use cases the client checks against how the business really runs, before any of it is modernized.",
    points: [
      "A Java middleware service, followed down through DB2 and stored procedures into the mainframe transactions it ends in",
      "An Excel ribbon tool whose rules live in VBA, with integrations of its own and logic that duplicates what runs elsewhere",
      "Use cases and dependency maps demoed and walked through with the delivery team, then refined until the client validates them",
    ],
    stack: ["Java", "DB2", "Stored procedures", "Mainframe", "Excel VBA", "LLM-assisted analysis"],
    details: [
      {
        heading: "Survey",
        body: "Every entry point, outbound call and integration, found by walking the code rather than the documentation. Models read breadth no person has time for; I decide what the breadth means.",
      },
      {
        heading: "Excavate",
        body: "Behaviour recovered from the code: the service calls behind each operation, the reads and writes, the stored procedures, and the identifiers that let one request be followed across all of it. In the spreadsheet tool, that means reading what each macro decides, and which of its rules already exist somewhere else.",
      },
      {
        heading: "Interpret",
        body: "Capabilities, not classes. Use cases written specifically enough that an engineer can act on them, and plainly enough that the client can say whether they are right.",
      },
      {
        heading: "Hand off",
        body: "I demo each set of use cases to the delivery team and walk them through it. They take it to the client, and the client's questions come back to me. Once the detail holds up, the modernization team takes it from there. Every claim a model makes has to point to a file, a procedure or a query, or it goes in as a hypothesis.",
      },
    ],
    note: "The client, its systems and its figures stay with the client.",
  },
  {
    id: "agent-platform",
    group: "now",
    status: "finished",
    title: "Frontend for an agent-opportunity platform",
    context: "Client engagement at HashedIn by Deloitte",
    summary:
      "An enterprise platform that maps a business process by process and weighs where an AI agent would pay for itself. I was a frontend developer on its delivery team, building the Angular 21 application from the team's tickets.",
    points: [
      "Feature development across large modules of the application",
      "Contributions to its modular frontend architecture",
      "Performance optimisation across large enterprise modules",
    ],
    stack: ["Angular 21", "TypeScript", "RxJS"],
    details: [
      {
        heading: "What the platform is for",
        body: "There are plenty of places an agent could go and far fewer where it should. The platform helps a team map the process, mark the candidates, and keep only the ones whose running cost is justified by the work they remove. Building its screens meant making that trade-off readable at a glance.",
      },
    ],
    note: "The client, its product and its data stay with the client.",
  },
  {
    id: "product-to-code",
    group: "built",
    title: "Product-to-code agents",
    context: "Inspired by my internship evaluation project at HashedIn by Deloitte, 2026",
    summary:
      "A full-stack multi-agent system that turns a product requirement into epics, user stories, technical specifications and tested Python code. A person approves, rejects or redirects the agents at every stage, and every file can be traced back to the requirement it came from.",
    points: [
      "A fourteen-node LangGraph pipeline with an approval gate after every stage, held in a Postgres checkpointer so a run can wait for review or survive a restart",
      "Generated code is linted and run against its own tests; failures go to a fix agent whose patch applies automatically or after a person approves it",
      "Specs grounded in the project's own documents through pgvector search and in web research, with file writes and knowledge search exposed as MCP servers",
      "A Next.js workbench: live progress over WebSockets, Mermaid diagrams, gates, instructions mid-run, admin model settings and a usage ledger",
      "Tested at every layer, from unit and API tests to end-to-end runs in a real browser, then checked against a live model before it was called done",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "MCP", "pgvector", "Langfuse", "Next.js", "TypeScript", "WebSockets", "Playwright"],
    details: [
      {
        heading: "Why gates matter more than the model",
        body: "A wrong user story produces confidently wrong code. So each stage stops at a gate: approve it, reject it with feedback for the agent to try again, or send the running agent an instruction. The state lives in a Postgres checkpointer, so a run can wait for a reviewer or survive a server restart, and it resumes from the corrected state rather than starting over.",
      },
      {
        heading: "Code has to pass before it counts",
        body: "Each story's code is written into its own folder through the file-operations MCP server, then checked with ruff and run against the tests generated with it. A failure goes to a fix agent that proposes a patch, applied automatically or held for a person to approve, up to a set number of attempts. Every model call goes through one gateway with a token-rate limiter and is traced in Langfuse.",
      },
      {
        heading: "What a finished run hands over",
        body: "An export with the code, the specs as PDF, the research behind them, the validation reports and a traceability matrix from each requirement through its epic, story and spec to the files that implement it.",
      },
      {
        heading: "Built forwards, useful backwards",
        body: "Going from requirements to code is legacy mining run in reverse. Building it first taught me what a specification has to contain for code to follow from it, which is exactly what I now dig back out of systems where nobody wrote it down.",
      },
    ],
  },
];

/* The four stages of the mining method, drawn as a stepper next to the case. */
export const miningStages = [
  { name: "Survey", out: "Entry points, integrations and dependency inventory" },
  { name: "Excavate", out: "Call paths into stored procedures, the mainframe and the macros" },
  { name: "Interpret", out: "Use cases and a capability map" },
  { name: "Hand off", out: "Demo, walkthrough and client validation, ahead of modernization" },
];

export const buildFilters = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "data", label: "Data" },
  { id: "ml", label: "Machine learning" },
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
  /* What the link opens; papers are the default. */
  linkLabel?: string;
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
    id: "neuromorphic",
    name: "Gradient-free neuromorphic image recognition",
    when: "Research, 2026",
    body: "A spiking neural network that learns with STDP under measured memristor potentiation–depression dynamics, with no backpropagation. 66.07% on CIFAR-10, and 64.84% ± 0.17 across seeds.",
    stack: ["Python", "Spiking neural networks", "STDP", "Ridge regression"],
    tags: ["ml"],
    href: "https://github.com/kushal1729/Gradient-Free-Neuromorphic-Image-Recognition-Architecture-Driven-by-Measured-Memristor",
    linkLabel: "View the code",
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

/* The working stack, grouped the way the résumé groups it. */
export const skills = [
  { area: "Languages", tools: ["Python", "Java", "TypeScript", "SQL", "C"] },
  { area: "Frontend", tools: ["Angular 19 and 21", "React", "Next.js", "NgRx", "RxJS", "HTML", "SCSS", "Vite"] },
  { area: "Backend", tools: ["FastAPI", "Spring Boot 3", "Node.js", "Express", "REST APIs", "JWT"] },
  { area: "AI and ML", tools: ["LangGraph", "LangChain", "MCP", "Langfuse", "pgvector", "TensorFlow", "CNNs", "YOLO"] },
  { area: "Legacy systems", tools: ["DB2", "Stored procedures", "Mainframe", "Excel VBA"] },
  { area: "Data engineering", tools: ["Azure Databricks", "PySpark", "Delta Lake", "ADF", "SCD 1 and 2", "CDC", "Star schema"] },
  { area: "Databases", tools: ["PostgreSQL", "SQLite"] },
  { area: "Cloud and DevOps", tools: ["AWS", "Azure", "Oracle Cloud", "Git", "Docker"] },
  { area: "Testing", tools: ["JUnit 5", "Mockito", "Jest", "Karma", "Jasmine"] },
];

export type Role = {
  when: string;
  title: string;
  org: string;
  place?: string;
  body: string;
  /* Official documents, opened on the issuer's own verification pages. */
  links?: { label: string; href: string }[];
};

/* A true sequence, newest first. */
export const experience: Role[] = [
  {
    when: "Apr 2026 – now",
    title: "Software Engineer I",
    org: "HashedIn by Deloitte",
    place: "Bengaluru",
    body: "Sole owner of the legacy mining for two services, from code to client-validated use cases. Before that, frontend development on the Angular 21 application of an agent-opportunity platform.",
  },
  {
    when: "Jan – Apr 2026",
    title: "Software Engineer Intern",
    org: "HashedIn by Deloitte",
    place: "Bengaluru",
    body: "Built six systems end to end across Python, Java, Node, Angular, Next.js and Databricks, including the product-to-code agents.",
  },
  {
    when: "2024 – present",
    title: "BS in Data Science and Applications",
    org: "IIT Madras",
    body: "Online degree, alongside the B.Tech. Foundation level completed December 2024 and the Diploma in Programming September 2026; now in the Diploma in Data Science. CGPA 9.17.",
    links: [
      {
        label: "Admission letter",
        href: "https://app.onlinedegree.iitm.ac.in/document_verification/bf90f9ec6fd688377e8497e61d545dde",
      },
      {
        label: "Foundation certificate",
        href: "https://ds.study.iitm.ac.in/document_verification/2a6364b7eaf25c672a57f9daf837e566c2f5d8b5a6be09ea88f3fa2c581b40f1",
      },
      {
        label: "Diploma in Programming",
        href: "https://ds.study.iitm.ac.in/document_verification/75e044cc0ee08b4fb40a589ae4bc5b10d4b3c25f3d96e051837c3cd83bb83cbf",
      },
    ],
  },
  {
    when: "2022 – 2026",
    title: "B.Tech, Computer and Communication Engineering",
    org: "Amrita Vishwa Vidyapeetham",
    body: "CGPA 8.43, with a minor in Data Science at 9.1. Field research on rural infrastructure and livelihoods in Assam through Live-in-Labs.",
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

export type Recognition = {
  kind: string;
  what: string;
  when: string;
  /* Verification pages, one per credential. */
  links?: { label: string; href: string }[];
};

/* Strongest first; the short introductory certificates sit at the end. */
export const recognition: Recognition[] = [
  {
    kind: "Certification",
    what: "Anthropic Claude Certified",
    when: "4 credentials",
    links: [
      {
        label: "Architect – Professional",
        href: "https://www.credly.com/badges/2f588523-6324-42de-9817-9a772e26c02d/public_url",
      },
      {
        label: "Architect – Foundations",
        href: "https://www.credly.com/badges/0ca63f42-431a-4c36-a6f6-f5d45e580fd5/public_url",
      },
      {
        label: "Developer – Foundations",
        href: "https://www.credly.com/badges/c9aa43eb-349d-4c1f-b056-b186daad9005/public_url",
      },
      {
        label: "Associate – Foundations",
        href: "https://www.credly.com/badges/04381f92-cc62-4bfa-bcdc-0f04aefb68d6/public_url",
      },
    ],
  },
  {
    kind: "Certification",
    what: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    when: "Valid to Oct 2027",
    links: [
      {
        label: "Verify on Oracle",
        href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0311806CEE025B84C0F7C9B1322847144E8FC832364C6B9F357303F69C8C4616",
      },
    ],
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
  {
    kind: "Certificate",
    what: "AWS Educate Machine Learning Foundations",
    when: "Jul 2025",
  },
  {
    kind: "Certificate",
    what: "IBM Getting Started with Artificial Intelligence",
    when: "Jul 2025",
  },
  {
    kind: "Certificate",
    what: "AWS Academy Graduate, Cloud Foundations",
    when: "Jun 2025",
  },
];
