import styled from 'styled-components';

import { responsive } from 'ui';

export const Outer = styled.div`
  max-width: 1200px;
  margin: 0 auto 30px;
`;

export const Loader = styled.div`
  text-align: center;
  margin: 50px;
  font-size: 2rem;
`;

export const Sections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Media = styled.div`
  flex: 0 0 auto;
  width: 200px;
  margin-bottom: 30px;

  ${responsive.md} {
    width: 400px;
  }
`;

export const Info = styled.div`
  flex: 1 1 auto;
`;

export const Price = styled.div`
  margin-bottom: 15px;
  text-align: center;
`;
