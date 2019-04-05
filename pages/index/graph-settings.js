import gql from 'graphql-tag';

export default {
  query: gql`
    query {
      tree(language: "en") {
        ... on Item {
          children {
            ...item
            ...product
            ... on Item {
              children {
                ...item
                ...product
              }
            }
          }
        }
      }
    }

    fragment item on Item {
      id
      name
      type
      path
      components {
        name
        type
        meta {
          key
          value
        }
        content {
          ...singleLine
          ...richText
          ...paragraphCollection
        }
      }
    }

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
            key
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

    fragment singleLine on SingleLineContent {
      text
    }

    fragment richText on RichTextContent {
      json
    }

    fragment paragraphCollection on ParagraphCollectionContent {
      paragraphs {
        title {
          ...singleLine
        }
        body {
          ...richText
        }
      }
    }
  `,

  props: props => {
    const { data } = props;
    return {
      data: data.tree
    };
  }
};
