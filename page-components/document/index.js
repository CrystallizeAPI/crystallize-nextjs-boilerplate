import React from 'react';

import { Outer, H1 } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

import { Document } from './styles';

const DocumentPage = ({ data }) => {
  const [document] = data.tree;

  return (
    <Layout title={document.name}>
      <Outer>
        <Document>
          <ShapeComponents
            components={document.components}
            overrides={{
              Title: H1
            }}
          />
        </Document>
      </Outer>
    </Layout>
  );
};

export default DocumentPage;
