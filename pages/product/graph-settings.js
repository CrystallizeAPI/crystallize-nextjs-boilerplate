import gql from 'graphql-tag';

export default {
  query: gql`
    query PRODUCT_QUERY($url: String) {
      tree(language: "en", path: $url) {
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

  options: ctx => {
    const { router } = ctx;
    const fullPath = router.asPath || router.pathname;
    const path = fullPath.split('/');
    return {
      variables: {
        url: `/${path[1]}`,
        id: __crystallizeConfig.TENANT_ID
      }
    };
  },

  props: props => {
    const { data } = props;
    return {
      data: {
        ...data
      }
    };
  }
};
