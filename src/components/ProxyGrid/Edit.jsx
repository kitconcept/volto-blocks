import React from 'react';
import EditGrid from '../Grid/Edit';
import templates from './templates';

const Edit = props => {
  return <EditGrid {...props} gridType="proxy" templates={templates} />;
};

export default Edit;
