import { Outer, Nav } from './styles';

export default ({ shopName }) => (
  <Outer>
    {shopName}
    <Nav>
      <a href="/">Home page</a>
      <a href="/page2">Page 2</a>
    </Nav>
  </Outer>
);
