import React, { useState, useEffect } from 'react'

import { useLocale } from 'lib/app-config'
import { useT } from 'lib/i18n'

export default function MollieWrapper ({
  personalDetails,
  items,
  currency,
  onSuccess
}) {
  const t = useT()
  const [state, setState] = useState('loading')
  const locale = useLocale()

  useEffect(() => {
    async function load () {
      setState('loading')

      const lineItems = items.map(item => ({
        name: item.name,
        sku: item.sku,
        net: item.price,
        gross: item.priceWithoutVat,
        quantity: item.quantity,
        product_id: item.id,
        product_variant_id: item.variant_id,
        image_url: item.image?.url,
        subscription: item.subscription,
        tax_group: item.taxGroup,
        product_tax_amount: item.vatAmount
      }))

      const response = await fetch(
        '/api/payment-providers/mollie/create-payment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            multilingualUrlPrefix: locale.urlPrefix
              ? `/${locale.urlPrefix}`
              : '',
            personalDetails,
            currency,
            lineItems
          })
        }
      ).then(res => res.json())

      return onSuccess(response.href)
    }

    load()
  }, [locale, items, personalDetails, currency, onSuccess])

  if (state === 'error') {
    return (
      <p>{t('checkout.loadingPaymentGatewayFailed', { name: 'Mollie' })}</p>
    )
  }

  return <p>{t('checkout.loadingPaymentGateway')}</p>
}
