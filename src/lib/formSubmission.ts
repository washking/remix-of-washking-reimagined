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

  const attempts = [
    attempt(
      "webchily",
      postWithTimeout(
        WEBCHILY_URL,
        { ...data, source, token: WEBCHILY_TOKEN },
        timeoutMs,
      ),
    ),
    attempt(
      "formspree",
      postWithTimeout(
        FORMSPREE_URL,
        { ...data, source, _subject: subject },
        timeoutMs,
      ),
    ),
  ] as const;

  const firstResult = await Promise.race(attempts);
  if (firstResult.accepted) return { deliveredBy: firstResult.provider };

  const remainingAttempt =
    firstResult.provider === "webchily" ? attempts[1] : attempts[0];
  const secondResult = await remainingAttempt;
  if (secondResult.accepted) return { deliveredBy: secondResult.provider };

  throw new Error("Form delivery failed");
};
