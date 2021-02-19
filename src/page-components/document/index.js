import React from 'react';
import { useRouter } from 'next/router';
import DocumentShape, {
  getData as getDocumentData,
  getDocumentTitle
} from 'shapes/document/page';
import Layout from 'components/layout';
import toText from '@crystallize/content-transformer/toText';

export const getData = getDocumentData;

export default function DocumentPage({ document, preview }) {
  const router = useRouter();
  const asPath = router?.asPath;

  const title = getDocumentTitle(document);
  const description = document?.components?.find((c) => c.name === 'Intro');
  const images = document?.components?.find((c) => c.name === 'Image');

  return (
    <Layout
      title={title}
      description={toText(description?.content?.json)}
      image={images?.content?.images?.[0]?.url}
      preview={preview}
    >
      <DocumentShape document={document} asPath={asPath} />
    </Layout>
  );
}
