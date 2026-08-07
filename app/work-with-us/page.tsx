import { PageHero, Shell } from "../components";
import ApplicationForm from "./application-form";

export default function WorkWithUs() {
  return <Shell>
    <PageHero label="Work with AIVLAB" title="Join a network of AI builders, product leaders and delivery specialists">
      <p>We are developing a trusted network of independent specialists for client engagements, Technical Lab projects, research translation and responsible AI delivery.</p>
    </PageHero>
    <section className="wrap editorial">
      <div className="tag-list">
        {["AI & Data Scientists", "ML Engineers", "LLM & RAG Engineers", "Full-Stack AI Engineers", "Cloud-Native AI Architects", "MLOps & LLMOps Engineers", "AI Product Leads", "AI Project Leads", "Governance Specialists", "Healthcare-AI Specialists", "Research Collaborators"].map((area) => <span key={area}>{area}</span>)}
      </div>
      <ApplicationForm />
    </section>
  </Shell>;
}
