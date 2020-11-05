import React from 'react';
import ContentTransformer from 'ui/content-transformer';

import { H1, Header, Outer } from 'ui';
import Layout from 'components/layout';
import { simplyFetchFromGraph } from 'lib/graph';
import ShapeComponents from 'components/shape/components';
import ItemMicroformat from 'components/item-microformat';
import { useT } from 'lib/i18n';

import query from './query';
import { HeroImage, Img, List, H2, Related } from './styles';

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

export default function DocumentPage({ document, preview }) {
  const t = useT();
  const title = document?.components?.find((c) => c.name === 'Title')?.content
    ?.text;
  const description = document?.components?.find((c) => c.name === 'Intro');
  const images = document?.components?.find((c) => c.name === 'Image');
  const relatedProducts = document?.components?.find(
    (c) => c.name === 'Products'
  );

  const componentsRest = document?.components?.filter(
    (c) => !['Intro', 'Title', 'Image', 'Products'].includes(c.name)
  );

  return (
    <Layout title={title || document.name} preview={preview}>
      <Outer>
        <Header centerContent>
          <H1>{title}</H1>
          <ContentTransformer {...description?.content?.json} />
        </Header>
        <HeroImage>
          {images?.content?.images?.map((img, i) => (
            <Img
              key={img.url}
              {...img}
              alt={img.altText}
              sizes={i > 0 ? '40vw' : '80vw'}
            />
          ))}
        </HeroImage>
        <ShapeComponents components={componentsRest} />
      </Outer>
      {relatedProducts?.content?.items?.length && (
        <Related>
          <H2>
            {t('product.relatedProduct', {
              count: relatedProducts.content.items.length
            })}
          </H2>
          <List>
            {relatedProducts.content.items.map((item, i) => (
              <ItemMicroformat key={i} item={item} />
            ))}
          </List>
        </Related>
      )}
    </Layout>
  );
}
