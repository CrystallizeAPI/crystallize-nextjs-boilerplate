let hostName;

export async function doPost(url) {
  // eslint-disable-next-line no-restricted-globals
  const l = location;
  hostName = `${l.protocol}//${l.host}`;
  const fullUrl = `${hostName}/${url}`;
  try {
    const request = await fetch(fullUrl, {
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
