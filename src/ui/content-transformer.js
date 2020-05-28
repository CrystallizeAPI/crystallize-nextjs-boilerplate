import React from 'react';
import styled from 'styled-components';
import CrystallizeContentTransformer from '@crystallize/content-transformer/react';

const commonTransfomerOverrides = {
  // Example of a link override
  link({ metadata, renderNode, ...rest }) {
    const { href } = metadata;

    return (
      <a className="fancy-link" href={href}>
        {renderNode(rest)}
      </a>
    );
  },
};

const maxWidth = '600px';

const ContentTransformerOuter = styled.div`
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

  p {
    margin: 0 0 0.5em;
    line-height: 1.8;
  }

  ul {
    max-width: ${maxWidth};
    margin: 0 auto;
    display: block;
    list-style: none;
    margin: 1em 0 1em 30px;

    > li {
      position: relative;
      display: block;

      &:not(:last-child) {
        margin-bottom: 1em;
      }

      &::before {
        position: absolute;
        width: 8px;
        top: 50%;
        margin-top: -5px;
        left: -30px;
        height: 8px;
        content: '';
        border-radius: 50%;
        background: rgb(143, 222, 203);
      }
    }
  }

  pre {
    margin-left: calc(-0.5 * var(--content-padding));
    width: calc(100% + var(--content-padding));
    font-size: 16px;
    box-shadow: rgba(0, 0, 0, 0.05) 2px 1px 1px;
    line-height: 1.6;
    padding: 25px 50px;
    background: rgb(243, 244, 246);
    border-radius: 5px;
    overflow: auto;
  }
`;

export default function ContentTransformer(props) {
  return (
    <ContentTransformerOuter>
      <CrystallizeContentTransformer
        {...props}
        overrides={commonTransfomerOverrides}
      />
    </ContentTransformerOuter>
  );
}
