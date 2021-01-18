import React, { useState, useEffect, useRef } from 'react';

import { useT } from 'lib/i18n';
import ServiceApi from 'lib/service-api';

export default function KlarnaCheckout({
  checkoutModel,
  basketActions,
  confirmationURL,
  getURL
}) {
  const t = useT();
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
              $termsURL: String!
              $checkoutURL: String!
              $confirmationURL: String!
            ) {
              paymentProviders {
                klarna {
                  renderCheckout(
                    checkoutModel: $checkoutModel
                    termsURL: $termsURL
                    checkoutURL: $checkoutURL
                    confirmationURL: $confirmationURL
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
            checkoutModel,
            confirmationURL,
            termsURL: getURL(`/terms`),
            checkoutURL: getURL(`/checkout`)
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
  }, []);

  return (
    <>
      {status === 'loading' && <p>{t('checkout.loadingPaymentGateway')}</p>}
      {status === 'error' && (
        <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Klarna' })}</p>
      )}
      <div ref={paymentContainerRef} />
    </>
  );
}
