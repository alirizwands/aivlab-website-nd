import {Arrow,PageHero,Shell} from "../components";

const principles = [
  "Solve the right business or user problem",
  "Build the simplest credible system",
  "Design around real workflows and constraints",
  "Validate performance before scaling",
  "Keep people in control of important decisions",
  "Make limitations, uncertainty and risk visible",
  "Govern and improve throughout the lifecycle",
];

export default function About(){return <Shell>
  <PageHero label="About AIVLAB" title="Building AI systems that create value in the real world">
    <p>AIVLAB is an AI consultancy and product lab helping organisations turn promising ideas into practical, validated and governed systems.</p>
  </PageHero>
  <section className="wrap editorial">
    <h2>Who we are</h2>
    <p className="lead-copy">We are a multidisciplinary team of AI, data, product and delivery specialists, bringing together more than two decades of combined research and development experience, including over a decade dedicated to applied AI.</p>
    <p>Our expertise spans business automation, AI co-pilots, AI product development, research translation, healthcare AI, system validation, governance and technical due diligence. We combine strategic thinking with hands-on technical delivery, shaping the right team and expertise around each engagement.</p>

    <h2>Why we exist</h2>
    <p>A technically strong AI model can still fail when it solves the wrong problem, relies on unsuitable data, does not fit real workflows, cannot integrate with existing systems, lacks appropriate safeguards or cannot demonstrate reliable performance.</p>
    <p>AIVLAB exists to close the gap between AI ambition and real-world value. We treat AI as a complete system shaped by people, processes, data, technology and governance—not simply as a model or isolated technical experiment.</p>

    <h2>How we work</h2>
    <p>Our work is guided by seven practical principles:</p>
    <ul className="about-principles">{principles.map((principle)=><li key={principle}>{principle}</li>)}</ul>

    <h2>Expertise shaped around your needs</h2>
    <p>Every engagement is different. We bring together the appropriate combination of AI, data, engineering, product, domain and governance expertise for the problem—providing focused capability without unnecessary complexity.</p>
    <p>Whether you are exploring an opportunity, translating research, developing an AI product, automating a business process, improving an existing system or seeking independent assurance, AIVLAB helps create a practical path from initial ambition to sustained business value.</p>
    <div className="about-cta"><Arrow href="/contact">Discuss an AI Opportunity</Arrow></div>
  </section>
</Shell>}
