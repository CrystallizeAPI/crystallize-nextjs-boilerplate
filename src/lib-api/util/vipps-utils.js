const {
  VIPPS_USERNAME,
  VIPPS_PASSWORD,
  VIPPS_API_URL,
  VIPPS_CLIENT_ID,
  VIPPS_CLIENT_SECRET,
  VIPPS_SUB_KEY,
  VIPPS_SUB_KEY_SEC,
} = process.env;

const createAuthKey = () =>
  Buffer.from(`${VIPPS_USERNAME}:${VIPPS_PASSWORD}`).toString('base64');

const createSubKey = () => Buffer.from(`${VIPPS_SUB_KEY}`).toString('base64');

export async function vippsAccessToken() {
  try {
    const response = await fetch(`${VIPPS_API_URL}/accessToken/get`, {
      method: 'POST',
      headers: {
        client_id: VIPPS_CLIENT_ID,
        client_secret: VIPPS_CLIENT_SECRET,
        'Ocp-Apim-Subscription-Key': VIPPS_SUB_KEY,
      },
    });

    return response.json();
  } catch (error) {
    return {
      error,
    };
  }
}

export async function vippsApiCall({
  uri,
  headers = {},
  body,
  method = 'POST',
}) {
  try {
    const { access_token } = await vippsAccessToken();
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': VIPPS_SUB_KEY,
        Authorization: `Bearer ${access_token}`,
      },
      method,
      body: JSON.stringify(body),
    };

    const response = await fetch(`${VIPPS_API_URL}${uri}`, options);

    return response.json();
  } catch (error) {
    return {
      error,
    };
  }
}
