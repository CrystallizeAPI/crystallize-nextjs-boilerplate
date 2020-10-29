import styled from 'styled-components';

export const Outer = styled.div`
  grid-area: facets;
  max-width: 300px;
`;

export const Facet = styled.div`
  border-top: 1px solid #dfdfdf;
  padding-top: 35px;
  &:not(:last-child) {
    margin-bottom: 35px;
  }
`;

export const FacetTitle = styled.h4`
  margin: 0 0 15px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #000;
`;
