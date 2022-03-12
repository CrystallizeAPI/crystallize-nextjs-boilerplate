import DocumentShapeMicroformat from 'shapes/document/microformat';
import ProductShapeMicroformat from 'shapes/product/microformat';
import FolderShapeMicroformat from 'shapes/folder/microformat';

export default function Microformat({ item }) {
  if (!item) {
    return null;
  }

  const commonProps = { key: item.path };
  const types = {
    product: <ProductShapeMicroformat {...commonProps} data={item} />,
    folder: <FolderShapeMicroformat {...commonProps} data={item} />,
    document: <DocumentShapeMicroformat {...commonProps} data={item} />
  };

  return types[item.type] || null;
}
