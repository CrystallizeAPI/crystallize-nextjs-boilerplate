import produce from 'immer';

export const SEARCH_QUERY = `
  query CATALOGUE_SEARCH (
    $first: Int
    $after: String
    $orderBy: OrderBy
    $filter: CatalogueSearchFilter
    $aggregationsFilter: CatalogueSearchFilter
  ) {
    searchAggregations: search(
      filter: $aggregationsFilter
    ) {
      aggregations {
        price {
          min
          max
        }
        variantAttributes {
          attribute
          value
          count
        }
      }
    }

    search (
      first: $first
      after: $after
      orderBy: $orderBy
      filter: $filter
    ) {
      aggregations {
        totalResults
      }
      pageInfo {
        totalNodes
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          name
          path
          type
          ... on Product {
            matchingVariant {
              price
              images {
                url
                variants {
                  width
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const orderByOptions = [
  {
    field: 'ITEM_NAME',
    direction: 'ASC'
  },
  {
    field: 'ITEM_NAME',
    direction: 'DESC'
  },
  {
    field: 'PRICE',
    direction: 'ASC'
  },
  {
    field: 'PRICE',
    direction: 'DESC'
  },
  {
    field: 'STOCK',
    direction: 'ASC'
  },
  {
    field: 'STOCK',
    direction: 'DESC'
  }
].map((o) => ({ value: `${o.field}_${o.direction}`, ...o }));

export const defaultSpec = {
  first: 25,
  orderBy: {
    field: orderByOptions[0].field,
    direction: orderByOptions[0].direction
  },
  filter: {},
  include: {}
};

// eslint-disable-next-line no-unused-vars
export function urlToSpec({ query = {}, asPath }) {
  const spec = produce(defaultSpec, (draft) => {
    if (asPath && asPath !== '/search') {
      if (!draft.filter.include) {
        draft.filter.include = {};
      }
      if (!draft.filter.include.paths) {
        draft.filter.include.paths = [];
      }
      draft.filter.include.paths = [asPath];
    }

    const first = parseInt(query.first, 10);
    if (!isNaN(first)) {
      draft.first = first;
    }
    if (query.before) {
      draft.before = query.before;
    }
    if (query.after) {
      draft.after = query.after;
    }

    const orderBy = orderByOptions.find((o) => o.value === query.orderby);
    if (orderBy) {
      draft.orderBy = { direction: orderBy.direction, field: orderBy.field };
    }

    try {
      const filter = JSON.parse(query.filter);
      if (filter) {
        draft.filter = filter;
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  });

  return spec;
}

export function specToQuery(spec) {
  const { orderBy, filter, before, after, ...rest } = spec;

  let query = {
    ...rest
  };

  if (orderBy) {
    query.orderby = orderByOptions.find(
      (o) => o.field === orderBy.field && o.direction === orderBy.direction
    ).value;
  }
  if (filter) {
    query.filter = JSON.stringify(filter);
  }
  if (before) {
    query.before = before;
  }
  if (after) {
    query.after = after;
  }

  return query;
}
