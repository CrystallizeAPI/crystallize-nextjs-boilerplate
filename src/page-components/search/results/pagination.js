import styled from 'styled-components';

const Outer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid #000;
  padding: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  &:disabled {
    opacity: 0;
  }
`;

export default function Pagination({ navigate, pageInfo }) {
  const { hasPreviousPage, hasNextPage } = pageInfo;

  return (
    <Outer>
      <Button
        onClick={() => navigate({ direction: 'prevPage' })}
        disabled={!hasPreviousPage}
      >
        ←
      </Button>
      <Button
        onClick={() => navigate({ direction: 'nextPage' })}
        disabled={!hasNextPage}
      >
        →
      </Button>
    </Outer>
  );
}
