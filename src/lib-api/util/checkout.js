import { simplyFetchFromGraph } from 'lib/graph';

export async function validatePaymentModel({ paymentModel }) {
  const {
    cart,
    locale,
    customer,
    multilingualUrlPrefix,
    metadata
  } = paymentModel;
  const productVariantsToValidate = cart.map(({ sku, path }) => ({
    sku,
    path
  }));

  const response = await simplyFetchFromGraph({
    query: `
      {
        ${productVariantsToValidate.map(
          (item, index) => `
            product${index}: catalogue (language: "${locale.crystallizeCatalogueLanguage}", path: "${item.path}") {
              ... on Product {
                id
                vatType {
                  name
                  percent
                }
                variants {
                  id
                  sku
                  name
                  stock
                  price
                  attributes {
                    attribute
                    value
                  }
                  images {
                    variants {
                      url
                      width
                    }
                  }
                }
              }
            }
          `
        )}
      }
    `
  });

  const productsFromApi = cart.map((_, i) => response.data[`product${i}`]);

  const validatedCart = cart
    .map((cartItem) => {
      const product = productsFromApi.find((product) =>
        product.variants.some((v) => v.sku === cartItem.sku)
      );
      if (product) {
        const { id: productId, vatType } = product;
        const {
          id: productVariantId,
          name,
          price,
          images,
          sku
        } = product.variants.find((v) => v.sku === cartItem.sku);

        const gross = price;
        const net = (price / (100 + vatType.percent)) * 100;

        // Get a small preview of the first image
        const image = images[0];
        const smallImages = image?.variants
          .filter((v) => !v.url.includes('.webp'))
          .find((v) => v.width < 768);
        const imageUrl = smallImages[1] || smallImages[0];

        return {
          productId,
          productVariantId,
          quantity: cartItem.quantity,
          name,
          sku,
          imageUrl,
          price: {
            gross,
            net,
            tax: vatType,
            currency: locale.defaultCurrency,
            discounts: [
              {
                percent: 0
              }
            ]
          }
        };
      }
      return null;
    })
    .filter((c) => !!c);

  const total = validatedCart.reduce(
    (acc, { quantity, price }) => {
      acc.gross += price.gross * quantity;
      acc.net += price.net * quantity;
      return acc;
    },
    { gross: 0, net: 0 }
  );
  total.currency = locale.defaultCurrency;
  total.discounts = [
    {
      percent: 0
    }
  ];

  total.tax = validatedCart[0].vatType;

  return {
    locale,
    cart: validatedCart,
    total,
    customer,
    metadata,
    multilingualUrlPrefix
  };
}
