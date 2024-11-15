import { Metadata } from 'next'
import { FC } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  noindex?: boolean
  children?: React.ReactNode
  path?: string
}

export const generateMetadata = ({
  title,
  description,
  keywords,
  ogImage,
  noindex,
  path = '',
}: SEOProps): Metadata => {
  const defaultTitle = 'PromptBär - Führende AI-Design Prompt Bibliothek für Marketing und Agenturen'
  const defaultDescription = '1000+ Beispiel-Prompts für Midjourney, Firefly & Co. Spare Zeit bei KI-Bildern. Von Experten entwickelt für Designer & Marketing-Teams.'
  const defaultKeywords = 'ki-design, prompt bibliothek, midjourney, prompt formeln, adobe firefly, stable diffusion, leonardo ai, ki-marketing, ai design workflow, ki bilder erstellen'
  const defaultOgImage = '/images/promptbaer.png'
  const baseUrl = 'https://promptbaer.de'
  const currentUrl = `${baseUrl}${path}`

  return {
    title: title ? `${title} | PromptBär` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    authors: [{ name: 'Rico Loschke', url: 'https://kvix.de' }],
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      title: title ? `${title} | PromptBär` : defaultTitle,
      description: description || defaultDescription,
      images: [{
        url: ogImage || defaultOgImage,
        width: 1200,
        height: 630,
        alt: title || defaultTitle,
      }],
      siteName: 'PromptBär',
      locale: 'de_DE',
      type: 'website',
      url: currentUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | PromptBär` : defaultTitle,
      description: description || defaultDescription,
      images: [ogImage || defaultOgImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    metadataBase: new URL(baseUrl),
  }
}

const SEO: FC<SEOProps> = ({ children }) => {
  return <>{children}</>
}

export default SEO
