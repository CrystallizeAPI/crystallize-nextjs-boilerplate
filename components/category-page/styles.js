import styled from 'styled-components';

import { mediaSm, mediaMd, mediaLg } from 'components/style-vars';

export const Outer = styled.div`
  margin-bottom: 30px;
`;

export const H1 = styled.h1`
  text-align: center;
  padding: 10vh 20px;
  background-color: #bbb;
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${mediaSm} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${mediaMd} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${mediaLg} {
    grid-template-columns: repeat(6, 1fr);
  }
`;
