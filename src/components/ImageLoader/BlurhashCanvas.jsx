import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

export default ({
  style,
  hash,
  punch,
  ratio,
  width,
  height,
  imgClass,
  imgStyle,
  blurhashRef,
}) => {
  if (!blurhashRef) {
    blurhashRef = useRef();
  }
  const [styleHeight, setStyleHeight] = useState();

  useEffect(() => {
    const canvas = blurhashRef.current;
    if (canvas && styleHeight) {
      const pixels = decode(hash, width, height, punch);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [hash, width, height, punch, blurhashRef, styleHeight]);

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

  // We only create a canvas after we have processed the original image's
  // computed style. Until then, we render a blank image to make sure
  // that it gets the same dimensions as the original image. Making it an
  // image lets us mimic the original image's computed css style.
  return styleHeight ? (
    <canvas
      style={{ ...style, height: styleHeight }}
      height={height}
      width={width}
      ref={blurhashRef}
    />
  ) : (
    <img
      src={BLANK}
      alt=""
      className={imgClass ? imgClass + ' blurhash' : 'blurhash'}
      style={imgStyle}
      data={JSON.stringify({
        hash,
        punch,
        ratio,
        width,
        height,
        canvasStyle: style,
      })}
      ref={blurhashRef}
    />
  );
};
