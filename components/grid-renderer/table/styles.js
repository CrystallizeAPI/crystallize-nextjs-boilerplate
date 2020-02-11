import styled from 'styled-components';

import { responsive } from 'ui';

export const TableWrapper = styled.div`
  margin: -1rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 1rem;
  border-collapse: separate;
`;

export const Tr = styled.tr`
  width: 100%;
  height: 300px;

  ${responsive.sm} {
    height: 150px;
  }

  ${responsive.xs} {
    height: 100px;
  }
`;

export const Td = styled.td`
  position: relative;
  width: ${props => 100 / props.totalColSpan}%;
  vertical-align: top;
  background: white;
`;

export const TableCellWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
`;
