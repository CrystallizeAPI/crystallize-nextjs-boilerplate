let hostName;
if (typeof window !== 'undefined') {
  const l = window.location;
  hostName = `${l.protocol}//${l.host}`;
}

export const doPost = async (url, options) => {
  try {
    const response = await fetch(`${hostName}/${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    });
    return response.json();
  } catch (error) {
    return {
      error,
    };
  }
};

export const doGet = async (url, options) => {
  try {
    const response = await fetch(`${hostName}/${url}`, options);
    return response.json();
  } catch (error) {
    return {
      error,
    };
  }
};
