import styled from 'styled-components';

const maxWidth = '600px';

export const Body = styled.div`
  p,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 auto;
    text-align: left;
    max-width: ${maxWidth};
  }
  h3 {
    font-size: 2rem;
  }
  p,
  li {
    font-size: 1.1rem;
    line-height: 1.6rem;
  }
  ul {
    max-width: ${maxWidth};
    margin: 0 auto;
    padding-left: 1.2em;
  }
`;
