import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import TeaserDefaultTemplate from '@kitconcept/volto-blocks/components/TeaserGrid/TeaserDefaultTemplate';
import config from '@plone/volto/registry';
import { convertValueToVocabQuery } from '../../../../../../omelette/src/components/manage/Widgets/SelectUtils';

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

  const Wrapper = variation?.components?.wrapper;

  if (Wrapper) {
    return (
      <Wrapper {...props}>
        <BlockTemplate {...props} />
      </Wrapper>
    );
  } else {
    return <BlockTemplate {...props} />;
  }
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBody;
