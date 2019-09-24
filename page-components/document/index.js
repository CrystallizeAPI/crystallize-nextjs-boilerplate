import React from 'react';

import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

const DocumentPage = ({ data }) => {
  const [document] = data.tree;

  return (
    <Layout title={document.name}>
      <Outer>
        <Header>
          <ShapeComponents
            components={document.components}
            overrides={{
              Title: H1
            }}
          />
        </Header>
      </Outer>
    </Layout>
  );
};

export default DocumentPage;
