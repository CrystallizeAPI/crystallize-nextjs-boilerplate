import Layout from 'components/layout';
import { H1 } from 'components/style';
import { Outer } from './styles';

export default ({ router, frontpageHeading }) => (
  <Layout router={router} title="Front page">
    <Outer>
      <H1>{frontpageHeading}</H1>
    </Outer>
  </Layout>
);
