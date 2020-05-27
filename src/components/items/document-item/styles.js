import styled from 'styled-components';
import Image from '@crystallize/react-image';

import { responsive } from 'ui';
import WidescreenRatio from 'ui/widescreen-ratio';

export const Outer = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${(p) => (p.span ? `grid-column-end: span ${p.span}` : null)};

  ${responsive.xs} {
    margin-bottom: 15px;
  }
`;

export const MediaWrapper = styled(WidescreenRatio)`
  flex: 0 0 auto;
`;

export const MediaInner = styled.div`
  flex: 1 1 100%;
`;

export const Img = styled(Image)`
  width: 100%;
  height: 100%;
  overflow: hidden;

  > img {
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const Text = styled.div`
  flex: 1 1 auto;
  color: var(--color-text-main);
  background: var(--color-box-background);
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 3em var(--content-padding);

  h3 {
    font-size: 1.6em;
    color: inherit;
    font-family: 'Roboto Slab', 'Roboto', sans-serif;
    margin: 0;
  }
`;

export const Description = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  margin-top: 10px;
  line-height: 1.2rem;
  color: inherit;
`;
