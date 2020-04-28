import styled from 'styled-components';

import VideoPlayer from 'components/video-player';

const Outer = styled.div`
  margin: 0 0 2em;
`;

const List = styled.div``;

const StyledVideoPlayer = styled(VideoPlayer)`
  width: 100%;
  height: 56%;
`;

export default function Videos({ videos }) {
  if (!videos || videos.length === 0) {
    return null;
  }

  if (videos.length === 1) {
    return (
      <Outer>
        <StyledVideoPlayer {...videos[0]} />
      </Outer>
    );
  }

  return (
    <Outer>
      <List>
        {videos.map((video, index) => (
          <StyledVideoPlayer key={index} {...video} />
        ))}
      </List>
    </Outer>
  );
}
