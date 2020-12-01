import React from 'react';
import PropTypes from 'prop-types';
import { MultiSourceWidget } from '../../components';

const CarouselData = (props) => {
  return <MultiSourceWidget {...props} />;
};

CarouselData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default CarouselData;
