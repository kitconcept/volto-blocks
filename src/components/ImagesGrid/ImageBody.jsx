import React from 'react';
import PropTypes from 'prop-types';
import DefaultItemBody from './DefaultItemBody';
import config from '@plone/volto/registry';

const ImageItem = (props) => {
  const { dataGrid } = props;

  const variationsConfig =
    config.blocks.blocksConfig?.[dataGrid?.['@type']]?.variations;

  const variation =
    variationsConfig &&
    dataGrid.variation &&
    !!variationsConfig[dataGrid.variation]
      ? dataGrid.variation
      : 'default';

  const BlockTemplate =
    variationsConfig?.[variation]?.components?.view || DefaultItemBody;

  return <BlockTemplate {...props} />;
};

ImageItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeGridItem: PropTypes.func,
  isEditMode: PropTypes.bool,
};

export default ImageItem;
