import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { responsive } from 'ui';

const Outer = styled.div`
  margin: 0 0 2em;
`;

const List = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 100px;

  > picture {
    min-height: 300px;
    ${responsive.xs} {
      min-height: 100px;
    }
    &:nth-child(3n) {
      grid-column-start: span 2;
    }
  }

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export default function Images({ images }) {
  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <Outer>
        <Image {...images[0]} sizes="80vw" />
      </Outer>
    );
  }

  return (
    <Outer>
      <List>
        {images.map((image, index) => (
          <Image key={index} {...image} sizes="80vw" />
        ))}
      </List>
    </Outer>
  );
}
