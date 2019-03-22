let hostName;

function assureHostForUrl(url) {
  if (url.startsWith('/')) {
    if (!hostName) {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-restricted-globals
        const l = location;
        hostName = `${l.protocol}//${l.host}`;
      } else {
        const port = parseInt(process.env.PORT, 10) || 3000;
        hostName = `http://localhost:${port}`;
      }
    }

    return `${hostName}${url}`;
  }
  return url;
}

export async function doPost(url) {
  try {
    const request = await fetch(assureHostForUrl(url), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return request.json();
  } catch (error) {
    return {
      error
    };
  }
}
