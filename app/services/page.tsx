import { PageHero, Shell } from "../components";

const serviceDetails = [
  {
    title: "AI Opportunity, Data & Readiness Assessment",
    summary: "Identify the strongest opportunities, assess your data and organisational readiness, and define the right first step.",
    approach: "We map workflows, users, data, systems, value, feasibility and risk to distinguish promising AI opportunities from costly distractions.",
    deliverables: ["Prioritised AI opportunity shortlist", "Data and organisational readiness assessment", "Recommended first use case", "Practical 90-day action plan"],
  },
  {
    title: "AI Strategy, Product & Commercialisation Roadmap",
    summary: "Turn an idea, research asset or prototype into a credible product, technical and commercial plan.",
    approach: "We define the product priorities, technical architecture, evidence requirements and delivery phases needed to move forward with confidence.",
    deliverables: ["AI product and commercialisation roadmap", "Target architecture and integration plan", "Validation and evidence plan", "Phased delivery plan and business case"],
  },
  {
    title: "AI Product Development & MVP Delivery",
    summary: "Build practical AI products, model pipelines, APIs, dashboards and user-facing MVPs.",
    approach: "We engineer focused, testable systems around real user needs, operational constraints and the technical foundations required for future development.",
    deliverables: ["Working AI MVP or product increment", "Model, data and integration pipelines", "User interface, API or dashboard", "Evaluation results and technical handover"],
  },
  {
    title: "Business Automation, Knowledge Systems & AI Co-Pilots",
    summary: "Reduce operational friction through grounded knowledge systems and human-controlled automation.",
    approach: "We design assistants and automation around trusted information, clear approval points, escalation routes and the workflows people already use.",
    deliverables: ["Workflow and automation opportunity map", "Grounded knowledge system or co-pilot", "Human-review and escalation controls", "Operational integration and adoption plan"],
  },
  {
    title: "AI Validation, Governance, Monitoring & Secure Deployment",
    summary: "Create the evidence, controls, monitoring and deployment readiness required for responsible use.",
    approach: "We test performance and failure modes, make limitations visible, establish appropriate safeguards and prepare systems for dependable operation.",
    deliverables: ["Evaluation framework and test suite", "Risk, governance and assurance controls", "Monitoring and incident-response plan", "Secure deployment readiness assessment"],
  },
  {
    title: "AI Due Diligence, Leadership & Enablement",
    summary: "Access independent senior AI judgement for investment, architecture, delivery and governance.",
    approach: "We review technical claims, architecture, team capability, roadmap realism and hidden dependencies to support high-stakes decisions and delivery leadership.",
    deliverables: ["Independent technical due-diligence report", "Architecture, evidence and delivery-risk assessment", "Roadmap and capability recommendations", "Executive decision brief and next-step priorities"],
  },
];

export default function Services() {
  return <Shell>
    <PageHero label="Services" title="End-to-end AI support, from first question to governed delivery">
      <p>Start with a focused diagnostic or engage across strategy, product development, automation, validation, deployment and ongoing technical leadership.</p>
    </PageHero>
    <section className="wrap editorial">
      {serviceDetails.map((service) => <article className="audience-detail" key={service.title}>
        <p className="eyebrow">{service.title}</p>
        <h2>{service.summary}</h2>
        <p>{service.approach}</p>
        <p><strong>Typical deliverables</strong></p>
        <ul>
          {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
        </ul>
      </article>)}
    </section>
  </Shell>;
}
