import Script from 'next/script'

export default function MauticTracking() {
  return (
    <>
      <Script
        id="mautic-tracking"
        strategy="afterInteractive"
      >
        {`
          (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
            w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
            m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://mautic.queo-group.com/mtc.js','mt');
          mt('send', 'pageview');
        `}
      </Script>
      <noscript>
        <img src="https://mautic.queo-group.com/mtracking.gif" style={{ display: 'none' }} alt="" />
      </noscript>
    </>
  )
}
