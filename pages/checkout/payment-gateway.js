import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Spinner } from 'ui';

const Outer = styled.div`
  flex: 0 1 500px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  min-height: 500px;
`;

const InitiatingText = styled.div`
  margin-right: 15px;
`;

const PaymentGateway = () => {
  const [paying, setPaying] = useState(false);

  return (
    <Outer>
      {paying ? (
        <>
          <InitiatingText>Initiating payment gateway...</InitiatingText>
          <Spinner />
        </>
      ) : (
        <Button large onClick={() => setPaying(true)}>
          Pay now
        </Button>
      )}
    </Outer>
  );
};

export default PaymentGateway;
