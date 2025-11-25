(function () {
  const gaIdMeta = document.querySelector('meta[name="google-analytics-id"]');
  const adsenseMeta = document.querySelector('meta[name="google-adsense-client"]');
  const gaId = (gaIdMeta && gaIdMeta.content) || window.NEOZETTI_GA_ID;
  const adsenseClient = (adsenseMeta && adsenseMeta.content) || window.NEOZETTI_ADSENSE_CLIENT;

  if (gaId && gaId !== 'G-XXXXXXXXXX') {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId, { anonymize_ip: true });
  }

  if (adsenseClient && adsenseClient !== 'ca-pub-XXXXXXXXXXXXXXXX') {
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);
  }

  function queueAds() {
    if (!window.adsbygoogle || !Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle = [];
    }
    document.querySelectorAll('.adsbygoogle').forEach((slot) => {
      if (!slot.dataset.filled) {
        window.adsbygoogle.push({});
        slot.dataset.filled = 'true';
      }
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    queueAds();
  } else {
    document.addEventListener('DOMContentLoaded', queueAds);
  }
})();
