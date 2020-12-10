import { getClient, getCrystallizeProduct } from 'lib-api/erp/tripletex';

export default async (req, res) => {
  try {
    const { customer, cart } = req?.body?.order?.get;

    const deliveryAddress = customer?.addresses?.find(
      (add) => add.type === 'delivery'
    );

    const {
      value: { id: customerId }
    } = await getClient().createCustomer({
      name: `${customer.firstName} ${customer.lastName}`,
      phoneNumber: customer.addresses[0].phone || '',
      email: customer.addresses[0].email || '',
      isCustomer: true,
      deliveryAddress: deliveryAddress
        ? {
            addressLine1: deliveryAddress.street,
            addressLine2: deliveryAddress.street2,
            postalCode: deliveryAddress.postalCode,
            city: deliveryAddress.city
          }
        : null
    });

    const date = new Date();

    const {
      value: { id: orderId }
    } = await getClient().createOrder({
      customer: {
        id: customerId
      },
      orderDate: date.toISOString(),
      deliveryDate: date.toISOString(),
      isClosed: false
    });

    const { values: inventories } = await getClient().getInventories();

    const { id: inventoryId } = inventories.find((i) => i.isMainInventory);
    const { values: vatTypes } = await getClient().getVatTypes();

    const { id: defaultVatTypeId } = vatTypes.find(
      (i) => i.percentage === 25 && !i.name.includes('Fradrag')
    );

    for (const lineItem of cart) {
      const {
        data: {
          product: { get: productData }
        }
      } = await getCrystallizeProduct({ id: lineItem.productId });
      const currentVariant = productData.variants.find(
        (v) => (v.id = lineItem.productVariantId)
      );
      await getClient().createOrderLine({
        product: {
          id: currentVariant.externalReference,
          name: lineItem.name
        },
        unitPriceExcludingVatCurrency: lineItem.price.net,
        vatType: {
          id: defaultVatTypeId
        },
        currency: {
          code: lineItem.price.currency,
          factor: 1
        },
        order: {
          id: orderId
        },
        inventory: {
          id: inventoryId
        },
        count: lineItem.quantity
      });
    }

    res.send('Stock Synced');
  } catch (error) {
    console.log('Error occured: ', error);
    res.send(error);
  }
};
