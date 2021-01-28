import styled from 'styled-components';
import is from 'styled-is';

import { responsive } from 'ui';

export const Outer = styled.div`
  width: 100%;
`;

export const FacetsDisplayer = styled.div`
  ${responsive.smAndLess} {
    display: none;
    margin-top: 15px;

    ${is('$show')`
      background: #fff;
      display: block;
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      height: calc(var(--vh) * 100);
      width: 100%;
      overflow-y: auto;
      padding: 50px 15px 85px;
    `};
  }

  ${responsive.mdPlus} {
    display: none;

    ${is('$show')`
      display: block;
      display: grid;
      margin-bottom: 2rem;
      margin-top: 1rem;
      padding: 0;
      grid-gap: 1rem;
      grid-template-columns: repeat(2, 1fr);
    `};
  }

  > *:not(:first-child):not(:last-child) {
    border-top: 1px solid #dfdfdf;
    margin-top: 35px;
    padding-top: 30px;

    ${responsive.mdPlus} {
      margin-top: 0;
    }
  }
`;

export const FacetGroupOfAttributes = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const ButtonCloseFacets = styled.div`
  display: none;

  ${responsive.smAndLess} {
    display: block;
    position: fixed;
    right: 15px;
    bottom: 15px;
    z-index: 1;
  }
`;
