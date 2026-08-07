import type { ReactNode } from "react";

export const services = [
  ["01","AI Opportunity, Data & Readiness Assessment","Identify the strongest opportunities, assess your data and organisational readiness, and define the right first step."],
  ["02","AI Strategy, Product & Commercialisation Roadmap","Turn an idea, research asset or prototype into a credible product, technical and commercial plan."],
  ["03","AI Product Development & MVP Delivery","Build practical AI products, model pipelines, APIs, dashboards and user-facing MVPs."],
  ["04","Business Automation, Knowledge Systems & AI Co-Pilots","Reduce operational friction through grounded knowledge systems and human-controlled automation."],
  ["05","AI Validation, Governance, Monitoring & Secure Deployment","Create the evidence, controls, monitoring and deployment readiness required for responsible use."],
  ["06","AI Due Diligence, Leadership & Enablement","Access independent senior AI judgement for investment, architecture, delivery and governance."],
];
export const stages=["Discover","Design","Build","Validate","Deploy","Govern"];

function BrandMark(){return <svg className="brand-mark" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19"/><path d="M12 14.5 22 31l10-16.5M16.5 14.5 22 23l5.5-8.5"/><circle cx="12" cy="14.5" r="2.4"/><circle cx="32" cy="14.5" r="2.4"/><circle cx="22" cy="31" r="2.4"/></svg>}

export function Header(){return <header className="header"><a className="brand" href="/" aria-label="AIVLAB home"><BrandMark/><span className="brand-copy"><b>AI<span>V</span>LAB</b><small>AI Ambition to Impact</small></span></a><nav><a href="/who-we-help">Who We Help</a><a href="/services">Services</a><a href="/technical-lab">Technical Lab</a><a href="/about">About Us</a><a href="/contact">Contact</a></nav><a className="btn small" href="/discovery">Run AI Discovery Agent</a></header>}
export function Footer(){return <footer><div className="footer-lead"><b>AIVLAB</b><p>AI consultancy and product lab helping organisations discover, build, validate and govern systems that work in the real world.</p></div><div><span>Explore</span><a href="/who-we-help">Who We Help</a><a href="/services">Services</a><a href="/technical-lab">Technical Lab</a><a href="/about">About Us</a></div><div><span>Connect</span><a href="/contact">Start a conversation</a><a href="/work-with-us">Work With AIVLAB</a><a href="/discovery">AI Discovery Agent</a></div><p className="legal">© 2026 AIVLAB. All rights reserved. · Practical AI. Validated systems. Governance by design.</p></footer>}
export function Shell({children}:{children:ReactNode}){return <><Header/><main>{children}</main><Footer/></>}
export function PageHero({label,title,children}:{label:string,title:string,children:ReactNode}){return <section className="page-hero wrap"><p className="eyebrow">{label}</p><h1>{title}</h1><div className="page-lead">{children}</div></section>}
export function Arrow({href,children}:{href:string,children:ReactNode}){return <a className="arrow" href={href}>{children} <span>↗</span></a>}
