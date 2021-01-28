import styled from 'styled-components';
import { responsive } from 'ui';

export const FacetHeader = styled.h4`
  color: #000;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  margin: 0 0 15px;
  min-height: 15px;
  text-transform: capitalize;
`;

export const FacetTitle = styled.span`
  span {
    margin-right: 15px;
  }
`;

export const FacetAction = styled.button`
  visibility: hidden;
  opacity: 0;
  transition: opacity 250ms;
`;

export const Facet = styled.div`
  ${responsive.mdPlus} {
    padding: 2.5rem 2rem;
    border: 1px solid #dfdfdf;
  }

  &:hover ${FacetAction} {
    visibility: visible;
    opacity: 1;
  }
`;
