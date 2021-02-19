import DocumentItem from './document-item';
import ProductShapeItem from 'shapes/product/product-item';
import FolderItem from './folder-item';

export default function ItemListformat({ item }) {
  if (!item) {
    return null;
  }
  const types = {
    product: <ProductShapeItem data={item} key={item.path} />,
    folder: <FolderItem data={item} key={item.path} />,
    document: <DocumentItem data={item} key={item.path} />
  };

  return types[item.type] || null;
}
