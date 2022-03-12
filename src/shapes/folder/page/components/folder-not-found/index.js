import Layout from 'components/layout';
import PageHeader from 'components/page-header';
import { Outer } from '../../styles';

export function FolderNotFound() {
  return (
    <Layout title="Homepage">
      <Outer>
        <PageHeader title="Welcome 🥳" />

        <div style={{ fontSize: 'var(--font-size-s)' }}>
          <p>
            To show a Crystallize catalogue item here, you can do the following:
          </p>
          <ol>
            <li>Create an item with the path of &quot;/frontpage-2021&quot;</li>
            <li>Pull in a different item by changing /pages/index.js</li>
            <li>Create something completely custom 🎉 </li>
          </ol>
        </div>
      </Outer>
    </Layout>
  );
}
