import styled from 'styled-components';

import { responsive } from 'ui';

import DocumentItem from 'components/items/document-item';
import FolderItem from 'components/items/folder-item';
import ProductItem from 'components/items/product-item';

const Outer = styled.ul`
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: 20px;

  ${responsive.sm} {
    grid-template-columns: 1fr 1fr;
  }

  ${responsive.mdPlus} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ListItem = styled.li``;

function Item({ type, ...rest }) {
  switch (type) {
    case 'product':
      return <ProductItem data={rest} />;
    case 'folder':
      return <FolderItem data={rest} />;
    default:
      return <DocumentItem data={rest} />;
  }
}

export default function ItemRelations({ items }) {
  if (!items) {
    return null;
  }

  return (
    <Outer>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Item {...item} />
        </ListItem>
      ))}
    </Outer>
  );
}
