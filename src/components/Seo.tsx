import { Helmet } from 'react-helmet';

interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string[];
}

const DEFAULT_TITLE = 'Sentimen Provinsi Indonesia — Peta Interaktif';
const DEFAULT_DESC =
  'Peta interaktif sentimen masyarakat di tingkat provinsi di Indonesia. Lihat statistik, topik populer, dan jelajahi provinsi untuk insight berbasis cuitan.';

export default function Seo({ title, description, url, image, keywords }: SeoProps) {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESC;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={DEFAULT_TITLE} />
      <meta property="og:title" content={title || DEFAULT_TITLE} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || DEFAULT_TITLE} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}

      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
