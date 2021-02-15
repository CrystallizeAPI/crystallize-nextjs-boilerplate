import React from 'react';
import { Outer, SocialButton } from './styles';
import { IconTwitter } from 'components/icons/twitter';
import { IconFacebook } from 'components/icons/twitter';
import { IconPinterest } from 'components/icons/twitter';
import { IconLinkedIn } from 'components/icons/twitter';

export default function SocialBar() {
  return (
    <Outer>
      <SocialButton>
        <IconTwitter />
      </SocialButton>
      <SocialButton>
        <IconFacebook />
      </SocialButton>
      <SocialButton>
        <IconPinterest />
      </SocialButton>
      <SocialButton>
        <IconLinkedIn />
      </SocialButton>
    </Outer>
  );
}
