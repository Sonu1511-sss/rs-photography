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

  // LocalBusiness Schema for Google Maps
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RS Photography",
    "image": seoImage,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": ["+916262620716", "+919893356211"],
    "email": "info@rsphotography.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sukdighat Post, Miragpur",
      "addressLocality": "Balaghat",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "481001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.8134,
      "longitude": 80.1834
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Balaghat",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN"
      },
      {
        "@type": "City",
        "name": "Katangi",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN"
      },
      {
        "@type": "City",
        "name": "Kattangi",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wedding Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography",
            "description": "Professional Indian Wedding Photography Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pre-Wedding Photography",
            "description": "Pre-Wedding Photography Shoots"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Engagement Photography",
            "description": "Engagement Photography Services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Films",
            "description": "Professional Wedding Videography and Films"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/rs____photography___/",
      "https://youtube.com/@rs__photography"
    ]
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RS Photography",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": seoDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sukdighat Post, Miragpur",
      "addressLocality": "Balaghat",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "481001",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+916262620716",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://www.instagram.com/rs____photography___/",
      "https://youtube.com/@rs__photography"
    ]
  }

  return (
    <>
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
        <meta name="geo.position" content="21.8134;80.1834" />
        <meta name="ICBM" content="21.8134, 80.1834" />
        <link rel="canonical" href={seoUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:site_name" content="RS Photography" />
        <meta property="og:locale" content="en_IN" />
        <meta property="place:location:latitude" content="21.8134" />
        <meta property="place:location:longitude" content="80.1834" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        <meta property="twitter:image" content={seoImage} />

        {/* Additional SEO */}
        <meta name="theme-color" content="#374151" />
        <meta name="apple-mobile-web-app-title" content="RS Photography" />
        <meta name="application-name" content="RS Photography" />
      </Helmet>

      {/* JSON-LD Structured Data for Google Maps */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </>
  )
}

export default SEO




