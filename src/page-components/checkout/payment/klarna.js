import React, { useState, useEffect, useRef } from 'react';

import { useT } from 'lib/i18n';
import { doPost } from 'lib/rest-api/helpers';

export default function KlarnaCheckout({ paymentModel, basketActions }) {
  const [state, setState] = useState('loading');
  const t = useT();
  const paymentContainerRef = useRef();

  useEffect(() => {
    async function loadCheckout() {
      if (state !== 'loading') {
        return;
      }

      try {
        const { success, html, order_id } = await doPost(
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

        basketActions.setMetadata({ klarnaOrderId: order_id });

        const checkoutContainer = paymentContainerRef.current;
        
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
  }, [basketActions, paymentModel, state]);

  return (
    <>
      {state === 'loading' && <p>{t('checkout.loadingPaymentGateway')}</p>}
      {state === 'error' && (
        <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Klarna' })}</p>
      )}
      <div ref={paymentContainerRef} />
    </>
  );
}
