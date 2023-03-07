import React from 'react';
import config from '@plone/volto/registry';
import { find } from 'lodash';

const BlockWrapperEnhancer = (props) => {
  const { data } = props;
  const variations = config.blocks?.blocksConfig?.[data['@type']]?.variations;

  const variation =
    variations &&
    data.variation &&
    (find(variations, { id: data.variation }) ||
      find(variations, { id: 'default' }));

  const Wrapper = variation?.components?.wrapper;

  if (Wrapper) {
    return <Wrapper {...props}>{props.children}</Wrapper>;
  } else {
    return <>{props.children}</>;
  }
};

export default BlockWrapperEnhancer;
