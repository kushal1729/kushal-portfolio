import Link from "next/link";
import { site } from "@/lib/site";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { posts, formatDate } from "@/content/writing";
import {
  ArrowRight,
  ArrowUpRight,
  Document,
  Github,
  LinkedIn,
  Mail,
} from "@/components/icons";

/* An illustrative section through a typical enterprise stack.
   Fill density and the right-hand column both encode the same thing:
   the deeper you go, the less anyone still knows. */
const strata = [
  { yr: "2024", what: "Managed services, half-documented", known: "documented" },
  { yr: "2019", what: "Spring Boot API, no listed owner", known: "partly" },
  { yr: "2015", what: "JSF screens, original author gone", known: "no owner" },
  { yr: "2010", what: "SOAP integration layer", known: "unknown", dark: true },
  { yr: "2004", what: "Batch job, still runs payroll", known: "oral history", dark: true },
];

const stages = [
  {
    name: "Survey",
    claim: "Inventory before opinions.",
    detail:
      "Every screen, every entry point, every outbound call. In a JSF application that means walking the view tree and the faces config, then following each screen down into its managed beans and service layer. Models read breadth no person has time for. I decide what the breadth means.",
    artifacts: [
      "Screen and entry-point inventory",
      "External JAR dependency graph",
      "Database and integration connection map",
    ],
    out: "A map of what exists — and an honest list of what could not be reached.",
  },
  {
    name: "Excavate",
    claim: "Recover behaviour from the code, not the docs.",
    detail:
      "What a screen actually does, derived from the interface downward: the service calls behind a button, the DB2 reads and writes, the stored procedures, the green-screen transactions reached through bespoke adapters, and the process identifiers that let you follow a single request across all of it.",
    artifacts: [
      "Use cases derived screen by screen",
      "End-to-end call paths into mainframe and stored procedures",
      "Attribute-level data lineage",
    ],
    out: "Behaviour described at the level of business rules, with evidence attached.",
  },
  {
    name: "Interpret",
    claim: "Write it down in the business's language.",
    detail:
      "Capabilities, not classes. Which outside parties the system leans on — custodial, market-data and CRM providers — and the exact point each one is reached from. Specific enough that an engineer can act on it tomorrow, plain enough that the person funding the work can read it without a translator.",
    artifacts: [
      "Capability map",
      "External integration register",
      "Use-case catalogue",
    ],
    out: "The document the team has been missing for a decade.",
  },
  {
    name: "Modernize",
    claim: "Cut in the order the evidence says is safe.",
    detail:
      "Before anything is switched off, establish who depends on it — not just inside the application, but anywhere else in the organization quietly calling the same procedure or reading the same table. Strangle at the edges, pin behaviour under tests first, and leave the dangerous core until the evidence says it is no longer dangerous.",
    artifacts: [
      "Decommissioning impact matrix, in-application and org-wide",
      "Migration sequence with a defensible order",
    ],
    out: "A migration nobody has to guess their way through.",
  },
];

/* Framed as the foundation the mining work stands on, not a résumé list:
   knowing how a system is meant to be wired is what makes a forgotten one legible. */
