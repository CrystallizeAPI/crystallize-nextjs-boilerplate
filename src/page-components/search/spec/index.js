import React from 'react';

import { useT } from 'lib/i18n';

import { Outer, Inner, InputFooter, TotalResults } from './styles';
import SearchTerm from './search-term';
import OrderBy from './order-by';

export default function SearchSpec({ spec, dispatch, aggregations }) {
  const t = useT();

  return (
    <Outer>
      <Inner>
        <SearchTerm
          searchTerm={spec.filter?.searchTerm}
          onChange={(searchTerm) =>
            dispatch({ action: 'setSearchTerm', searchTerm })
          }
        />
        <InputFooter>
          <TotalResults>
            {t('search.foundResults', { count: aggregations.totalResults })}
          </TotalResults>
          <OrderBy
            orderBy={spec.orderBy}
            onChange={(orderBy) => dispatch({ action: 'setOrderBy', orderBy })}
          />
        </InputFooter>
      </Inner>
    </Outer>
  );
}
