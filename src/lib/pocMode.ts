// POC branch kill-switch — poc/refresh-v2 is preview-only and must NEVER be
// merged into main or dev. While POC_MODE is true, website form delivery
// (Webchily + Formspree) and first-party analytics ingest are fully stubbed so
// the preview cannot create real leads, tickets, or analytics rows.
export const POC_MODE = true;
