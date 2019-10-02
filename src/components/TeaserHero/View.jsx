import React from 'react';

import TeaserHeroBody from './TeaserHeroBody';

const View = ({ data, properties, blockID }) => {
  return (
    <div className="tile listing">
      <TeaserHeroBody data={data} properties={properties} blockID={blockID} />
    </div>
  );
};

export default View;
