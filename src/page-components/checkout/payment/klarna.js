import React, { useState, useEffect } from 'react';

import { useLocale } from 'lib/app-config';
import { useT } from 'lib/i18n';

export default function KlarnaCheckout({ items, currency }) {
  const [state, setState] = useState('loading');
  const locale = useLocale();
  const t = useT();

  useEffect(() => {
    async function loadCheckout() {
      setState('loading');

      try {
        const response = await fetch(
          '/api/payment-providers/klarna/render-checkout',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              multilingualUrlPrefix: locale.urlPrefix
                ? `/${locale.urlPrefix}`
                : '',
              currency,
              lineItems: items.map((item) => ({
                name: item.name,
                sku: item.sku,
                net: item.price,
                gross: item.priceWithoutVat,
                quantity: item.quantity,
                product_id: item.id,
                product_variant_id: item.variant_id,
                image_url: item.image.url,
                subscription: item.subscription,
                tax_group: item.taxGroup,
                product_tax_amount: item.vatAmount
              }))
            })
          }
        );

        setState('loaded');

        // https://developers.klarna.com/documentation/klarna-checkout/integration-guide/render-the-checkout/
        const klarnaResponse = await response.json();
        if (!klarnaResponse.success) {
          setState('error');
          return;
        }
        const checkoutContainer = document.getElementById(
          'klarna-checkout-container'
        );
        checkoutContainer.innerHTML = klarnaResponse.html;

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
  }, [currency, items, locale]);

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
