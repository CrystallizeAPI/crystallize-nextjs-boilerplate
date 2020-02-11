import React from 'react';
import PropTypes from 'prop-types';

import Cell from '../cell';
import { CssGrid } from './styles';

const Grid = ({
  cellComponent,
  cells,
  children,
  renderCellContent,
  totalColSpan = 4,
  ...props
}) => {
  const CellComponent = cellComponent || Cell;

  return (
    <CssGrid totalColSpan={totalColSpan} {...props}>
      {children
        ? children({ cells })
        : cells.map((cell, i) => (
            <CellComponent key={`cell-${i}`} cell={cell}>
              {renderCellContent && renderCellContent(cell)}
            </CellComponent>
          ))}
    </CssGrid>
  );
};

Grid.propTypes = {
  cellComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func,
  renderCellContent: PropTypes.func,
  totalColSpan: PropTypes.number
};

export default Grid;
