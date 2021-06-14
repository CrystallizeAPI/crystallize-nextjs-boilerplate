import React, { useState, useEffect, useRef } from 'react';
import ServiceApi from 'lib/service-api';

export default function PaypalWrapper({ checkoutModel, onSuccess }) {
  const [scriptLoaded, setLoadingScript] = useState(undefined);
  const paypalRef = useRef(undefined);

  function injectScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
        setLoadingScript(true);
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    async function fetchPaypalConfig() {
      const paymentConfig = await ServiceApi({
        query: `
            query {
                paymentProviders{
                    paypal{
                        config
                    }
                }
            }
        `
      });

      const {
        clientId,
        currency
      } = paymentConfig?.data?.paymentProviders?.paypal?.config;

      console.log('currency -', currency);

      if (clientId) {
        injectScript(
          `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
        );
      }
    }
    fetchPaypalConfig();
  }, []);

  useEffect(() => {
    if (window.paypal) {
      paypalRef.current = window.paypal;
      paypalRef.current
        .Buttons({
          createOrder: async function () {
            const response = await ServiceApi({
              query: `
                    mutation paypal($checkoutModel: CheckoutModelInput!) {
                        paymentProviders {
                            paypal {
                            createPayment(checkoutModel: $checkoutModel){
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

            const {
              success: createPaymentSuccess,
              orderId
            } = response?.data?.paymentProviders?.paypal?.createPayment;
            if (!createPaymentSuccess) {
              return;
            }

            return orderId;
          },
          onApprove: async function (data) {
            // capture payment
            const paypalOrderId = data?.orderID;
            if (!paypalOrderId) {
              return;
            }

            const response = await ServiceApi({
              query: `
                    mutation paypal($orderId: String!,$checkoutModel: CheckoutModelInput!) {
                        paymentProviders {
                            paypal {
                                confirmPayment(orderId: $orderId,checkoutModel: $checkoutModel){
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

            const {
              success,
              orderId
            } = response?.data?.paymentProviders?.paypal?.confirmPayment;

            if (success) {
              onSuccess(orderId);
            } else {
              alert('Whoops, transaction failed');
            }
          }
        })
        .render('#paypal-button-container');
    }
  }, [scriptLoaded]);

  return (
    <>
      <div id="paypal-button-container"></div>
    </>
  );
}
