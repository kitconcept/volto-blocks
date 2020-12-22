import React from 'react';

export default function MaybeWrap({ wrap, as: Component = 'div', ...props }) {
  return wrap ? <Component {...props} /> : props.children;
}
