import styled from 'styled-components';

import VideoPlayer from 'components/video-player';

const Outer = styled.div`
  margin: 0 0 2em;
`;

const List = styled.div``;

export default function Videos({ videos }) {
  if (!videos || videos.length === 0) {
    return null;
  }

  if (videos.length === 1) {
    return (
      <Outer>
        <VideoPlayer {...videos[0]} />
      </Outer>
    );
  }

  return (
    <Outer>
      <List>
        {videos.map((video, index) => (
          <div key={index} style={{ margin: '0 0 2em' }}>
            <VideoPlayer {...video} />
          </div>
        ))}
      </List>
    </Outer>
  );
}
