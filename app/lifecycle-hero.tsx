"use client";

import { useEffect, useState } from "react";

const lifecycleStages = [
  { name: "Discover", keywords: ["Opportunity", "Business need", "Use cases"] },
  { name: "Assess", keywords: ["Data", "Feasibility", "Value & risk"] },
  { name: "Strategise", keywords: ["Product", "Architecture", "Roadmap"] },
  { name: "Build", keywords: ["ML & data", "RAG & agents", "MVPs"] },
  { name: "Validate", keywords: ["Performance", "Reliability", "Safety"] },
  { name: "Deploy & Scale", keywords: ["Integration", "Security", "Operations"] },
  { name: "Govern & Improve", keywords: ["Monitoring", "Auditability", "Oversight"] },
];

const cx = 500;
const cy = 430;
const ringRadius = 238;

function polar(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

export default function LifecycleHero() {
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setRun((value) => value + 1), 22000);
    return () => window.clearTimeout(timer);
  }, [run, paused]);

  return (
    <section className="lifecycle-hero" aria-labelledby="lifecycle-heading">
      <div className="lifecycle-intro wrap">
        <h1 id="lifecycle-heading">Transform AI Ideas into Real Business Value</h1>
        <p>AIVLAB helps you generate business value across the complete AI lifecycle. We deliver business automation, AI co-pilots, AI product development, research translation, healthcare AI, independent validation, governance and technical due diligence.</p>
      </div>

      <div className={`lifecycle-figure ${paused ? "is-paused" : ""}`} aria-label="Seven stages of the AIVLAB AI value lifecycle">
        <div className="lifecycle-controls" aria-label="Animation controls">
          <button className={paused ? "" : "is-active"} type="button" aria-label="Pause animation" title="Pause animation" onClick={() => setPaused(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
            </svg>
          </button>
          <button className={paused ? "is-active" : ""} type="button" aria-label="Play animation from beginning" title="Play animation" onClick={() => { setPaused(false); setRun((value) => value + 1); }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M7 4.8v14.4a1 1 0 0 0 1.54.84l10.8-7.2a1 1 0 0 0 0-1.68l-10.8-7.2A1 1 0 0 0 7 4.8Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <svg key={run} viewBox="0 0 1000 880" role="img" aria-labelledby="diagram-title diagram-description">
          <title id="diagram-title">AIVLAB AI value lifecycle</title>
          <desc id="diagram-description">Seven stages from discovery through governance and continuous improvement, with three key outcomes at every stage.</desc>
          <circle className="lifecycle-orbit lifecycle-orbit-one" cx={cx} cy={cy} r="307" />
          <circle className="lifecycle-orbit lifecycle-orbit-two" cx={cx} cy={cy} r="270" />

          {lifecycleStages.map((stage, index) => {
            const angle = index * (360 / lifecycleStages.length) - 3;
            const stagePoint = polar(angle, ringRadius);
            const branchAngles = index === 0 ? [-28, 0, 28] : [-17, 0, 17];
            return (
              <g className="lifecycle-stage" style={{ "--i": index } as React.CSSProperties} key={stage.name}>
                {stage.keywords.map((keyword, keywordIndex) => {
                  const branchAngle = angle + branchAngles[keywordIndex];
                  const branchRad = ((branchAngle - 90) * Math.PI) / 180;
                  const outward = { x: Math.cos(branchRad), y: Math.sin(branchRad) };
                  const start = { x: stagePoint.x + outward.x * 66, y: stagePoint.y + outward.y * 66 };
                  const elbow = { x: stagePoint.x + outward.x * 112, y: stagePoint.y + outward.y * 112 };
                  const end = { x: stagePoint.x + outward.x * 166, y: stagePoint.y + outward.y * 166 };
                  return (
                    <g className="lifecycle-branch" style={{ "--k": keywordIndex } as React.CSSProperties} key={keyword}>
                      <path pathLength="1" d={`M ${start.x} ${start.y} L ${elbow.x} ${elbow.y} L ${end.x} ${end.y}`} />
                      <circle cx={end.x} cy={end.y} r="4.5" />
                      <text x={end.x} y={end.y + (end.y < cy ? -14 : 23)} textAnchor="middle">{keyword}</text>
                    </g>
                  );
                })}
                <circle className="lifecycle-stage-disc" cx={stagePoint.x} cy={stagePoint.y} r="66" />
                <circle className="lifecycle-stage-ring" cx={stagePoint.x} cy={stagePoint.y} r="57" />
                <text className="lifecycle-stage-name" x={stagePoint.x} y={stagePoint.y + (stage.name.includes(" & ") ? -7 : 5)} textAnchor="middle">
                  {stage.name.includes(" & ") ? <><tspan x={stagePoint.x}>{stage.name.split(" & ")[0]} &amp;</tspan><tspan x={stagePoint.x} dy="19">{stage.name.split(" & ")[1]}</tspan></> : stage.name}
                </text>
              </g>
            );
          })}

          <g className="lifecycle-center-message">
            <circle cx={cx} cy={cy} r="128" />
            <text x={cx} y={cy - 16} textAnchor="middle">Turn your AI ambition</text>
            <text x={cx} y={cy + 16} textAnchor="middle">into business value</text>
          </g>
          <g className="lifecycle-center-brand">
            <circle cx={cx} cy={cy} r="128" />
            <text className="lifecycle-center-logo" x={cx} y={cy - 2} textAnchor="middle">AI<tspan>V</tspan>LAB</text>
            <text className="lifecycle-center-tagline" x={cx} y={cy + 30} textAnchor="middle">AI AMBITION TO IMPACT</text>
          </g>
        </svg>
        <div className="lifecycle-mobile-stages" key={`mobile-${run}`} aria-label="Seven stages of the AIVLAB AI value lifecycle">
          {lifecycleStages.map((stage, index) => (
            <article style={{ "--i": index } as React.CSSProperties} key={stage.name}>
              <span>{stage.name}</span>
              <p>{stage.keywords.join(" · ")}</p>
            </article>
          ))}
          <div className="lifecycle-mobile-brand"><b>AI<span>V</span>LAB</b><small>AI Ambition to Impact</small></div>
        </div>
        <div className="lifecycle-foundation" aria-label="Foundations across every stage">
          <span>Evidence</span><i>·</i><span>Governance</span><i>·</i><span>Human Oversight</span><i>·</i><span>Measurable Value</span>
        </div>
      </div>
      <p className="lifecycle-footnote">End-to-End AI, Built Around Business Value</p>
    </section>
  );
}
