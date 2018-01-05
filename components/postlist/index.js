import { Outer, Item } from './styles';

const PostList = ({
  loading,
  error,
  allPosts,
  _allPostsMeta,
  loadMorePosts
}) => {
  // Show error
  if (error) return <Outer>Error loading posts</Outer>;

  // Show the fetched posts
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count;
    return (
      <Outer>
        <div>Loading: {loading.toString()}</div>
        <ul>
          {allPosts.map((post, index) => (
            <Item key={post.id}>
              <div>
                <span>{index + 1}. </span>
                <a href={post.url}>{post.title}</a>
              </div>
            </Item>
          ))}
        </ul>
        {areMorePosts && <button onClick={loadMorePosts}>Show More</button>}
      </Outer>
    );
  }

  // Show intitial loading indicator
  return <Outer>Loading</Outer>;
};

export default PostList;
