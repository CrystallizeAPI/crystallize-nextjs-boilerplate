import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VippsWrapper({
  personalDetails,
  items,
  currency,
  onSuccess
}) {
  const [state, setState] = useState('loading');
  const router = useRouter();
  const { language } = router.query;

  useEffect(() => {
    async function load() {
      setState('loading');

      const lineItems = items.map((item) => ({
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
      }));

      const response = await fetch(
        '/api/payment-providers/vipps/initiate-payment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            multilingualUrlPrefix: language ? `/${language}` : '',
            personalDetails,
            currency,
            lineItems
          })
        }
      ).then((res) => res.json());

      return onSuccess(response.url);
    }

    load();
  }, [language, items, personalDetails, currency, onSuccess]);

  if (state === 'error') {
    return <p>Oh no. Unable to initialise Vipps</p>;
  }

  return <p>Hold on...</p>;
}
