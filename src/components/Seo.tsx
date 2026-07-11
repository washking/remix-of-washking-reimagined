import { Head } from "vite-react-ssg";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

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
 * Per-page metadata is pre-rendered into each static route for search and
 * social crawlers that do not execute JavaScript.
 */
export default function Seo({ title, description, path, noIndex, jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean) as object[];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
}
