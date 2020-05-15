import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export default createGlobalStyle`
  :root {
    --content-padding: 50px;
  }
  
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    font: 16px/1 roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background: #fff;
    color: ${colors.darkText};
  }
  * {
    box-sizing: border-box;
  }

  

  h1,
  h2,
  h3,
  h4,
  p,
  blockquote,
  figure,
  ol,
  ul {
    margin: 0 0 2em;
    padding: 0;
  }
  main {
    display: block;
  }
  h1,
  h2,
  h3,
  h4 {
    font-size: inherit;
  }
  strong {
    font-weight: bold;
  }
  a,
  button {
    color: inherit;
  }
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  p > a {
    border-bottom: 2px solid black;
    font-weight: 600;

    &:hover {
      text-decoration: none;
      border-bottom-color: transparent;
    }
  }

  button {
    overflow: visible;
    border: 0;
    font: inherit;
    -webkit-font-smoothing: inherit;
    letter-spacing: inherit;
    background: none;
    cursor: pointer;
  }
  ::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  img {
    max-width: 100%;
    height: auto;
    border: 0;
  }
`;
