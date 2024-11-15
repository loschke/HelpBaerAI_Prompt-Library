import Script from 'next/script'

export default function CookieConsent() {
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="2f388785-4b36-4924-84e0-885115aa0d99"
      data-blockingmode="auto"
      strategy="afterInteractive"
      async
    />
  )
}
