import React, { useState, useEffect, useRef } from 'react';

import { useTranslation } from 'next-i18next';
import ServiceApi from 'lib/service-api';

export default function KlarnaCheckout({ checkoutModel, basketActions }) {
  const { t } = useTranslation('checkout');
  const paymentContainerRef = useRef();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function load() {
      setStatus('loading');

      try {
        const response = await ServiceApi({
          query: `
            mutation klarnaRenderCheckout(
              $checkoutModel: CheckoutModelInput!
            ) {
              paymentProviders {
                klarna {
                  renderCheckout(
                    checkoutModel: $checkoutModel
                  ) {
                    crystallizeOrderId
                    klarnaOrderId
                    html
                  }
                }
              }
            }
          `,
          variables: {
            checkoutModel
          }
        });

        const {
          html,
          klarnaOrderId,
          crystallizeOrderId
        } = response.data.paymentProviders.klarna.renderCheckout;

        basketActions.setKlarnaOrderId(klarnaOrderId);
        basketActions.setCrystallizeOrderId(crystallizeOrderId);

        const checkoutContainer = paymentContainerRef.current;

        checkoutContainer.innerHTML = html;

        const scriptsTags = checkoutContainer.getElementsByTagName('script');

        // https://developers.klarna.com/documentation/klarna-checkout/integration-guide/render-the-checkout/
        for (let i = 0; i < scriptsTags.length; i++) {
          const { parentNode } = scriptsTags[i];
          const newScriptTag = document.createElement('script');
          newScriptTag.type = 'text/javascript';
          newScriptTag.text = scriptsTags[i].text;
          parentNode.removeChild(scriptsTags[i]);
          parentNode.appendChild(newScriptTag);
        }

        setStatus('loaded');
      } catch (error) {
        console.log(error);
        setStatus('error');
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {status === 'loading' && <p>{t('loadingPaymentGateway')}</p>}
      {status === 'error' && (
        <p>{t('loadingPaymentGatewayFailed', { name: 'Klarna' })}</p>
      )}
      <div ref={paymentContainerRef} />
    </>
  );
}
