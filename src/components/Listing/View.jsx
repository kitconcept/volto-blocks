import React from 'react';
import PropTypes from 'prop-types';

import ListingBody from './ListingBody';

const View = ({ data, properties, tile }) => {
  return (
    <div className="tile listing">
      <ListingBody data={data} properties={properties} tile={tile} />
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  tile: PropTypes.string.isRequired,
};

export default View;
