import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  padding-top: ${(9 / 16) * 100}%;
  position: relative;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function WidescreenRatio({ children, ...rest }) {
  return (
    <Outer {...rest}>
      <Inner>{children}</Inner>
    </Outer>
  );
}
