import { useState, useEffect } from 'react';

export default function useResizeObserver({ ref }) {
  const [{ inline, block }, setEntry] = useState({ inline: 1, block: 1 });

  useEffect(() => {
    function onResize([entry]) {
      if (entry.contentBoxSize) {
        // Checking for chrome as using a non-standard array
        if (entry.contentBoxSize[0]) {
          setEntry({
            inline: entry.contentBoxSize[0].inlineSize,
            block: entry.contentBoxSize[0].blockSize
          });
        } else {
          setEntry({
            inline: entry.contentBoxSize.inlineSize,
            block: entry.contentBoxSize.blockSize
          });
        }
      } else {
        setEntry({
          inline: entry.contentRect.width,
          block: entry.contentRect.height
        });
      }
    }

    if (ref.current && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(onResize);

      resizeObserver.observe(ref.current);
    }
  }, [ref, setEntry]);

  return {
    inline,
    block,
    width: inline,
    height: block
  };
}
