import React from 'react';

import FolderShape, {
  getData as getFolderData,
  getFolderTitle
} from 'shapes/folder/page';
import Layout from 'components/layout';
import toText from '@crystallize/content-transformer/toText';
import { FolderNotFound } from 'shapes/folder/page/components/folder-not-found';

export const getData = getFolderData;

export default function FolderPage({ folder, preview, hidePageHeader }) {
  if (!folder) {
    return <FolderNotFound />;
  }

  const { components } = folder;
  const title = getFolderTitle(folder);
  const description = components?.find((c) => c.name === 'Brief')?.content
    ?.json;
  const icon = components?.find((c) => c.name === 'Icon');

  return (
    <Layout
      title={title}
      description={toText(description)}
      image={icon?.content?.images?.[0]?.url}
      preview={preview}
    >
      <FolderShape folder={folder} hideHeader={hidePageHeader} />
    </Layout>
  );
}
