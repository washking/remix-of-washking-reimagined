import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/site";

interface SeoProps {
  title: string;
  description: string;
  /** Path only, e.g. "/about" or "/location/vineland". */
  path: string;
  noIndex?: boolean;
  /** One or more schema.org JSON-LD objects. */
  jsonLd?: object | (object | null)[];
}

/**
 * Per-page <head> metadata: title, description, canonical, Open Graph tags,
 * optional noindex, and JSON-LD structured data. Falls back gracefully — the
 * static tags in index.html remain for crawlers that don't execute JS.
 */
export default function Seo({ title, description, path, noIndex, jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean) as object[];

  // Note: og:*/twitter:* tags live statically in index.html as the home-level
  // fallback for social scrapers that don't execute JS (Facebook, X). We manage
  // only the JS-crawler-relevant tags here to avoid duplicate meta/link tags.
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
