import { fileTypeFromBuffer } from "file-type";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const opportunityOptions = new Set(["Consultancy engagement", "Technical delivery project", "Research collaboration", "Product or advisory opportunity", "Future employment opportunity", "Other"]);

function text(value: FormDataEntryValue | null, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
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
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  if (text(form.get("website"), 200)) return Response.json({ ok: true });
  if (isRateLimited(clientKey(request))) return Response.json({ error: "Too many applications have been submitted. Please wait a few minutes or email us directly." }, { status: 429 });

  const name = text(form.get("name"), 120);
  const email = text(form.get("email"), 254).toLowerCase();
  const telephone = text(form.get("telephone"), 40);
  const location = text(form.get("location"), 160);
  const linkedin = text(form.get("linkedin"), 500);
  const expertise = text(form.get("expertise"), 200);
  const introduction = text(form.get("introduction"), 3000);
  const opportunity = text(form.get("opportunity"), 100);
  const privacy = text(form.get("privacy"), 30);
  const cv = form.get("cv");

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validLinkedin = !linkedin || /^https:\/\/(www\.)?linkedin\.com\//i.test(linkedin);
  if (name.length < 2 || !validEmail || !validLinkedin || expertise.length < 2 || introduction.length < 20 || !opportunityOptions.has(opportunity) || privacy !== "acknowledged") {
    return Response.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
  }
  if (!(cv instanceof File) || cv.size === 0 || cv.size > MAX_FILE_SIZE) {
    return Response.json({ error: "Please attach a PDF or DOCX CV no larger than 5 MB." }, { status: 400 });
  }

  const bytes = new Uint8Array(await cv.arrayBuffer());
  const detected = await fileTypeFromBuffer(bytes);
  const isPdf = detected?.mime === "application/pdf" && detected.ext === "pdf";
  const isDocx = detected?.mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && detected.ext === "docx";
  const suppliedExtension = cv.name.split(".").pop()?.toLowerCase();
  const extensionMatchesContent = (isPdf && suppliedExtension === "pdf") || (isDocx && suppliedExtension === "docx");
  if ((!isPdf && !isDocx) || !extensionMatchesContent) {
    return Response.json({ error: "The attached CV is not a genuine PDF or DOCX file. Please choose a valid document." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Application delivery is unavailable because RESEND_API_KEY is not configured.");
    return Response.json({ error: "We could not share your details right now. Please email us directly." }, { status: 503 });
  }

  const destination = process.env.APPLICANTS_EMAIL || "applicants@aivlab.co.uk";
  const from = process.env.RESEND_FROM_EMAIL || "AIVLAB Website <query@aivlab.co.uk>";
  const safeFileName = `CV-${name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}.${isPdf ? "pdf" : "docx"}`;
  const lines = [
    `Full name: ${name}`, `Email address: ${email}`, `Telephone number: ${telephone || "Not provided"}`,
    `Location: ${location || "Not provided"}`, `LinkedIn profile: ${linkedin || "Not provided"}`,
    `Area of expertise: ${expertise}`, `Type of opportunity sought: ${opportunity}`, "", "Short introduction:", introduction,
  ];

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: [destination],
    replyTo: email,
    subject: `New AIVLAB application from ${name}`,
    text: lines.join("\n"),
    html: `<h2>New AIVLAB application</h2>${lines.slice(0, 7).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}<h3>Short introduction</h3><p>${escapeHtml(introduction).replace(/\n/g, "<br>")}</p>`,
    attachments: [{ filename: safeFileName, content: Buffer.from(bytes) }],
  });

  if (error) {
    console.error("Resend application delivery failed:", error.name, error.message);
    return Response.json({ error: "We could not share your details right now. Please try again or email us directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
