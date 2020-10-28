import React, { useReducer, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import produce from 'immer';

import { useT } from 'lib/i18n';
import { simplyFetchFromSearchGraph } from 'lib/graph';
import { SEARCH_QUERY } from 'lib/search';
import { useOnOutsideClick } from 'components/outside-click';
import Link from 'components/link';

import { Btn } from './../styles';
import { Input, InputGroup, InputButton, InputSpinner } from 'ui';
import {
  Outer,
  SearchWrapper,
  SearchLabel,
  BodyOverlay,
  CloseBtn,
  Result
} from './styles';

const initialState = {
  searchTerm: '',
  status: 'idle',
  isOpen: false,
  searchResult: {
    totalCount: 0,
    edges: []
  }
};

const searchReducer = produce(function reducer(draft, { action, ...rest }) {
  switch (action) {
    case 'setSearchTerm': {
      const { value } = rest;
      if (value.length > 0) {
        draft.status = 'searching';
      }

      draft.searchTerm = value;
      break;
    }
    case 'setResult': {
      const { search, searchAggregations } = rest;
      draft.searchResult.edges = search.edges;
      draft.searchResult.totalCount =
        searchAggregations.aggregations.totalResults;
      draft.status = 'got-results';
      break;
    }
    case 'focus': {
      draft.isOpen = true;
      break;
    }
    case 'blur': {
      draft.isOpen = false;
      break;
    }
    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }
});

export default function Search() {
  const t = useT();
  const router = useRouter();
  const outerRef = useRef();
  const searchInput = useRef();

  const [{ searchTerm, status, searchResult, isOpen }, dispatch] = useReducer(
    searchReducer,
    initialState
  );

  const onClickSearchBtn = () => {
    dispatch({ action: 'focus' });
    searchInput.current.focus();
  };
  useOnOutsideClick({
    element: outerRef.current,
    onOutsideClick: () => dispatch({ action: 'blur' })
  });

  // Initiate searching
  useEffect(() => {
    async function doSearch() {
      const filter = { searchTerm, productVariants: { isDefault: true } };
      const response = await simplyFetchFromSearchGraph({
        query: SEARCH_QUERY,
        variables: {
          filter,
          aggregationsFilter: filter
        }
      });

      dispatch({ action: 'setResult', ...response.data });
    }

    if (status === 'searching') {
      doSearch();
    }
  }, [searchTerm, status]);

  function onSubmit(e) {
    e.preventDefault();

    router.push({
      pathname: '/search',
      query: {
        filter: JSON.stringify({
          searchTerm,
          productVariants: { isDefault: true }
        })
      }
    });

    dispatch({ action: 'blur' });
  }

  return (
    <>
      <Btn type="button" onClick={() => onClickSearchBtn()}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22ZM13 24C19.0751 24 24 19.0751 24 13C24 6.92487 19.0751 2 13 2C6.92487 2 2 6.92487 2 13C2 19.0751 6.92487 24 13 24Z"
            fill="#4C505B"
            stroke="none"
            strokeWidth="0.2"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.0872 27.804L20.1521 21.3869L21.5104 19.9189L28.4455 26.336L27.0872 27.804Z"
            fill="#4C505B"
            strokeWidth="0.2"
          />
        </svg>
      </Btn>
      <SearchWrapper isOpen={isOpen}>
        <Outer ref={outerRef}>
          <SearchLabel>Search for something</SearchLabel>
          <InputGroup as="form" method="get" onSubmit={onSubmit}>
            <Input
              ref={searchInput}
              type="search"
              value={searchTerm}
              onFocus={() => dispatch({ action: 'focus' })}
              onChange={(e) =>
                dispatch({ action: 'setSearchTerm', value: e.target.value })
              }
              placeholder={t('layout.searchPlaceholder')}
            />
            {status === 'searching' && <InputSpinner />}
            <InputButton>➔</InputButton>
          </InputGroup>
          {status !== 'idle' && isOpen && searchTerm !== '' && (
            <Result>
              <h3>{searchResult.totalCount} suggestions</h3>
              <ul style={{ height: 40 * (searchResult.edges.length + 1) }}>
                {searchResult.edges.map(({ cursor, node }) => (
                  <li key={cursor}>
                    <Link
                      as={node.path}
                      onClick={() => dispatch({ action: 'blue' })}
                      href="/[...catalogue]"
                    >
                      <a>{node.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Result>
          )}
        </Outer>
        <CloseBtn onClick={() => dispatch({ action: 'blur' })} />
      </SearchWrapper>
      {!!isOpen && <BodyOverlay />}
    </>
  );
}
