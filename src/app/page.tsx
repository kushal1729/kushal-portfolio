import Link from "next/link";
import { ViewTransition } from "react";
import { site } from "@/lib/site";
import { SiteFooter, SiteHeader } from "@/components/chrome";
import { posts, formatDate } from "@/content/writing";
import { cases, experience, papers, recognition, skills, type Case } from "@/content/profile";
import { TraceDemo } from "@/components/trace-demo";
import { HeroName } from "@/components/hero-name";
import { PointerEffects } from "@/components/pointer-effects";
import { ToTop } from "@/components/to-top";
import { FollowButton } from "@/components/follow-button";
import { BuildGrid } from "@/components/build-grid";
import { CopyEmail } from "@/components/copy-email";
import { caseFigures } from "@/components/case-figures";
import {
  ArrowUpRight,
  ChevronDown,
  Document,
  Github,
  LinkedIn,
} from "@/components/icons";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader home />

      <main id="main">
        <section className="hero wrap" id="top" tabIndex={-1}>
          <HeroName />
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="pitch">{site.positioning}</p>
              <p className="hero-now">{site.now}</p>
              <p className="hero-role">
                {site.role} at {site.employer}, {site.location}. Six systems
                built in a four-month internship; two IEEE papers before that.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#work">
                  See current work
                </a>
                <a className="btn btn-quiet" href={site.resume} target="_blank" rel="noreferrer">
                  <Document />
                  Résumé
                </a>
                <CopyEmail className="btn btn-ghost" />
              </div>
              <p className="print-only">
                {site.email} &nbsp; {site.linkedin} &nbsp; {site.github}
              </p>
            </div>
            <TraceDemo />
          </div>
        </section>

        <section className="section wrap" id="work" tabIndex={-1} aria-labelledby="work-title">
          <header className="section-head">
            <h2 id="work-title">Client work</h2>
            <p>My engagements at HashedIn by Deloitte.</p>
          </header>

          <div className="cases">
            {cases
              .filter((item) => item.group === "now")
              .map((item) => (
                <CaseCard item={item} key={item.id} />
              ))}
          </div>
        </section>

        <section className="section wrap" id="builds" tabIndex={-1} aria-labelledby="builds-title">
          <header className="section-head">
            <h2 id="builds-title">Things I&apos;ve built</h2>
            <p>
              Built from an empty repository during my internship, across
              Python, Java, Node, Angular, Next.js and Databricks, and the
              research before it.
            </p>
          </header>
          <div className="cases builds-featured">
            {cases
              .filter((item) => item.group === "built")
              .map((item) => (
                <CaseCard item={item} key={item.id} />
              ))}
          </div>
          <BuildGrid />
        </section>

        <section className="section section-split wrap" id="skills" tabIndex={-1} aria-labelledby="skills-title">
          <header className="section-head">
            <h2 id="skills-title">Skills</h2>
            <p>What I build with, and what I read.</p>
          </header>
          <dl className="skills">
            {skills.map((group) => (
              <div key={group.area}>
                <dt>{group.area}</dt>
                <dd>
                  <ul className="stack">
                    {group.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section section-split wrap" id="experience" tabIndex={-1} aria-labelledby="experience-title">
          <header className="section-head">
            <h2 id="experience-title">Experience and education</h2>
          </header>
          <ol className="timeline">
            {experience.map((role) => (
              <li key={`${role.org}-${role.title}`}>
                <span className="timeline-when">{role.when}</span>
                <div>
                  <h3>{role.title}</h3>
                  <p className="timeline-org">
                    {role.org}
                    {role.place && `, ${role.place}`}
                  </p>
                  <p>{role.body}</p>
                  {role.links && (
                    <p className="timeline-links">
                      {role.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                          <ArrowUpRight />
                        </a>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section section-split wrap" id="research" tabIndex={-1} aria-labelledby="research-title">
          <header className="section-head">
            <h2 id="research-title">Research and recognition</h2>
            <p>The part of the record somebody else checked.</p>
          </header>
          <div className="research">
            <div className="papers">
              {papers.map((paper) => (
                <a className="paper spot" key={paper.href} href={paper.href} target="_blank" rel="noreferrer">
                  <span className="paper-venue">{paper.venue}</span>
                  <span className="paper-title">{paper.title}</span>
                  <span className="paper-summary">{paper.summary}</span>
                  <span className="text-link">
                    Read on IEEE Xplore
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
            </div>
            <dl className="recognition">
              {recognition.map((item) => (
                <div key={item.what}>
                  <dt>{item.kind}</dt>
                  <dd>
                    <span>
                      {item.what}
                      {item.links && (
                        <span className="recognition-links">
                          {item.links.map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                              {link.label}
                              <ArrowUpRight />
                            </a>
                          ))}
                        </span>
                      )}
                    </span>
                    <span className="recognition-when">{item.when}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section section-split wrap" id="writing" tabIndex={-1} aria-labelledby="writing-title">
          <header className="section-head">
            <h2 id="writing-title">Writing</h2>
            <p>
              Notes from mining legacy code with a language model: what to
              trust, in what order, and where the model earns its place.
            </p>
          </header>
          <div>
            <ul className="post-list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link className="post-link" href={`/writing/${post.slug}`} prefetch>
                    <ViewTransition name={`post-title-${post.slug}`} share="morph" default="none">
                      <h3>{post.title}</h3>
                    </ViewTransition>
                    <p>{post.standfirst}</p>
                    <span className="post-meta">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.readingTime} read</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="feed-note">
              All posts are at <Link href="/writing">/writing</Link>, or{" "}
              <FollowButton className="text-button" label="follow them in a feed reader" />.
            </div>
          </div>
        </section>

        <section className="section contact wrap" id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <h2 id="contact-title">Get in touch</h2>
          <p className="contact-copy">
            Email is the quickest way to reach me. I&apos;m happy to talk about
            agent systems, old codebases, or anything on this page.
          </p>
          <div className="contact-email">
            <a className="email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyEmail />
          </div>
          <ul className="contact-links">
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                <LinkedIn />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noreferrer">
                <Github />
                GitHub
              </a>
            </li>
            <li>
              <a href={site.resume} target="_blank" rel="noreferrer">
                <Document />
                Résumé
              </a>
            </li>
          </ul>
          <p className="contact-note">
            I work at HashedIn by Deloitte; this site is my own.
          </p>
        </section>
      </main>

      <ToTop target="top" />
      <PointerEffects />
      <SiteFooter />
    </>
  );
}

/* One case study: the copy, an optional "how it works" disclosure, and the
   figure drawn for it. */
function CaseCard({ item }: { item: Case }) {
  const Figure = caseFigures[item.id];
  return (
    <article
      className="case spot"
      id={item.id}
      tabIndex={-1}
      aria-labelledby={`${item.id}-title`}
    >
      <div className="case-copy">
        {item.status && (
          <p className="case-status" data-status={item.status}>
            {item.status === "current" ? "Current work" : "Finished"}
          </p>
        )}
        <h3 id={`${item.id}-title`}>{item.title}</h3>
        <p className="case-context">{item.context}</p>
        <p className="case-summary">{item.summary}</p>
        <ul className="case-points">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <ul className="stack" aria-label="Tools and techniques">
          {item.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        {item.details && (
          <details className="case-more">
            <summary>
              <ChevronDown />
              How it works
            </summary>
            <div className="case-more-body">
              {item.details.map((detail) => (
                <div key={detail.heading}>
                  <h4>{detail.heading}</h4>
                  <p>{detail.body}</p>
                </div>
              ))}
            </div>
          </details>
        )}
        {item.note && <p className="case-note">{item.note}</p>}
      </div>
      {Figure && <Figure />}
    </article>
  );
}
