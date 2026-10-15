"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { useSectionJump } from "./command-palette";
import { Pause, Play } from "./icons";

/* One state per verb in the pitch. Each is an illustrative miniature of the
   real work further down the page, and links to it. */
const states = [
  {
    id: "read",
    label: "Read",
    title: "Reading a legacy method the way I mine a codebase",
    caseId: "legacy-mining",
    caption: "Every finding points back to the line it came from.",
  },
  {
    id: "reason",
    label: "Reason",
    title: "Deciding where an agent is worth building",
    caseId: "agent-assessment",
    caption: "Most places an agent could go fail on cost, or need a person to stay accountable.",
  },
  {
    id: "write",
    label: "Write",
    title: "Turning a requirement into reviewed code",
    caseId: "product-to-code",
    caption: "Agents draft each stage; a person approves before the next one starts.",
  },
] as const;

const code = [
  "public String submit() {",
  "  Invoice inv = dao.find(id);",
  '  if (inv.isLocked()) return "locked";',
  "  var tax = rates.lookup(inv.region());",
  '  db.call("BILLING.APPLY_TAX", inv, tax);',
  "  ledger.post(inv); // SOAP",
  '  audit.write("INV_SUBMIT", id);',
  '  return "done";',
  "}",
];

const findings = [
  { line: 1, text: "Entry point: the invoice Submit action" },
  { line: 2, text: "Reads the invoice table" },
  { line: 3, text: "Rule: a locked invoice can't be submitted" },
  { line: 4, text: "Depends on a tax-rate service" },
  { line: 5, text: "Calls procedure BILLING.APPLY_TAX" },
  { line: 6, text: "Posts to the ledger over SOAP" },
];

const candidates = [
  { task: "Triage incoming vendor files", cost: 2, removes: 5, verdict: "Build" },
  { task: "Draft replies to routine tickets", cost: 2, removes: 4, verdict: "Build" },
  { task: "Summarise the weekly report", cost: 2, removes: 1, verdict: "Drop: saves too little" },
  { task: "Approve supplier payments", cost: 3, removes: 4, verdict: "Drop: needs a person accountable" },
  { task: "Reconcile ledger mismatches", cost: 3, removes: 5, verdict: "Build" },
];

const chain = [
  { stage: "Requirement", text: "Customers can reschedule a booking up to 24 hours before it starts." },
  { stage: "Epic", text: "Booking management" },
  { stage: "Story", text: "As a customer, I can move my booking to another slot." },
  { stage: "Spec", text: "PATCH /bookings/{id} returns 409 if it starts within 24 hours", checkpoint: true },
];

const written = [
  "if (hoursUntil(booking.start) < 24)",
  '  throw new Conflict("Too late to reschedule");',
];

const level = ["none", "very low", "low", "medium", "high", "very high"];

const vars = (values: Record<string, number>) => values as CSSProperties;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const useReducedMotion = () =>
  useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(reducedQuery);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );

