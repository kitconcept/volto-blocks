import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import TeaserDefaultTemplate from '@kitconcept/volto-blocks/components/TeaserGrid/TeaserDefaultTemplate';
import config from '@plone/volto/registry';

const TeaserBody = (props) => {
  const variationsConfig = config.blocks.blocksConfig.teaserGrid.variations;
  const { dataBlock } = props;

  const variation =
    variationsConfig &&
    dataBlock.variation &&
    (find(variationsConfig, { id: dataBlock.variation }) ||
      find(variationsConfig, { id: 'default' }));

  const BlockTemplate =
    variation?.components?.view || variation?.template || TeaserDefaultTemplate;

  return <BlockTemplate {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBody;
