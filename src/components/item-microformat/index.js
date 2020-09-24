import DocumentItem from './document-item';
import ProductItem from './product-item';
import FolderItem from './folder-item';

export default function ItemMicroformat({ item }) {
  if (!item) {
    return null;
  }

  const types = {
    product: <ProductItem data={item} key={item.path} />,
    folder: <FolderItem data={item} key={item.path} />,
    document: <DocumentItem data={item} key={item.path} />
  };

  return types[item.type] || null;
}
