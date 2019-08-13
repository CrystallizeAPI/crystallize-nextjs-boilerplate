let hostName;

export const doPost = async url => {
  // eslint-disable-next-line no-restricted-globals
  const l = location;
  hostName = `${l.protocol}//${l.host}`;
  try {
    const request = await fetch(`${hostName}/${url}`, {
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
};

export const doGet = async url => {
  // eslint-disable-next-line no-restricted-globals
  const l = location;
  hostName = `${l.protocol}//${l.host}`;
  try {
    const request = await fetch(`${hostName}/${url}`);
    return request.json();
  } catch (error) {
    return {
      error
    };
  }
};
