/**
 * View image tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ListingItem from './ListingItem';

const View = ({ data, properties, tile }) => {
  return (
    <div className="tile listing">
      <ListingItem data={data} properties={properties} tile={tile} />
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
};

export default View;
