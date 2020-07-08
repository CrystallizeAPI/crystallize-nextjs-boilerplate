import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { Spinner } from 'ui/spinner';
import WidescreenRatio from 'ui/widescreen-ratio';
import { useIntersectionObserver } from 'lib/intersection-observer';
import { useT } from 'lib/i18n';

const Outer = styled.div`
  background: var(--color-box-background);
`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoPlayer = dynamic(() => import('./player'));

export default function Video({
  playlists,
  thumbnails,
  autoplay,
  loop,
  controls,
  fluid,
  ...rest
}) {
  const t = useT();
  const ref = useRef();
  const [load, setLoad] = useState(false);
  const isIntersecting = useIntersectionObserver({ ref });

  useEffect(() => {
    if (isIntersecting && !load) {
      setLoad(true);
    }
  }, [isIntersecting, load]);

  return (
    <WidescreenRatio>
      <Outer ref={ref} {...rest}>
        {load ? (
          <VideoPlayer
            playlists={playlists}
            thumbnails={thumbnails}
            autoplay={autoplay}
            loop={loop}
            controls={controls}
            fluid={fluid}
          />
        ) : (
          <Loader>
            <Spinner style={{ margin: 10 }} /> {t('layout.loadingVideo')}
          </Loader>
        )}
      </Outer>
    </WidescreenRatio>
  );
}
