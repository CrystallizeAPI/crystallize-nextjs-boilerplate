import styled from 'styled-components';
import Image from '@crystallize/react-image';

export const Outer = styled.a`
  display: block;
  height: 100%;
  color: #fff;
  position: relative;
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
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
    border-radius: 12px;
  }
`;

export const Text = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1em;

  h3 {
    font-size: 1em;
    color: inherit;
    font-family: 'Roboto Slab', 'Roboto', 'sans-serif';
    margin: 0;
  }
`;

export const Price = styled.span`
  color: inherit;
  font-weight: bold;
`;
