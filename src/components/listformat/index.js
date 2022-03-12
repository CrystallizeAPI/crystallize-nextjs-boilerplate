import DocumentShapeItem from 'shapes/document/item';
import ProductShapeItem from 'shapes/product/item';
import FolderShapeItem from 'shapes/folder/item';

export default function ItemListformat({ item }) {
  if (!item) {
    return null;
  }

  const commonProps = {
    key: item.path
  };

  const types = {
    product: <ProductShapeItem data={item} {...commonProps} />,
    folder: <FolderShapeItem data={item} {...commonProps} />,
    document: <DocumentShapeItem data={item} {...commonProps} />
  };

  return types[item.type] || null;
}
