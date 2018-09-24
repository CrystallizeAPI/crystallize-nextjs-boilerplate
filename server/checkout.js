/* eslint-disable consistent-return */

const express = require('express');
const bodyParser = require('body-parser');
const klarna = require('@crystallize/node-klarna/v2');

const Crystallize = require('./lib/crystallize');

const checkoutRouter = express.Router();

module.exports = app => {
  // Endpoint used for basket validation for react-basket
  checkoutRouter.post('/checkout/validate-basket', async (req, res) => {
    const validation = await Crystallize.callApi('/v2/products/validate', {
      method: 'post',
      body: req.body
    });

    return res.json(validation);
  });

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

        // Store the order here so it is available in the /checkout component
        req.klarnaOrder = createOrderResult.order;

        return app.render(req, res, '/checkout');
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
