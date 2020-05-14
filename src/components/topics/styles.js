import styled from 'styled-components';

import { responsive } from 'ui';

export const TopicMap = styled.div`
  position: relative;
  margin-top: 15px;
  ${responsive.xs} {
    margin: 15px 10px 0;
  }
`;

export const TopicTitle = styled.h3`
  font-size: 16px;
  opacity: 0.6;
  top: 0;
  height: 40px;
  left: 40px;
  position: absolute;
  transform-origin: top left;
  transform: rotate(90deg);
`;
export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
  ${responsive.xs} {
    display: block;
  }
  ${responsive.sm} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${responsive.md} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${responsive.lg} {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const RelatedTopics = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  ${responsive.xs} {
    /* display: none; */
  }
  h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;
