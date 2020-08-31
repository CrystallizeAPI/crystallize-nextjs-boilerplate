import React, { useState, useEffect } from 'react';

import { doPost } from 'lib/rest-api/helpers';
import { useT } from 'lib/i18n';

export default function VippsWrapper({ paymentModel, onSuccess }) {
  const t = useT();
  const [state, setState] = useState('loading');

  useEffect(() => {
    async function load() {
      setState('loading');

      const { url } = await doPost(
        '/api/payment-providers/vipps/initiate-payment',
        {
          body: JSON.stringify({ paymentModel })
        }
      );

      return onSuccess(url);
    }

    load();
  }, [paymentModel, onSuccess]);

  if (state === 'error') {
    return (
      <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Vipps' })}</p>
    );
  }

  return <p>{t('checkout.loadingPaymentGateway')}</p>;
}
