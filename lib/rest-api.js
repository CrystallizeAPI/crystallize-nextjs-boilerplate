import fetch from 'cross-fetch';

export async function getUserPageData() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/1`
    );
    const user = await response.json();
    return {
      user
    };
  } catch (error) {
    console.error(error); // eslint-disable-line
    return {};
  }
}
