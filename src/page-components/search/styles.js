import styled from 'styled-components';
import { responsive } from 'ui';

export const ListOuter = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

export const SearchActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
  align-items: center;

  ${responsive.mdPlus} {
    align-items: flex-start;
  }
`;

export const LocateRight = styled.div`
  ${responsive.smPlus} {
    position: absolute;
    right: 0;
    top: 5px;
  }
`;
