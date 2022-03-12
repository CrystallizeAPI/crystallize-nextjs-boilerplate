import Listformat from 'components/listformat';

import { TopicMap, List } from './styles';

export default function Topics({ topicMaps }) {
  if (!topicMaps?.length) {
    return null;
  }

  return topicMaps?.map((topic) => (
    <TopicMap key={topic.name}>
      <List>
        {topic?.items?.edges.map(({ node }, i) => (
          <Listformat item={node} key={i} />
        ))}
      </List>
    </TopicMap>
  ));
}
