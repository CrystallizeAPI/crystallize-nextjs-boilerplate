import React, { useReducer, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import produce from 'immer';

import { useTranslation } from 'next-i18next';
import { simplyFetchFromSearchGraph } from 'lib/graph';
import { SEARCH_QUERY } from 'lib/search';
import { useLocale } from 'lib/app-config';

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
      const { search, aggregations } = rest;
      draft.searchResult.edges = search.edges;
      draft.searchResult.totalCount = aggregations.aggregations.totalResults;
      draft.status = 'got-results';
      break;
    }
    case 'focus': {
      draft.isOpen = true;
      break;
    }
    case 'blur': {
      if (draft.isOpen) {
        draft.isOpen = false;
        document.activeElement.blur();
      }
      break;
    }
    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }
});

export default function Search() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const outerRef = useRef();
  const searchInput = useRef();
  const locale = useLocale();

  const [{ searchTerm, status, searchResult, isOpen }, dispatch] = useReducer(
    searchReducer,
    initialState
  );

  function onClickSearchBtn() {
    dispatch({ action: 'focus' });
    searchInput.current.focus();
  }

  // Do new search
  useEffect(() => {
    async function doSearch() {
      const filter = { searchTerm, productVariants: { isDefault: true } };
      const response = await simplyFetchFromSearchGraph({
        query: SEARCH_QUERY,
        variables: {
          filter,
          aggregationsFilter: filter,
          language: locale.crystallizeCatalogueLanguage
        }
      });

      dispatch({ action: 'setResult', ...response.data });
    }

    if (status === 'searching') {
      doSearch();
    }
  }, [searchTerm, status, locale]);

  function onSubmit(e) {
    e.preventDefault();

    const options = {
      pathname: '/search'
    };
    if (searchTerm) {
      options.query = { searchTerm };
    }

    if (router.pathname === '/search') {
      router.replace(options, undefined, { shallow: true });
    } else {
      router.push(options);
    }

    dispatch({ action: 'blur' });
  }

  return (
    <>
      <Btn
        type="button"
        onClick={onClickSearchBtn}
        aria-label={t('search.label')}
      >
        <svg viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.4155 25.7638L23.6818 21.0311C23.4491 20.7993 23.134 20.6691 22.8055 20.6691C22.4769 20.6691 22.1618 20.7993 21.9291 21.0311C20.6818 22.2369 19.0696 22.995 17.3451 23.1865C15.6207 23.3781 13.8814 22.9923 12.3998 22.0897C10.9181 21.187 9.7778 19.8185 9.15748 18.1984C8.53715 16.5784 8.47185 14.7984 8.97181 13.1372C9.47177 11.4761 10.5088 10.0277 11.9203 9.01897C13.3318 8.01022 15.0382 7.49811 16.772 7.56286C18.5059 7.62761 20.1692 8.26556 21.5016 9.37678C22.8339 10.488 23.7599 12.0097 24.1346 13.7035C24.403 14.9323 24.3753 16.2073 24.0539 17.4233C24.0159 17.5657 24.0064 17.7142 24.0258 17.8604C24.0452 18.0065 24.0933 18.1473 24.1671 18.2749C24.241 18.4024 24.3393 18.5142 24.4564 18.6038C24.5735 18.6934 24.7071 18.759 24.8495 18.797C25.1372 18.8736 25.4436 18.8329 25.7013 18.6837C25.9589 18.5345 26.1468 18.2891 26.2235 18.0015C26.841 15.6807 26.6115 13.2159 25.576 11.0491C24.5405 8.88221 22.7668 7.15507 20.5729 6.17736C18.379 5.19965 15.9085 5.03534 13.6044 5.71389C11.3003 6.39245 9.31341 7.86947 7.99995 9.88009C6.68649 11.8907 6.13242 14.3034 6.43711 16.6855C6.7418 19.0676 7.88531 21.2632 9.66258 22.8786C11.4398 24.4941 13.7346 25.4237 16.1353 25.5007C18.536 25.5777 20.8857 24.7971 22.7629 23.2989L26.8286 27.3593C26.9327 27.4636 27.0564 27.5464 27.1925 27.6029C27.3287 27.6594 27.4746 27.6885 27.622 27.6885C27.7694 27.6885 27.9154 27.6594 28.0515 27.6029C28.1877 27.5464 28.3114 27.4636 28.4155 27.3593C28.5212 27.2551 28.6051 27.1309 28.6624 26.9939C28.7197 26.857 28.7492 26.71 28.7492 26.5615C28.7492 26.4131 28.7197 26.2661 28.6624 26.1292C28.6051 25.9922 28.5212 25.868 28.4155 25.7638V25.7638Z"
            fill="#080708"
          />
          <path
            d="M19.8356 18.7679C19.6565 18.6016 19.4273 18.4995 19.1838 18.4776C18.9404 18.4557 18.6966 18.5152 18.4908 18.6469C17.9096 19.0054 17.2429 19.2016 16.5602 19.215C15.8774 19.2284 15.2036 19.0586 14.6088 18.7231C14.4072 18.6055 14.1729 18.5563 13.9409 18.583C13.709 18.6096 13.492 18.7107 13.3223 18.871L13.2551 18.9338C13.1347 19.0484 13.0424 19.1893 12.9854 19.3455C12.9284 19.5017 12.9082 19.6689 12.9264 19.8341C12.9446 19.9994 13.0008 20.1582 13.0904 20.2982C13.1801 20.4382 13.3009 20.5556 13.4433 20.6413C14.4017 21.1937 15.4927 21.474 16.5986 21.4519C17.7046 21.4297 18.7835 21.1061 19.719 20.5158C19.8557 20.429 19.9711 20.3125 20.0567 20.1751C20.1423 20.0377 20.1959 19.8828 20.2135 19.7218C20.2312 19.5609 20.2124 19.3981 20.1586 19.2454C20.1048 19.0927 20.0174 18.954 19.9028 18.8396L19.8356 18.7679Z"
            fill="#FBDCCE"
          />
        </svg>
      </Btn>
      <SearchWrapper isOpen={isOpen}>
        <Outer ref={outerRef}>
          <SearchLabel>{t('search.placeholder')}</SearchLabel>
          <InputGroup as="form" method="get" role="search" onSubmit={onSubmit}>
            <Input
              ref={searchInput}
              type="search"
              value={searchTerm}
              onFocus={() => dispatch({ action: 'focus' })}
              onChange={(e) =>
                dispatch({ action: 'setSearchTerm', value: e.target.value })
              }
              placeholder={t('search.placeholder')}
              aria-label={t('search.label')}
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
                      href={node.path}
                      onClick={() => dispatch({ action: 'blue' })}
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
      {!!isOpen && <BodyOverlay onClick={() => dispatch({ action: 'blur' })} />}
    </>
  );
}
