import React from 'react';
import styled from 'styled-components';

import { useT } from 'lib/i18n';
import { CurrencyValue } from 'components/currency-value';
import { responsive, H3 } from 'ui';

const Outer = styled.div`
  width: 300px;

  p {
    margin-bottom: 0.5rem;
  }

  ${responsive.xs} {
    width: 100%;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
`;

const BillingDetails = ({ order }) => {
  const t = useT();
  const { email } = order.customer.addresses?.[0] || {};

  return (
    <Outer>
      <Inner>
        <H3>Billing Details</H3>
        <p>
          {t('customer.name')}:{' '}
          <strong>
            {order.customer.firstName} {order.customer.lastName}
          </strong>
        </p>
        <p>
          {t('customer.email')}: <strong>{email}</strong>
        </p>
        <p>
          {t('order.total')}:{' '}
          <strong>
            <CurrencyValue value={order.total.gross} />
          </strong>
        </p>
      </Inner>
    </Outer>
  );
};

export default BillingDetails;
