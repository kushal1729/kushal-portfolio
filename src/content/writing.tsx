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
      "I was handed two services nobody on the team could fully explain, and the job of writing down what they do. Here is the order I go in, and what I let a model do.",
    date: "2026-10-05",
    readingTime: "6 min",
    body: (
      <>
        <p>
          On my current engagement I&apos;m the only engineer mining two
          services. One is a Java middleware service that runs down through
          DB2 and stored procedures into the mainframe. The other is an Excel
          ribbon tool whose rules live in VBA. Nobody on the team could fully
          explain either of them, which is normal for systems like these, and
          is the reason the work exists.
        </p>
        <p>
          The instinct with an undocumented system is to find the person who
          knows it. I&apos;ve learned to treat people as a late source rather
          than a first one. Not because anyone is unreliable, but because
          memory is reconstructive and code moves on. If I ask first, their
          picture of the system becomes mine, and I spend the next weeks
          confirming it instead of testing it.
        </p>
        <p>
          So I start with the artifacts, which have the useful property of
          being unable to misremember. These are the questions, in order.
        </p>

        <h2>What actually runs?</h2>
        <p>
          Not what is in the repository: what is deployed and scheduled. A
          repository mixes living code with code that stopped running long
          ago, and nothing labels which is which. Deployment configuration,
          scheduler entries and the jobs that actually fire are the only
          authoritative statement of what exists.
        </p>
        <p>
          The gap between the two is one of the most useful things to learn
          early. Every module that ships nowhere is time I don&apos;t have to
          spend.
        </p>

        <h2>Where does the outside world touch it?</h2>
        <p>
          Entry points are the system&apos;s true surface area, and there are
          always more of them than anyone says. Service endpoints are the ones
          people remember. The ones they forget:
        </p>
        <ul>
          <li>scheduled jobs, including ones scheduled outside the codebase</li>
          <li>database triggers and stored procedures</li>
          <li>files dropped somewhere for another process to pick up</li>
          <li>a spreadsheet macro that reads or writes the same data the service owns</li>
          <li>another system calling an endpoint that is in no document</li>
        </ul>
        <p>
          I want a counted list, not &ldquo;about a dozen&rdquo;. A number can
          be checked, and it is usually the first thing that changes how the
          rest of the team talks about the system.
        </p>

        <h2>Which of those paths are actually used?</h2>
        <p>
          Static analysis tells you what <em>can</em> happen. Logs and runtime
          data tell you what <em>does</em>. You need both, and you need to keep
          them separate in your head, because mixing them up is how a code
          path that hasn&apos;t run in years ends up carefully documented and
          migrated.
        </p>

        <h2>What does the history say about pain?</h2>
        <p>
          Version history is dated, attributable, and nobody goes back to tidy
          it. Two signals I look for. First, the files that change most often:
          that is where the business actually lives, whatever the diagram
          says. Second, how many of those changes are fixes. A module with a
          lot of churn and a lot of fixes is usually where the requirements
          were never clear, and it will be the hardest thing to replace,
          however clean the replacement looks.
        </p>

        <h2>Where is the same logic written twice?</h2>
        <p>
          I didn&apos;t expect this one to matter as much as it does. A good
          part of what the spreadsheet tool&apos;s macros decide also exists
          somewhere else. Two copies of a rule are rarely identical: one has a
          check the other lacks, or a rounding step, or an exception somebody
          added later and only in one place.
        </p>
        <p>
          Finding the pairs, and the differences between them, is some of the
          most valuable output of the whole exercise, because modernization
          has to pick one. Better that the choice is made on purpose than by
          whichever copy someone happened to read first.
        </p>

        <h2>What I let a model do</h2>
        <p>Models are very good at three things here:</p>
        <ul>
          <li>
            <strong>Breadth.</strong> Reading every module and summarising its
            apparent purpose. Nobody has time for this, and the summary
            doesn&apos;t need to be perfect to be useful.
          </li>
          <li>
            <strong>Following an identifier across languages.</strong> A
            column name from a stored procedure, through the Java that calls
            it, into the VBA macro that writes it, which no single-language
            tool will do for you.
          </li>
          <li>
            <strong>Naming intent.</strong> Proposing what a long method with
            no comments is for, as a hypothesis to then go and check.
          </li>
        </ul>
        <p>What they will do if you let them:</p>
        <ul>
          <li>
            Describe dead code as live, fluently and in detail, because the
            code reads as though it works. And it did, once.
          </li>
          <li>
            Smooth over the thing that doesn&apos;t fit, which is usually the
            thing that matters.
          </li>
          <li>
            Produce a document that sounds like knowledge and contains no
            evidence.
          </li>
        </ul>
        <p>
          So the rule I hold to is that every claim a model produces has to
          point at something checkable: a file and line, a procedure, a
          commit, a query. A claim with nothing to point at is a hypothesis,
          and it gets written down as one. That single constraint is most of
          the difference between a map and a plausible-sounding story.
        </p>

        <h2>Then ask the people</h2>
        <p>
          Once the artifacts have given you a shape, the conversations change
          completely. You stop asking &ldquo;how does this work?&rdquo;, which
          invites a story, and start asking something like &ldquo;this
          procedure and the spreadsheet&apos;s import macro both write to the
          same table, and only one of them checks for duplicates. Which one do
          you rely on?&rdquo;
        </p>
        <p>
          A question like that gets a real answer, often immediately, often
          from someone who didn&apos;t think they knew anything useful. Precise
          questions respect people&apos;s memory instead of over-drawing on
          it.
        </p>

        <h2>Handing it over</h2>
        <p>
          What I produce isn&apos;t the end of the line. I demo each set of use
          cases to the delivery team and walk them through it. They take it to
          the client, and the client checks it against how the business
          actually runs. What comes back is better questions, and the next
          round of reading goes after those.
        </p>
        <p>
          When the detail holds up, the modernization team takes it from
          there. Because every claim says where it came from, they can check
          it without me in the room, which is the whole point.
        </p>
      </>
    ),
  },
  {
    slug: "documentation-describes-a-system-that-no-longer-exists",
    title: "The documentation describes a system that no longer exists",
    standfirst:
      "Not every source of truth about a legacy system decays at the same rate. Ranking them by how easily they can mislead you changes where you look first.",
    date: "2026-09-21",
    readingTime: "5 min",
    body: (
      <>
        <p>
          There is a particular feeling when you find the architecture page.
          It has a confident title, a diagram and numbered sections. It was
          last edited years ago, and nothing on the page says so unless you go
          looking.
        </p>
        <p>
          The page is not wrong, exactly. It was right. That is a harder
          problem than being wrong, because wrong documentation gets corrected
          and stale documentation gets believed.
        </p>
        <p>
          A few months into mining two legacy services, the most useful habit
          I&apos;ve picked up is to stop treating &ldquo;documentation&rdquo;
          as one category. Every source that tells you something about a
          system has a decay rate and a way of failing, and once you rank them
          you stop spending your first week in the least reliable one.
        </p>

        <h2>Ranked by how hard it is for them to mislead you</h2>
        <p>
          <strong>Production behaviour.</strong> Cannot lie. It is the system.
          The limitation is coverage: it only tells you about paths something
          actually exercised, and it tells you nothing about why. Expensive to
          observe, worth every hour.
        </p>
        <p>
          <strong>Deployment and scheduling configuration.</strong> What
          actually ships and runs, where, and when. It misleads only when what
          is declared has drifted from what is applied, and that drift is
          itself a finding.
        </p>
        <p>
          <strong>The build.</strong> What genuinely gets compiled and
          packaged. This is how dead modules give themselves away: they are in
          the repository and not in the artifact. Underused, and almost free
          to check.
        </p>
        <p>
          <strong>Source code.</strong> Always true about itself and routinely
          misleading about the system, because most repositories hold a great
          deal of code that no longer runs. Reading code is how you learn what
          is possible, not what is happening.
        </p>
        <p>
          <strong>Spreadsheets and macros.</strong> Easy to leave off the list,
          because nobody calls them a system. They are one. A ribbon tool full
          of VBA is source code with business rules in it, sometimes the
          oldest copy of those rules, and often not the only copy. It deserves
          the same care as the service code, and it will disagree with the
          service code in places. Those places are worth more than anything
          else on the list.
        </p>
        <p>
          <strong>Tests.</strong> Genuinely valuable, because they encode
          intent someone cared enough to pin down. Two ways they fail: they
          only cover the intent somebody bothered to write down, and a green
          suite over dead code feels exactly like a green suite over live
          code.
        </p>
        <p>
          <strong>Commit history.</strong> My favourite, and the one teams
          almost never mine. It is the only source that is dated, attributable
          and effectively permanent all at once. Nobody rewrites history to
          make the system look more coherent. It won&apos;t tell you the
          current shape of anything, but it is unmatched for the question
          &ldquo;why on earth is it like this?&rdquo;
        </p>
        <p>
          <strong>Tickets and review discussion.</strong> Carries the
          reasoning that code cannot. It decays, but it is dated, so you can
          discount it honestly.
        </p>
        <p>
          <strong>Wiki pages and shared documents.</strong> The dangerous
          tier. Not because they are more wrong than the others, but because
          they carry no decay signal. A page from years ago and a page from
          last month look identical and read with the same authority.
        </p>
        <p>
          <strong>Memory.</strong> Last, and still essential: it is the only
          source that holds intent nobody ever wrote down. Treat it as a lead
          to verify rather than a fact to record.
        </p>

        <h2>What this changes in practice</h2>
        <p>
          The ranking is not an excuse to skip the bottom of the list. It is a
          rule about order and about attribution. Start where things cannot
          misremember, and when you reach the tiers that can, write down which
          tier each claim came from.
        </p>
        <p>
          Which leads to the thing I care about most in what I hand over:{" "}
          <strong>a document should say how it knows.</strong>
        </p>
        <p>
          Every claim carries its evidence: a file and line, a procedure, a
          commit, a query, or the name of the person who told me and when.
          Claims that cannot be traced to anything are not deleted. They are
          marked unverified and kept, because an honest gap is useful and a
          smoothed-over gap is a trap for the next person.
        </p>
        <p>
          This is also the discipline that makes model-assisted work safe. A
          language model will happily write a fluent, confident,
          well-organised description of a subsystem that was switched off
          years ago. The only defence I have found is refusing any claim that
          does not come with an anchor, which is, conveniently, the same
          standard that keeps the document trustworthy later.
        </p>

        <h2>The real deliverable</h2>
        <p>
          A system map that is right today and says nothing about how it knows
          is a wiki page waiting to become the next trap. A map that records
          its evidence can be checked again by people who were not there: the
          delivery team before a demo, the client during validation, the
          engineers modernizing it afterwards.
        </p>
        <p>
          The point is not to write the documentation nobody wrote. It is to
          leave behind something that can tell you when it has started to go
          out of date.
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
