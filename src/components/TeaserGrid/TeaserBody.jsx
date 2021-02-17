import React from 'react';
import PropTypes from 'prop-types';

import TeaserDefaultTemplate from '@kitconcept/volto-blocks/components/TeaserGrid/TeaserDefaultTemplate';
import config from '@plone/volto/registry';

const TeaserBody = (props) => {
  const variationsConfig = config.blocks.blocksConfig.teaserGrid.variations;
  const { dataBlock } = props;

  const variation =
    variationsConfig &&
    dataBlock.variation &&
    !!variationsConfig[dataBlock.variation]
      ? dataBlock.variation
      : 'default';

  const BlockTemplate =
    variationsConfig?.[variation]?.components?.view || TeaserDefaultTemplate;

  return <BlockTemplate {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBody;
