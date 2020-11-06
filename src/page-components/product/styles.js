import styled from 'styled-components';

import { responsive, H1 } from 'ui';

export const Outer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

export const ShapeContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Loader = styled.div`
  text-align: center;
  margin: 50px;
  font-size: 2rem;
`;

export const Sections = styled.div`
  display: flex;
  align-items: center;
  background: var(--color-box-background);
  padding: 50px;
  flex-direction: row-reverse;
  justify-content: center;

  ${responsive.smAndLess} {
    padding: 20px 0px;
    margin: 0 10px;
    display: block;
  }
`;

export const Content = styled.div`
  display: flex;
  margin-top: 15px;
  ${responsive.xs} {
    margin: 10px 10px 0;
    display: block;
  }
`;
export const Specs = styled.div`
  flex: 0 0 500px;
  border-left: 15px solid var(--color-main-background);
  background: var(--color-box-background);
  ${responsive.xs} {
    border-left: 0;
    display: block;
    margin-top: 15px;
    padding: 20px 0;
  }
`;

export const Description = styled.div`
  color: var(--color-text-sub);
  flex: 0 1 100%;
  background: var(--color-box-background);
  padding: 5rem 0;
  h2:empty {
    display: none;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const Media = styled.div`
  flex: 0 0 65%;
  position: relative;
  padding: 3rem;
  ${responsive.mdAndLess} {
    display: block;
    padding: 0;
    margin-bottom: 2em;
  }
`;

export const MediaInner = styled.div`
  ${responsive.mdAndLess} {
    margin: 2em;
  }

  img {
    object-fit: contain;
    max-height: 80vh;
    width: 100%;
    height: 100%;

    ${responsive.mdAndLess} {
      max-height: 40vh;
    }
  }
`;

export const Info = styled.div`
  flex: 1 1 auto;
  margin: 0 50px 0 50px;

  ${responsive.smAndLess} {
    margin: 2em;
  }
`;
export const Name = styled(H1)`
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
`;

export const Summary = styled.div`
  color: var(--color-text-sub);
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 15px;
`;

export const ProductFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 45px 0 0;
  justify-content: space-between;
  border-top: 1px solid #cecece;
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
  color: var(--color-text-sub);
  font-size: 30px;
  margin: 20px;
  margin-left: 0;

  strong {
    display: inline-block;
    margin-left: 5px;
  }

  ${responsive.xs} {
    flex-grow: 1;
  }
`;
