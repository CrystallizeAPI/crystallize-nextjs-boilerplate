import Link from 'next/link';

import { Outer, Nav } from './styles';

export default ({ shopName }) => (
  <Outer>
    <span className="header__shop-name">{shopName}</span>
    <Nav>
      <Link href="/" prefetch>
        <a>Home page</a>
      </Link>
      <Link href="/user" prefetch>
        <a>User profile</a>
      </Link>
    </Nav>
  </Outer>
);
