import React from 'react';
import { blocks } from '~/config';

const BlockWrapperEnhancer = (props) => {
  const { data } = props;
  const variations = blocks?.blocksConfig?.[data['@type']]?.variations;
  const Wrapper = variations?.[data.variation]?.wrapper;

  if (Wrapper) {
    return <Wrapper {...props}>{props.children}</Wrapper>;
  } else {
    return <>{props.children}</>;
  }
};

export default BlockWrapperEnhancer;
