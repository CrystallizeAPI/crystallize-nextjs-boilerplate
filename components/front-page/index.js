import Layout from 'fragments/layout';
import { H1 } from 'fragments/style';
import { Outer } from './styles';

export default ({ router, frontpageHeading }) => (
  <Layout router={router}>
    <Outer>
      <H1>{frontpageHeading}</H1>
    </Outer>
  </Layout>
);
