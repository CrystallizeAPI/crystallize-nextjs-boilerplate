import React from 'react';

import Grid, { GridItem } from 'components/grid';
import Listformat from 'components/listformat';
import { Outer, List, SubNavigation, Item } from './styles';
import Stackable from 'components/stackable';
import PageHeader from 'components/page-header';
import ShapeComponents from 'components/shape/components';
import { FolderNotFound } from './components/folder-not-found';
import { getData } from '../get-data';
import { getFolderTitle } from '../utils';

export { getData, getFolderTitle };

export default function FolderPage({ folder, hideHeader }) {
  if (!folder) {
    return <FolderNotFound />;
  }

  const { children, components } = folder;

  const gridRelations = components
    ?.filter((c) => c.type === 'gridRelations')
    ?.reduce((acc, g) => [...acc, ...(g?.content?.grids || [])], []);

  const description = components?.find((c) => c.name === 'Brief')?.content
    ?.json;

  const stacks = components?.find((c) => c.name === 'Stackable content')
    ?.content?.items;
  const body = folder.components?.filter((c) => c.name === 'Body');
  const subFolders = children?.filter(isFolderType);
  const hasSubfolders = Boolean(subFolders?.length);
  const hasGridRelation = gridRelations?.length > 0;

  return (
    <Outer>
      {!hideHeader && (
        <>
          <PageHeader
            title={getFolderTitle(folder)}
            description={description}
          />

          {hasSubfolders && (
            <SubNavigation>
              {subFolders.map((item, i) => (
                <Listformat item={item} key={i} />
              ))}
            </SubNavigation>
          )}
        </>
      )}

      {body?.length > 0 && <ShapeComponents components={body} />}

      {hasGridRelation &&
        gridRelations.map((grid, index) => (
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
  );
}

function isFolderType({ type }) {
  return type === 'folder';
}
