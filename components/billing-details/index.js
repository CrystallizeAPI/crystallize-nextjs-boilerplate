import React from 'react';
import styled from 'styled-components';

import { CurrencyValue } from 'components/currency-value';
import { responsive, H2 } from 'ui';

const Outer = styled.div`
  width: 300px;

  ${responsive.xs} {
    width: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  font-size: 16px;
  padding: 1rem;
  border-radius: 0.2rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`;

const BillingDetails = ({ order }) => {
  const { email } = order.customer.addresses[0];
  return (
    <Outer>
      <Inner>
        <H2>Billing Details</H2>
        <p>
          Name:{' '}
          <strong>
            {order.customer.firstName} {order.customer.lastName}
          </strong>
        </p>
        <p>
          Email: <strong>{email}</strong>
        </p>
        <p>
          Total:{' '}
          <strong>
            <CurrencyValue value={order.total.net} />
          </strong>
        </p>
      </Inner>
    </Outer>
  );
};

export default BillingDetails;
