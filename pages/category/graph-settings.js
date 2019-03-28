import gql from 'graphql-tag';

import { normalizeContentFields } from 'lib/normalizers';

export default {
  query: gql`
    query CATEGORY_QUERY($url: String) {
      tree(language: "en", path: $url) {
        ...item
        ...product
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
    return {
      variables: {
        url: router.asPath || router.pathname,
        id: __crystallizeConfig.TENANT_ID
      }
    };
  },

  props: props => {
    const { data } = props;
    return {
      data: {
        ...data,
        catalogue: normalizeContentFields(data),
        folder: normalizeContentFields(data)
      }
    };
  }
};
