import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import { H1 } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

import query from './query';
import { Document } from './styles';

export async function getData({ asPath, language }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: { path: asPath, language }
  });
  return data;
}

export default function DocumentPage({ document }) {
  return (
    <Layout title={document.name}>
      <Document>
        <ShapeComponents
          components={document.components}
          overrides={{
            Title: H1
          }}
        />
      </Document>
    </Layout>
  );
}
