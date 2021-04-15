import React from 'react';
import styled from 'styled-components';

import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation('customer');
  const { email } = order.customer.addresses?.[0] || {};

  return (
    <Outer>
      <Inner>
        <H3>Billing Details</H3>
        <p>
          {t('name')}:{' '}
          <strong>
            {order.customer.firstName} {order.customer.lastName}
          </strong>
        </p>
        <p>
          {t('email')}: <strong>{email}</strong>
        </p>
      </Inner>
    </Outer>
  );
};

export default BillingDetails;
