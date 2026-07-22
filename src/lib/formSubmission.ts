import { POC_MODE } from "./pocMode";

const WEBCHILY_URL =
  "https://tabbjztcwbohcsvofyvv.supabase.co/functions/v1/receive-enquiry";
const FORMSPREE_URL = "https://formspree.io/f/mrejrbgy";
const WEBCHILY_TOKEN = "38bd3ca3-cc18-44b6-b7fe-4c8c0ba0e51d";

type WebsiteFormSubmission<T extends object> = {
  source: string;
  subject: string;
  data: T;
  timeoutMs?: number;
};

const postWithTimeout = async (
  url: string,
  body: object,
  timeoutMs: number,
) => {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    globalThis.clearTimeout(timeout);
  }
};

export const submitWebsiteForm = async <T extends object>({
  source,
  subject,
  data,
  timeoutMs = 12_000,
}: WebsiteFormSubmission<T>) => {
  if (POC_MODE) {
    // Keep the pending UX believable, then report success without touching
    // Webchily or Formspree so the POC preview can never create real tickets.
    await new Promise((resolve) => globalThis.setTimeout(resolve, 600));
    return { deliveredBy: "poc-stub" as const };
  }

  const externalSubmissionId = globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const submissionData = { ...data, external_submission_id: externalSubmissionId };

  const attempt = async (
    provider: "webchily" | "formspree",
    request: Promise<Response>,
  ) => {
    try {
      const response = await request;
      return { provider, accepted: response.ok } as const;
    } catch {
      return { provider, accepted: false } as const;
    }
  };

  // Webchily is the primary delivery route. Formspree starts only if the
  // primary fails or times out, preventing duplicate customer tickets.
  const primaryResult = await attempt(
    "webchily",
    postWithTimeout(
      WEBCHILY_URL,
      { ...submissionData, source, token: WEBCHILY_TOKEN },
      timeoutMs,
    ),
  );
  if (primaryResult.accepted) return { deliveredBy: primaryResult.provider };

  const fallbackResult = await attempt(
    "formspree",
    postWithTimeout(
      FORMSPREE_URL,
      { ...submissionData, source, _subject: subject },
      timeoutMs,
    ),
  );
  if (fallbackResult.accepted) return { deliveredBy: fallbackResult.provider };

  throw new Error("Form delivery failed");
};
