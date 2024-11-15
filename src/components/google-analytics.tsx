import Script from 'next/script'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=G-5X6EPSSLDX`}
        strategy="afterInteractive"
        async
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5X6EPSSLDX');
        `}
      </Script>
    </>
  )
}
