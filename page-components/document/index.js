import React from 'react';

import { Outer } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

const DocumentPage = ({ data }) => {
  const [document] = data.tree;

  return (
    <Layout title={document.name}>
      <Outer>
        <ShapeComponents components={document.components} />
      </Outer>
    </Layout>
  );
};

export default DocumentPage;
