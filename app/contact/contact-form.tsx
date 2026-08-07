"use client";

import { FormEvent, useState } from "react";

const successMessage = "Thank you, your query has been shared successfully. A member of our team will review it and get back to you shortly.";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not share your query right now.");
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not share your query right now.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <div className="contact-success" role="status"><h2>Thank you</h2><p>{successMessage}</p></div>;
  }

  return <form onSubmit={submit} aria-describedby={error ? "contact-error" : undefined}>
    <label>Name<input required minLength={2} maxLength={120} name="name" autoComplete="name" /></label>
    <label>Work email<input required type="email" maxLength={254} name="email" autoComplete="email" /></label>
    <label>Organisation<input maxLength={160} name="organisation" autoComplete="organization" /></label>
    <label>What would you like help with?<select required name="help"><option>Explore an AI opportunity</option><option>Assess data and readiness</option><option>Plan or build an AI product</option><option>Automate a workflow</option><option>Validate or govern an AI system</option><option>Review an AI investment or vendor</option></select></label>
    <label className="full">What are you trying to improve, build, validate or decide?<textarea required minLength={10} maxLength={5000} name="challenge" rows={6}/></label>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field blank</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <p className="privacy full">Please do not submit patient-identifiable information, credentials or other highly sensitive data.</p>
    {error && <p className="contact-error full" id="contact-error" role="alert">{error} <a href="mailto:query@aivlab.co.uk?subject=AIVLAB website query">Email query@aivlab.co.uk directly.</a></p>}
    <button className="btn" type="submit" disabled={submitting}>{submitting ? "Sharing your query…" : "Share My AI Query"}</button>
  </form>;
}
