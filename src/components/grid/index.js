import GridRenderer from '@crystallize/grid-renderer';
import styled from 'styled-components';

import { responsive } from 'ui';

export { default as GridItem } from './grid-item';

const StyledGrid = styled(GridRenderer)`
  grid-template-rows: ${(p) =>
    `repeat(${p.model.rows?.length}, var(--grid-row-height))`};

  ${responsive.xs} {
    display: block !important;
    grid-template-columns: 100% !important;
  }
`;

export default function Grid({ model, ...rest }) {
  if (!model) {
    return null;
  }

  return <StyledGrid model={model} {...rest} />;
}
