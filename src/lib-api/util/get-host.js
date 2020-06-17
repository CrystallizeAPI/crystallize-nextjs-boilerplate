export default function getHost(req = {}) {
  // Local proxy url using Ngrok
  if (process.env.NGROK_URL) {
    return process.env.NGROK_URL;
  }

  if (process.env.HOST_URL) {
    return process.env.HOST_URL;
  }

  const { headers } = req;

  const { host } = headers;
  if (host) {
    if (host.startsWith('localhost')) {
      return `http://${host}`;
    }
  }

  const { 'x-forwarded-proto': xprotocol, 'x-forwarded-host': xhost } = headers;
  if (xprotocol && xhost) {
    return `${xprotocol}://${xhost}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  throw new Error('Cannot determine host from req');
}
