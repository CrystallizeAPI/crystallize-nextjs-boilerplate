import styled from 'styled-components';
import is from 'styled-is';
import { responsive, H1, Inner as I } from 'ui';

export const Inner = styled(I)`
  display: flex;
  flex-direction: column-reverse;
  padding: 0 15px;

  ${responsive.smPlus} {
    display: grid;
    padding: 0 30px;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 30px;
    grid-template-areas: 'content content content content content content content actions actions actions actions actions';
  }

  ${responsive.mdPlus} {
    padding-left: 100px;
    padding-right: 100px;
    column-gap: initial;
    grid-template-areas: 'content content content content content content content . actions actions actions actions';
  }

  figcaption {
    margin-top: 0.5rem;
  }
`;

export const Content = styled.div`
  // vertical space between the actions and the content
  margin-top: 30px;
  ${responsive.smPlus} {
    // Remove the vertical space because now they are placed next to each other
    margin-top: 0;
    grid-area: content;
  }
`;

export const Actions = styled.div`
  ${responsive.smPlus} {
    grid-area: actions;
  }
`;

export const ActionsSticky = styled.div`
  // Adding styles only when they are needed makes the calculation of CSSOM faster
  ${responsive.smPlus} {
    position: sticky;
    top: 50px;
  }
`;

// The specs and DescriptionWrapper padding-right
// must be the same so the content looks aligned
export const Specs = styled.div`
  border-left: 0;
  display: block;
  margin-top: 15px;
  padding: 20px 0;
  margin-left: 25px;
  margin-right: 25px;

  ${responsive.mdPlus} {
    padding: 0 100px 0 25px;
  }
  ${responsive.md} {
    padding: 0 0px 0 25px;
  }
`;

export const Description = styled.div`
  color: var(--color-text-sub);

  ${responsive.mdPlus} {
    padding: 100px 0;
    margin-top: 50px;
  }
`;
export const DescriptionWrapper = styled.div`
  p,
  li {
    margin-left: 25px !important;
    margin-right: 25px;
    ${responsive.mdPlus} {
      padding-right: 100px;
      margin-left: 50px !important;
      margin-right: 0;
    }
  }

  h2 {
    font-size: var(--font-size-md);
  }

  h3 {
    margin-left: 25px;
    line-height: 38px;
    ${responsive.mdPlus} {
      margin-left: 50px;
    }
  }
`;

export const Media = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

// Creating a gallery based on image orientation
export const ImgContainer = styled.div`
  border: 4px solid #fff;
  width: 50%;
  max-width: 100%;
  flex-grow: 1;
  position: relative;
  figure {
    height: 100%;
  }
  img {
    object-fit: var(--image-object-fit);
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 1px solid #dfdfdf;
  }

  ${is('portrait')`
    width:33.333%;
    max-width:50%;
    &:only-child {
      max-width:100%;
      width:100%
    }
  `}

  &:first-child {
    width: 100%;
  }
`;

export const Title = styled(H1)`
  font-size: var(--font-size-xl);
  font-weight: 900;
`;

export const Summary = styled.div`
  color: var(--color-text-sub);
  font-size: var(--font-size-body);
  line-height: 1.4;
  margin-bottom: 15px;
`;

export const RelatedContainer = styled(I)`
  margin-top: 100px;
  min-height: 0;
`;
