import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';

export default ({ style, hash, punch, ratio, width, height }) => {
  const ref = useRef();
  const [styleHeight, setStyleHeight] = useState();

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const pixels = decode(hash, width, height, punch);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [hash, width, height, punch]);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const adjustHeight = () => setStyleHeight(canvas.offsetWidth / ratio);
      adjustHeight();
      const observer = new ResizeObserver(adjustHeight);
      observer.observe(canvas);
      return () => observer.unobserve(canvas);
    }
  }, [ratio]);

  return (
    <canvas
      style={{ ...style, height: styleHeight }}
      height={height}
      width={width}
      ref={ref}
    />
  );
};
