import DocumentShapeMicroformat from './document-item';
import ProductShapeMicroformat from 'shapes/product/microformat';
import FolderItem from './folder-item';

export default function Microformat({ item }) {
  if (!item) {
    return null;
  }

  const commonProps = { key: item.path };
  const types = {
    product: <ProductShapeMicroformat {...commonProps} data={item} />,
    folder: <FolderItem {...commonProps} data={item} />,
    document: <DocumentShapeMicroformat {...commonProps} data={item} />
  };

  return types[item.type] || null;
}
