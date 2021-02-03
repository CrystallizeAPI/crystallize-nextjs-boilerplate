import React from 'react';

import { simplyFetchFromGraph } from 'lib/graph';
import Layout from 'components/layout';
import Grid, { GridItem } from 'components/grid';
import Listformat from 'components/listformat';
import toText from '@crystallize/content-transformer/toText';
import { Outer, List, SubNavigation, Item } from './styles';
import Stackable from 'components/stackable';
import PageHeader from 'components/page-header';
import ShapeComponents from 'components/shape/components';

import query from './query';
export async function getData({ asPath, language, preview = null }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: {
      path: asPath,
      language,
      version: preview ? 'draft' : 'published'
    }
  });

  return { ...data, preview };
}

export default function FolderPage({ folder, preview, hidePageHeader }) {
  if (!folder) {
    return (
      <Layout title="Homepage">
        <Outer>
          <PageHeader title="Welcome 🥳" />

          <div style={{ fontSize: 'var(--font-size-sm)' }}>
            <p>
              To show a Crystallize catalogue item here, you can do the
              following:
            </p>
            <ol>
              <li>
                Create an item with the path of &quot;/frontpage-2021&quot;
              </li>
              <li>Pull in a different item by changing /pages/index.js</li>
              <li>Create something completely custom 🎉 </li>
            </ol>
          </div>
        </Outer>
      </Layout>
    );
  }

  const { children, components } = folder;

  const gridRelations = components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], []);

  const description = components?.find((c) => c.name === 'Brief')?.content
    ?.json;

  const icon = components?.find((c) => c.name === 'Icon');
  const title = components?.find((c) => c.name === 'Title')?.content?.text;
  const stacks = components?.find((c) => c.name === 'Stackable content')
    ?.content?.items;
  const body = folder.components?.filter((c) => c.name === 'Body');

  const subChildrenNavigation = children?.filter(isFolderType);

  return (
    <Layout
      title={title || folder.name}
      description={toText(description)}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        {!hidePageHeader && (
          <>
            <PageHeader
              {...{ title: title || folder.name, description, image: icon }}
            />

            {Boolean(subChildrenNavigation?.length) && (
              <SubNavigation>
                {subChildrenNavigation?.map((item, i) => (
                  <Listformat item={item} key={i} />
                ))}
              </SubNavigation>
            )}
          </>
        )}

        {body?.length > 0 && <ShapeComponents components={body} />}

        {gridRelations?.length > 0 &&
          gridRelations?.map((grid, index) => (
            <Grid
              key={index}
              model={grid}
              cellComponent={({ cell }) => (
                <GridItem data={cell.item} gridCell={cell} />
              )}
            />
          ))}

        <Stackable stacks={stacks} />
        <List>
          {children
            ?.filter((c) => !isFolderType(c))
            ?.map((item, i) => (
              <Item className={`item-${item?.type}`} key={i}>
                <Listformat item={item} />
              </Item>
            ))}
        </List>
      </Outer>
    </Layout>
  );
}

function isFolderType({ type }) {
  return type === 'folder';
}
