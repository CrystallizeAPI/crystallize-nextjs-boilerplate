import React from 'react';
import ShapeComponents from 'components/shape/components';
import Microformat from 'components/microformat';
import { DocumentHeader } from './components/header';
import { DocumentRelatedContentSection } from './components/related-content';
import { getData } from '../get-data';
import { getDocumentTitle, getArticlesWithoutRepeatedElements } from '../utils';
import {
  Img,
  Outer,
  DocumentContent,
  HeroImage,
  Article,
  Sidebar
} from './styles';

export { getDocumentTitle, getData };

export default function Document({ document, asPath }) {
  const images = document?.components?.find((c) => c.name === 'Image');
  const featured = document?.components?.find((c) => c.name === 'Featured');
  const body = document?.components?.find((c) => c.name === 'Body');
  const topics = document?.topics;

  // Find all topic maps, as a parent, then filter on "document" type
  // Comment in the first filter line with your topic name to filter on a specific topic
  // Comment in the "document" if to only show articles
  const relatedArticles = topics
    // ?.filter((topic) => topic?.parent?.name === '[YOUR-TOPIC-MAP-NAME]')
    ?.map((topic) => topic?.items?.edges)
    ?.flat()
    ?.filter((node) => node?.node?.path !== asPath);

  const relatedArticlesWithoutRepeatedElements = getArticlesWithoutRepeatedElements(
    relatedArticles
  );

  const featuredItems = featured?.content?.items;
  const hasFeaturedItems = Boolean(featuredItems?.length);
  const hasRelatedArticles = Boolean(
    relatedArticlesWithoutRepeatedElements?.length
  );
  const hasContentToShowOnTheSide = hasFeaturedItems || hasRelatedArticles;

  return (
    <Outer>
      <DocumentHeader document={document} />
      <DocumentContent>
        <Article>
          <HeroImage>
            {images?.content?.images?.map((img, i) => (
              <Img
                {...img}
                key={img.url}
                alt={img.altText}
                sizes={i > 0 ? '40vw' : '80vw'}
              />
            ))}
          </HeroImage>
          <ShapeComponents components={[body]} />
        </Article>

        {hasContentToShowOnTheSide && (
          <Sidebar>
            {hasFeaturedItems && (
              <DocumentRelatedContentSection title="Featured">
                {featuredItems.map((item, i) => (
                  <Microformat key={i} item={item} />
                ))}
              </DocumentRelatedContentSection>
            )}
            {hasRelatedArticles && (
              <DocumentRelatedContentSection title="Related">
                {relatedArticlesWithoutRepeatedElements.map((item, i) => (
                  <Microformat key={i} item={item?.node} />
                ))}
              </DocumentRelatedContentSection>
            )}
          </Sidebar>
        )}
      </DocumentContent>
    </Outer>
  );
}
