import { Outer, Nav } from './styles';

export default ({ shopName }) => (
  <Outer>
    {shopName}
    <Nav>
      <a href="/">Home page</a>
      <a href="/user">User profile</a>
    </Nav>
  </Outer>
);
