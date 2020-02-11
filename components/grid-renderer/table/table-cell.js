import React from 'react';
import PropTypes from 'prop-types';

import Cell from '../cell';
import { Td, TableCellWrapper } from './styles';

const TableCell = ({ cell, children, totalColSpan }) => {
  const layout = cell.layout || { colspan: 1, rowspan: 1 };
  return (
    <Td
      rowSpan={layout.rowspan}
      colSpan={layout.colspan}
      totalColSpan={totalColSpan}
    >
      <TableCellWrapper>
        {children ? children : <Cell cell={cell} />}
      </TableCellWrapper>
    </Td>
  );
};

TableCell.propTypes = {
  cell: PropTypes.object,
  children: PropTypes.any,
  totalColSpan: PropTypes.number
};

export default TableCell;
