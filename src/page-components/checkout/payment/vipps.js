import React, { useState, useEffect } from 'react';

import { useT } from 'lib/i18n';
import ServiceApi from 'lib/service-api';

export default function VippsWrapper({
  checkoutModel,
  basketActions,
  onSuccess
}) {
  const t = useT();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function load() {
      setStatus('loading');

      const response = await ServiceApi({
        query: `
          mutation vippsInitiatePayment(
            $checkoutModel: CheckoutModelInput!
          ) {
            paymentProviders {
              vipps {
                initiatePayment(
                  checkoutModel: $checkoutModel
                ) {
                  success
                  checkoutLink
                  crystallizeOrderId
                }
              }
            }
          }
        `,
        variables: {
          checkoutModel
        }
      });

      const { success, crystallizeOrderId, checkoutLink } =
        response.data?.paymentProviders?.vipps?.initiatePayment || {};

      if (success) {
        basketActions.setCrystallizeOrderId(crystallizeOrderId);
        onSuccess(checkoutLink);
      } else {
        setStatus('error');
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'error') {
    return (
      <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Vipps' })}</p>
    );
  }

  return <p>{t('checkout.loadingPaymentGateway')}</p>;
}
