import { Resend } from "resend";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const helpOptions = new Set([
  "Explore an AI opportunity",
  "Assess data and readiness",
  "Plan or build an AI product",
  "Automate a workflow",
  "Validate or govern an AI system",
  "Review an AI investment or vendor",
]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  help?: unknown;
  challenge?: unknown;
  website?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimit.get(key);
  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (text(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  if (isRateLimited(clientKey(request))) {
    return Response.json({ error: "Too many requests have been made. Please wait a few minutes or email us directly." }, { status: 429 });
  }

  const name = text(payload.name, 120);
  const email = text(payload.email, 254).toLowerCase();
  const organisation = text(payload.organisation, 160);
  const help = text(payload.help, 120);
  const challenge = text(payload.challenge, 5000);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2 || !emailIsValid || !helpOptions.has(help) || challenge.length < 10) {
    return Response.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact delivery is unavailable because RESEND_API_KEY is not configured.");
    return Response.json({ error: "We could not share your query right now. Please email us directly." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "AIVLAB Website <query@aivlab.co.uk>";
  const subject = `New AIVLAB website query from ${name}`;
  const plainText = [
    `Name: ${name}`,
    `Work email: ${email}`,
    `Organisation: ${organisation || "Not provided"}`,
    `Area of support: ${help}`,
    "",
    "Query:",
    challenge,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: ["query@aivlab.co.uk"],
    replyTo: email,
    subject,
    text: plainText,
    html: `<h2>New AIVLAB website query</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Organisation:</strong> ${escapeHtml(organisation || "Not provided")}</p>
      <p><strong>Area of support:</strong> ${escapeHtml(help)}</p>
      <p><strong>Query:</strong></p>
      <p>${escapeHtml(challenge).replace(/\n/g, "<br>")}</p>`,
  });

  if (error) {
    console.error("Resend contact delivery failed:", error.name, error.message);
    return Response.json({ error: "We could not share your query right now. Your information has been retained in the form, so please try again or email us directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
