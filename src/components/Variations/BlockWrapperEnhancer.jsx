import React from 'react';
import config from '@plone/volto/registry';

const BlockWrapperEnhancer = (props) => {
  const { data } = props;
  const variations = config.blocks?.blocksConfig?.[data['@type']]?.variations;
  const Wrapper = variations?.[data.variation]?.components?.wrapper;

  if (Wrapper) {
    return <Wrapper {...props}>{props.children}</Wrapper>;
  } else {
    return <>{props.children}</>;
  }
};

export default BlockWrapperEnhancer;