const builds = [
  {
    group: "Platforms, end to end",
    lede: "Six applications taken from empty repository to working software, across Java, Node, Python and two major Angular versions. Knowing how a layered Spring service, an NgRx store or a role-based API is supposed to be wired is most of what makes an undocumented one readable.",
    items: [
      {
        name: "Enterprise platform frontend",
        stack: "Angular 21",
        body: "Modular frontend architecture, feature development and performance work across large enterprise modules.",
      },
      {
        name: "Product-to-code multi-agent system",
        stack: "Python, FastAPI, LangGraph, pgvector, Langfuse",
        body: "Archaeology run in reverse: requirements in; epics, stories, specifications and working code out, with pause-and-resume checkpoints, live progress, generated diagrams and full LLM observability.",
      },
      {
        name: "Developer experience platform",
        stack: "Python, FastAPI, React, PostgreSQL",
        body: "Internal engineering insights: repository activity tracking, anonymous pulse surveys, and role-based access across developer, manager, admin and stakeholder views.",
      },
      {
        name: "Home services REST API",
        stack: "Java 17, Spring Boot 3, PostgreSQL, JUnit 5",
        body: "Layered role-based API with JWT auth, a full payment lifecycle and an expert onboarding and approval flow. Over 80% test coverage, documented with Swagger.",
      },
      {
        name: "HouseMate booking SPA",
        stack: "Angular 19, NgRx, RxJS, Karma",
        body: "Customer and expert single-page app: five-slice NgRx state, a four-step booking wizard, card, UPI and net-banking payment flows, lazy-loaded routes, English and Hindi, and WCAG-AA accessibility.",
      },
      {
        name: "IT help desk platform",
        stack: "Node.js, Express, React, Jest",
        body: "Ticket management with role-based dashboards and real-time status tracking.",
      },
    ],
  },
  {
    group: "Data engineering",
    lede: "Attribute lineage in a forgotten system is the same problem as a slowly-changing dimension — establish what a field means, where it came from, and what last changed it — only without anyone having designed it that way on purpose.",
    items: [
      {
        name: "Medallion architecture pipelines",
        stack: "Azure Databricks, PySpark, Delta Lake, ADF",
        body: "Bronze, silver and gold layers with SCD type 1 and 2, change data capture and star-schema modelling, orchestrated through Data Factory and Databricks job clusters.",
      },
    ],
  },
  {
    group: "Applied machine learning",
    lede: "Reading dependable signal out of noisy real-world input, under constraints that are not negotiable — a model that has to run offline on a handheld device, or identify an animal from a muzzle print.",
    items: [
      {
        name: "Biometric cattle identification",
        stack: "Xception, Python",
        body: "Deep-feature muzzle-pattern recognition at 93% accuracy. Third place at the TANUVAS Digital Veterinary Hackathon.",
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="shell">
        <SiteHeader home />

        <main id="main">
          <section className="hero band" id="top">
            <div className="hero-meta">
              <span className="pin">{site.role}</span>
              <span>{site.discipline}</span>
            </div>

            <h1 className="name">
              <span>Kushal</span>
              <span>Yarlagadda</span>
            </h1>

            <div className="hero-line">
              <p>{site.positioning}</p>
              <a className="btn" href="#contact">
                Talk about your codebase
                <ArrowRight />
              </a>
            </div>

            <div className="section-drawing">
              {strata.map((layer, i) => (
                <div
                  className="stratum"
                  key={layer.yr}
                  style={{ "--depth": i } as React.CSSProperties}
                >
                  <span className="yr">{layer.yr}</span>
                  <span className="what">{layer.what}</span>
                  <span className="known" data-known={layer.dark ? "none" : undefined}>
                    {layer.known}
                  </span>
                </div>
              ))}
              <div className="borehole" aria-hidden="true" />
            </div>
            <p className="drawing-caption">
              <span>A section through a typical enterprise stack, by depth.</span>
              <span>how much is still known &darr;</span>
            </p>
          </section>

          <section className="problem band">
            <h2 className="problem-open">Every company has one.</h2>
            <div className="problem-body">
              <p>
                The system that runs payroll, or settlements, or the batch job
                nobody schedules any more. It works. It has worked for fifteen
                years. The people who understood it have left, the documentation
                describes a version that no longer exists, and every proposal to
                replace it dies on the same question: <em>what does it actually do?</em>
              </p>
              <p>
                That question has always had an answer. It has just been too
                expensive to read out by hand — hundreds of thousands of lines,
                four languages, two decades of commits, and no one left to ask.
              </p>
            </div>
            <p className="turn">
              Reading at that scale is the part that got cheap. Deciding what it
              means did not, and that is the part I do.
            </p>
          </section>

          <section className="method band band-dark" id="method">
            <div className="head">
              <h2>How a forgotten system gets explained</h2>
              <p className="head-note">
                Four stages, run in order, because each one decides what the
                next is allowed to assume. Nothing here is a document generated
                in one pass — the sequence is the method.
              </p>
            </div>

            <div className="stages">
              {stages.map((stage, i) => (
                <article className="stage" key={stage.name}>
                  <span className="stage-no">{`0${i + 1}`}</span>
                  <div>
                    <h3>{stage.name}</h3>
                    <p className="stage-claim">{stage.claim}</p>
                  </div>
                  <div className="stage-body">
                    <p className="stage-detail">{stage.detail}</p>
                    <ul className="artifacts">
                      {stage.artifacts.map((artifact) => (
                        <li key={artifact}>{artifact}</li>
                      ))}
                    </ul>
                    <p className="stage-out">
                      <b>Output</b> &mdash; {stage.out}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="pullout">
              Models do the reading. Every claim they produce has to be anchored
              to a file, a commit, or a log query — otherwise it is a hypothesis,
              and it gets recorded as one.
            </p>
          </section>

          <section className="work band" id="work">
            <div className="head">
              <h2>Work</h2>
              <p className="head-note">
                Two client engagements through HashedIn by Deloitte, described
                by method rather than by name. Everything below them is the
                ground that method stands on.
              </p>
            </div>

            <div className="cases">
              <article className="case case-client">
                <div>
                  <p className="case-kind">
                    Current &mdash; financial services, via HashedIn by Deloitte
                  </p>
                  <h3>Mining a system nobody owns</h3>
                </div>
                <div>
                  <p className="case-body">
                    A JSF application mined screen by screen: use cases derived
                    from the interface downward, each one traced through its
                    service layer into DB2, stored procedures, and green-screen
                    mainframe transactions reached through bespoke adapters.
                    Alongside it, the external JAR dependencies nobody has a
                    record for, and the outside parties — custodial,
                    market-data and CRM providers — that the system silently
                    depends on.
                  </p>
                  <p className="case-body">
                    The part that earns its keep is impact analysis. When
                    somebody asks whether a component can be switched off, the
                    answer has to account for every caller: inside the
                    application, and anywhere else in the organization still
                    reading the same table or calling the same procedure
                    without remembering why.
                  </p>
                  <div className="tags">
                    <span>JSF screen mining</span>
                    <span>DB2</span>
                    <span>stored procedures</span>
                    <span>mainframe call paths</span>
                    <span>JAR dependency mapping</span>
                    <span>attribute lineage</span>
                    <span>impact analysis</span>
                  </div>
                  <p className="case-note">
                    Client systems, integration partners and figures stay with
                    the client. The method is above, and the writing goes into
                    more detail.
                  </p>
                </div>
              </article>

              <article className="case case-client">
                <div>
                  <p className="case-kind">
                    Completed June 2026 &mdash; client engagement via HashedIn by
                    Deloitte
                  </p>
                  <h3>Where an agent pays for itself</h3>
                </div>
                <div>
                  <p className="case-body">
                    The same survey discipline, pointed at a business instead of
                    a codebase: walking the client&apos;s business model end to
                    end and marking every point where an agent could take on or
                    assist the work.
                  </p>
                  <p className="case-body">
                    The pass that mattered was the second one: a profitability
                    case for each candidate, weighing what an integration would
                    cost to build and run against the work it would actually
                    remove. There are plenty of places an agent <em>could</em>{" "}
                    go and far fewer where it <em>should</em>, and the
                    engagement&apos;s output was the shortlist that survived
                    that test.
                  </p>
                  <div className="tags">
                    <span>business model analysis</span>
                    <span>process mapping</span>
                    <span>agentic opportunity assessment</span>
                    <span>cost&ndash;benefit modelling</span>
                  </div>
                  <p className="case-note">
                    The client, its figures and the shortlist stay with the
                    client.
                  </p>
                </div>
              </article>
            </div>

            <aside className="oddjobs">
              <div>
                <h3>The ones nobody else will touch</h3>
              </div>
              <div>
                <p>
                  Not all legacy lives in Java. A payroll process ran as an
                  Excel ribbon tool, its real business rules buried in the VBA
                  behind it, feeding vendor files through a chain of bot
                  scripts that had long outlived their author.
                </p>
                <p>
                  Reading that logic out — what each macro actually decided,
                  which vendor file formats were load-bearing, what the bots
                  did when a file arrived malformed — is the same work as
                  mining a mainframe in a different costume. Business logic
                  ends up wherever somebody could put it, and being willing to
                  go there is most of the job.
                </p>
                <div className="tags">
                  <span>VBA extraction</span>
                  <span>Excel tooling</span>
                  <span>bot script analysis</span>
                  <span>vendor file formats</span>
                  <span>logic mapping</span>
                </div>
              </div>
            </aside>

            <div className="builds">
              <div className="builds-head">
                <h3>Built before mined</h3>
                <p>
                  You cannot map a system you have never built. Everything
                  below I took from an empty repository to working software,
                  which is the only reason I can open somebody else&apos;s and
                  tell what its author was trying to do.
                </p>
              </div>

              {builds.map((group) => (
                <section className="build-group" key={group.group}>
                  <div className="build-group-head">
                    <h4>{group.group}</h4>
                    <p>{group.lede}</p>
                  </div>
                  <div className="build-list">
                    {group.items.map((item) => (
                      <article className="build" key={item.name}>
                        <h5>{item.name}</h5>
                        <p className="build-stack">{item.stack}</p>
                        <p>{item.body}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="papers">
              <a
                className="paper-row"
                href="https://doi.org/10.1109/INDISCON66021.2025.11251818"
                target="_blank"
                rel="noreferrer"
              >
                <span className="venue">IEEE INDISCON 2025</span>
                <span>
                  <strong>
                    CNN-based ECG signal analysis for anomalous heartbeat
                    detection
                  </strong>
                  <p>
                    Arrhythmia detection from QRS and RR interval features, at
                    97% test accuracy. Reading reliable signal out of noisy
                    real-world input.
                  </p>
                </span>
                <span className="yr">
                  2025
                  <ArrowUpRight />
                </span>
              </a>

              <a
                className="paper-row"
                href="https://doi.org/10.1109/INCIP64058.2025.11019308"
                target="_blank"
                rel="noreferrer"
              >
                <span className="venue">IEEE INCIP 2025</span>
                <span>
                  <strong>
                    Handheld device for medicinal plant identification using
                    deep learning and IoT
                  </strong>
                  <p>
                    96 species classified offline on a Raspberry Pi — a model
                    constrained by the device it had to run on, not by the
                    notebook it was trained in.
                  </p>
                </span>
                <span className="yr">
                  2025
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          </section>

          <section className="writing band" id="writing">
            <div className="head">
              <h2>Writing</h2>
              <p className="head-note">
                Notes on reading systems nobody remembers: what to trust, in
                what order, and where a language model earns its place.
              </p>
            </div>

            <div className="posts">
              {posts.map((post) => (
                <Link
                  className="post-row"
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                >
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>
                    <h3>{post.title}</h3>
                    <p>{post.standfirst}</p>
                  </span>
                  <span className="go">
                    <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
            <p className="feed-note">
              All posts are at <Link href="/writing">/writing</Link>, or follow
              the <a href="/writing/rss.xml">RSS feed</a>.
            </p>
          </section>

          <section className="creds band">
            <div>
              <h2>Credentials</h2>
              <p className="creds-intro">
                Published research, certification, and review work — the part of
                the record somebody else checked.
              </p>
            </div>
            <div className="cred-list">
              <div className="cred-row">
                <span>Research</span>
                <strong>Two IEEE conference publications, 2025</strong>
                <span>INDISCON, INCIP</span>
              </div>
              <div className="cred-row">
                <span>Service</span>
                <strong>Technical reviewer &mdash; IEEE INDISCON and CVMI</strong>
                <span>2025</span>
              </div>
              <div className="cred-row">
                <span>Certified</span>
                <strong>
                  Oracle Cloud Infrastructure 2025 Certified Data Science
                  Professional
                </strong>
                <span>2025&ndash;27</span>
              </div>
              <div className="cred-row">
                <span>Certified</span>
                <strong>
                  Anthropic Claude credentials &mdash; Architect Professional,
                  Architect Foundation, Associate Foundation, Developer
                  Foundations
                </strong>
                <span>4 earned</span>
              </div>
              <div className="cred-row">
                <span>Award</span>
                <strong>
                  Third place, Digital Veterinary Hackathon &mdash; TANUVAS
                </strong>
                <span>2024</span>
              </div>
            </div>
          </section>

          <section className="about band" id="about">
            <div className="about-grid">
              <div>
                <h2>Research-trained, production-minded</h2>
                <p className="about-lede">
                  I am a software engineer at HashedIn by Deloitte, with a
                  background in Computer and Communication Engineering from
                  Amrita Vishwa Vidyapeetham and a Data Science degree from IIT
                  Madras. Two IEEE papers, an Oracle data-science
                  certification, and four Anthropic Claude credentials.
                </p>
                <p className="about-lede">
                  What I actually care about is narrower than any of that: the
                  moment a system nobody could explain becomes a system somebody
                  can act on. Research taught me to insist on evidence for a
                  claim. Legacy work is where that habit turns out to be worth
                  something.
                </p>
              </div>
              <div className="timeline">
                <div>
                  <span>Now</span>
                  <p>
                    <strong>HashedIn by Deloitte</strong>
                    Software Engineer &mdash; legacy systems, applied AI
                  </p>
                </div>
                <div>
                  <span>2022&ndash;26</span>
                  <p>
                    <strong>Amrita Vishwa Vidyapeetham</strong>
                    B.Tech, Computer and Communication Engineering, with a
                    minor in Data Science
                  </p>
                </div>
                <div>
                  <span>2022&ndash;26</span>
                  <p>
                    <strong>IIT Madras</strong>
                    B.Sc, Data Science
                  </p>
                </div>
                <div>
                  <span>2025</span>
                  <p>
                    <strong>IEEE INDISCON, INCIP</strong>
                    Two published papers; technical reviewer
                  </p>
                </div>
                <div>
                  <span>Field</span>
                  <p>
                    <strong>Live-in-Labs, Assam</strong>
                    Participatory rural research on infrastructure, agriculture
                    and livelihoods
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="contact band band-dark" id="contact">
            <h2>Sitting on a system nobody can explain?</h2>
            <p className="contact-copy">
              I would like to hear about it. What it runs, roughly how old it
              is, and what you have already tried — that is enough for a useful
              first conversation.
            </p>
            <p className="contact-copy">
              I do this work at HashedIn by Deloitte; this site is my own.
              Engineers and researchers, write about anything above.
            </p>

            <a className="email" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight />
            </a>

            <div className="reach">
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn /> LinkedIn
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer">
                <Document /> Résumé
              </a>
              <a href={`mailto:${site.email}`}>
                <Mail /> Email
              </a>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
