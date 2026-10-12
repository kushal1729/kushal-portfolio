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
  { yr: "2015", what: "Struts and JSP, original author gone", known: "no owner" },
  { yr: "2010", what: "SOAP integration layer", known: "unknown", dark: true },
  { yr: "2004", what: "Batch job, still runs payroll", known: "oral history", dark: true },
];

const stages = [
  {
    name: "Survey",
    claim: "Inventory before opinions.",
    detail:
      "Entry points, call graphs, data flows, the build graph, and twenty years of commit history, read end to end. Models read breadth no person has time for. I decide what the breadth means.",
    out: "A map of what exists — and an honest list of what could not be reached.",
  },
  {
    name: "Excavate",
    claim: "Recover behaviour from the code, not the docs.",
    detail:
      "Which branches ever fire. What the nightly batch actually writes. Which temporary flag has been load-bearing since 2011. Commit history and ticket archaeology as a second, independent source.",
    out: "Behaviour described at the level of business rules, with evidence attached.",
  },
  {
    name: "Interpret",
    claim: "Write it down in the business's language.",
    detail:
      "Capabilities, not classes. Specific enough that an engineer can act on it tomorrow, plain enough that the person funding the work can read it without a translator.",
    out: "The document the team has been missing for a decade.",
  },
  {
    name: "Modernize",
    claim: "Cut in the order the map says is safe.",
    detail:
      "Strangle at the edges. Pin behaviour under tests before touching it. Leave the dangerous core until the evidence says it is no longer dangerous. Sequence comes from the map, not from appetite.",
    out: "A migration with a defensible reason for its order.",
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
                The archaeology is current client work, so it is described by
                method rather than by name. Everything below it is the ground
                that method stands on.
              </p>
            </div>

            <div className="cases">
              <article className="case case-lead">
                <div>
                  <p className="case-kind">Current &mdash; HashedIn by Deloitte</p>
                  <h3>Legacy system archaeology</h3>
                </div>
                <div>
                  <p className="case-body">
                    Mapping and modernizing enterprise systems that have
                    outlived their documentation and their original engineers.
                    Static and dynamic analysis to establish what exists,
                    retrieval over source and commit history to establish why,
                    and an incremental migration sequence derived from the map
                    rather than from appetite.
                  </p>
                  <div className="tags">
                    <span>call-graph analysis</span>
                    <span>RAG over source history</span>
                    <span>LLM pipelines</span>
                    <span>incremental migration</span>
                  </div>
                  <p className="case-note">
                    Client systems and figures stay with the client. The method
                    is above, and the writing goes into more detail.
                  </p>
                </div>
              </article>

              <article className="case">
                <div>
                  <p className="case-kind">Built it &mdash; applied AI systems</p>
                  <h3>Product-to-code multi-agent system</h3>
                </div>
                <div>
                  <p className="case-body">
                    Archaeology run in reverse: requirements in, epics, stories,
                    specifications and working code out, with pause and resume
                    checkpoints, live progress, generated diagrams and full LLM
                    observability. Building the forward direction is where I
                    learned most of what I know about reading the backward one.
                  </p>
                  <div className="tags">
                    <span>Python</span>
                    <span>FastAPI</span>
                    <span>LangGraph</span>
                    <span>pgvector</span>
                    <span>Langfuse</span>
                  </div>
                </div>
              </article>
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
                  background in Computer and Communication Engineering and Data
                  Science from Amrita Vishwa Vidyapeetham. Two IEEE papers, an
                  Oracle data-science certification, and four Anthropic Claude
                  credentials.
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
                    B.Tech, Computer and Communication Engineering
                  </p>
                </div>
                <div>
                  <span>2025</span>
                  <p>
                    <strong>IEEE INDISCON, INCIP</strong>
                    Two published papers; technical reviewer
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
