import React, { useState, useEffect } from 'react';

import { useT } from 'lib/i18n';
import { doPost } from 'lib/rest-api/helpers';

export default function KlarnaCheckout({ paymentModel }) {
  const [state, setState] = useState('loading');
  const t = useT();

  useEffect(() => {
    async function loadCheckout() {
      setState('loading');

      try {
        const { success, html } = await doPost(
          '/api/payment-providers/klarna/render-checkout',
          {
            body: JSON.stringify({ paymentModel })
          }
        );

        // https://developers.klarna.com/documentation/klarna-checkout/integration-guide/render-the-checkout/
        if (!success) {
          setState('error');
          return;
        }

        setState('loaded');

        const checkoutContainer = document.getElementById(
          'klarna-checkout-container'
        );
        checkoutContainer.innerHTML = html;

        const scriptsTags = checkoutContainer.getElementsByTagName('script');

        // This is necessary otherwise the scripts tags are not going to be evaluated
        for (let i = 0; i < scriptsTags.length; i++) {
          const { parentNode } = scriptsTags[i];
          const newScriptTag = document.createElement('script');
          newScriptTag.type = 'text/javascript';
          newScriptTag.text = scriptsTags[i].text;
          parentNode.removeChild(scriptsTags[i]);
          parentNode.appendChild(newScriptTag);
        }
      } catch (err) {
        console.log(err);
        setState('error');
      }
    }

    loadCheckout();
  }, [paymentModel]);

  if (state === 'loading') {
    return <p>{t('checkout.loadingPaymentGateway')}</p>;
  }

  if (state === 'error') {
    return (
      <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Klarna' })}</p>
    );
  }

  return <div id="klarna-checkout-container" />;
}
