import styled from 'styled-components';

export const Outer = styled.div`
  grid-area: facets;
  max-width: 200px;
`;

export const Facet = styled.div`
  &:not(:last-child) {
    margin-bottom: 35px;
  }
`;

export const FacetTitle = styled.h4`
  margin: 0 0 15px;
`;
