import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    /* Typography */
    --font-family-main: "Trebuchet MS", sans-serif;

    --font-size-xxl: 40px;
    --font-size-xl: 32px;
    --font-size-l: 26px;
    --font-size-m: 20px;
    --font-size-s: 16px;
    --font-size-xs: 14px;

    --font-size-body: var(--font-size-m);
    --font-size-secondary: var(--font-size-s);
    --font-size-tags:var(--font-size-xs);

    --font-listing-name-size: var(--font-size-s);
    --font-listing-price-size: var(--font-size-s);
    --font-max-width: 800px;

    /* Colors */
    --color-main-background: #fff;
    --color-text-main: #080708;
    --color-text-sub: #4c505b;

    --color-box-background: #efefef;
    --color-price: var(--color-text-main);
    --color-error: #EF4836;
    --color-discount:#EE6969;
    --color-blockquote: var(--color-text-main);
  
    --color-primary-action: #FBDCCE;
    --color-primary-action-content:#080708;
    --color-icon-details: var(--color-primary-action);
    --color-ui-details: var(--color-primary-action);

      
    /* Properties */
    --content-padding: 50px;
    --content-max-width:1800px;
    --content-padding-xs:0 0 0 25px;

    /* Product listformat */
    --listformat-product-height-xl:500px;
    --listformat-product-height-lg:580px;
    --listformat-product-height-md:500px;
    --listformat-product-height-sm:600px;
    --listformat-product-height-xs:400px;
    --listformat-product-image-fit: cover;
    --listformat-product-image-position: center;
    --listformat-product-background: #efefef;

    /* Document listformat */
    --listformat-document-height-xl:750px;
    --listformat-document-height-lg:750px;
    --listformat-document-height-md:750px;
    --listformat-document-height-sm:750px;
    --listformat-document-height-xs:450px;
    --listformat-document-image-fit: cover;
    --listformat-document-background: var(--color-primary-action);

    /* Microformats */
    --microformat-image-fit:cover;
    --microformat-image-position:left;


    /* How images should behave in their parent container (cover, fill, contain) */
    --image-object-fit:cover;
    
    /* Grid properties */
    --grid-row-height: 500px;
  }

  /* Uncomment this to enable dark mode */
  /* @media (prefers-color-scheme: dark) {
    :root {
      --color-main-background: #020210;
      --color-text-main: #fff;
      --color-text-sub: #ddd;
      --color-box-background: #555;
    }
  } */
  /* path#detail {
    fill: var(--color-icon-detail);
  } */
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    font: 14px/1 Helvetica, Arial, Verdana, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background: var(--color-main-background);
    color: var(--color-text-sub);
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
  ol,
  ul {
    margin: 0 0 2em;
    padding: 0;
  }
  figure {
    margin: 0;

    figcaption {
      margin-top: 1em;
    }
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
  ::-webkit-input-placeholder { /* Edge */
    color: var(--color-text-sub);
  }
  ::placeholder {
    color: var(--color-text-sub);
  }
  img {
    max-width: 100%;
    height: auto;
    border: 0;
  }

  .crystallize-layout__menu {
    display: flex;
  }
`;
