import React from 'react';

import { useT } from 'lib/i18n';

import { Outer, Inner, InputFooter, TotalResults } from './styles';
import SearchTerm from './search-term';
import OrderBy from './order-by';

export default function SearchSpec({ spec, changeQuery, aggregations }) {
  const t = useT();

  function onSearchTermChange(searchTerm) {
    changeQuery((query) => {
      if (searchTerm) {
        query.searchTerm = searchTerm;
      } else {
        delete query.searchTerm;
      }
    });
  }

  function onOrderChange(orderBy, index) {
    changeQuery((query) => {
      if (index > 0) {
        query.orderby = orderBy.value;
      } else {
        delete query.orderby;
      }
    });
  }

  return (
    <Outer>
      <Inner>
        <SearchTerm
          searchTerm={spec.filter?.searchTerm}
          onChange={onSearchTermChange}
        />
        {aggregations && (
          <InputFooter>
            <TotalResults>
              {t('search.foundResults', { count: aggregations.totalResults })}
            </TotalResults>
            <OrderBy orderBy={spec.orderBy} onChange={onOrderChange} />
          </InputFooter>
        )}
      </Inner>
    </Outer>
  );
}
