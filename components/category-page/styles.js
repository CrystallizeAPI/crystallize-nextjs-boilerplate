import styled from 'styled-components';

import { media } from 'fragments/style/vars';

export const Outer = styled.div`
  margin-bottom: 30px;
`;

export const Loader = styled.div`
  text-align: center;
  margin: 50px;
  font-size: 2rem;
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${media.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(6, 1fr);
  }
`;
