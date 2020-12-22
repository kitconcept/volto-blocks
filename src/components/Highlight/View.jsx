import React from 'react';
import HighlightBody from './HighlightBody';

const View = ({ data, id, properties }) => {
  return (
    <div className="block highlight">
      <HighlightBody data={data} properties={properties} id={id} />
    </div>
  );
};

export default View;
