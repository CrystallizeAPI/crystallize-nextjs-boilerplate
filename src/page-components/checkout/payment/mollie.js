import React, { useState, useEffect } from 'react';

import { useT } from 'lib/i18n';
import ServiceApi from 'lib/service-api';

export default function MollieWrapper({
  checkoutModel,
  confirmationURL,
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
          mutation mollieCreatePayment(
            $checkoutModel: CheckoutModelInput!
            $confirmationURL: String!
          ) {
            paymentProviders {
              mollie {
                createPayment(
                  checkoutModel: $checkoutModel
                  confirmationURL: $confirmationURL
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
          checkoutModel,
          confirmationURL
        }
      });

      const { success, crystallizeOrderId, checkoutLink } =
        response.data?.paymentProviders?.mollie?.createPayment || {};

      if (success) {
        basketActions.setCrystallizeOrderId(crystallizeOrderId);
        onSuccess(checkoutLink);
      } else {
        setStatus('error');
      }
    }

    load();
  }, [checkoutModel, basketActions, confirmationURL, onSuccess]);

  if (status === 'error') {
    return (
      <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Mollie' })}</p>
    );
  }

  return <p>{t('checkout.loadingPaymentGateway')}</p>;
}
