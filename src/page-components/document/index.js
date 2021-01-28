import React from 'react';
import Layout from 'components/layout';
import Social from 'components/social';
import { simplyFetchFromGraph } from 'lib/graph';
import ShapeComponents from 'components/shape/components';
import ContentTransformer from 'ui/content-transformer';
import Microformat from 'components/microformat';
import toText from '@crystallize/content-transformer/toText';
import query from './query';
import TopicTag from 'components/topic-tag';
import { useRouter } from 'next/router';
import {
  Img,
  List,
  H2,
  Outer,
  PageContentLayout,
  Title,
  Byline,
  Hero,
  HeroContent,
  HeroImage,
  Article,
  Sidebar,
  SidebarBlock
} from './styles';

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
  const router = useRouter();
  const title = document?.components?.find((c) => c.name === 'Title')?.content
    ?.text;
  const description = document?.components?.find((c) => c.name === 'Intro');
  const images = document?.components?.find((c) => c.name === 'Image');
  const featured = document?.components?.find((c) => c.name === 'Featured');
  const body = document?.components?.find((c) => c.name === 'Body');
  const published = new Date(document?.publishedAt);
  const topics = document?.topics;

  // Find all topic maps, as a parent, then filter on "document" type
  // Comment in the first filter line with your topic name to filter on a specific topic
  // Comment in the "document" if to only show articles
  const relatedArticles = topics
    // ?.filter((topic) => topic?.parent?.name === '[YOUR-TOPIC-MAP-NAME]')
    ?.map((topic) => topic?.items?.edges)
    ?.flat()
    ?.filter(
      (node) =>
        // node?.node?.type === 'document' &&
        node?.node?.path !== router?.asPath
    );

  // We don't want to show duplicated elements to the user
  let relatedArtclesIds, uniquesIdsRelatedArticles, uniqueRelatedArticles;
  // We store into an array all the ids of the related articles items
  if (relatedArticles) {
    relatedArtclesIds = relatedArticles.map((a) => a.node.id) || [];
    // Then, we create an array with non-repeated ids.
    // This can be done easily with `Array.from(new Set(yourArray))` or `[...new Set(yourArray)]`
    //
    // Set objects has unique values. By Creating a set object and generating an array from this Set created,
    // we assure that there are no repeated elements
    //
    // FYI: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    uniquesIdsRelatedArticles = Array.from(new Set(relatedArtclesIds));
    // For each unique id of a related content, to get the full item.
    uniqueRelatedArticles = uniquesIdsRelatedArticles.map((id) =>
      relatedArticles.find((a) => a.node.id === id)
    );
  }

  const heading = title || document.name;
  const ISODate = published.toISOString();
  const humanReadableDate = published.toDateString();
  const topicTags = topics
    ? topics?.map((topic) => <TopicTag underline {...topic} key={topic.id} />)
    : null;

  const featuredContent = featured?.content?.items?.length && (
    <SidebarBlock>
      <H2>Featured</H2>
      <List>
        {featured.content.items.map((item, i) => (
          <Microformat key={i} item={item} />
        ))}
      </List>
    </SidebarBlock>
  );

  const relatedContent = Boolean(uniqueRelatedArticles?.length) && (
    <SidebarBlock>
      <H2>Related</H2>
      <List>
        {uniqueRelatedArticles.map((item, i) => (
          <Microformat key={i} item={item?.node} />
        ))}
      </List>
    </SidebarBlock>
  );
  const hasContentToShowOnside = featuredContent || relatedContent;

  return (
    <Layout
      title={heading}
      description={toText(description?.content?.json)}
      image={images?.content?.images?.[0]?.url}
      preview={preview}
    >
      <Outer>
        <Hero>
          <HeroContent>
            <Byline>
              {topicTags}
              <time dateTime={ISODate}>{humanReadableDate}</time>
            </Byline>
            <Title>{heading}</Title>
            <ContentTransformer {...description?.content?.json} />
          </HeroContent>
          <Social />
        </Hero>
        <PageContentLayout>
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
          {hasContentToShowOnside && (
            <Sidebar>
              {featuredContent}
              {relatedContent}
            </Sidebar>
          )}
        </PageContentLayout>
      </Outer>
    </Layout>
  );
}
