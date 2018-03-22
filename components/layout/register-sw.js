let registered = false;

export default async () => {
  if (!registered) {
    /* eslint-disable */
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      registered = true;
      try {
        const registration = await navigator.serviceWorker.register(
          '/service-worker.js'
        );
        console.info('Service worker registration successful', registration);
      } catch (error) {
        console.warn('Service worker registration failed', err.message);
      }
    }
    /* eslint-enable */
  }
};
