import React from 'react';
import PropTypes from 'prop-types';

import { TableWrapper, StyledTable, Tr } from './styles';
import TableCell from './table-cell';

const Table = ({
  cellComponent,
  children,
  renderCellContent,
  rows,
  totalColSpan = 4,
  ...props
}) => {
  const CellComponent = cellComponent || TableCell;

  return (
    <TableWrapper {...props}>
      <StyledTable>
        <thead>
          <tr>
            {new Array(totalColSpan).fill(0).map((v, i) => (
              <th key={`th-${i}`} />
            ))}
          </tr>
        </thead>
        <tbody>
          {children
            ? children({ rows })
            : rows.map((row, i) => {
                return (
                  <Tr key={`row-${i}`}>
                    {row.columns.map((col, j) => (
                      <CellComponent
                        key={`cell-${i}-${j}`}
                        cell={col}
                        totalColSpan={totalColSpan}
                      >
                        {renderCellContent && renderCellContent(col)}
                      </CellComponent>
                    ))}
                  </Tr>
                );
              })}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

Table.propTypes = {
  cellComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.func,
  renderCellContent: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object),
  totalColSpan: PropTypes.number
};

export default Table;
