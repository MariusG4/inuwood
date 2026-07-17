const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,24}$/;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function getHeader(event, name) {
  const headers = event.headers ?? {};
  return headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()];
}

function parseBody(event) {
  const rawBody = event.body ?? "";
  const contentType = (getHeader(event, "content-type") ?? "").toLowerCase();

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody || "{}");
  }

  return Object.fromEntries(new URLSearchParams(rawBody).entries());
}

function redirect(location, statusCode = 303) {
  return { statusCode, headers: { Location: location }, body: "" };
}

function clean(value) {
  return (value ?? "").toString().trim();
}

function getSiteUrl(event) {
  const origin = getHeader(event, "origin");
  if (origin) return origin;

  const protocol = getHeader(event, "x-forwarded-proto") ?? "https";
  const host = getHeader(event, "x-forwarded-host") ?? getHeader(event, "host");
  if (host) return `${protocol}://${host}`;

  return process.env.URL ?? process.env.DEPLOY_PRIME_URL ?? "https://www.inuwood.ro";
}

function buildRedirect(event, payload, key, fallbackPath = "/contact") {
  const target = clean(payload?.[key]) || getHeader(event, "referer") || fallbackPath;
  const url = new URL(target, getSiteUrl(event));
  return `${url.pathname}${url.search}`;
}

function errorRedirect(event, payload, errorCode) {
  const location = buildRedirect(event, payload, "redirect-error");
  const url = new URL(location, getSiteUrl(event));
  url.searchParams.set("error", errorCode);
  return redirect(`${url.pathname}${url.search}`);
}

function getClientIp(event) {
  const forwarded = getHeader(event, "x-forwarded-for");
  return getHeader(event, "cf-connecting-ip") ?? forwarded?.split(",")?.[0]?.trim() ?? "";
}

function isValidPhone(phone) {
  if (!PHONE_RE.test(phone)) return false;

  const digits = phone.replace(/\D/g, "");
  const plusCount = (phone.match(/\+/g) ?? []).length;

  return digits.length >= 10 && digits.length <= 15 && plusCount <= 1;
}

function validatePayload(formName, payload) {
  const required = ["name", "email", "phone"];

  if (formName === "contact") {
    required.push("project", "message");
  }

  if (formName === "product-inquiry") {
    required.push("product", "productSlug", "message");
  }

  if (formName === "product-reservation") {
    required.push("product", "productSlug", "deliveryLocation");
  }

  for (const field of required) {
    if (!clean(payload[field])) {
      return "required";
    }
  }

  if (!EMAIL_RE.test(clean(payload.email).toLowerCase())) {
    return "email";
  }

  if (!isValidPhone(clean(payload.phone))) {
    return "phone";
  }

  return null;
}

async function verifyTurnstile(token, remoteip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const isLocalDev = process.env.CONTEXT === "dev" || process.env.NETLIFY_DEV === "true";

  if (!secret) {
    return isLocalDev ? { success: true, dev: true } : { success: false };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set("remoteip", remoteip);

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  return response.json();
}

async function submitToNetlifyForms(event, formName, fields) {
  const body = new URLSearchParams({ "form-name": formName });

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== "") {
      body.set(key, value.toString());
    }
  }

  const response = await fetch(new URL("/", getSiteUrl(event)).toString(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  return response.ok;
}

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed." };
  }

  let payload;
  try {
    payload = parseBody(event);
  } catch {
    return redirect("/contact?error=bad-request");
  }

  const formName = clean(payload["form-name"]);
  const successLocation = buildRedirect(event, payload, "redirect-success", "/contact?success=true");

  if (clean(payload["bot-field"])) {
    return redirect(successLocation);
  }

  if (!["contact", "product-inquiry", "product-reservation"].includes(formName)) {
    return errorRedirect(event, payload, "bad-request");
  }

  const validationError = validatePayload(formName, payload);
  if (validationError) {
    return errorRedirect(event, payload, validationError);
  }

  const token = clean(payload["cf-turnstile-response"]);
  if (!token) {
    return errorRedirect(event, payload, "verification");
  }

  const turnstile = await verifyTurnstile(token, getClientIp(event));
  if (!turnstile?.success) {
    console.warn("[validate-form] Turnstile failed:", turnstile?.["error-codes"] ?? []);
    return errorRedirect(event, payload, "verification");
  }

  const fields = {
    name: clean(payload.name),
    email: clean(payload.email).toLowerCase(),
    phone: clean(payload.phone),
    message: clean(payload.message),
    project: clean(payload.project),
    product: clean(payload.product),
    productSlug: clean(payload.productSlug),
    deliveryLocation: clean(payload.deliveryLocation),
    basePrice: clean(payload.basePrice),
  };

  // Add all dynamic option fields (option_0_dimensiuni, etc.)
  for (const [key, value] of Object.entries(payload)) {
    if (key.startsWith('option_')) {
      fields[key] = clean(value);
    }
  }

  try {
    const submitted = await submitToNetlifyForms(event, formName, fields);
    if (!submitted) {
      return errorRedirect(event, payload, "server");
    }
  } catch (err) {
    console.error("[validate-form] Netlify Forms forwarding failed:", err);
    return errorRedirect(event, payload, "server");
  }

  return redirect(successLocation);
};