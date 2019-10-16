import { useContext, useState, useEffect } from 'react';
import { pipe, subscribe } from 'wonka';
import { createRequest } from 'urql';
import { UrqlOrderContext } from 'components/urql-order-context';

export const customClientUseQuery = ({ query, variables }) => {
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
