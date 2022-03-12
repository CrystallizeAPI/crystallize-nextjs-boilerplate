import styled from 'styled-components';
import is from 'styled-is';
import { Image as CrystallizeImage } from '@crystallize/react-image';

import { responsive } from 'ui';

const Outer = styled.div`
  margin: 0 0 2em;
`;

const ImgContainer = styled.div`
  border: 4px solid #fff;
  width: 50%;
  max-width: 100%;
  flex-grow: 1;
  position: relative;
  figure {
    height: 100%;
  }
  img {
    object-fit: cover;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid #dfdfdf;
  }
  ${is('portrait')`
    width:33.333%;
    max-width:50%;
  `}
  &:first-child {
    width: 100%;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
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
        <CrystallizeImage {...images[0]} sizes="80vw" />
      </Outer>
    );
  }

  return (
    <Outer>
      <List>
        {images.map((image, index) => (
          <ImgContainer
            key={index}
            portrait={
              image?.variants?.[0].height >= image?.variants?.[0]?.width
            }
          >
            <CrystallizeImage {...image} sizes="80vw" />
          </ImgContainer>
        ))}
      </List>
    </Outer>
  );
}
