import { useRef, useState, useEffect } from 'react';
import { decode } from 'blurhash';

const BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

export default ({
  style,
  hash,
  punch,
  ratio,
  width,
  imgClass,
  imgStyle,
  imgWidth,
  imgHeight,
  placeholderExtraStyleRef,
}) => {
  const ref = useRef();
  const [styleHeight, setStyleHeight] = useState();
  // Canvas height is determined from the width (resolutionX) and ratio
  const height = Math.ceil(width / ratio);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas && styleHeight) {
      const pixels = decode(hash, width, height, punch);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }
  }, [hash, width, height, punch, styleHeight]);

  //  const aspectRatio = blurhashRef.current?.style.aspectRatio;
  const aspectRatio = placeholderExtraStyleRef?.current?.aspectRatio;
  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      if (placeholderExtraStyleRef?.current?.aspectRatio) {
        setStyleHeight('auto');
      } else {
        const adjustHeight = () => setStyleHeight(canvas.offsetWidth / ratio);
        adjustHeight();
        const observer = new ResizeObserver(adjustHeight);
        observer.observe(canvas);
        return () => observer.unobserve(canvas);
      }
    }
  }, [ratio, aspectRatio, placeholderExtraStyleRef]);

  // We only create a canvas after we have processed the original image's
  // computed style. Until then, we render a blank image to make sure
  // that it gets the same dimensions as the original image. Making it an
  // image lets us mimic the original image's computed css style.
  return styleHeight ? (
    <canvas
      style={{
        ...style,
        ...placeholderExtraStyleRef?.current,
        height: styleHeight,
      }}
      height={height}
      width={width}
      ref={ref}
    />
  ) : (
    <img
      src={BLANK}
      alt=""
      className={imgClass ? imgClass + ' blurhash' : 'blurhash'}
      style={{ ...imgStyle, ...placeholderExtraStyleRef?.current }}
      width={imgWidth}
      height={imgHeight}
      data={JSON.stringify({
        hash,
        punch,
        ratio,
        width,
        height,
        canvasStyle: style,
      })}
      ref={ref}
    />
  );
};
