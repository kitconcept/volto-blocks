import React from 'react';
import AnyLoader from './AnyLoader';
import makeSrcSet from './makeSrcSet';
import makeBlurhash from './makeBlurhash';
import extendProps from './extendProps';

/*

A React component Img.

```jsx
<Img {...}
  placeholder={[placeholder image or svg]}
/>
```

This will become an img with all the parameters specified in the ImgLoader props.
Before the image is loaded, it will show the component from the
placeholder property.

The image will also generate an `srcSet` with the specified (or default) image
scales, and if a defaultScale is specified, it changes
the `src` property to point to the url of the scale specified.

# 'srcSetHint' property

Optional property, if missing then the defaults are used.

The defaults can also be specified in Volto's config.js file, example:

```js
  config.settings.makeSrcSet = {
    enabled: true,
    isLocal: isInternalURL,
    createScaleUrl: (src, scaleName) =>
      `${flattenToAppURL(src)}/@@images/image/${scaleName}`,
    minWidth: 0,
    maxWidth: Infinity,
    scales: [
      ['icon', 32],
      ['tile', 64],
      ['thumb', 128],
      ['mini', 200],
      ['preview', 400],
      ['teaser', 600],
      ['large', 800],
      ['great', 1200],
      ['huge', 1600],
    ],
  };
```

The above example equals the actual default (that is, without even specifying them) lest the
`createScaleUrl` and `isLocal` functions fo avoid the dependencies.
So providing at least these two in config is desired.

```js
  config.settings.makeSrcSet = {
    isLocal: isInternalURL,
    createScaleUrl: (src, scaleName) =>
      `${flattenToAppURL(src)}/@@images/image/${scaleName}`,
  };
```


Explanations for the options:

`enabled`: if set to false then neither the `src` nor the `srcSet` properties are amended.

'isLocal': a function that decides if an url is internal to the site. If the result is false then
the `srcset` and `src` props will not be amended, same as `enabled` false but selectively for some
urls only.

`createScaleUrl`: a sunction that specifies the scale url from a base image `src` and a `scaleName`.

`scales`: specifies the list of scales to be used, elements of the list are a tuple of `scaleName` and `width`. This **must** match the image scales actually provided by the back-end!

`minWidth`, `maxWidth` filter the list of scales and only the scales with a matching width will be
added to `srcSet`.

## Specifying no `srcSetHints`

In most cases everything should "just work" without an `srcSetHints` attribute and in this case the
defaults (specified in 'config.js`, or in the lack of this, the global defaults) will be applied

## Using a compiled `srcSetHints`

For performance reasons, the `srcSetHints` can be created from code and then injected as a prop.

```jsx
import { makeSrcSet } from `kitconcept.volto-blocks`;

// ...

const srcSetHints = makeSrcSet({ ...options });

// ...

<Img
  srcSetHints={srcSetHints}
  src={src}
  />
```

# `placeholder` property

The placeholder property can be a single element or a list of
elements defined with <>...</>.

If the src component is empty, the image is not loaded and
the placeholder will be permanently shown. This makes it possible
to apply a condition in the src attribute.

ImgLoader cannot have children, as <img> is not allowed to have
children.

Example for png:

```jsx
<Img
  src={hasImage && flattenToAppURL(
    content.image.scales.teaser.download,
  )}
  alt={content.title}
  placeholder={<img src={personDummyPNG} alt={content.title} />}
/>
```

Example for svg:

```jsx
<Img
  src={item.image_field && flattenToAppURL(
    `${item['@id']}/@@images/${item.image_field}/preview`,
  )}
  alt={item.title}
  placeholder={<SomeSvg />}
/>
```

Example for Volto icon:

```jsx
<Img
  src={hasImage && flattenToAppURL(
    content.image.scales.teaser.download,
  )}
  alt={content.title}
  placeholder={(
    <Icon
      name={ploneSVG}
      size="20px"
      color="#007EB1"
      title={'plone-svg'}
     />
   )}
/>
```

# `blurhash` property

 */

export default ({ blurhashOptions, ...props }) => {
  props = extendProps(props, makeBlurhash(blurhashOptions).fromProps(props));
  return AnyLoader({
    ...props,
    createComponent: ({ srcSetHints, ...props }, children) => {
      props = extendProps(props, makeSrcSet(srcSetHints).fromProps(props));
      if (children !== undefined) {
        throw new Error('Children are not allowed in <Img>');
      }
      return React.createElement('img', props);
    },
  });
};
