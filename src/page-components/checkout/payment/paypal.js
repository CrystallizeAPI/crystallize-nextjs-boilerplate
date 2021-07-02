import React, { useState, useEffect } from 'react';
import Script from 'next/script';

import ServiceApi from 'lib/service-api';
import { useBasket } from 'components/basket';
import { Button } from 'ui';

export default function PaypalWrapper({ checkoutModel, onSuccess }) {
  const { total } = useBasket();
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState('not-started');

  useEffect(() => {
    (async function fetchPaypalConfig() {
      const paymentConfig = await ServiceApi({
        query: `
          query {
            paymentProviders {
              paypal {
                config
              }
            }
          }
        `
      });
      const config = paymentConfig?.data?.paymentProviders?.paypal?.config;
      if (config) {
        setConfig(config);
      } else {
        setStatus('failed #0');
      }
    })();
  }, []);

  function renderPayalCheckout() {
    if (!window.paypal) {
      console.log('window.paypal not available');
      setStatus('failed #1');
      return;
    }

    window.paypal
      .Buttons({
        createOrder: async function () {
          const response = await ServiceApi({
            query: `
              mutation paypal($checkoutModel: CheckoutModelInput!) {
                paymentProviders {
                  paypal {
                    createPayment(checkoutModel: $checkoutModel) {
                      success
                      orderId
                    }
                  }
                }
              }
            `,
            variables: {
              checkoutModel
            }
          });

          const result =
            response?.data?.paymentProviders?.paypal?.createPayment || {};

          if (!result?.success) {
            setStatus('failed #2');
            return;
          }

          return result.orderId;
        },
        onApprove: async function (data) {
          const paypalOrderId = data?.orderID;
          if (!paypalOrderId) {
            setStatus('failed #3');
            return;
          }

          /**
           * Create an order in Crystallize when the
           * customer has approved it.
           */
          const response = await ServiceApi({
            query: `
              mutation paypal($orderId: String!, $checkoutModel: CheckoutModelInput!) {
                paymentProviders {
                  paypal {
                    confirmPayment(orderId: $orderId, checkoutModel: $checkoutModel){
                      success
                      orderId
                    }
                  }
                }
              }
             `,
            variables: {
              orderId: paypalOrderId,
              checkoutModel
            }
          });

          const result =
            response?.data?.paymentProviders?.paypal?.confirmPayment;

          if (!result?.success) {
            setStatus('failed #4');
          } else {
            setStatus('succeeded');
            onSuccess(result.orderId);
          }
        }
      })
      .render('#paypal-button-container');
  }

  return (
    <>
      {status.startsWith('failed') ? (
        <div>
          Something went wrong with the payment ({status}).{' '}
          <Button onClick={() => location.reload()}>Try again</Button>
        </div>
      ) : (
        <>
          {config?.clientId && total?.currency && (
            <Script
              src={`https://www.paypal.com/sdk/js?client-id=${
                config.clientId
              }&currency=${total.currency.toUpperCase()}`}
              onLoad={renderPayalCheckout}
            />
          )}
          <div id="paypal-button-container" />
        </>
      )}
    </>
  );
}
