let hostName;

export const doPost = async (url, options) => {
  // eslint-disable-next-line no-restricted-globals
  const l = location;
  hostName = `${l.protocol}//${l.host}`;
  try {
    const request = await fetch(`${hostName}/${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    });
    return request.json();
  } catch (error) {
    return {
      error
    };
  }
};

export const doGet = async (url, options) => {
  // eslint-disable-next-line no-restricted-globals
  const l = location;
  hostName = `${l.protocol}//${l.host}`;
  try {
    const request = await fetch(`${hostName}/${url}`, options);
    return request.json();
  } catch (error) {
    return {
      error
    };
  }
};
