import React from 'react';
import PropTypes from 'prop-types';

import { MultiSourceWidget } from '@kitconcept/volto-blocks/components';

const SliderData = (props) => {
  return <MultiSourceWidget {...props} />;
};

SliderData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default SliderData;
