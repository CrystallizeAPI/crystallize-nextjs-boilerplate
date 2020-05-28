import React from 'react';
import ContentTransformer from 'ui/content-transformer';

import { H1, Header, Outer } from 'ui';
import Layout from 'components/layout';
import { simplyFetchFromGraph } from 'lib/graph';
import ShapeComponents from 'components/shape/components';
import items from 'components/items';

import query from './query';
import { HeroImage, Img, List, H2, Related } from './styles';

export async function getData({ asPath, language }) {
  const { data } = await simplyFetchFromGraph({
    query,
    variables: { path: asPath, language },
  });
  return data;
}

export default function DocumentPage({ document }) {
  const title = document?.components.find((c) => c.name === 'Title');
  const description = document?.components.find((c) => c.name === 'Intro');
  const images = document?.components.find((c) => c.name === 'Image');
  const relatedProducts = document?.components.find(
    (c) => c.name === 'Products'
  );

  const componentsRest = document?.components.filter(
    (c) => !['Intro', 'Title', 'Image', 'Products'].includes(c.name)
  );

  return (
    <Layout title={title.content.text || document.name}>
      <Outer>
        <Header centerContent>
          <H1>{title.content.text}</H1>
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
          <H2>Related products</H2>
          <List>
            {relatedProducts.content.items.map((item) => items(item))}
          </List>
        </Related>
      )}
    </Layout>
  );
}
