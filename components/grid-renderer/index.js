import React from 'react';
import PropTypes from 'prop-types';
import Grid from './grid';
import Table from './table';

export { default as Grid } from './grid';
export { default as Table } from './table';
export { default as Cell } from './cell';
export { default as TableCell } from './table/table-cell';

const getTotalGridDimensions = rows => {
  const totalColSpan = rows[0].columns.reduce(
    (acc, col) => acc + col.layout.colspan,
    0
  );

  return { totalColSpan };
};

const GridRenderer = ({
  cellComponent,
  children,
  model,
  renderCellContent,
  type = 'grid',
  ...props
}) => {
  const { rows } = model;
  if (!rows.length) return null;

  const { totalColSpan } = getTotalGridDimensions(rows);

  if (type === 'table') {
    return (
      <Table
        cellComponent={cellComponent}
        renderCellContent={renderCellContent}
        rows={rows}
        totalColSpan={totalColSpan}
      >
        {children}
      </Table>
    );
  }

  // Currently the data is only returned in a nested array of rows and
  // columns. To make use of CSS Grid we need a flat array of all of the
  // individual cells.
  const columns = rows.map(row => row.columns);
  const cells = [].concat.apply([], columns);

  return (
    <Grid
      cellComponent={cellComponent}
      cells={cells}
      renderCellContent={renderCellContent}
      totalColSpan={totalColSpan}
      {...props}
    >
      {children}
    </Grid>
  );
};

GridRenderer.propTypes = {
  cellComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.func,
  model: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]).isRequired,
  renderCellContent: PropTypes.func,
  type: PropTypes.string
};

export default GridRenderer;
