import React from 'react';

import TeaserHeroBody from './TeaserHeroBody';

const View = ({ data, properties, id }) => {
  return (
    <div className="tile teaserHero">
      <TeaserHeroBody data={data} properties={properties} id={id} />
    </div>
  );
};

export default View;
