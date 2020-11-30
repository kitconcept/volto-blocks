import React from 'react';

export function MaybeWrap({ wrap, component: Component = 'div', ...props }) {
  return wrap ? <Component {...props} /> : props.children;
}
