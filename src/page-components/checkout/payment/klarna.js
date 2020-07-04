import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function KlarnaCheckout({ items, currency }) {
  const [state, setState] = useState('loading');
  const router = useRouter();
  const { language } = router.query;

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
              multilingualUrlPrefix: language ? `/${language}` : '',
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
  }, [currency, items, language]);

  if (state === 'loading') {
    return <p>Loading...</p>;
  }

  if (state === 'error') {
    return <p>Unable to initialise Klarna payment!</p>;
  }

  return <div id="klarna-checkout-container" />;
}
