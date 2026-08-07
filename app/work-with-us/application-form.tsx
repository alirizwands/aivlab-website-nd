"use client";

import { FormEvent, useRef, useState } from "react";

const successMessage = "Thank you, your details have been shared successfully. We will review your experience and contact you if a suitable opportunity arises.";

export default function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const file = new FormData(form).get("cv");
    if (!(file instanceof File) || file.size === 0) {
      setError("Please attach your CV as a PDF or DOCX file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Your CV must be 5 MB or smaller.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/applications", { method: "POST", body: new FormData(form) });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json() as { error?: string }
        : {};
      if (!response.ok) {
        const message = response.status === 413
          ? "Your CV could not be uploaded because the request was too large. Please choose a file no larger than 5 MB."
          : result.error || "We could not share your details right now.";
        throw new Error(message);
      }
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not share your details right now.");
      formRef.current?.querySelector<HTMLInputElement>('input[name="cv"]')?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <div className="contact-success application-success" role="status"><h2>Thank you</h2><p>{successMessage}</p></div>;
  }

  return <form ref={formRef} className="network-form application-form" onSubmit={submit} encType="multipart/form-data" aria-describedby={error ? "application-error application-privacy" : "application-privacy"}>
    <label>Full name<input required minLength={2} maxLength={120} name="name" autoComplete="name" /></label>
    <label>Email address<input required type="email" maxLength={254} name="email" autoComplete="email" /></label>
    <label>Telephone number <span className="optional">Optional</span><input type="tel" maxLength={40} name="telephone" autoComplete="tel" /></label>
    <label>Location <span className="optional">Optional</span><input maxLength={160} name="location" autoComplete="address-level2" /></label>
    <label>LinkedIn profile <span className="optional">Optional</span><input type="url" maxLength={500} name="linkedin" autoComplete="url" placeholder="https://www.linkedin.com/in/..." /></label>
    <label>Area of expertise<input required minLength={2} maxLength={200} name="expertise" /></label>
    <label className="full">Short introduction<textarea required minLength={20} maxLength={3000} rows={5} name="introduction" /></label>
    <label className="full">Type of opportunity sought<select required name="opportunity"><option value="">Select an opportunity</option><option>Consultancy engagement</option><option>Technical delivery project</option><option>Research collaboration</option><option>Product or advisory opportunity</option><option>Future employment opportunity</option><option>Other</option></select></label>
    <label className="full">CV attachment <span className="field-help">PDF or DOCX only, maximum 5 MB</span><input required type="file" name="cv" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" /></label>
    <div className="honeypot" aria-hidden="true"><label htmlFor="application-website">Leave this field blank</label><input id="application-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="privacy-check full"><input required type="checkbox" name="privacy" value="acknowledged" /><span>I understand that AIVLAB will use my information to assess my experience against current and future opportunities. My details and CV may be retained securely for up to 12 months, then deleted, unless a longer period is required by law or I ask for earlier deletion.</span></label>
    <p className="privacy full" id="application-privacy">Your CV is validated and sent directly to the AIVLAB recruitment inbox. It is not permanently stored on this website. Registration does not guarantee immediate project work.</p>
    {error && <p className="contact-error full" id="application-error" role="alert">{error} Your other information remains in the form. <a href="mailto:applicants@aivlab.co.uk?subject=AIVLAB application">Email applicants@aivlab.co.uk directly.</a></p>}
    <button className="btn" type="submit" disabled={submitting}>{submitting ? "Submitting your details…" : "Submit My Details"}</button>
  </form>;
}
