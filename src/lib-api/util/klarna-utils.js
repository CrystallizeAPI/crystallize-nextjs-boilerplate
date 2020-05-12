const createAuthKey = () =>
  Buffer.from(
    `${process.env.KLARNA_USERNAME}:${process.env.KLARNA_PASSWORD}`
  ).toString('base64');

export default async function callKlarna({
  uri,
  headers,
  body = null,
  method,
}) {
  const response = await fetch(`${process.env.KLARNA_API_URL}${uri}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${createAuthKey()}`,
      ...headers,
    },
    body,
  });

  if (!response.ok) {
    if (response.headers.get('content-type') === 'text/html') {
      const text = await response.text();

      throw new Error(text);
    }

    throw new Error('Could not call Klarna');
  }

  return response.json();
}
