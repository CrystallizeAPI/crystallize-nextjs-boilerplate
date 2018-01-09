import Layout from 'components/layout';
import { H1 } from 'components/style';
import { Outer } from './styles';

export default ({ router }) => (
  <Layout router={router}>
    <Outer>
      <H1>Welcome to your Crystallize shop!</H1>
    </Outer>
  </Layout>
);
