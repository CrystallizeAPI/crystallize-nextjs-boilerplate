import React from 'react';
import Error from 'pages/_error';
import { useRouter } from 'next/router';

import { useSettings } from 'components/settings-context';
import { useSafePathQuery } from 'lib/graph';
import { Outer, Header, H1 } from 'ui';
import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import ShapeComponents from 'components/shape/components';

import { List } from './styles';
import folderPageQuery from './query';

export default function FolderPage() {
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

  const { folder } = data;
  if (!folder) {
    return <Error statusCode="404" />;
  }

  const { children } = folder;

  return (
    <Layout title={folder.name}>
      <Outer>
        <Header centerContent={!children}>
          <H1>{folder.name}</H1>
          <ShapeComponents components={folder.components} />
        </Header>
        {children && (
          <List>
            {children.map(item => (
              <CategoryItem data={item} key={item.id} />
            ))}
          </List>
        )}
      </Outer>
    </Layout>
  );
}
