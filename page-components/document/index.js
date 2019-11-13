import React from 'react';
import styled from 'styled-components';

import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

const Document = styled(Header)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 50px;
`;

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
