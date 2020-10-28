import styled from 'styled-components';

import { Button } from 'ui';

const Outer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function Pagination({ navigate, pageInfo }) {
  const { hasPreviousPage, hasNextPage } = pageInfo;

  return (
    <Outer>
      <Button
        onClick={() => navigate({ direction: 'prevPage' })}
        disabled={!hasPreviousPage}
      >
        Previous page
      </Button>
      <Button
        onClick={() => navigate({ direction: 'nextPage' })}
        disabled={!hasNextPage}
      >
        Next page
      </Button>
    </Outer>
  );
}
