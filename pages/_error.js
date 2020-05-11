import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: arial, sans-serif;
  font-size: 1.5rem;

  p {
    margin-top: 15px;
  }

  a {
    color: #8fdecb;
  }
`;

export default function Error() {
  return (
    <Outer>
      <p>Huh? An error occurred</p>
      <p>
        Click{' '}
        <Link href="/">
          <a>here</a>
        </Link>{' '}
        to go to the homepage.
      </p>
    </Outer>
  );
}
