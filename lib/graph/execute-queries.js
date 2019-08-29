const { createRequest } = require('urql');
const { pipe, subscribe } = require('wonka');

const initUrqlClient = require('../init-urql-client');

function executeQuery({ query, variables, client }) {
  return new Promise((resolve, reject) => {
    try {
      pipe(
        client.executeQuery(createRequest(query, variables)),
        subscribe(({ data, error }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        })
      );
      // eslint-disable-next-line no-empty
    } catch (err) {}
  });
}

module.exports = async function executeQueries(queries) {
  const [client, cache] = initUrqlClient();

  const data = await Promise.all(
    queries.map(q =>
      executeQuery({
        ...q,
        client
      })
    )
  );

  return {
    data,
    urqlState: cache.extractData()
  };
};
