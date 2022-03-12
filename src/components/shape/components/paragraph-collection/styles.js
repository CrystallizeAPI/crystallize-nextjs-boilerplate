import styled from 'styled-components';
import { isNot } from 'styled-is';

// import { responsive } from 'ui';
export const Paragraphs = styled.div``;

export const Outer = styled.div`
  margin: 0;
  grid-template-areas: 'content content content content . media media media media media media media ';
  &:nth-child(even) {
    grid-template-areas: 'media media media media media media . content content content content content';
  }
  ${isNot('$text')`
    grid-template-areas: 'media media media media media media media media media media media media' ;
  `};

  ${isNot('$media')`
    grid-template-areas: '. . . . content content content content . . . .';
  `};
`;

export const Title = styled.div`
  margin: 1em 0;
`;

export const Body = styled.div`
  margin: 1em 0;
`;

export const Text = styled.div`
  grid-area: content;
  margin-bottom: 100px;
`;
export const Media = styled.div`
  grid-area: media;
  margin-bottom: 100px;
`;
