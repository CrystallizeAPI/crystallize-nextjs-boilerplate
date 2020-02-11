import React from 'react';
import Error from 'pages/_error';
import { useRouter } from 'next/router';

import { useSettings } from 'components/settings-context';
import { useSafePathQuery } from 'lib/graph';
import { Outer, H1 } from 'ui';
import Layout from 'components/layout';
import ShapeComponents from 'components/shape/components';

import folderPageQuery from './query';
import { Document } from './styles';

const DocumentPage = () => {
  const { language } = useSettings();
  const router = useRouter();

  const [queryResult] = useSafePathQuery({
    query: folderPageQuery,
    variables: {
      language,
      path: router.asPath
    }
  });

  const { fetching, error, data } = queryResult;

  if (fetching) {
    return <Layout loading />;
  }

  if (error) {
    return <Layout error />;
  }

  const [document] = data.tree;
  if (!document) {
    return <Error statusCode="404" />;
  }

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
