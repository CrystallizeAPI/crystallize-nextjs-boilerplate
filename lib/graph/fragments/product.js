module.exports = `
fragment product on Product {
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