function ReadPanel() {
  const hit = new Map(findings.map((finding, k) => [finding.line, k]));
  return (
    <div className="demo-read">
      <pre className="demo-code" aria-label="Illustrative legacy Java method">
        <code>
          {code.map((line, i) => {
            const k = hit.get(i + 1);
            return (
              <span
                className="code-line"
                key={i}
                data-hit={k === undefined ? undefined : ""}
                style={k === undefined ? undefined : vars({ "--k": k })}
              >
                <span className="code-ln" aria-hidden="true">
                  {i + 1}
                </span>
                {line}
              </span>
            );
          })}
        </code>
      </pre>
      <ol className="demo-findings" aria-label="What the model found">
        {findings.map((finding, k) => (
          <li key={finding.line} style={vars({ "--k": k })}>
            <span>{finding.text}</span>
            <span className="finding-ref">line {finding.line}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ReasonPanel() {
  return (
    <div className="demo-reason">
      <div className="reason-legend" aria-hidden="true">
        <span>Cost to build and run</span>
        <span>Work it removes</span>
      </div>
      <ul>
        {candidates.map((candidate, k) => {
          const dropped = candidate.verdict !== "Build";
          return (
            <li
              key={candidate.task}
              data-dropped={dropped ? "" : undefined}
              style={vars({ "--k": k })}
            >
              <span className="reason-task">{candidate.task}</span>
              <span className="reason-bars">
                <span className="bar bar-cost" style={vars({ "--v": candidate.cost })} />
                <span className="bar bar-gain" style={vars({ "--v": candidate.removes })} />
                <span className="sr-only">
                  Cost {level[candidate.cost]}, work removed {level[candidate.removes]}.
                </span>
              </span>
              <span className="reason-verdict">{candidate.verdict}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function WritePanel() {
  return (
    <div className="demo-write">
      <ol>
        {chain.map((step, k) => (
          <li key={step.stage} style={vars({ "--k": k })}>
            <span className="chain-stage">{step.stage}</span>
            <span className="chain-text">
              {step.text}
              {step.checkpoint && (
                <span className="checkpoint">Checkpoint approved by reviewer</span>
              )}
            </span>
          </li>
        ))}
        <li style={vars({ "--k": chain.length })}>
          <span className="chain-stage">Code</span>
          <code className="chain-code">
            {written.map((line, i) => (
              <span
                key={i}
                className="typed"
                style={vars({ "--n": line.length, "--d": i })}
              >
                {line}
              </span>
            ))}
          </code>
        </li>
      </ol>
    </div>
  );
}

const panels = { read: ReadPanel, reason: ReasonPanel, write: WritePanel };

export function TraceDemo() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const jump = useSectionJump();
  const id = useId();

  /* Freeze everything while it cannot be seen: offscreen or a hidden tab. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let intersecting = true;
    const update = () => setOnScreen(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const select = (next: number) => setIndex((next + states.length) % states.length);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: states.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = (moves[event.key] + states.length) % states.length;
    select(next);
    tabs.current[next]?.focus();
  };

  /* Auto-advance pauses for anyone reading or using it, and never runs
     under reduced motion. */
  const rotating = !reduced && !userPaused && !engaged;

  return (
    <section
      ref={root}
      className="demo"
      aria-label="What I work on, illustrated"
      data-offscreen={onScreen ? undefined : ""}
      data-rotating={rotating ? "" : undefined}
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false);
      }}
    >
      <div className="demo-bar">
        <div className="demo-tabs" role="tablist" aria-label="Read, reason, write">
          {states.map((state, i) => (
            <button
              key={state.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${state.id}`}
              aria-selected={i === index}
              aria-controls={`${id}-panel-${state.id}`}
              tabIndex={i === index ? 0 : -1}
              className="demo-tab"
              onClick={() => select(i)}
              onKeyDown={onTabKey}
            >
              {state.label}
              {i === index && !reduced && (
                <span
                  key={index}
                  className="demo-progress"
                  aria-hidden="true"
                  onAnimationEnd={(event) => {
                    if (event.animationName === "demo-progress") select(index + 1);
                  }}
                />
              )}
            </button>
          ))}
        </div>
        {!reduced && (
          <button
            type="button"
            className="icon-btn demo-pause"
            aria-label={userPaused ? "Play the demo" : "Pause the demo"}
            title={userPaused ? "Play" : "Pause"}
            onClick={() => setUserPaused((paused) => !paused)}
          >
            {userPaused ? <Play /> : <Pause />}
          </button>
        )}
      </div>

      {states.map((state, i) => {
        const Panel = panels[state.id];
        return (
          <div
            key={state.id}
            role="tabpanel"
            id={`${id}-panel-${state.id}`}
            aria-labelledby={`${id}-tab-${state.id}`}
            className={`demo-panel demo-panel-${state.id}`}
            hidden={i !== index}
          >
            <div className="demo-head">
              <p className="demo-title">{state.title}</p>
              <a
                className="demo-source"
                href={`#${state.caseId}`}
                onClick={(event) => {
                  event.preventDefault();
                  jump(state.caseId);
                }}
              >
                See the real work
              </a>
            </div>
            <Panel />
            <p className="demo-caption">
              {state.caption} <span>Example only.</span>
            </p>
          </div>
        );
      })}
    </section>
  );
}
