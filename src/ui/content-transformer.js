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
  }
};

const ContentTransformerOuter = styled.div`
  font-size: var(--font-size-body);
  color: var(--color-text-main);
  line-height: 1.8em;
  /* letter-spacing: 0.5px; */
  p,
  h2 {
    margin: 0 auto;
    padding-top: 0;
    text-align: left;
    &:empty {
      display: none;
    }
  }
  p,
  li {
    &:empty {
      display: none;
    }
  }
  ul {
    margin: 1rem 0;
    padding-left: 1.2rem;
    li {
      margin-bottom: 0.5rem;
    }
  }

  p {
    margin: 2em 0 0;
    &:first-child {
      margin-top: 0;
    }
  }

  pre {
    margin-left: calc(-0.5 * var(--content-padding));
    width: calc(100% + var(--content-padding));
    box-shadow: rgba(0, 0, 0, 0.05) 2px 1px 1px;
    line-height: 1.6;
    padding: 25px 50px;
    background: rgb(243, 244, 246);
    border-radius: 5px;
    overflow: auto;
  }
  blockquote {
    padding-left: 2em;
    font-size: var(--font-size-md);
    font-style: italic;
    position: relative;
    display: flex;
    line-height: 140%;
    max-width: 800px;
    align-items: center;
    margin: 3em 0;
    color: var(--color-blockquote);
    &:empty {
      display: none;
    }
    &:after {
      left: 0;
      top: 20px;
      /* transform: translateY(-50%); */
      font-size: 3em;
      position: absolute;
      content: open-quote;
    }
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
