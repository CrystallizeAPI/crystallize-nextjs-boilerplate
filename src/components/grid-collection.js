import React from 'react';
import styled from 'styled-components';
import Grid, { GridItem } from 'components/grid';

import { H1 } from 'ui';
import ContentTransformer from 'ui/content-transformer';

const Outer = styled.div`
  margin-bottom: 100px;
`;

const Title = styled(H1)`
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin: 0 4px;
  margin-bottom: 15px;
  max-width: var(--font-max-width);
`;
const Description = styled.div`
  margin: 0 4px 45px;
  max-width: var(--font-max-width);
`;

export default function GridCollection({ title, description, grids }) {
  return (
    <Outer>
      {!!title && <Title as="h4">{title}</Title>}
      {!!description && (
        <Description>
          <ContentTransformer json={description} />
        </Description>
      )}
      {!!grids?.length &&
        grids.map((grid, index) => (
          <Grid
            key={grid.id || index}
            model={grid}
            cellComponent={({ cell }) => (
              <GridItem data={cell.item} gridCell={cell} />
            )}
          />
        ))}
    </Outer>
  );
}
