import ItemMicroformat from 'components/item-microformat';

import { TopicMap, List } from './styles';

export default function Topics({ topicMaps }) {
  if (!topicMaps?.length) {
    return null;
  }

  return topicMaps?.map((topic) => (
    <TopicMap key={topic.name}>
      <List>
        {topic.items.edges.map(({ node }, i) => (
          <ItemMicroformat item={node} key={i} />
        ))}
      </List>
    </TopicMap>
  ));
}
