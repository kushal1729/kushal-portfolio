import type { CSSProperties } from "react";
import { miningStages } from "@/content/profile";

const pipeline = ["Requirement", "Epics", "User stories", "Specifications", "Working code"];

/* Stages down the middle, checkpoints between them, and the two concerns
   that span every stage drawn as rails alongside. */
function AgentPipeline() {
  return (
    <figure className="fig fig-pipeline">
      <div className="pipeline">
        <ol>
          {pipeline.map((stage, i) => (
            <li key={stage}>
              <span className="pipeline-node" aria-hidden="true" />
              <span className="pipeline-stage">{stage}</span>
              {i < pipeline.length - 1 && (
                <span className="pipeline-gate">Checkpoint: pause, review, resume</span>
              )}
            </li>
          ))}
        </ol>
        <div className="pipeline-rails" aria-hidden="true">
          <span>Every model call traced in Langfuse</span>
          <span>Progress streamed live over WebSockets</span>
        </div>
      </div>
      <figcaption>
        Each stage is a LangGraph node that writes a checkpoint, so a reviewer
        can stop the run, correct it and resume from the corrected state.
      </figcaption>
    </figure>
  );
}

/* A true sequence, so it is numbered. The line fills as the figure scrolls
   through the viewport. */
function MiningStepper() {
  return (
    <figure className="fig fig-stepper">
      <ol className="stepper">
        {miningStages.map((stage, i) => (
          <li key={stage.name} style={{ "--i": i } as CSSProperties}>
            <span className="stepper-dot" aria-hidden="true">
              {i + 1}
            </span>
            <span className="stepper-name">{stage.name}</span>
            <span className="stepper-out">{stage.out}</span>
          </li>
        ))}
      </ol>
      <figcaption>
        Run in order, because each stage decides what the next is allowed to
        assume.
      </figcaption>
    </figure>
  );
}

const funnel = [
  { label: "Every process step, mapped", count: 40 },
  { label: "Where an agent could help", count: 16 },
  { label: "Where it pays for itself", count: 5 },
];

function OpportunityFunnel() {
  return (
    <figure className="fig fig-funnel">
      <div className="funnel" role="img" aria-label="Many mapped steps narrow to fewer candidates, and fewer still that pay for themselves">
        {funnel.map((column, c) => (
          <div className="funnel-col" key={column.label} data-final={c === funnel.length - 1 ? "" : undefined}>
            <div className="funnel-dots" aria-hidden="true">
              {Array.from({ length: column.count }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <span className="funnel-label">{column.label}</span>
          </div>
        ))}
      </div>
      <figcaption>
        Illustrative: what the platform helps a team narrow down. Not the
        client&apos;s figures.
      </figcaption>
    </figure>
  );
}

export const caseFigures: Record<string, (() => React.JSX.Element) | undefined> = {
  "product-to-code": AgentPipeline,
  "legacy-mining": MiningStepper,
  "agent-platform": OpportunityFunnel,
};
