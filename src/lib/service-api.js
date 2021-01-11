const NEXT_PUBLIC_SERVICE_API_URL = process.env.NEXT_PUBLIC_SERVICE_API_URL;

export default async function serviceApi({
  uri = `${NEXT_PUBLIC_SERVICE_API_URL}/api/graphql`,
  query,
  variables
}) {
  const body = JSON.stringify({ query, variables });

  const response = await fetch(uri, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
