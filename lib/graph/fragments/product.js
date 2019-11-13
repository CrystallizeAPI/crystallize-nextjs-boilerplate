module.exports = `
fragment product on Product {
  id
  vatType {
    name
    percent
  }
  isVirtual
  isSubscriptionOnly
  variants {
    id
    name
    sku
    price
    stock
    isDefault
    attributes {
      attribute
      value
    }
    image {
      url
      altText
      variants {
        url
        width
      }
    }
    subscriptionPlans {
      id
      name
      initialPeriod
      initialPrice
      recurringPeriod
      recurringPrice
    }
  }
}
`;
