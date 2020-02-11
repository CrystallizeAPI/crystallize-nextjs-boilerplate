import React from 'react';
import PropTypes from 'prop-types';

import { CellWrapper, Img, ImageWrapper, ItemName } from './styles';

const Cell = ({ cell, children }) => {
  const { item } = cell;
  const layout = cell.layout || { colspan: 1, rowspan: 1 };

  if (!item) {
    return (
      <CellWrapper rowSpan={layout.rowspan} colSpan={layout.colspan}>
        {children}
      </CellWrapper>
    );
  }

  const defaultVariant = item.variants
    ? item.variants.find(variant => variant.isDefault)
    : null;
  const image = defaultVariant ? defaultVariant.image : null;

  return (
    <CellWrapper rowSpan={layout.rowspan} colSpan={layout.colspan}>
      {children ? (
        children
      ) : (
        <>
          <ImageWrapper className="crystallize-grid-image-wrapper">
            <Img
              className="crystallize-grid-image"
              src={image && image.url}
              alt={image && image.alt}
            />
          </ImageWrapper>

          <ItemName className="crystallize-grid-item-name">
            {item.name}
          </ItemName>
        </>
      )}
    </CellWrapper>
  );
};

Cell.propTypes = {
  cell: PropTypes.object,
  children: PropTypes.any
};

export default Cell;
