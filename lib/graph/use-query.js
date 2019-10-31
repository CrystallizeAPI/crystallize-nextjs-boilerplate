const { useContext, useState, useEffect } = require('react');
const { pipe, subscribe } = require('wonka');
const { createRequest } = require('urql');
const { UrqlOrderContext } = require('../../components/urql-order-context');

module.exports = ({ query, variables }) => {
  const [result, setResult] = useState({
    fetching: false,
    error: undefined,
    data: undefined
  });

  const urqlClient = useContext(UrqlOrderContext);

  useEffect(() => {
    setResult(prev => ({ ...prev, fetching: true }));

    const request = createRequest(query, variables);

    const [teardown] = pipe(
      urqlClient.executeQuery(request),
      subscribe(({ data, error }) => {
        setResult({ fetching: false, data, error });
      })
    );

    return teardown;
  }, []);

  return result;
};
