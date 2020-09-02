let hostName;
if (typeof window !== 'undefined') {
  const l = window.location;
  hostName = `${l.protocol}//${l.host}`;
}

export const doPost = async (url, options) => {
  try {
    const opts = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    };

    if (typeof opts.body !== 'string') {
      opts.body = opts.body.toString();
    }

    const response = await fetch(`${hostName}${url}`, opts);

    return response.json();
  } catch (error) {
    return {
      error
    };
  }
};

export const doGet = async (url, options) => {
  try {
    const response = await fetch(`${hostName}/${url}`, options);
    return response.json();
  } catch (error) {
    return {
      error
    };
  }
};
