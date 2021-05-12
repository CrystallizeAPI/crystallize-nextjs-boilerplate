let loaded = false;

export function waitUntilLoaded() {
  const startTime = Date.now();
  return new Promise((resolve) => {
    (function check() {
      if (loaded || Date.now() - startTime > 3000) {
        resolve();
      } else {
        setTimeout(check, 50);
      }
    })();
  });
}

export function load() {
  function inject() {
    var gre = document.createElement('script');
    gre.type = 'text/javascript';
    gre.id = 'gre-script';
    gre.async = true;
    gre.src = 'https://www.gstatic.com/retail/v2_event.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gre, s);
  }

  if (loaded) {
    const script = document.querySelector('script#gre-script');
    if (script) {
      script.parentNode.removeChild(script);
      setTimeout(inject, 50);
    }
    return;
  }

  loaded = true;

  window._gre = window._gre || [];

  // Credentials for project.
  window._gre.push(['apiKey', process.env.NEXT_PUBLIC_GRE_APIKEY]);
  window._gre.push(['projectId', process.env.NEXT_PUBLIC_GRE_PROJECTID]);
  window._gre.push(['locationId', 'global']);
  window._gre.push(['catalogId', 'default_catalog']);

  inject();
}

export function logEvent(payload) {
  load();

  const visitorId = getVisitorId();
  if (!loaded || !visitorId) {
    return setTimeout(() => logEvent(payload), 100);
  }

  const event = {
    visitorId,
    ...payload
  };

  window._gre.push(['logEvent', event]);
  console.log('tracking', event);
}

export function getVisitorId() {
  return window.gaGlobal?.vid || 'n/a';
}
