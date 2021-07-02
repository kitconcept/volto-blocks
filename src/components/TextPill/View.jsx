import React from 'react';
import { TextBlockView } from 'volto-slate/blocks/Text';

const TextPillView = (props) => {
  return (
    <div className="block textPillWithStyle">
      <TextBlockView {...props} />
    </div>
  );
};

export default TextPillView;
