import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';

export default ({ style, hash, punch, ratio, width, height, blurhashRef }) => {
  if (!blurhashRef) {
    blurhashRef = useRef();
  }
  const [styleHeight, setStyleHeight] = useState();

  useEffect(() => {
    const canvas = blurhashRef.current;
    if (canvas) {
      const pixels = decode(hash, width, height, punch);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [hash, width, height, punch, blurhashRef]);

  const aspectRatio = blurhashRef.current?.style.aspectRatio;
  useEffect(() => {
    const canvas = blurhashRef.current;
    if (canvas) {
      if (canvas?.style.aspectRatio) {
        setStyleHeight('auto');
      } else {
        const adjustHeight = () => setStyleHeight(canvas.offsetWidth / ratio);
        adjustHeight();
        const observer = new ResizeObserver(adjustHeight);
        observer.observe(canvas);
        return () => observer.unobserve(canvas);
      }
    }
  }, [ratio, blurhashRef, aspectRatio]);

  return (
    <canvas
      style={{ ...style, height: styleHeight }}
      height={height}
      width={width}
      ref={blurhashRef}
    />
  );
};
