import React from 'react';
import PropTypes from 'prop-types';
import TeaserData from '../TeaserGrid/TeaserData';

const HighlightData = ({ data, block, onChangeBlock }) => {
  return (
    <>
      <TeaserData data={data} block={block} onChangeBlock={onChangeBlock} />
    </>
  );
};

HighlightData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default HighlightData;
