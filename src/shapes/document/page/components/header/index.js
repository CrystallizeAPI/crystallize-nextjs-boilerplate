import { getDocumentTitle, getHumanReadableDate } from '../../../utils';
import Social from 'components/social';
import TopicTag from 'components/topic-tag';

import { Byline, Header, HeaderInner } from './styles';
import PageHeader from 'components/page-header';

export function DocumentHeader({ document }) {
  const description = document?.components?.find((c) => c.name === 'Intro');
  const publicatedAt = new Date(document?.publishedAt);
  const ISODate = publicatedAt.toISOString();
  const humanReadableDate = getHumanReadableDate(publicatedAt);
  const topics = document?.topics
    ? document?.topics?.map((topic) => (
        <TopicTag underline {...topic} key={topic.id} />
      ))
    : null;

  return (
    <Header>
      <HeaderInner>
        <Byline>
          {topics}
          <time dateTime={ISODate}>{humanReadableDate}</time>
        </Byline>
        <PageHeader
          title={getDocumentTitle(document)}
          description={description?.content?.json}
        />
      </HeaderInner>
      <Social />
    </Header>
  );
}
