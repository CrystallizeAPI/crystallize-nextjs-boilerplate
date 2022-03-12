import React from 'react';
import { Pintrest, LinkedIn, Facebook, Twitter } from './icons';
import { Outer, Btn } from './styles';

export default function SocialBar() {
  return (
    <Outer>
      <Btn>
        <Twitter />
      </Btn>
      <Btn>
        <Facebook />
      </Btn>
      <Btn>
        <Pintrest />
      </Btn>
      <Btn>
        <LinkedIn />
      </Btn>
    </Outer>
  );
}
