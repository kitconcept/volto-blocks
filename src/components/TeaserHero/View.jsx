import React from 'react';
import TeaserHeroBody from './TeaserHeroBody';

const View = ({ data, id, render }) => {
  const teaserHeroBodyRender = render ? (
    <>{render(data, id)}</>
  ) : (
    <TeaserHeroBody data={data} id={id} />
  );
  return <div className="tile teaserHero">{teaserHeroBodyRender}</div>;
};

export default View;
