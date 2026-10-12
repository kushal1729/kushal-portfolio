import type { ReactNode } from "react";

export type Post = {
  slug: string;
  title: string;
  /* Shown under the headline on the post, and as the page description. */
  standfirst: string;
  date: string;
  readingTime: string;
  body: ReactNode;
};

export const posts: Post[] = [
  {
    slug: "what-i-ask-a-codebase-first",
    title: "What I ask a codebase before I ask anyone about it",
    standfirst:
      "When you inherit a system nobody can explain, the people are the worst place to start. Here is the order I actually go in, and what I let a model do.",
    date: "2026-10-05",
    readingTime: "6 min",
    body: (
      <>
        <p>
          The instinct when you are handed an undocumented system is to find
          the person who knows it. Sometimes that person exists. More often you
          get a name, and the name has left, and the three people who remain
          each describe a different system with equal confidence.
        </p>
        <p>
          I have come to treat people as a late source rather than a first one.
          Not because they are unreliable in bad faith, but because memory is
          reconstructive and codebases move. Someone who worked on a service in
          2019 will describe the 2019 service fluently and will not know which
          parts of their description expired. Worse, if you ask them first,
          their model becomes your model, and you will spend the next month
          confirming it instead of testing it.
        </p>
        <p>
          So I start with the artifacts, which have the useful property of being
          unable to misremember. These are the questions, in order.
        </p>

        <h2>What actually runs?</h2>
        <p>
          Not what is in the repository — what is deployed. A repository is a
          graveyard with a few living residents, and the two are not labelled.
          Deployment manifests, scheduler entries, cron tables, service
          definitions, the actual process list on the actual host: this is the
          only authoritative statement about what exists in production.
        </p>
        <p>
          The gap between the two is usually the most interesting thing I learn
          in the first week. A repository with forty modules where the deploy
          only ships nine has told me where not to spend four weeks.
        </p>

        <h2>Where does the outside world touch it?</h2>
        <p>
          Entry points are the system&apos;s true surface area, and they are
          always more numerous than anyone says. HTTP routes are the ones people
          remember. The ones they forget:
        </p>
        <ul>
          <li>queue and topic consumers</li>
          <li>scheduled jobs, including ones scheduled outside the codebase</li>
          <li>database triggers and stored procedures</li>
          <li>file drops on a shared mount that a watcher picks up</li>
          <li>
            another team&apos;s service calling an endpoint that is not in any
            document
          </li>
        </ul>
        <p>
          I want a counted list. &ldquo;About a dozen&rdquo; is not an
          inventory. Forty-one is an inventory, and the number itself is often
          the first thing that changes how leadership talks about the system.
        </p>

        <h2>Which of those paths are actually used?</h2>
        <p>
          Static analysis tells you what <em>can</em> happen. Telemetry tells
          you what <em>does</em>. You need both, and you need to keep them
          clearly separated in your head, because conflating them is how people
          end up carefully migrating a code path that last executed in 2018.
        </p>
        <p>
          Access logs, APM traces, database table read and write statistics,
          queue depth history. If none of that is instrumented, instrumenting
          the entry points is usually a better first deliverable than any
          document, because it starts a clock on evidence you do not yet have.
        </p>

        <h2>What does the history say about pain?</h2>
        <p>
          <code>git log</code> is the most underused archaeological record in
          software. It is dated, attributable, and nobody goes back and tidies
          it to make the system look better than it was.
        </p>
        <p>
          Two signals I look for. First, churn: the files changed most often
          over the last few years are where the business actually lives, whatever
          the architecture diagram says. Second, the ratio of fix-shaped commits
          to feature-shaped commits per file. A module with high churn and a high
          fix ratio is not badly written by accident — it is where the
          requirements are genuinely unclear, and it will be the hardest thing to
          replace no matter how clean the replacement looks.
        </p>
        <blockquote>
          A &ldquo;temp fix for the month-end thing&rdquo; from 2011, still in
          the hot path, tells you more about the system than any wiki page
          about it.
        </blockquote>

        <h2>Where is the risk concentrated?</h2>
        <p>
          Eventually there is one table, or one batch window, that everyone is
          quietly afraid of. Find it early. Ask what writes to it, what reads
          from it, and what happens if it is wrong for six hours. The answer
          sets the order of everything that follows, because it defines the part
          of the system you are not allowed to be clever about.
        </p>

        <h2>What I let a model do</h2>
        <p>
          This is where the work has genuinely changed in the last two years,
          and also where it is easiest to fool yourself.
        </p>
        <p>What models are very good at here:</p>
        <ul>
          <li>
            <strong>Breadth.</strong> Reading four hundred thousand lines and
            summarising each module&apos;s apparent purpose. No person has time
            for this and the summary does not need to be perfect to be useful.
          </li>
          <li>
            <strong>Cross-language identifier tracing.</strong> Following a
            column name from a stored procedure through a Java DAO, a config
            file, and a JSP, which no single-language tool will do for you.
          </li>
          <li>
            <strong>Naming intent.</strong> Proposing what a 600-line method
            with no comments is for, as a hypothesis to then go and check.
          </li>
        </ul>
        <p>What they will do if you let them:</p>
        <ul>
          <li>
            Describe dead code as live, fluently and in detail, because the code
            reads as though it works — and it did, once.
          </li>
          <li>
            Smooth over the thing that does not fit, which is usually the thing
            that matters.
          </li>
          <li>
            Produce a document that sounds like knowledge and contains no
            evidence.
          </li>
        </ul>
        <p>
          So the rule I hold to: every claim a model produces has to be anchored
          to something verifiable — a file and line, a deploy manifest entry, a
          commit, a log query. A claim with no anchor is a hypothesis, and it
          gets recorded as one. That single constraint is most of the difference
          between a map and a plausible-sounding story.
        </p>

        <h2>Then ask the people</h2>
        <p>
          Once the artifacts have given you a shape, the conversations change
          completely. You stop asking &ldquo;how does this work?&rdquo;, which
          invites a story, and start asking &ldquo;this job writes to the
          settlement table every night at 2am and has an empty catch block
          around the write — do you know what that was for?&rdquo;
        </p>
        <p>
          That question gets a real answer, often immediately, often from
          someone who did not think they knew anything useful. Precise questions
          respect people&apos;s memory instead of over-drawing on it. And the
          answers you get are worth keeping, because now you know exactly which
          claim each one supports.
        </p>
      </>
    ),
  },
  {
    slug: "documentation-describes-a-system-that-no-longer-exists",
    title: "The documentation describes a system that no longer exists",
    standfirst:
      "Not all sources of truth about a legacy system decay at the same rate. Ranking them by how easily they can lie to you changes where you look first.",
    date: "2026-09-21",
    readingTime: "5 min",
    body: (
      <>
        <p>
          There is a particular feeling when you find the wiki page. It is
          titled something confident like &ldquo;Settlement Platform
          Architecture&rdquo;. It has a diagram. It has numbered sections. It
          was last edited in 2017, and nothing on the page says so unless you go
          looking.
        </p>
        <p>
          The page is not wrong, exactly. It was right. That is a harder problem
          than being wrong, because wrong documentation gets corrected and stale
          documentation gets believed.
        </p>
        <p>
          The useful move is to stop treating &ldquo;documentation&rdquo; as one
          category. Every source that tells you something about a system has a
          decay rate and a failure mode, and once you rank them you stop
          spending your first week in the least reliable one.
        </p>

        <h2>Ranked by how hard it is for them to lie to you</h2>
        <p>
          <strong>Production behaviour.</strong> Cannot lie. It is the system.
          The limitation is coverage: it only tells you about paths something
          actually exercised, and it tells you nothing about why. Expensive to
          observe, worth every hour.
        </p>
        <p>
          <strong>Deployment and infrastructure configuration.</strong> What
          actually ships, where, with what environment. Lies only when there is
          drift between declared and applied state, which is itself a finding.
        </p>
        <p>
          <strong>The build graph.</strong> What genuinely gets compiled,
          linked, and packaged. This is how dead modules give themselves away:
          they are in the repository and not in the artifact. Underused and
          almost free to obtain.
        </p>
        <p>
          <strong>Source code.</strong> Always true about itself and routinely
          misleading about the system, because most repositories contain a great
          deal of code that no longer executes. Reading code is how you learn
          what is possible, not what is happening.
        </p>
        <p>
          <strong>Tests.</strong> Genuinely valuable — they encode intent
          someone cared enough to pin down. Two failure modes: they only cover
          the intent somebody bothered to write, and a green suite over dead
          code feels exactly like a green suite over live code.
        </p>
        <p>
          <strong>Commit history.</strong> My favourite, and the one teams
          almost never mine. It is the only source that is simultaneously
          dated, attributable, and effectively immutable. Nobody rewrites
          history to make the system look more coherent. It will not tell you
          the current shape of anything, but it is unmatched for the question
          &ldquo;why on earth is it like this?&rdquo;
        </p>
        <p>
          <strong>Tickets and pull request discussion.</strong> Carries the
          reasoning that code cannot. Decays, but dated, so you can discount it
          honestly.
        </p>
        <p>
          <strong>Wiki and shared documents.</strong> The dangerous tier. Not
          because they are more wrong than the others, but because they carry no
          decay signal. A 2017 page and a 2026 page look identical and read with
          the same authority.
        </p>
        <p>
          <strong>Memory.</strong> Last, and still essential — it is the only
          source that holds intent that was never written down anywhere. Just
          treat it as a lead to verify rather than a fact to record.
        </p>

        <h2>What this changes in practice</h2>
        <p>
          The ranking is not an excuse to skip the bottom of the list. It is a
          rule about order and about attribution. Start where things cannot
          misremember, and when you reach the tiers that can, write down which
          tier each claim came from.
        </p>
        <p>
          Which leads to the thing I now care about more than the content of any
          document I produce: <strong>a document should say how it knows.</strong>
        </p>
        <p>
          Every claim carries its evidence — a file and line, a manifest entry,
          a commit hash, a log query, or the name of the person who told me and
          the date they told me. Claims that cannot be traced to an artifact are
          not deleted; they are marked unverified and kept, because an honest
          gap is useful and a smoothed-over gap is a trap for the next person.
        </p>
        <p>
          This is also the discipline that makes model-assisted work safe. A
          language model will happily produce a fluent, confident, well-organised
          description of a subsystem that was decommissioned in 2019. The only
          durable defence I have found is refusing to accept any claim that
          does not come with an anchor — which is, conveniently, the same
          standard that makes the document still trustworthy in three years.
        </p>

        <h2>The real deliverable</h2>
        <p>
          A system map that is right today and undated is a wiki page waiting to
          become the next trap. A map that records its evidence can be
          re-verified by someone who was not there — mechanically, in an
          afternoon, by re-running the queries.
        </p>
        <p>
          The point is not to write the documentation nobody wrote. It is to
          leave behind something that can tell you when it has started to go out
          of date.
        </p>
      </>
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
