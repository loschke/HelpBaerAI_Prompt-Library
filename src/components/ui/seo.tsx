import { Metadata } from 'next'
import { FC } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  noindex?: boolean
  children?: React.ReactNode
}

export const generateMetadata = ({
  title,
  description,
  keywords,
  ogImage,
  noindex,
}: SEOProps): Metadata => {
  const defaultTitle = 'Promptbaer - KI Prompt Engineering Guide'
  const defaultDescription = 'Entdecken Sie die Kunst des Prompt Engineerings mit Promptbaer. Lernen Sie, wie Sie KI-Tools effektiv nutzen können.'
  const defaultKeywords = 'Prompt Engineering, KI, Künstliche Intelligenz, AI Guide, Prompting'
  const defaultOgImage = '/images/promptbaer.png'

  return {
    title: title ? `${title} | Promptbaer` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    openGraph: {
      title: title ? `${title} | Promptbaer` : defaultTitle,
      description: description || defaultDescription,
      images: [{
        url: ogImage || defaultOgImage,
        width: 1200,
        height: 630,
        alt: title || defaultTitle,
      }],
      siteName: 'Promptbaer',
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Promptbaer` : defaultTitle,
      description: description || defaultDescription,
      images: [ogImage || defaultOgImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    metadataBase: new URL('https://promptbaer.de'),
  }
}

const SEO: FC<SEOProps> = ({ children }) => {
  return <>{children}</>
}

export default SEO
