import React from 'react';
import withQuerySearch from './withQuerySearch';

const SimpleComp = (props) => {
  console.log(props);
  return <div>Lala</div>;
};

export default withQuerySearch(SimpleComp);
