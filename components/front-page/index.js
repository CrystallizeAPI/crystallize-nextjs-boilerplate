import Layout from '../layout';
import { H1, Outer } from './styles';

export default ({ router }) => (
  <Layout router={router}>
    <Outer>
      <H1>Welcome to your Crystallize shop!</H1>
    </Outer>
  </Layout>
);
