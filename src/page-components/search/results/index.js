import ItemMicroformat from 'components/item-microformat';

import { Outer } from './styles';
import Pagination from './pagination';

export default function SearchResults({ edges = [], navigate, pageInfo }) {
  return (
    <Outer>
      <ul>
        {edges.map(({ cursor, node }) => (
          <li key={cursor}>
            <ItemMicroformat item={node} />
          </li>
        ))}
      </ul>
      <Pagination navigate={navigate} pageInfo={pageInfo} />
    </Outer>
  );
}
