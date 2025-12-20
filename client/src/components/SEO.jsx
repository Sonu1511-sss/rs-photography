import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = 'website'
}) => {
  const defaultTitle = 'RS Photography - Best Wedding Photographer in Balaghat & Katangi (Kattangi) | rsphotography'
  const defaultDescription = 'RS Photography - Best Wedding Photographer in Balaghat and Katangi (Kattangi), Madhya Pradesh. Professional Indian Wedding Photography, Pre-Wedding, Engagement Shoots, and Wedding Films.'
  const defaultKeywords = 'rsphotography, rs photography, balaghat, kattangi, katangi, photographer, wedding photographer, wedding photography balaghat, wedding photographer balaghat, wedding photography katangi, wedding photographer katangi, wedding photography kattangi, wedding photographer kattangi, rs photography balaghat, rs photography katangi, rs photography kattangi, best wedding photographer balaghat, best photographer balaghat, pre-wedding photography balaghat, engagement photography balaghat, wedding films balaghat, Indian wedding photographer, professional wedding photographer, wedding photography services balaghat'
  const siteUrl = 'https://rsphotography.com'
  const defaultImage = `${siteUrl}/og-image.jpg`

  const seoTitle = title ? `${title} | RS Photography` : defaultTitle
  const seoDescription = description || defaultDescription
  const seoKeywords = keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords
  const seoImage = image || defaultImage
  const seoUrl = url || siteUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="RS Photography" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-MP" />
      <meta name="geo.placename" content="Balaghat, Katangi, Kattangi" />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="RS Photography" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#374151" />
      <meta name="apple-mobile-web-app-title" content="RS Photography" />
    </Helmet>
  )
}

export default SEO




