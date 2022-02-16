import React, { useState } from 'react';

/*

Base component for creating image loaders. Should not be used
directly. Instead, it can be used to create a new loader element.

```jsx
<AnyLoader {...}
  createElememt={createElement}
  placeholder={[placeholder image or svg]}
>
  ...
</AnyLoader>
```

The createElement property must be a function that creates the
loading element. The function has the same signature as
React.createElement. The function must in particular, handle the
onLoad property passed to it and make sure that onLoad is called
when the created element has been loaded.

This can be adapted to any specific image loader class. Examples
provided are:

- ImgLoader.jsx for loading an html img element
- ImageLoader.jsx for loading a React Semantic UI Image element

*/

export default (props) => {
  const { children, createComponent, placeholder, ...imgProps } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [placeholderChildren, setPlaceholderChildren] = useState(undefined);
  if (isLoaded && imgProps.src !== placeholderProps.src) {
    setIsLoaded(false);
  }
  const onLoad = () => {
    setIsLoaded(true);
    setPlaceholderProps(imgProps);
    setPlaceholderChildren(children);
  };
  return (
    <>
      {isLoaded ? (
        createComponent(imgProps, children)
      ) : (
        <div style={{ display: 'none' }}>
          {imgProps.src
            ? createComponent({ ...imgProps, onLoad }, children)
            : null}
        </div>
      )}
      {isLoaded
        ? null
        : placeholderProps.src
        ? createComponent(placeholderProps, placeholderChildren)
        : placeholder}
    </>
  );
};