/* eslint-disable consistent-return */

const express = require('express');
const bodyParser = require('body-parser');
const klarna = require('@crystallize/node-klarna/v2');

const Crystallize = require('./lib/crystallize');
const config = require('./config');

const checkoutRouter = express.Router();

module.exports = app => {
  // Endpoint used for basket validation for react-basket
  checkoutRouter.post(
    '/checkout/validate-basket',
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
    async (req, res) => {
      const { items, ...rest } = req.body;

      const validation = await Crystallize.callApi('/v2/products/validate', {
        method: 'post',
        body: {
          ...rest,
          items: items.filter(
            item =>
              !['discount', 'shipping', 'shipping_fee'].includes(item.type)
          )
        }
      });

      return res.json(validation);
    }
  );

  // Go to checkout
  checkoutRouter.post(
    '/checkout',
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),

    async (req, res) => {
      function sendError(error) {
        console.log(error);
        return res.redirect('/');
      }

      try {
        const basket = JSON.parse(req.body.basket);

        // Validate the basket to ensure it is not tampered with
        const {
          success,
          error,
          validatedBasket
        } = await Crystallize.validateBasket(basket);

        if (!success) {
          return sendError(error);
        }

        // Create klarna order
        const host = req.get('origin');
        const createOrderResult = await klarna.createOrder({
          cart: klarna.crystallizeBasketToKlarnaCart(validatedBasket),
          purchase_country: 'NO',
          purchase_currency: 'NOK',
          locale: 'nb-no',
          merchant: {
            back_to_store_uri: host,
            terms_uri: host,
            checkout_uri: `${host}/checkout`,
            confirmation_uri: `${host}/checkout/confirmation?id={checkout.order.id}`,
            push_uri: `${host}/checkout/klarna-push?id={checkout.order.id}`
          }
        });

        if (!createOrderResult.success) {
          return sendError(createOrderResult.error);
        }

        /**
         * Alternative version to render the checkout in Next.
         * Not working with Klarna which is the default payment provider in this boilerplate
         *
         * // Store the order here so it is available in the /checkout component
         * req.klarnaOrder = createOrderResult.order;
         * return app.render(req, res, '/checkout');
         */

        return res.send(`
        <!doctype html>
        <html>
          <head>
            <meta name="charset" content="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Checkout</title>
            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${
              config.GTM_ID
            }');</script>
            <!-- End Google Tag Manager -->
          </head>
          <style>
            body {
              margin 0;
              padding: 20px 0;
            }

            .logo {
              text-align: center;
              margin-bottom: 25px;
            }

            .logo img {
              height: 40px;
            }
          </style>
          <body>
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${
              config.GTM_ID
            }"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->

            <div class="logo"><img src="/static/logo_crystallize_black.svg" /></div>
            ${createOrderResult.order.gui.snippet}
          </body>
        </html>
      `);
      } catch (error) {
        return sendError(error);
      }
    }
  );

  // Accidentally load checkout by GET request
  checkoutRouter.get('/checkout', (req, res) => res.redirect('/'));

  // Confirmation page
  checkoutRouter.get('/checkout/confirmation', async (req, res) => {
    const { id } = req.query;
    if (id) {
      try {
        const { order } = await klarna.getOrder(id);
        req.klarnaOrder = order;
        req.klarnaOrderIsNew = false;

        // Create Crystallize order
        if (order.status === 'checkout_complete') {
          const crCreateOrderResult = await Crystallize.createOrder(order);
          if (!crCreateOrderResult.success) {
            return res.redirect('/');
          }

          // Let Klarna know that the order is OK
          const { success } = await klarna.confirmOrder(id);
          if (success) {
            req.klarnaOrderIsNew = true;
          }
        }
      } catch (error) {
        console.log('Could not confirm order with id', id); // eslint-disable-line
      }
    }

    app.render(req, res, '/checkout/confirmation');
  });

  checkoutRouter.post('/checkout/klarna-push', (req, res) => {
    res.send('OK');
  });

  return checkoutRouter;
};
