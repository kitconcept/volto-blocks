import React from 'react';
import PropTypes from 'prop-types';

import { blocks } from '~/config';

const TeaserBody = (props) => {
  const variationsConfig = blocks.blocksConfig.teaserGrid.variations;
  const { data } = props;

  const variation =
    data.template && !!variationsConfig[data.template]
      ? data.template
      : 'default';

  const BlockTemplate = variationsConfig[variation]?.template;

  return <BlockTemplate {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBody;
