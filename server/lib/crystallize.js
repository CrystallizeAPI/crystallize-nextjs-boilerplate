const ow = require('ow');

const { GRAPH_URL, API_TOKEN, TENANT_ID } = require('../config');
const { doFetch } = require('../helpers');

function callApi(path, options) {
  if (!TENANT_ID || !API_TOKEN) {
    throw new Error(
      'Missing either CRYSTALLIZE_TENANT_ID or CRYSTALLIZE_API_TOKEN'
    );
  }

  return doFetch(
    `${GRAPH_URL}${path}`,
    Object.assign(
      {
        headers: {
          'X-Crystallize-Tenant': TENANT_ID,
          'X-Crystallize-Token': API_TOKEN
        }
      },
      options
    )
  );
}

async function validateBasket(crystallizeBasket, _opt) {
  ow(crystallizeBasket, ow.object);

  const { items, coupon } = crystallizeBasket;
  ow(items, ow.array);
  ow(coupon, ow.any(ow.string, ow.null));
  ow(_opt, ow.any(ow.object, ow.undefined));

  const options = Object.assign(
    {
      excludeDiscount: true,
      excludeShipping: true
    },
    _opt
  );

  let discount = null;

  if (items.length === 0) {
    return {
      success: false,
      validatedBasket: {
        coupon,
        items: [],
        totalAmount: 0,
        discount
      }
    };
  }

  const typesToExclude = [];
  if (options.excludeDiscount) {
    typesToExclude.push('discount');
  }

  let shippingItem;
  if (options.excludeShipping) {
    shippingItem = items.find(item => item.type === 'shipping');
    typesToExclude.push('shipping');
  }

  const result = await callApi('/v2/products/validate', {
    method: 'post',
    body: {
      items: items.filter(item => !typesToExclude.includes(item.type)),
      coupon: {
        code: coupon
      }
    }
  });

  if (result.status === 'INVALID') {
    return {
      success: false,
      error: result
    };
  }

  const discountItem = result.find(item => item.type === 'discount');
  if (discountItem) {
    discount = discountItem.unit_price;
  }

  // Calculate the total order value minus shipping and discount
  const totalAmount = result.reduce(
    (accumulator, item) => accumulator + item.unit_price * item.quantity,
    0
  );

  // Re-add the shipping item
  if (shippingItem) {
    result.push(shippingItem);
  }

  return {
    success: true,
    validatedBasket: {
      coupon,
      items: result,
      totalAmount,
      discount,
      discountBasketModel: discountItem
    }
  };
}

const reformCart = cart => {
  const reformedCart = Object.assign({}, cart);
  const discountItemReference = reformedCart.items.findIndex(
    item => item.type === 'discount'
  );
  if (discountItemReference !== -1) {
    reformedCart.coupon = {
      code: reformedCart.items[discountItemReference].reference,
      value: reformedCart.items[discountItemReference].unit_price
    };
    reformedCart.items.splice(discountItemReference, 1);
  }
  return reformedCart;
};

async function createOrder(klarnaOrder) {
  const result = await callApi('/v2/orders', {
    method: 'post',
    body: {
      recurring: klarnaOrder.recurring,
      recurring_token: klarnaOrder.recurring_token,
      klarna_id: klarnaOrder.id,
      first_name: klarnaOrder.billing_address.given_name,
      last_name: klarnaOrder.billing_address.family_name,
      billing_address: klarnaOrder.billing_address,
      gender: klarnaOrder.customer.gender,
      date_of_birth: klarnaOrder.customer.date_of_birth,
      shipping_address: klarnaOrder.shipping_address,
      cart: reformCart(klarnaOrder.cart)
    }
  });

  return {
    success: true,
    result
  };
}

module.exports = {
  validateBasket,
  createOrder,
  callApi
};
