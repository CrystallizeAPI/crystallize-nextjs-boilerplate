import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  padding-top: ${(p) => `${p.ratio * 100}%`};
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

export default function RatioContainer({ ratio = 9 / 16, children, ...rest }) {
  return (
    <Outer ratio={ratio} {...rest}>
      <Inner>{children}</Inner>
    </Outer>
  );
}
