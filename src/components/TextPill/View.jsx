import React from 'react';
import TextPillBody from './Body';

const TextPillView = (props) => {
  return (
    <div className="block textPillWithStyle">
      <TextPillBody dataName="text" {...props} />
    </div>
  );
};

export default TextPillView;
