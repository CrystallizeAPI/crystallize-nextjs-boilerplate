import styled from 'styled-components';

import { Header } from 'ui';

export const Document = styled(Header)`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 50px;
  img {
    width: calc(100% + 300px);
    margin-left: -150px;
    max-height: 400px;
    max-width: 4000px;
    object-fit: contain;
    position: relative;
    height: auto;
  }
  h1 {
    padding-top: 50px;
  }
  ul {
    font-size: 18px;
    margin: 8px 0 10px 20px;
    li {
      padding: 4px 0;
    }
  }
`;
