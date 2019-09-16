import styled from 'styled-components';

import { colors, responsive } from 'ui';

export const Outer = styled.div`
  max-width: 1200px;
  margin: 0 auto 30px;
`;

export const Loader = styled.div`
  text-align: center;
  margin: 50px;
  font-size: 2rem;
`;

export const Sections = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${responsive.smAndLess} {
    display: block;
  }
`;

export const RelatedTopics = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Media = styled.div`
  flex: 0 0 60%;
  position: relative;
  padding-top: 60%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);

  ${responsive.mdAndLess} {
    flex-basis: 40%;
  }

  &:before {
    content: '';
    width: 80%;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const MediaInner = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background: #fff;
  padding: 2rem;

  img {
    position: relative;
    object-fit: contain;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Info = styled.div`
  flex: 1 1 auto;
  margin-left: 100px;

  ${responsive.smAndLess} {
    margin-left: 0;
    margin-top: 50px;
  }
`;

export const Description = styled.div`
  max-width: 400px;
  color: ${colors.darkText};
  margin-bottom: 15px;
`;

export const ProductFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #dfdfdf;
  padding: 15px 0;
  justify-content: space-between;
  align-items: center;

  ${responsive.xs} {
    button {
      flex-grow: 1;
      margin: 1rem 0;
    }
  }
`;

export const Price = styled.div`
  text-align: center;
  color: ${colors.darkText};
  font-size: 50px;
  margin-right: 20px;

  strong {
    display: inline-block;
    margin-left: 5px;
  }

  ${responsive.xs} {
    flex-grow: 1;
  }
`;
