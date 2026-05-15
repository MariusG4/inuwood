/**
 * Netlify Function: subscribe
 * Endpoint: /.netlify/functions/subscribe  (POST)
 *
 * Accepts { email: string } and adds the subscriber to a Brevo list.
 * Supports both JSON and URL-encoded form bodies.
 * Uses Double Opt-in (DOI) when BREVO_DOI_TEMPLATE_ID > 0.
 * All Brevo credentials live in environment variables — never in the client bundle.
 *
 * Set these in the Netlify dashboard → Site Settings → Environment Variables:
 *   BREVO_API_KEY          — your Brevo API key (v3)
 *   BREVO_LIST_ID          — numeric ID of your Newsletter list (default: 3)
 *   BREVO_DOI_TEMPLATE_ID  — DOI email template ID, or 0 for single opt-in
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function getHeader(event, name) {
  const headers = event.headers ?? {};
  return headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()];
}

function parseBody(event) {
  const rawBody = event.body ?? "";

  if (!rawBody) {
    return {};
  }

  const contentType = (getHeader(event, "content-type") ?? "").toLowerCase();

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(rawBody).entries());
  }

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody);
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return Object.fromEntries(new URLSearchParams(rawBody).entries());
  }
}

function getSiteUrl(event) {
  const origin = getHeader(event, "origin");

  if (origin) {
    return origin;
  }

  const protocol = getHeader(event, "x-forwarded-proto") ?? "https";
  const host = getHeader(event, "x-forwarded-host") ?? getHeader(event, "host");

  if (host) {
    return `${protocol}://${host}`;
  }

  return (
    process.env.SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.DEPLOY_URL ??
    "https://inuwood.ro"
  );
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  // --- Parse & validate ---
  let payload;
  try {
    payload = parseBody(event);
  } catch {
    return json({ error: "Cererea trimisă nu este validă." }, 400);
  }

  const botField = (payload?.["bot-field"] ?? payload?.botField ?? "")
    .toString()
    .trim();

  if (botField) {
    return json({ success: true, message: "Mulțumim pentru abonare." });
  }

  const email = (payload?.email ?? "").toString().trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: "Te rugăm să introduci o adresă de email validă." }, 400);
  }

  // --- Config from Netlify environment ---
  const API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = Number(process.env.BREVO_LIST_ID ?? 3);
  const DOI_TEMPLATE_ID = Number(process.env.BREVO_DOI_TEMPLATE_ID ?? 0);
  const DOI_REDIRECT_URL =
    process.env.BREVO_DOI_REDIRECT_URL ??
    new URL("/?newsletter=confirmat", getSiteUrl(event)).toString();
  const isLocalDev =
    process.env.CONTEXT === "dev" || process.env.NETLIFY_DEV === "true";
  const successMessage =
    DOI_TEMPLATE_ID > 0
      ? "Verifică emailul tău pentru a confirma abonarea la newsletter."
      : "Te-ai abonat cu succes la newsletter.";

  if (!API_KEY || API_KEY === "YOUR_BREVO_API_KEY_HERE") {
    if (isLocalDev) {
      console.warn(
        "[subscribe] BREVO_API_KEY not set — simulating success for local dev.",
      );
      return json({
        success: true,
        dev: true,
        message: "Simulare locală: abonarea a fost acceptată.",
      });
    }

    console.error("[subscribe] BREVO_API_KEY is missing in a non-dev environment.");
    return json(
      { error: "Serviciul de abonare nu este configurat momentan." },
      500,
    );
  }

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": API_KEY,
  };

  try {
    let res;

    if (DOI_TEMPLATE_ID > 0) {
      // ── Double Opt-in flow (GDPR-recommended) ──────────────────────────────
      res = await fetch(
        "https://api.brevo.com/v3/contacts/doubleOptinConfirmation",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            email,
            includeListIds: [LIST_ID],
            templateId: DOI_TEMPLATE_ID,
            redirectionUrl: DOI_REDIRECT_URL,
          }),
        },
      );
    } else {
      // ── Single opt-in fallback ─────────────────────────────────────────────
      res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          listIds: [LIST_ID],
          updateEnabled: true, // silently re-subscribes existing contacts
        }),
      });
    }

    // 204 No Content = DOI email queued successfully
    if (res.status === 204 || res.ok) {
      return json({ success: true, message: successMessage });
    }

    const data = await res.json().catch(() => ({}));

    // Already subscribed — treat as success to avoid email enumeration
    if (data?.code === "duplicate_parameter") {
      return json({ success: true, message: successMessage });
    }

    console.error("[subscribe] Brevo error:", res.status, data);
    return json(
      { error: "Abonarea nu a putut fi procesată acum. Încearcă din nou mai târziu." },
      500,
    );
  } catch (err) {
    console.error("[subscribe] Network error:", err);
    return json(
      { error: "A apărut o eroare de conexiune. Încearcă din nou." },
      503,
    );
  }
};
